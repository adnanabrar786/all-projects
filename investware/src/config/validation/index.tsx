import { VALIDATOR_MESSAGE } from '@/constants/locales';
import { date, object, string } from 'yup';
import { regex_password_match } from './regex';
const STRING_TYPE = string();
const DATE_TYPE = date();

export const SIGN_UP_FORM_SCHEMA = () =>
  object({
    first_name: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_FIRST_NAME),
    last_name: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_LAST_NAME),
    email: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_EMAIL).email(VALIDATOR_MESSAGE.ENTER_VALID_EMAIL),
    password: string()
      .required(VALIDATOR_MESSAGE.REQUIRED_PASSWORD)
      .min(5, VALIDATOR_MESSAGE.PASSWORD_MUST_CONTAIN_FIVE_CHAR)
      .matches(regex_password_match, VALIDATOR_MESSAGE.PASSWORD_MUST_CONTAIN_NUMERIC_VALUE),
    confirm_password: string()
      .required(VALIDATOR_MESSAGE.REQUIRED_PASSWORD)
      .min(5, VALIDATOR_MESSAGE.PASSWORD_MUST_CONTAIN_FIVE_CHAR)
      .matches(regex_password_match, VALIDATOR_MESSAGE.PASSWORD_MUST_CONTAIN_NUMERIC_VALUE)
      .test(VALIDATOR_MESSAGE.PASSWORD_MATCH, VALIDATOR_MESSAGE.PASS_MUST_MATCH, function (value) {
        return this.parent.password === value;
      }),
  });

export const RESET_PASSWORD_SCHEMA = () =>
  object({
    otp: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_CODE),
    password: string()
      .required(VALIDATOR_MESSAGE.REQUIRED_PASSWORD)
      .min(5, VALIDATOR_MESSAGE.PASSWORD_MUST_CONTAIN_FIVE_CHAR)
      .matches(regex_password_match, VALIDATOR_MESSAGE.PASSWORD_MUST_CONTAIN_NUMERIC_VALUE),
    confirm_password: string()
      .required(VALIDATOR_MESSAGE.REQUIRED_PASSWORD)
      .min(5, VALIDATOR_MESSAGE.PASSWORD_MUST_CONTAIN_FIVE_CHAR)
      .matches(regex_password_match, VALIDATOR_MESSAGE.PASSWORD_MUST_CONTAIN_NUMERIC_VALUE)
      .test(VALIDATOR_MESSAGE.PASSWORD_MATCH, VALIDATOR_MESSAGE.PASS_MUST_MATCH, function (value) {
        return this.parent.password === value;
      }),
  });

export const FORGET_PASSWORD_SCHEMA = () =>
  object({
    email: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_EMAIL).email(VALIDATOR_MESSAGE.ENTER_VALID_EMAIL),
  });

export const VERIFICATION_CODE_SCHEMA = () =>
  object({
    veriyfy_code: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_CODE),
  });

export const LOG_IN_FORM_SCHEMA = () =>
  object({
    email: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_EMAIL).email(VALIDATOR_MESSAGE.ENTER_VALID_EMAIL),
    password: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_PASSWORD),
  });

export const EDIT_FORM_SCHEMA = () =>
  object({
    first_name: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_FIRST_NAME),
    last_name: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_LAST_NAME),
    company_name: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_COMPANY_NAME),
  });

export const CHANGE_PASSWORD_SCHEMA = () =>
  object({
    old_password: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_PASSWORD),
    new_password: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_PASSWORD),
    confirm_password: STRING_TYPE.required(VALIDATOR_MESSAGE.REQUIRED_PASSWORD),
  });

export const TRADE_SCHEMA = () =>
  object({
    security_type: STRING_TYPE.required('Security type is required'),
    maturity_date: DATE_TYPE.required('Maturity Date is required'),
    price_yield: STRING_TYPE.required('Price/yield is required'),
    settle_date: DATE_TYPE.required('Settle Date is required'),
    par: STRING_TYPE.required('Par is required'),
  });
