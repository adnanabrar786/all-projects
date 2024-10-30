import {
  CREATE_NEW_MODEL,
  GET_MODELS,
  MODELS_BULK_CREATE,
  MODELS_BULK_REVIEW,
} from "constants/api.routes";
import { makeApiRequest } from "./servicesHelper";

export const getAllModelNames = async () => {
  return makeApiRequest({
    method: "get",
    url: GET_MODELS,
  });
};

export const createNewModel = async (
  name: string,
  tickers: { ticker: string; description: string; percentage: number }[]
) => {
  const response = await makeApiRequest({
    method: "post",
    data: {
      name,
      tickers,
    },
    url: CREATE_NEW_MODEL,
  });

  if (response.data) {
    return response.data;
  } else {
    return { data: null };
  }
};

export const getAllModel = async (page: number) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_MODELS}?page=${page}`,
  });
};

export const getSingleModel = async (modeId: string) => {
  return makeApiRequest({
    method: "get",
    url: `${GET_MODELS}/${modeId}`,
  });
};

export const deleteModelById = async (modelId: string) => {
  return makeApiRequest({
    method: "delete",
    url: `${GET_MODELS}/${modelId}`,
  });
};

export const updateModel = async (
  name: string,
  tickers: { ticker: string; description: string; percentage: number }[],
  modelId: string
) => {
  const response = await makeApiRequest({
    method: "put",
    data: {
      name,
      tickers,
    },
    url: `${GET_MODELS}/${modelId}`,
  });

  if (response.data) {
    return response.data;
  } else {
    return { data: null };
  }
};

export const modelBulkReview = async (file: File | null) => {
  const data = new FormData();

  if (file) {
    data.append("file", file);
  }

  return makeApiRequest({
    method: "post",
    url: MODELS_BULK_REVIEW,
    headers: { "content-type": "multipart/form-data" },
    formData: true,
    data,
  });
};

export const bulkCreateModel = async (list) => {
  const response = await makeApiRequest({
    method: "post",
    data: { list },
    url: MODELS_BULK_CREATE,
  });

  if (response.data) {
    return response.data;
  } else {
    return { data: null };
  }
};
