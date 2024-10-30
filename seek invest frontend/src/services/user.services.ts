import { AxiosError } from "axios";
import {
  ALL_STRIPE_PRODUCTS,
  SEARCH_CLIENT_BY_NAME,
  SUBSCRIPTION,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_PICTURE,
  USER_BILL,
  USER_PROFILE,
} from "constants/api.routes";
import { IUser } from "interfaces/user";
import { TServiceResponse } from "types/services";
import { makeApiRequest } from "./servicesHelper";

export const getUser = async () => {
  return makeApiRequest<{ data: IUser; error: boolean }>({
    method: "get",
    url: USER_PROFILE,
  });
};

export const updateUser = async (
  firstName: string,
  lastName: string,
  phoneNumber: string,
  profile_image: File | null,
  email?: string,
  job_designation?: string
): Promise<TServiceResponse> => {
  const data = new FormData();
  data.append("firstName", firstName);
  data.append("lastName", lastName);
  data.append("phoneNumber", phoneNumber);

  if (email) {
    data.append("email", email);
  }

  if (profile_image) {
    data.append("profile", profile_image);
  }

  data.append("job_designation", job_designation || "");

  try {
    const response = await makeApiRequest({
      method: "put",
      url: UPDATE_USER_PROFILE,
      headers: { "content-type": "multipart/form-data" },
      formData: true,
      data: data,
    });

    return [response, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};

export const updateProfilePic = async (profile_image: File | null) => {
  const data = new FormData();

  if (!profile_image) {
    return;
  }

  data.append("profile", profile_image);

  return makeApiRequest({
    method: "put",
    url: UPDATE_USER_PROFILE_PICTURE,
    data: data,
    headers: { "content-type": "multipart/form-data" },
    formData: true,
  });
};

export const subscription = async () => {
  return makeApiRequest({
    method: "get",
    url: SUBSCRIPTION,
  });
};

export const userBill = async (id: string) => {
  try {
    const billData = await makeApiRequest({
      method: "post",
      data: { id },
      url: USER_BILL,
    });

    if (billData.data && billData.data.data.url) {
      window.location.href = billData.data.data.url;
    }
  } catch (error) {
    console.error("Error fetching or redirecting to the Stripe page:", error);
  }
};

export const allStripeProducts = async (serverToken?: string) => {
  const billData = await makeApiRequest({
    method: "get",
    url: ALL_STRIPE_PRODUCTS,
    serverToken,
  });

  return billData;
};

export const searchClientByName = async (
  name: string,
  householdId?: string
) => {
  let url = `${SEARCH_CLIENT_BY_NAME}?name=${name}`;

  if (householdId) {
    url += `&household_id=${householdId}`;
  }

  const billData = await makeApiRequest({
    method: "get",
    url,
  });

  return billData;
};
