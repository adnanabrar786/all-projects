import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import SmallLoader from "components/common/SmallLoader";
import { EyeIcon } from "constants/images.routes";
import { FormikHelpers, useFormik } from "formik";
import { ICreatePassword } from "interfaces/auth";
import Image from "next/image";
import { useState } from "react";
import { handleFormikChange } from "utils/formik";
import { CREATE_PASSWORD_FORM_SCHEMA } from "validators/auth";

type Props = {
  handleClick: (
    values: ICreatePassword,
    formik: FormikHelpers<ICreatePassword>
  ) => Promise<void>;
};

export default function CreatePasswordForm({ handleClick }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik<ICreatePassword>({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: CREATE_PASSWORD_FORM_SCHEMA(),
    onSubmit: handleClick,
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
            textField.showPass ? (
              <VisibilityTwoToneIcon
                onClick={() => textField.changeShowPass(!textField.showPass)}
                sx={{
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              />
            ) : (
              <Image
                onClick={() => textField.changeShowPass(!textField.showPass)}
                priority
                src={EyeIcon}
                alt={"icon"}
                width={16}
                height={14}
              />
            )
          }
        />
      ))}

      <FilledButton
        type="submit"
        startIcon={formik.isSubmitting ? <SmallLoader /> : null}
        text={formik.isSubmitting ? "Creating account..." : "Create account"}
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
  );
}
