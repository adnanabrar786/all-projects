import { IAPIRequest } from '@/interfaces/api';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const makeApiRequest = async <T = any>(params: IAPIRequest) => {
  const { method, url, data, headers, uploadProgress, timeout } = params;

  const token =
    typeof localStorage !== 'undefined' && localStorage.getItem('token') ? localStorage.getItem('token') : '';

  const defaultHeaders = {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : undefined,
    ...headers,
  };

  const config: AxiosRequestConfig = {
    method,
    maxBodyLength: Infinity,
    url,
    headers: defaultHeaders,
    timeout,
    data: data ? (params.formData ? data : JSON.stringify(data)) : undefined,
    ...uploadProgress,
  };

  try {
    const response = await axios.request<T>(config);
    return response;
  } catch (error: any) {
    const err = error as AxiosError;
    const data = err?.response?.data as any;

    throw data as { message: string };
  }
};
