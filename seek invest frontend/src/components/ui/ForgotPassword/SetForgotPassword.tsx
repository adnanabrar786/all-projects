import { Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import FilledButton from "components/common/Button/FilledButton";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import TextSm from "components/common/Text/TextSm";
import TextXl from "components/common/Text/TextXl";
import { EyeIcon } from "constants/images.routes";
import { LOGIN } from "constants/pages.routes";
import { useFormik } from "formik";
import { ICreatePassword } from "interfaces/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { setPassword } from "services/auth.services";
import { handleFormikChange } from "utils/formik";

import { toastSuccess } from "utils/toaster";
import { CREATE_PASSWORD_FORM_SCHEMA } from "validators/auth";

const SetForgotPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const email =
    typeof document !== "undefined" ? document.URL.split("email=")[1] : "";

  const handleClick = async () => {
    if (!loading) {
      setLoading(true);
      mutation.mutate();
    }
  };

  const formik = useFormik<ICreatePassword>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: CREATE_PASSWORD_FORM_SCHEMA(),
    onSubmit: handleClick,
  });

  const mutation = useMutation({
    mutationFn: () =>
      setPassword(formik.values.password, formik.values.confirmPassword, email),
    onSuccess: ([data]) => {
      if (data) {
        if (data?.status === 200) {
          toastSuccess("Account Created Successfully");
          router.push(LOGIN);
        }
      } else {
      }

      setLoading(false);
    },
  });

  const { password, confirmPassword } = formik.values;

  const textFields = [
    {
      name: "password",
      value: password,
      label: "Create your password",
      placeholder: "Enter your password",
      showPass: showPassword,
      changeShowPass: setShowPassword,

      error: Boolean(formik.touched.password && formik.errors.password),
      helperText: formik.touched.password ? formik.errors.password : "",
    },
    {
      name: "confirmPassword",
      value: confirmPassword,
      label: "Confirm your password",
      placeholder: "Re-enter your password",
      showPass: showConfirmPassword,
      changeShowPass: setShowConfirmPassword,

      error: Boolean(
        formik.touched.confirmPassword && formik.errors.confirmPassword
      ),
      helperText: formik.touched.confirmPassword
        ? formik.errors.confirmPassword
        : "",
    },
  ];

  const disableButtonColor =
    !password || !confirmPassword ? "var(--primary-disable)" : "var(--primary)";

  return (
    <>
      <Stack
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          minHeight: "100vh",
          position: "relative",
          maxWidth: "1440px",
        }}
      >
        <Stack sx={{ alignItems: "center", marginTop: "8rem" }}>
          <TextXl
            text="Reset your password"
            sx={{
              maxWidth: "25rem",
              textAlign: "center",
              lineHeight: " 2.75rem",
            }}
          />

          <TextSm
            text="Enter the email address associated with your account to reset your password. You will receive an email with a link to create a new password for your account. "
            sx={{
              marginTop: "1rem",
              color: "var(--color-text-text-secondary, #667085)",
              maxWidth: "31.5rem",
              textAlign: "center",
              lineHeight: "1.5rem",
              marginBottom: "3.25rem",
            }}
          />

          <Stack
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{ gap: "1.62rem" }}
          >
            {textFields.map((textField) => (
              <LabelTopTextField
                key={textField.name}
                onChange={(e) => {
                  handleFormikChange(e.target.value, formik, textField.name);
                }}
                type={textField.showPass ? "text" : "password"}
                name={textField.name}
                label={textField.label}
                placeholder={textField.placeholder}
                value={textField.value}
                error={textField.error}
                helperText={textField.helperText}
                sx={{ width: "20rem", img: { cursor: "pointer" } }}
                endIcon={
                  <Image
                    onClick={() =>
                      textField.changeShowPass(!textField.showPass)
                    }
                    priority
                    src={EyeIcon}
                    alt={"icon"}
                    width={16}
                    height={14}
                  />
                }
              />
            ))}

            <FilledButton
              type="submit"
              loading={loading}
              text={"Reset Password"}
              sx={{
                minWidth: "20rem",
                borderColor: disableButtonColor,
                backgroundColor: disableButtonColor,
                ":hover": {
                  backgroundColor: disableButtonColor,
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default SetForgotPassword;
