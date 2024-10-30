import {
  ACCOUNT_BULK_UPLOAD,
  ACCOUNT_RISK_TARGET_SCORE,
  ACCOUNT_VALUE_ALIGNMENTS,
  ADD_ACCOUNT_HOLDING,
  ADD_CLIENT_ACCOUNT,
  BULK_VERIFY,
  COPY_ACCOUNT_TICKER_TO_JSON,
  COPY_ACCOUNT_TO_JSON,
  DELETE_CLIENT_ACCOUNT,
  GET_CLIENT_ACCOUNT_COUNT,
  GET_CLIENT_ACCOUNT_HOLDINGS_FILTER,
  GET_CLIENT_ACCOUNT_VALUES_CHART,
  GET_CLIENT_ACCOUNTS,
  GET_CLIENT_ACCOUNTS_NAME,
  GET_CLIENT_ACCOUNTS_RISK_ALIGNMENT,
  GET_HOLDING_REPORT,
  REMOVE_ACCOUNT_HOLDING,
  TOTAL_ACCOUNTS_VALUE,
  UPDATE_ACCOUNT_HOLDING_AMOUNT,
  UPDATE_ACCOUNT_NAME,
} from "constants/api.routes";
import { IClientAccountsRiskAlignmentSummary } from "interfaces/client";
import { Dispatch, SetStateAction } from "react";
import { invertFormattedNumber } from "utils/maths";
import { toastError } from "utils/toaster";
import { makeApiRequest } from "./servicesHelper";

export const getClientAccounts = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_CLIENT_ACCOUNTS}/${clientId}`,
  });
};

export const getClientAccountsName = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_ACCOUNTS_NAME(clientId),
  });
};

export const accountBulkUpload = async (
  file: File | null,
  clientId: string
) => {
  const data = new FormData();

  if (file) {
    data.append("file", file);
  }

  data.append("account_name", "account_name");
  data.append("amount", "amount");
  data.append("ticker", "ticker");

  return makeApiRequest({
    method: "post",
    url: ACCOUNT_BULK_UPLOAD(clientId),
    headers: { "content-type": "multipart/form-data" },
    formData: true,
    data,
  });
};

export const accountsBulkConfirm = async (
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
    url: BULK_VERIFY(),
    headers: { "content-type": "multipart/form-data" },
    formData: true,
    data,
    uploadProgress,
  });
};

export const addAccountHolding = async ({
  clientId,
  account_id,
  ticker,
  amount,
  description,
}: {
  clientId: string;
  account_id: string;
  ticker: string;
  amount: number;
  description?: string;
}) => {
  try {
    const response = await makeApiRequest({
      method: "post",
      url: `${ADD_ACCOUNT_HOLDING}/${clientId}`,
      data: {
        account_id,
        ticker,
        amount,
        description,
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.message) {
      toastError(error.message);
    }
  }
};

export const deleteAccountHolding = async ({
  account_id,
  ticker_id,
}: {
  account_id: string;
  ticker_id: string;
}) => {
  const response = await makeApiRequest({
    method: "delete",
    url: `${REMOVE_ACCOUNT_HOLDING}/${account_id}/${ticker_id}`,
  });

  return response.data;
};

export const updateAccountHoldingAmount = async (
  account_id: string,
  amount: number,
  ticker_id: string
) => {
  const response = await makeApiRequest({
    method: "patch",
    url: UPDATE_ACCOUNT_HOLDING_AMOUNT(account_id),
    data: {
      amount,
      ticker_id,
    },
  });
  return response.data;
};

export const addClientAccount = async (data: any) => {
  const response = await makeApiRequest({
    method: "post",
    url: ADD_CLIENT_ACCOUNT,
    data: data,
  });
  return response.data;
};

export const updateClientAccountName = async (
  account_id: string,
  name: string
) => {
  const response = await makeApiRequest({
    method: "patch",
    url: UPDATE_ACCOUNT_NAME(account_id),
    data: {
      name,
    },
  });
  return response.data;
};

export const getClientAccountsRiskAlignment = async (
  clientId: string,
  refresh = false
) => {
  return makeApiRequest<{
    data: IClientAccountsRiskAlignmentSummary;
    error: boolean;
    message: string;
  }>({
    method: "get",
    url: `${GET_CLIENT_ACCOUNTS_RISK_ALIGNMENT(clientId)}?refresh=${refresh}`,
  });
};

export const getClientAccountHoldingsFilter = async (
  accountId: string,
  topicName: string
) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_ACCOUNT_HOLDINGS_FILTER(accountId, topicName),
  });
};

export const getClientAccountCount = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_ACCOUNT_COUNT(clientId),
  });
};

export const deleteAccount = (accountId: string) => {
  return makeApiRequest({
    method: "delete",
    url: DELETE_CLIENT_ACCOUNT(accountId),
  });
};

export const copyAccountToJson = async (accountId: string, type: string) => {
  return makeApiRequest({
    method: "get",
    url: COPY_ACCOUNT_TO_JSON(accountId, type),
  });
};

export const totalAccountsValue = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: TOTAL_ACCOUNTS_VALUE(clientId),
  });
};

export const copyAccountTickerToJson = async (
  clientId: string,
  tickerId: string,
  tickerName: string,
  amount: string
) => {
  return makeApiRequest({
    method: "post",
    url: COPY_ACCOUNT_TICKER_TO_JSON(),
    data: {
      client_id: clientId,
      id: tickerId,
      ticker: tickerName,
      amount: Number(invertFormattedNumber(amount)),
    },
  });
};

export const accountValueAlignments = async (clientId: string) => {
  return makeApiRequest({
    method: "get",
    url: ACCOUNT_VALUE_ALIGNMENTS(clientId),
  });
};

export const accountRiskTargetScore = async (accountId: string) => {
  return makeApiRequest({
    method: "get",
    url: ACCOUNT_RISK_TARGET_SCORE(accountId),
  });
};

export const getHoldingReport = (accountId: string, holdingId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_HOLDING_REPORT(accountId, holdingId),
  });
};

export const getClientAccountValuesChart = async (accountId: string) => {
  return makeApiRequest({
    method: "get",
    url: GET_CLIENT_ACCOUNT_VALUES_CHART(accountId),
  });
};
