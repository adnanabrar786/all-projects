import { object, string } from "yup";
const STRING_TYPE = string();

export const PERSONAL_SETTINGS_FORM_SCHEMA = () =>
  object({
    first_name: STRING_TYPE.required("Required first name"),
    last_name: STRING_TYPE.required("Required last name"),
    phone: STRING_TYPE.required("Required phone number"),
    email: STRING_TYPE.required("Required email").email(
      "Email must be a valid email"
    ),
    job_designation: STRING_TYPE.optional(),
  });
