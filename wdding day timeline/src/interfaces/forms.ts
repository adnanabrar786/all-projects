export interface IAuthLoginForm {
  email: string;
  password: string;
}

export interface IAuthSignUpForm {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  confirm_password: string;
  attributes: {
    email: string;
  };
}

export interface IAuthForgetPasswordForm {
  email: string;
}

export interface IAuthResetPasswordForm {
  code: string;
  password: string;
  confirm_password: string;
}
export interface IPersonalInfoForm {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
}

export interface IChangePasswordForm {
  password: string;
  new_password: string;
  confirm_password: string;
}

export interface IFianceInfoForm {
  fiance_first_name: string;
  fiance_last_name: string;
  fiance_email: string;
  fiance_number: string;
  picture: string;
}
export interface IBaseFormProps {
  id: number;
}

export interface IDropdown extends IBaseFormProps {
  label: string;
}

export interface IRadioButton extends IBaseFormProps {
  label: string;
  img?: string;
}
