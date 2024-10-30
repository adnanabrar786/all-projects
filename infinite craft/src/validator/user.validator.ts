import * as yup from "yup";

const STRING_TYPE = yup.string();

export const userSchema = yup.object().shape({
  first_name: STRING_TYPE.required("first name is required"),
  last_name: STRING_TYPE.required("last name is required"),
});

const NUMBER_TYPE = yup.number();
const ARRAY = yup.array();
const OBJECT = yup.object();
const BOOLEAN_TYPE = yup.boolean();

export const USER_SCHEMA = () =>
  yup.object({
    given_name: STRING_TYPE.required("first name is required").min(
      3,
      "First name must be greater than 2 char",
    ),
    family_name: STRING_TYPE.required("last name is required").min(
      3,
      "Last name must be greater than 2 char",
    ),
    email: STRING_TYPE.email("Invalid email"),
    // password: STRING_TYPE.required('Please enter password').min(8),
    password: STRING_TYPE.required("Please enter password")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@#$%^&+=!)",
      ),
  });

export const PASS_CHANGE_SCHEMA = () =>
  yup.object({
    oldPass: yup.string().required("Please enter password"),
    newPass: yup
      .string()
      .required("Please enter password")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@#$%^&+=!)",
      ),
    confirmNewPass: yup
      .string()
      .required("Please confirm password")
      .oneOf([yup.ref("newPass"), ""], "Passwords must match"),
  });

export const USER_SCHEMA_SIGNIN = () =>
  yup.object({
    email: STRING_TYPE.email("Invalid email"),
    password: STRING_TYPE.required("Please enter password")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@#$%^&+=!)",
      ),
  });

export const USER_FIRST_LAST_NAME = () =>
  yup.object({
    given_name: STRING_TYPE.required("first name is required").min(
      3,
      "First name must be greater than 2 char",
    ),
    family_name: STRING_TYPE.required("last name is required").min(
      3,
      "Last name must be greater than 2 char",
    ),
  });
