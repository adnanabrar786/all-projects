import { AxiosError, AxiosResponse } from 'axios';

export interface IUseQueryConfig {
  onSuccess: (res: AxiosResponse) => void;
  onError?: (res: AxiosError) => void;
}
