import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import { Stack } from "@mui/material";
import FilledButton from "components/common/Button/FilledButton";
import ErrorChip from "components/common/Chip/ErrorChip";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import SmallLoader from "components/common/SmallLoader";
import TextXs from "components/common/Text/TextXs";
import { EyeIcon } from "constants/images.routes";
import { FORGOT_PASSWORD } from "constants/pages.routes";
import { FormikHelpers, useFormik } from "formik";
import { ILoginForm } from "interfaces/auth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { handleFormikChange } from "utils/formik";
import { LOG_IN_FORM_SCHEMA } from "validators/auth";

type Props = {
  handleClick: (
    values: ILoginForm,
    formik: FormikHelpers<ILoginForm>
  ) => Promise<void>;
};

export default function LoginForm({ handleClick }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik<ILoginForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LOG_IN_FORM_SCHEMA(),
    onSubmit: handleClick,
  });

  const disabled =
    !formik.values.email ||
    !formik.values.password ||
    Boolean(formik.errors.email);

  return (
    <Stack
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ gap: "1.5rem", marginTop: "4rem" }}
    >
      <LabelTopTextField
        onChange={(e) => {
          formik.setErrors({ email: "" });
          handleFormikChange(e.target.value, formik, "email");
        }}
        name="email"
        label="Enter your email"
        placeholder="Enter your email"
        value={formik.values.email}
        sx={{ width: "20rem" }}
        sxLabel={{ color: "var(--text-secondary)" }}
      />

      <Stack
        sx={{
          gap: "0.75rem",
          ".forgotPassword": { alignSelf: "flex-end" },
        }}
      >
        <LabelTopTextField
          onChange={(e) => {
            formik.setErrors({ email: "" });
            handleFormikChange(e.target.value, formik, "password");
          }}
          type={showPassword ? "text" : "password"}
          name="password"
          label="Enter your password"
          placeholder="Enter your password"
          value={formik.values.password}
          sx={{ width: "20rem", img: { cursor: "pointer" } }}
          sxLabel={{ color: "var(--text-secondary)" }}
          endIcon={
            showPassword ? (
              <VisibilityTwoToneIcon
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "16px",
                }}
              />
            ) : (
              <Image
                onClick={() => setShowPassword(!showPassword)}
                priority
                src={EyeIcon}
                alt={"icon"}
                width={16}
                height={14}
              />
            )
          }
        />

        <Link href={FORGOT_PASSWORD} className="forgotPassword">
          <TextXs
            text="Forgot password?"
            sx={{
              color: "var(--primary)",
              fontWeight: "500",
            }}
          />
        </Link>
      </Stack>

      {formik.errors.email && formik.values.email && (
        <ErrorChip text={formik.errors.email} />
      )}

      <FilledButton
        disabled={disabled}
        type="submit"
        startIcon={formik.isSubmitting ? <SmallLoader /> : null}
        text={formik.isSubmitting ? "Logging you in..." : "Login"}
        sx={{
          marginTop: "1.62rem",
          minWidth: "20rem",
        }}
      />
    </Stack>
  );
}
