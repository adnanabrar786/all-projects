import axios, { AxiosRequestConfig } from 'axios';
import { ICreateVendorBody, IDeleteVendorBody, IUpdateVendorBody } from 'interfaces/vendor';
import { GetToken } from 'services/token.service';
import { API_VENDOR } from '../config/environment';

export default class VendorService {
  GetVendors = async () => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `/api/vendors`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const response = await axios(config);
    return response;
  };

  CreateVendor = async (body: ICreateVendorBody) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${API_VENDOR}/create-vendors`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };

  UpdateVendor = async (body: IUpdateVendorBody) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'PUT',
      url: `${API_VENDOR}/update-vendors`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };

  DeleteVendor = async (body: IDeleteVendorBody) => {
    const token = await GetToken();
    const config: AxiosRequestConfig = {
      method: 'delete',
      url: `${API_VENDOR}/delete-vendors`,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: body,
    };
    const response = await axios(config);
    return response;
  };
}
