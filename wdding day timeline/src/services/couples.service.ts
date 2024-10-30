import axios, { AxiosRequestConfig } from 'axios';
import { GetToken } from 'services/token.service';

export default class CouplesService {
  GetCouple = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `/api/couple`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    return axios(config);
  };
}
