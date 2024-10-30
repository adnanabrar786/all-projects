import { BASE_URL } from "@/config/environments";
import axios, { AxiosRequestConfig } from "axios";

export const GetUserProfile = async (token?: string) => {
  const config: AxiosRequestConfig = {
    method: "get",
    url: `${BASE_URL}/v1/user/profile`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config);
  return response;
};

export const updateUserProfile = async (
  first_name: string,
  last_name: string,
  token: string,
  user_image: string,
) => {
  let data = {
    data: {
      first_name,
      last_name,
      user_image,
    },
  };

  const config: AxiosRequestConfig = {
    method: "put",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/v1/user/profile`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: data,
  };
  const response = await axios(config);
  return response.data;
};

export const premiumUser = async (token: string) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}/v1/checkout-session`,
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios(config);
  return response.data;
};
