import { number, object, ref, string } from "yup";
const STRING_TYPE = string();
const NUMBER_TYPE = number();

export const EMAIL_FORM_SCHEMA = () =>
  object({
    email: STRING_TYPE.required("Required email").email("Enter valid email"),
  });

export const SIGN_UP_FORM_SCHEMA = () =>
  object({
    email: STRING_TYPE.required("Required email").email("Enter valid email"),
  });

export const LOG_IN_FORM_SCHEMA = () =>
  object({
    email: STRING_TYPE.required("Required email").trim(),
    password: STRING_TYPE.required("Required password"),
  });

export const CREATE_PASSWORD_FORM_SCHEMA = () =>
  object({
    password: STRING_TYPE.required("Please enter a password")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Max 30 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/,
        "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
      ),
    confirmPassword: STRING_TYPE.required("Please confirm your password")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Max 30 characters")
      .oneOf([ref("password"), ""], "Passwords must match"),
  });
