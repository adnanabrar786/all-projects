import { AxiosError } from "axios";
import {
  FORGET_PASSWORD,
  RESEND_VERIFICATION_EMAIL,
  SET_PASSWORD,
  SIGN_UP_BY_EMAIL,
  USER_LOGIN,
} from "constants/api.routes";
import { TServiceResponse } from "types/services";
import { makeApiRequest } from "./servicesHelper";

export const sendSignupLink = async (
  email: string
): Promise<TServiceResponse> => {
  try {
    const response = await makeApiRequest({
      method: "post",
      url: SIGN_UP_BY_EMAIL,
      data: { email },
    });

    return [response, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};

export const setPassword = async (
  newPassword: string,
  confirmPassword: string,
  id: string
): Promise<TServiceResponse> => {
  try {
    const response = await makeApiRequest({
      method: "post",
      url: SET_PASSWORD,
      data: { newPassword, confirmPassword, id },
    });

    return [response, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};

export const forgetPassword = async (email: string | null) => {
  return makeApiRequest({
    method: "post",
    url: FORGET_PASSWORD,
    data: { email },
  });
};

export const resendVerificationEmail = async (email: string) => {
  return makeApiRequest({
    method: "post",
    url: `${RESEND_VERIFICATION_EMAIL}/${email}`,
  });
};

export const userLogin = async (
  email: string,
  password: string
): Promise<TServiceResponse> => {
  try {
    const response = await makeApiRequest({
      method: "post",
      url: USER_LOGIN,
      data: { email, password },
    });
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};
