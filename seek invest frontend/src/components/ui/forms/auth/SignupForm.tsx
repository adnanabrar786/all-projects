import FilledButton from "components/common/Button/FilledButton";
import LabelTopTextField from "components/common/Input/LabelTopTextField";
import SmallLoader from "components/common/SmallLoader";
import { FormikHelpers, useFormik } from "formik";
import { ISignUpForm } from "interfaces/auth";
import { handleFormikChange } from "utils/formik";
import { SIGN_UP_FORM_SCHEMA } from "validators/auth";

type Props = {
  handleClick: (
    values: ISignUpForm,
    formik: FormikHelpers<ISignUpForm>
  ) => Promise<void>;
};

export default function SignUpForm({ handleClick }: Props) {
  const formik = useFormik<ISignUpForm>({
    initialValues: {
      email: "",
    },
    validationSchema: SIGN_UP_FORM_SCHEMA(),
    onSubmit: handleClick,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <LabelTopTextField
        onChange={(e) => {
          handleFormikChange(e.target.value, formik, "email");
        }}
        name="email"
        label="Email"
        placeholder="Enter your email"
        value={formik.values.email}
        error={Boolean(formik.touched.email && formik.errors.email)}
        helperText={formik.touched.email ? formik.errors.email : ""}
        sx={{ width: "20rem" }}
      />

      <FilledButton
        type="submit"
        text="Continue with Email"
        disabled={formik.isSubmitting}
        startIcon={formik.isSubmitting ? <SmallLoader /> : null}
        sx={{
          marginTop: "2rem",
          minWidth: "20rem",
        }}
      />
    </form>
  );
}
