import { Box, Stack, Typography } from "@mui/material";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import LoginForm from "components/ui/forms/auth/LoginForm";
import { SplashLeftIcon } from "constants/images.routes";
import {
  CLIENTS_OVERVIEW,
  PERSONAL_DETAILS,
  SIGN_UP,
} from "constants/pages.routes";
import { useCompanyContext } from "context/firm/CompanyContext";
import { useUserContext } from "context/user/UserContext";
import { FormikHelpers } from "formik";
import { ILoginForm } from "interfaces/auth";
import { setSentryUser } from "logging/sentry";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostHog } from "posthog-js/react";
import { userLogin } from "services/auth.services";
import { getUser } from "services/user.services";

type THandleLoginSubmit = {
  values: ILoginForm;
  formik: FormikHelpers<ILoginForm>;
};

const Login = () => {
  const router = useRouter();
  const { setUser } = useUserContext();
  const { setCompany } = useCompanyContext();
  const posthog = usePostHog();

  const handleClick = async (
    values: THandleLoginSubmit["values"],
    formik: THandleLoginSubmit["formik"]
  ) => {
    setUser(null);
    setCompany(null);
    formik.setSubmitting(true);
    const [response, err] = await userLogin(values.email, values.password);
    if (err) {
      formik.setSubmitting(false);
      formik.setErrors({ email: "Incorrect email address or password" });
      return;
    }

    if (response && response.status === 200) {
      const {
        data: { data },
      } = response;
      localStorage.setItem("token", JSON.stringify(data.idToken));
      const user = await getUser();
      if (user.data) {
        setUser(user.data.data);
        posthog.identify(user.data.data.email);
        posthog.startSessionRecording();
        setSentryUser({
          id: user.data.data.id,
          email: user.data.data.email,
        });
        formik.setSubmitting(false);

        if (user.data.data.onboarding_complete === true) {
          return router.replace(CLIENTS_OVERVIEW);
        }
        router.push(PERSONAL_DETAILS);
      }
    }
    formik.setSubmitting(false);
  };

  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "5rem",
          left: "-3.5rem",
        }}
      >
        <Image src={SplashLeftIcon} alt="splash icon" width={66} height={71} />
      </Box>

      <Stack sx={{ alignItems: "center", marginTop: "8rem" }}>
        <TextXl text="Welcome back to SeekInvest" />

        <TextSm
          text="The platform for growth and engagement, designed for forward-thinking enterprises and financial advisors."
          sx={{
            marginY: "0.75rem",
            color: "var(--color-text-text-secondary, #667085)",
            maxWidth: "29.4375rem",
            textAlign: "center",
            lineHeight: "1.5rem",
          }}
        />

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.8125rem",
            lineHeight: "1.25rem",
            color: "var(--text-primary)",
            a: {
              color: "var(--primary)",
              cursor: "pointer",
              fontWeight: "500",
            },
          }}
        >
          Don’t have an account yet? <Link href={SIGN_UP}> Sign up now</Link>
        </Typography>
        <LoginForm handleClick={handleClick} />
      </Stack>
    </Stack>
  );
};

export default Login;
