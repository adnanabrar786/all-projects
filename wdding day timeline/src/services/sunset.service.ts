import axios, { AxiosRequestConfig } from 'axios';
import { GetToken } from 'services/token.service';

export default class SunsetService {
  GetSunsetTime = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/api/sunset`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const response = await axios(config);
    return response;
  };
}
