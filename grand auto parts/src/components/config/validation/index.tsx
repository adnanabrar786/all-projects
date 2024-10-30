import * as Yup from "yup";

export const contactFormSchema = Yup.object({
  first_name: Yup.string()
    .required("Please enter your first name")
    .min(3, "First name must be greater than 2 char"),
  last_name: Yup.string()
    .required("Please enter your last name")
    .min(3, "First name must be greater than 2 char"),
  phone_number: Yup.number(),
  company: Yup.string(),
  email: Yup.string().email().required("Please enter your email"),
  country: Yup.string(),
  message: Yup.string().required("Please enter your message"),
});

export const subscriberFormSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});
