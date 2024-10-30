import { GetToken } from './token.service';
import { API_WEDDING } from 'config/environment';
import axios, { AxiosRequestConfig } from 'axios';
import { ICreateWeddingCover } from 'interfaces/image';

export default class ImageService {
  CreateWeddingCover = async (body: ICreateWeddingCover) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_WEDDING}/wedding/cover`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
      },
      data: body,
    };
    const response = await axios(config);

    return response;
  };

  GetWeddingCover = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${API_WEDDING}/wedding`,
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
    const response = await axios(config);

    return response;
  };
}
