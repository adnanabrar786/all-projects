import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_USER } from 'config/environment';
import { ICreateShareTimelineBody } from 'interfaces/sharetimeline';
import { IUpdatePrimaryUserBody, IUpdateSecondaryUserBody } from 'interfaces/user';
import { GetToken } from 'services/token.service';

export default class UserService {
  GetUserByEmail = async (email: string) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/api/user/${email}`,
    };
    const response = await axios(config);
    return response;
  };

  GetUserDetail = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/api/user/profile`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const response = await axios(config);
    return response;
  };
}

export const UpdatePrimaryUser = async (token: string, body: IUpdatePrimaryUserBody) => {
  let response: AxiosResponse | null = null;
  let err: AxiosError | null = null;
  try {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${API_USER}/user/update-primary`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    response = await axios(config);
  } catch (error) {
    err = error as AxiosError;
  }

  return {
    response,
    err,
  };
};

export const UpdateSecondaryUser = async (token: string, body: IUpdateSecondaryUserBody) => {
  let response: AxiosResponse | null = null;
  let err: AxiosError | null = null;
  try {
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${API_USER}/user/update-secondary`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    response = await axios(config);
  } catch (error) {
    err = error as AxiosError;
  }
  return {
    response,
    err,
  };
};

export async function shareTimeline(body: ICreateShareTimelineBody) {
  const token = await GetToken();
  const config: AxiosRequestConfig = {
    data: body,
    method: 'POST',
    url: `${API_USER}/user/share-timeline`,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
  };
  return axios(config);
}

export async function downloadTimelinePDF() {
  const token = await GetToken();
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: `${API_USER}/user/timeline-pdf`,
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/pdf',
    },
    responseType: 'blob',
  };
  return axios(config);
}
