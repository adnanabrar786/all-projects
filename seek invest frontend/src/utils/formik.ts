import { ITextField } from "components/common/Input/LabelTopTextField";

export const handleFormikChange = (
  value: string,
  formik: any,
  name?: string
) => {
  if (name) {
    formik.setValues({
      ...formik.values,
      [name]: value,
    });
  }
};

export const generateTextField = ({
  name,
  error,
  value,
  helperText,
  label,
  placeholder,
}: {
  name?: string;
  error?: string;
  value: string;
  helperText?: string;
  label: string;
  placeholder: string;
}): ITextField => {
  if (name) {
    return {
      name,
      value: value,
      label: label,
      placeholder: placeholder,
      phoneNo: name === "phone",

      error: Boolean(helperText && error),
      helperText: helperText ? error || "" : "",
    };
  }
  return {
    name,
    value: "",
    label: "",
    placeholder: "",
    phoneNo: false,
    error: false,
    helperText: "",
  };
};
