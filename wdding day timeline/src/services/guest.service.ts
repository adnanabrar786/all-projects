import axios, { AxiosRequestConfig } from 'axios';
import { ICreateGuestBody, IDeleteGuestBody, IUpdateGuestBody } from 'interfaces/guests';
import { GetToken } from 'services/token.service';
import { API_GUEST } from '../config/environment';

export default class GuestService {
  GetGuests = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/api/guests`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const response = await axios(config);
    return response;
  };

  CreateGuest = async (body: ICreateGuestBody) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_GUEST}/create-guests`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };

  UpdateGuest = async (body: IUpdateGuestBody) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${API_GUEST}/update-guests`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };

  DeleteGuest = async (body: IDeleteGuestBody) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'delete',
      url: `${API_GUEST}/delete-guests`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };
}
