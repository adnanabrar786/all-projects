import { object, string } from "yup";
const STRING_TYPE = string();

export const PLAN_AND_BILLING_FORM_SCHEMA = () =>
  object({
    cardNumber: STRING_TYPE.required("Required card number"),
    expiryDate: STRING_TYPE.required("Required expiry date"),
    cvv: STRING_TYPE.required("Required cvv"),
    billingAddress: STRING_TYPE.required("Required billing address"),
    postalCode: STRING_TYPE.required("Required postal code"),
  });

export const COMPANY_DETAILS_FORM_SCHEMA = () =>
  object({
    name: STRING_TYPE.required("Required company name"),
    phone: STRING_TYPE.optional(),
    address_line1: STRING_TYPE.required("Required company address"),
    city: STRING_TYPE.required("Required company city"),
    state: STRING_TYPE.required("Required company state"),
    zip: STRING_TYPE.required("Required postal code"),
  });

export const PERSONAL_DETAILS_FORM_SCHEMA = () =>
  object({
    first_name: STRING_TYPE.required("Required first name"),
    last_name: STRING_TYPE.required("Required last name"),
    phone: STRING_TYPE.required("Required phone number"),
    job_designation: STRING_TYPE.required("Job is required"),
  });
