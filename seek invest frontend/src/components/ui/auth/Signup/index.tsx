import { Box, Stack, Typography } from "@mui/material";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import SignUpForm from "components/ui/forms/auth/SignupForm";
import { PRIVACY_POLICY, TERMS_OF_SERVICES } from "constants/api.routes";
import { VectorLinesDarkIcon } from "constants/images.routes";
import { LOGIN, VERIFY_EMAIL } from "constants/pages.routes";
import { FormikHelpers } from "formik";
import { ISignUpForm } from "interfaces/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { sendSignupLink } from "services/auth.services";
import { toastError } from "utils/toaster";

type THandleSignupSubmit = {
  values: ISignUpForm;
  formik: FormikHelpers<ISignUpForm>;
};

const SignUp = () => {
  const router = useRouter();

  const handleClick = async (
    values: THandleSignupSubmit["values"],
    formik: THandleSignupSubmit["formik"]
  ) => {
    formik.setSubmitting(true);
    const [response, err] = await sendSignupLink(values.email);
    formik.setSubmitting(false);
    if (err) {
      toastError(err.message);
      formik.setErrors({ email: "Email already exist. Please Login" });
      return;
    }

    if (response && response.status == 201) {
      router.push(`${VERIFY_EMAIL}/${encodeURIComponent(values.email)}`);
      return;
    }
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        width: "100%",
      }}
    >
      <Stack
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
          position: "relative",
          maxWidth: "1440px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "5.69rem",
            right: { md: "-12.81rem" },
          }}
        >
          <Image
            src={VectorLinesDarkIcon}
            alt="splash icon"
            width={181}
            height={110}
          />
        </Box>

        <Stack sx={{ alignItems: "center", marginTop: "8rem" }}>
          <TextXl text="Welcome to SeekInvest" />

          <TextSm
            text="The platform for growth and engagement, designed for forward-thinking enterprises and financial advisors."
            sx={{
              marginTop: "1.25rem",
              color: "var(--color-text-text-secondary, #667085)",
              maxWidth: "37.69381rem",
              textAlign: "center",
              lineHeight: "1.5rem",
            }}
          />

          <Box sx={{ marginTop: "3rem" }} />

          <SignUpForm handleClick={handleClick} />

          <Typography
            sx={{
              marginTop: "1.5rem",
              textAlign: "center",
              fontSize: "1rem",
              lineHeight: "1.5rem",
              color: "var(--text-primary)",
              a: {
                color: "var(--primary)",
                cursor: "pointer",
                fontWeight: "500",
              },
            }}
          >
            Already have an account? <Link href={LOGIN}> Login</Link>
          </Typography>
        </Stack>

        <Typography
          sx={{
            textAlign: "center",
            fontSize: "0.75rem",
            lineHeight: "1.125rem",
            maxWidth: "27.25rem",
            color: "var(--color-text-text-secondary, #667085)",
            marginBottom: "2.75rem",
            a: {
              textDecoration: "underLine",
              cursor: "pointer",
              color: "var(--color-text-text-secondary, #667085)",
            },
          }}
        >
          <a href={TERMS_OF_SERVICES} target="_blank">
            {" "}
            Terms of Use
          </a>{" "}
          and{" "}
          <a href={PRIVACY_POLICY} target="_blank">
            Privacy Policy
          </a>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default SignUp;
