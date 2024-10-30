import { IAPIRequest } from "@/utils/interfaces/interfaces";
import axios, { AxiosError } from "axios";
// import { getCookie } from "cookies-next";

export const makeApiRequest = async (params: IAPIRequest) => {
  const { method, url, data, headers, serverToken, uploadProgress } = params;

  // const token = serverToken || getCookie("token"); // Assuming getCookie is defined

  const defaultHeaders = {
    "Content-Type": "application/json",
    // Authorization: token ? `Bearer ${token}` : undefined,
    ...headers,
  };

  const config = {
    method,
    maxBodyLength: Infinity,
    url,
    headers: defaultHeaders,
    data: data ? (params.formData ? data : JSON.stringify(data)) : undefined,
    ...uploadProgress,
  };

  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    const err = error as AxiosError;
    return { data: null, status: err.response?.status };
  }
};
