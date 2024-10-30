import { exo } from "@/components/ThemeRegistry/theme";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { LIBRARY_PAGE_URL } from "@/routes";
import { RootState } from "@/store";
import { setAppbarId } from "@/store/slices/imageSlice";
import { infoMessage } from "@/utils/enums";
import { Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

interface Props {
  appbarItem: { id: string; item: string };
}

const AppBarItem = ({ appbarItem }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { appbarId } = useAppSelector((state) => state.userImage);

  const _user = useSelector((state: RootState) => state.user);

  const premium: string = _user?.subscription;

  useEffect(() => {
    const container = document.getElementById(appbarId);
    if (container) {
      if (pathname !== "/prompt-library") {
        setTimeout(() => {
          container?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <Typography
      onClick={() => {
        const container = document.getElementById(appbarItem.id);
        if (appbarItem.id === "prompt") {
          if (_user.id && premium === "PREMIUM") {
            dispatch(setAppbarId(""));
            router.push(LIBRARY_PAGE_URL);
          } else if (_user.id && premium === "FREEMIUM") {
            dispatch(setAppbarId(""));
            infoMessage("Please Buy Premium");
          } else {
            infoMessage("Please Login");
          }
        } else if (pathname !== "/") {
          dispatch(setAppbarId(appbarItem.id));
          router.push("/");
        } else {
          container?.scrollIntoView({ behavior: "smooth" });
        }
      }}
      key={appbarItem.item}
      sx={{
        color: "white",
        fontSize: "1.125rem",
        cursor: "pointer",
        fontFamily: exo.style.fontFamily,
      }}
    >
      {appbarItem.item}
    </Typography>
  );
};

export default AppBarItem;
