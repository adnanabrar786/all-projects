import {
  ARCHIVE_CLIENT,
  ARCHIVE_CLIENTS,
  CLIENTS_BULK_CONFIRM,
  CLIENTS_BULK_UPLOAD,
  CREATE_CLIENT,
  GET_CLIENTS_LIST,
  GET_CLIENTS_OVERVIEW,
  GET_CLIENT_ASSESSMENTS,
  GET_CLIENT_BY_ID,
  GET_CLIENT_DETAILS_OVERVIEW,
  GET_CLIENT_FILTER,
  GET_CLIENT_FINANCIAL_GOALS,
  GET_CLIENT_RISK_PERSONA_OVERVIEW,
  GET_CLIENT_SUMMARY,
  GET_CLIENT_VALUES_PERSONA_OVERVIEW,
  GET_CLIENT_VIEW_RESULT,
  GET_SECURITIES_AVI,
  UPDATE_ACCOUNT_DETAIL,
  UPDATE_CLIENT,
  UPDATE_CLIENT_ASSESSMENT,
} from "constants/api.routes";
import {
  IBulkConfirm,
  ISecuritiesDetail,
  IUpdateClient,
} from "interfaces/client";
import { Dispatch, SetStateAction } from "react";
import { makeApiRequest } from "./servicesHelper";

export const getClientsList = async ({
  page = 1,
  name = "",
  filters,
  sortBy,
  sortByKey,
}: {
  page: number;
  name: string;
  filters: string;
  sortBy?: string;
  sortByKey?: string;
}) => {
  let base_url = `${GET_CLIENTS_LIST}/v2?page=${page}`;

  if (name) {
    base_url += `&name=${name}`;
  }

  if (sortByKey) {
    base_url += `&${sortByKey}=${sortBy}`;
  }

  if (filters) {
    base_url += `&filters=${filters}`;
  }

  return makeApiRequest({
    method: "get",
    url: base_url,
  });
};

export const getClientsOverview = async () => {
  return makeApiRequest({ method: "get", url: GET_CLIENTS_OVERVIEW });
};

export const createClient = async ({
  email,
  first_name,
  last_name,
  phone,
  link,
}: IUpdateClient) => {
  return makeApiRequest({
    method: "post",
    url: CREATE_CLIENT,
    data: {
      email,
      first_name,
      last_name,
      phone,
      link,
    },
  });
};

export const updateClient = async ({
  email,
  first_name,
  last_name,
  phone,
  clientId,
  link,
}: IUpdateClient) => {
  return makeApiRequest({
    method: "put",
    url: `${UPDATE_CLIENT}/${clientId}`,
    data: {
      email,
      first_name,
      last_name,
      phone,
      link,
    },
  });
};

export const clientsBulkUpload = async (
  file: File | null,
  columnsState: IBulkConfirm[]
) => {
  const data = new FormData();

  if (file) {
    data.append("file", file);
    data.append("first_name", columnsState[0].value);
    data.append("last_name", columnsState[1].value);
    data.append("email", columnsState[2].value);
    if (columnsState[3]) {
      data.append("phone_number", columnsState[3].value);
    }
  }

  return makeApiRequest({
    method: "post",
    url: CLIENTS_BULK_UPLOAD,
    headers: { "content-type": "multipart/form-data" },
    formData: true,
    data,
  });
};

export const clientsBulkConfirm = async (
  file: File | null,
  setProgressBar: Dispatch<SetStateAction<number>>
) => {
  const data = new FormData();

  if (file) {
    data.append("file", file);
  }

  const uploadProgress = {
    onUploadProgress: (e: any) => {
      const { loaded, total } = e;

      const uploadProgress = (loaded / total) * 100;
      setProgressBar(uploadProgress);
    },
  };

  return makeApiRequest({
    method: "post",
    url: CLIENTS_BULK_CONFIRM,
    headers: { "content-type": "multipart/form-data" },
    formData: true,
    data,
    uploadProgress,
  });
};

export const archiveClient = async (clientId: string) => {
  const response = await makeApiRequest({
    method: "delete",
    url: `${ARCHIVE_CLIENT}/${clientId}`,
  });
  return response.data;
};

export const updateClientDetail = async (account_id: string, data: any) => {
  const response = await makeApiRequest({
    method: "put",
    url: UPDATE_ACCOUNT_DETAIL(account_id),
    data,
  });
  return response.data;
};

export const getClientById = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_CLIENT_BY_ID}/${clientId}`,
  });
};

export const getClientSummary = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_SUMMARY(clientId),
  });
};

export const getSecuritiesAvi = (search_term: string) => {
  return makeApiRequest<ISecuritiesDetail[]>({
    method: "post",
    timeout: 15000,
    url: GET_SECURITIES_AVI,
    data: { search_term },
  });
};

export const getClientDetailsOverview = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_DETAILS_OVERVIEW(clientId),
  });
};

export const getClientFinancialGoals = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_FINANCIAL_GOALS(clientId),
  });
};

export const getClientViewResult = (clientId: string, fhaId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_VIEW_RESULT(clientId, fhaId),
  });
};

export const getClientAssessments = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_ASSESSMENTS(clientId),
  });
};

export const getClientValuesPersonaOverview = async (
  clientId: string,
  accountType: string,
  proposal_id?: string
) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_VALUES_PERSONA_OVERVIEW(clientId, accountType, proposal_id),
  });
};

export const getClientRiskPersonaOverview = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_RISK_PERSONA_OVERVIEW(clientId),
  });
};

export const getClientFilter = async () => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_FILTER,
  });
};

export const archiveClients = async (client_ids?: string[]) => {
  const response = await makeApiRequest({
    method: "post",
    url: ARCHIVE_CLIENTS,
    data: { client_ids },
  });
  return response;
};

export const updateClientAssessment = async (fha_id) => {
  return makeApiRequest({
    method: "patch",
    url: UPDATE_CLIENT_ASSESSMENT(fha_id),
  });
};
