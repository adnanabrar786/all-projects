import { number, object, string } from "yup";
const STRING_TYPE = string();
const NUMBER_TYPE = number();

export const EDIT_CLIENT_DETAIL = () =>
  object({
    email: STRING_TYPE.required("Please enter a valid email").email(
      "Please enter a valid email"
    ),
    first_name: STRING_TYPE.required("Required first name"),
    last_name: STRING_TYPE.required("Required last name"),
    advisory_fee: NUMBER_TYPE.min(0, "Please enter a value between 0-100")
      .max(100, "Please enter a value between 0-100")
      .nullable(),
    phone: STRING_TYPE.min(10, "Please enter a valid phone number").max(
      12,
      "Please enter a valid phone number"
    ),
  });

export const PERSONAL_CLIENT_FORM_SCHEMA = () =>
  object({
    first_name: STRING_TYPE.required("Required first name"),
    last_name: STRING_TYPE.required("Required last name"),
    email: STRING_TYPE.required("Required email").email("Enter valid email"),
  });
