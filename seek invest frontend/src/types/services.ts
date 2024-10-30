import { AxiosError, AxiosResponse } from "axios";

export type TServiceResponse = [null | AxiosResponse, AxiosError | null];
