import Box from "@mui/material/Box";
import LayoutLoader from "components/common/LayoutLoader";
import {
  APP,
  CLIENTS_OVERVIEW,
  COMPANY_DETAILS,
  CREATE_PASSWORD,
  FORGOT_PASSWORD,
  LOGIN,
  PERSONAL_DETAILS,
  PRICE_PLAN,
  SIGN_UP,
  VERIFY_EMAIL,
} from "constants/pages.routes";
import { useUserContext } from "context/user/UserContext";
import { ERoles } from "enums/enums";
import { jwtDecode } from "jwt-decode";
import { clearSentryUser } from "logging/sentry";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { getFirm } from "services/firm.services";
import { getUser } from "services/user.services";
import { clearLocalStorage, getToken } from "utils/token";

type AppbarDrawerProps = {
  children: ReactNode;
};

export default function Layout({ children }: AppbarDrawerProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { setSelectedClients } = useUserContext();
  const [isLoading, setIsLoading] = useState(true);

  const { setUser } = useUserContext();

  const toggleLoading = () => setIsLoading(!isLoading);

  const validateUser = useCallback(async () => {
    const token = getToken();
    if (
      router.pathname &&
      (router.pathname.startsWith(APP) ||
        router.pathname.startsWith(VERIFY_EMAIL))
    ) {
      toggleLoading();
      return;
    }

    const AUTH_PAGES = [LOGIN, SIGN_UP, FORGOT_PASSWORD];
    if (!token) {
      toggleLoading();
      if (
        pathname &&
        (AUTH_PAGES.includes(pathname) || pathname.startsWith(CREATE_PASSWORD))
      ) {
        return;
      }
      return router.replace(LOGIN);
    }

    const decoded: any = jwtDecode(token);
    if (decoded && decoded.exp < Date.now() / 1000) {
      setIsLoading(false);
      clearLocalStorage();
      return router.replace(LOGIN);
    }

    const {
      data: { data: user },
    } = await getUser();
    if (!user) {
      toggleLoading();
      return router.replace(LOGIN);
    }

    setUser(user);
    if (!user.first_name && !user.last_name) {
      toggleLoading();
      return router.replace(PERSONAL_DETAILS);
    }
    if (
      [ERoles.MEMBER.toUpperCase(), ERoles.ADMIN.toUpperCase()].includes(
        user.role
      )
    ) {
      toggleLoading();
      return router.replace(CLIENTS_OVERVIEW);
    }

    if (user.role === ERoles.OWNER.toUpperCase()) {
      const {
        data: { data: firm },
      } = await getFirm(token);
      toggleLoading();
      if (!firm) {
        return router.replace(COMPANY_DETAILS);
      }
      if (!user.onboarding_complete) {
        return router.push(PRICE_PLAN);
      }
      if (
        pathname &&
        (AUTH_PAGES.includes(pathname) || pathname.startsWith(CREATE_PASSWORD))
      )
        return router.replace(CLIENTS_OVERVIEW);
    }

    if (user.role === "") {
      toggleLoading();
      return router.replace(COMPANY_DETAILS);
    }
  }, []);

  useEffect(() => {
    validateUser();
  }, []);

  useEffect(() => {
    if (pathname !== CLIENTS_OVERVIEW) {
      setSelectedClients([]);
    }
  }, [pathname]);

  window.addEventListener("storage", (e) => {
    if (!e.key && !e.oldValue && !e.newValue) {
      clearSentryUser();
      return router.replace(LOGIN);
    }
  });

  return (
    <>
      <Toaster reverseOrder={false} />
      {isLoading ? (
        <LayoutLoader />
      ) : (
        <Box
          sx={{
            display: "flex",
            minWidth: "1200px",
          }}
        >
          {children}
        </Box>
      )}
    </>
  );
}
