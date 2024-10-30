import { Auth } from 'aws-amplify';
import { API_STRIPE } from 'config/environment';
import axios, { AxiosRequestConfig } from 'axios';
import { IAuthSignUpForm } from 'interfaces/forms';
import {
  ICognitoUser,
  ICognitoError,
  ISignInResult,
  ISignUpResult,
  IResetPasswordResult,
  IRequestPasswordCodeResult,
} from 'interfaces/auth';

export const SignIn = async (username: string, password: string): Promise<ISignInResult> => {
  try {
    const data = await Auth.signIn(username.toLowerCase(), password);
    return { data };
  } catch (error) {
    const _error = error as ICognitoError;
    return { error: _error };
  }
};

export const SignUp = async (user: IAuthSignUpForm): Promise<ISignUpResult> => {
  try {
    const data = await Auth.signUp({
      username: user.username.toLowerCase(),
      password: user.password,
      attributes: {
        email: user.username.toLowerCase(),
        name: user.first_name,
        family_name: user.last_name,
      },
    });
    return {
      userConfirmed: data.userConfirmed,
      data: {
        user: data.user as unknown as ICognitoUser,
        userConfirmed: data.userConfirmed,
        userSub: data.userSub,
      },
      userSub: data.userSub,
    };
  } catch (error) {
    const _error = error as ICognitoError;
    return { error: _error };
  }
};

export const RequestForgotPasswordCode = async (email: string): Promise<IRequestPasswordCodeResult> => {
  try {
    const data = await Auth.forgotPassword(email.toLowerCase());
    return { data };
  } catch (error) {
    const err = error as Error;
    throw new Error(err.message);
  }
};

export const ResetPassword = async (
  email: string,
  authCode: string,
  password: string,
): Promise<IResetPasswordResult> => {
  try {
    await Auth.forgotPasswordSubmit(email.toLowerCase(), authCode, password);
    return { data: true };
  } catch (error) {
    const _error = error as ICognitoError;
    return { error: _error };
  }
};

export const ChangePassword = async (oldPassword: string, newPassword: string): Promise<IResetPasswordResult> => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    await Auth.changePassword(user, oldPassword, newPassword);
    return { data: true };
  } catch (error) {
    const _error = error as ICognitoError;
    return { error: _error };
  }
};

export const ResendTemporaryPassword = async (email: string) => {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `${API_STRIPE}/auth/resend-temporary-password?email=${encodeURIComponent(email)}`,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios(config);
};
