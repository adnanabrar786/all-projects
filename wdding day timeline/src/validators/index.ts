import * as yup from 'yup';
import { object, string as YupString } from 'yup';
const STRING_TYPE = yup.string();
const YUP_ARRAY = yup.array();

export function LOGIN_FORM_SCHEMA() {
  return object({
    email: YupString().email('PLEASE ENTER A VALID EMAIL ADDRESS').required('Required'),
    password: STRING_TYPE.required('Required').min(8, 'Password must be 8 characters'),
  });
}

export function FORGET_PASSWORD_FORM_SCHEMA() {
  return object({
    email: YupString().email('PLEASE ENTER A VALID EMAIL ADDRESS').required('Required'),
  });
}

export function SIGNUP_FORM_SCHEMA() {
  return object({
    first_name: YupString().required('Required').max(20, 'Name must be less than 20 characters'),
    last_name: YupString().required('Required').max(20, 'Name must be less than 20 characters'),
    username: YupString().email('PLEASE ENTER A VALID EMAIL ADDRESS').required('Required'),
    password: STRING_TYPE.required('Required').min(8, 'Password must be 8 characters'),
    confirm_password: STRING_TYPE.required('Required').oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
}
export function RESET_PASSWORD_FORM_SCHEMA() {
  return object({
    code: STRING_TYPE.required('Required').min(6, 'Code must be 6 characters'),
    password: STRING_TYPE.required('Required').min(8, 'Password must be 8 characters'),
    confirm_password: STRING_TYPE.required('Required').oneOf([yup.ref('password'), null], 'Passwords must match'),
  });
}

export function EditVendorModalValidator() {
  return object({
    full_name: YupString().required('Required').max(50, 'Name must be less than 50 characters'),
    vendorTypes: YUP_ARRAY.min(1, 'Select at least one vendor type').required('required'),
  });
}

export const WeddingTimeValidation = () =>
  yup.object({
    minutes: STRING_TYPE.required('REQUIRED MINUTES'),
    clock: STRING_TYPE.required('REQUIRED HOURS'),
    zone: STRING_TYPE.required('REQUIRED ZONE'),
  });

export const AddEventValidate = () => {
  return yup.object({
    event_name: STRING_TYPE.required('Required'),
    clock: STRING_TYPE.required('Required'),
    minutes: STRING_TYPE.required('Required'),
    zone: STRING_TYPE.required('Required'),
  });
};

export const EditEventValidate = () => {
  return yup.object({
    event_name: STRING_TYPE.required('Required'),
    clock: STRING_TYPE.required('Required'),
    minutes: STRING_TYPE.required('Required'),
    zone: STRING_TYPE.required('Required'),
    duration: STRING_TYPE.required('Required'),
  });
};

export const PersonalInfoValidation = () =>
  yup.object({
    first_name: STRING_TYPE.required('REQUIRED FIRST NAME'),
    email: STRING_TYPE.required('REQUIRED EMAIL').email('PLEASE ENTER A VALID EMAIL ADDRESS'),
  });

export const ChangePasswordValidation = () =>
  yup.object({
    password: STRING_TYPE.required('REQUIRED PASSWORD').min(8, 'ENTER VALID PASSWORD'),
    new_password: STRING_TYPE.required('REQUIRED PASSWORD').min(8, 'ENTER VALID PASSWORD'),
    confirm_password: STRING_TYPE.required('REQUIRED CONFIRM PASSWORD').oneOf(
      [yup.ref('new_password'), null],
      'Passwords must match',
    ),
  });

export const FianceInfoValidation = () =>
  yup.object({
    fiance_first_name: STRING_TYPE.required('REQUIRED FIANCE FIRST NAME'),
    // fiance_email: STRING_TYPE.email('PLEASE ENTER A VALID EMAIL ADDRESS'),
  });

export const newOnboardingForm = object({
  first_name: STRING_TYPE.required('Please enter Your First Name'),
  fiance_first_name: STRING_TYPE.required('Please enter Fiancé(e)’s First Name'),
  email: STRING_TYPE.required('Please enter a valid Email Address').email('Please enter a valid Email Address'),
});

export const brideGroom = object({
  primary: STRING_TYPE.required('Please select an option for yourself.'),
  secondary: STRING_TYPE.required('Please select an option for your fiancé(e).'),
});
