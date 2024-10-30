import * as Sentry from "@sentry/nextjs";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { IAPIRequest } from "interfaces/api";
import posthog from "posthog-js";

export const makeApiRequest = async <T = any>(params: IAPIRequest) => {
  const { method, url, data, headers, serverToken, uploadProgress, timeout } =
    params;

  const token =
    serverToken ||
    (typeof localStorage !== "undefined" && localStorage.getItem("token"))
      ? localStorage.getItem("token")
      : "";

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
    ...headers,
  };

  const config: AxiosRequestConfig = {
    method,
    maxBodyLength: Infinity,
    url,
    headers: defaultHeaders,
    timeout,
    data: data ? (params.formData ? data : JSON.stringify(data)) : undefined,
    ...uploadProgress,
  };

  try {
    const response = await axios.request<T>(config);
    return response;
  } catch (error: any) {
    Sentry.getCurrentScope().addAttachment({
      filename: "attachment.txt",
      data: JSON.stringify(config),
    });
    Sentry.captureException(error);
    Sentry.getCurrentScope().clearAttachments();

    if (error && error.response && error.response.status === 404) {
      posthog.capture(error.response.data.message, error);
      throw {
        status: error.response.status,
        message: error.response.data.message,
      };
    }
    if (error && error?.code === "ECONNABORTED") {
      posthog.capture("AVI Error", error);
      throw { message: "Scoring API didn't respond in 15 seconds." };
    } else {
      const err = error as AxiosError;
      const data = err.response ? err.response?.data : (err as any);
      posthog.capture(
        `Error ${data.message}` ? (data.message as string) : "error",
        error
      );
      throw data as { message: string };
    }
  }
};
