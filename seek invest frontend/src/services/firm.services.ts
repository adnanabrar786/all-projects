import { AxiosError } from "axios";
import {
  FIRM_AVAILABILITY,
  GET_FIRM,
  GET_FIRM_UN_AUTH,
  UPDATE_FIRM_BY_ID,
} from "constants/api.routes";
import { ICompanyFormik } from "interfaces/company";
import { TServiceResponse } from "types/services";
import { makeApiRequest } from "./servicesHelper";

type TCheckFirmAvailability = {
  available: boolean;
};

export const checkFirmAvailability = async (name: string) => {
  try {
    const data = await makeApiRequest<TCheckFirmAvailability>({
      method: "post",
      url: FIRM_AVAILABILITY,
      data: {
        name: name.trim(),
      },
    });
    return data;
  } catch (error) {
    const err = error as Error;
    return err.message;
  }
};

export const updateFirmById = async (
  companyData: ICompanyFormik,
  logo: File | null,
  method: string
): Promise<TServiceResponse> => {
  const {
    name,
    phone,
    address_line1,
    address_line2,
    city,
    state,
    zip,
    job_designation,
  } = companyData;

  const data = new FormData();

  data.append("name", name);
  data.append("address_line1", address_line1);

  data.append("address_line2", address_line2 || "");

  data.append("city", city);
  data.append("phone", phone);
  data.append("state", state);
  data.append("zip", zip);
  if (job_designation) {
    data.append("job_designation", job_designation);
  }

  if (logo) {
    data.append("logo", logo);
  }

  try {
    const response = await makeApiRequest({
      method,
      url: UPDATE_FIRM_BY_ID,
      headers: { "content-type": "multipart/form-data" },
      formData: true,
      data: data,
    });

    return [response, null];
  } catch (error) {
    const err = error as AxiosError;
    return [null, err];
  }
};

export const getFirm = async (serverToken?: string) => {
  return makeApiRequest({ method: "get", url: GET_FIRM, serverToken });
};

export const getUnAuthFirm = async (firmId: string | null) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_FIRM_UN_AUTH}/${firmId}`,
  });
};
