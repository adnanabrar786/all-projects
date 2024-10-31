import * as yup from "yup";
const STRING_TYPE = yup.string();
const NUMBER_TYPE = yup.number();

export const LOGIN_FORM_SCHEMA = () =>
  yup.object({
    email: STRING_TYPE.required("REQUIRED EMAIL").email("ENTER VALID EMAIL"),
    password: STRING_TYPE.required("REQUIRED PASSWORD"),
  });
