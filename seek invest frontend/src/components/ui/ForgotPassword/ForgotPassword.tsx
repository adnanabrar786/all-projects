import { Stack, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import { LOGIN } from "constants/pages.routes";
import { useFormik } from "formik";
import { IResetPassForm } from "interfaces/common";
import Link from "next/link";
import { useState } from "react";
import { forgetPassword } from "services/auth.services";
import { handleFormikChange } from "utils/formik";
import { toastSuccess } from "utils/toaster";
import { EMAIL_FORM_SCHEMA } from "validators/auth";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!loading) {
      setLoading(true);
      mutation.mutate();
    }
  };

  const formik = useFormik<IResetPassForm>({
    initialValues: {
      email: "",
    },
    validationSchema: EMAIL_FORM_SCHEMA(),
    onSubmit: handleClick,
  });

  const { email } = formik.values;

  const mutation = useMutation({
    mutationFn: () => forgetPassword(email),
    onSuccess: async (res) => {
      if (res.data && res.data.data) {
        toastSuccess("Password Reset Email Sent. Check your email.");
      }

      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });

  return (
    <>
      <Stack
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Stack sx={{ alignItems: "center", marginTop: "12.5rem" }}>
          <TextXl text="Reset your password" />

          <TextSm
            text="Enter the email address associated with your account to reset your password. You will receive an email with a link to create a new password for your account."
            sx={{
              marginTop: "0.75rem",
              color: "var(--color-text-text-secondary, #667085)",
              maxWidth: "37.69382rem",
              textAlign: "center",
              lineHeight: "1.5rem",
            }}
          />

          <Stack
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ marginTop: "4rem" }}
          >
            <LabelTopTextField
              onChange={(e) => {
                handleFormikChange(e.target.value, formik, "email");
                if (!e.target.value) {
                  formik.setTouched({ email: false });
                }
              }}
              name="email"
              label="Email"
              placeholder="Enter your email"
              value={email}
              error={Boolean(formik.touched.email && formik.errors.email)}
              helperText={formik.touched.email ? formik.errors.email : ""}
              sx={{ width: "20rem" }}
              sxLabel={{ color: "var(--text-secondary)" }}
            />

            <FilledButton
              loading={loading}
              disabled={!email}
              type="submit"
              text={loading ? "Sending reset link..." : "Send reset link"}
              sx={{
                marginTop: "1.62rem",
                minWidth: "20rem",
              }}
            />
          </Stack>

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
      </Stack>
    </>
  );
};

export default ForgotPassword;
