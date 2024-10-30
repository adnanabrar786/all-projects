import axios, { AxiosRequestConfig } from 'axios';
import { API_USER } from 'config/environment';
import { IUpdatePrimaryUserBody, IUpdateSecondaryUserBody, IUpdateUserProfilePicBody } from 'interfaces/user';
import { GetToken } from './token.service';

export default class AccountService {
  UpdatePrimaryUser = async (body: IUpdatePrimaryUserBody) => {
    const token = await GetToken();

    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${API_USER}/user/update-primary`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);

    return response;
  };

  UpdateSecondaryUser = async (body: IUpdateSecondaryUserBody) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${API_USER}/user/update-secondary`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);

    return response;
  };

  UpdateProfilePic = async (body: IUpdateUserProfilePicBody) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_USER}/user/profile-pic`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);

    return response;
  };
}
