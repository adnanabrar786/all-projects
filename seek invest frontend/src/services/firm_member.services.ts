import { AxiosError } from "axios";
import {
  CREATE_FIRM_MEMBER,
  DELETE_FIRM_MEMBER,
  GET_FIRM_MEMBERS,
  SET_FIRM_MEMBER_PASSWORD,
  UPDATE_FIRM_MEMBER_ROLE,
} from "constants/api.routes";
import { TServiceResponse } from "types/services";
import { makeApiRequest } from "./servicesHelper";

export const getFirmMembers = async () => {
  return makeApiRequest({ method: "get", url: GET_FIRM_MEMBERS });
};

export const createFirmMember = async (
  email: string,
  role: string,
  firm_id?: string
) => {
  return makeApiRequest({
    method: "post",
    url: CREATE_FIRM_MEMBER,
    data: { email, firm_id, role },
  });
};

export const updateFirmMember = async (id: string, role: string) => {
  return makeApiRequest({
    method: "patch",
    url: UPDATE_FIRM_MEMBER_ROLE,
    data: { id, role },
  });
};

export const setFirmMemberPassword = async (
  newPassword: string,
  confirmPassword: string,
  id: string
): Promise<TServiceResponse> => {
  try {
    const response = await makeApiRequest({
      method: "post",
      url: SET_FIRM_MEMBER_PASSWORD,
      data: { id, newPassword, confirmPassword },
    });
    return [response, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};

export const deleteFirmMember = async (id: string) => {
  return makeApiRequest({
    method: "delete",
    url: `${DELETE_FIRM_MEMBER}/${id}`,
  });
};
