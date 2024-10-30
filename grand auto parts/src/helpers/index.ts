import { NextApiResponse } from "next";
import { GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";

export const errorResponse = (error: string) => {
  return {
    hasError: true,
    error: error,
  };
};

export const errorResponseWithData = (message: string, error: object) => {
  return {
    hasError: true,
    message: message,
    error: error,
  };
};

export const successResponse = (message: string) => {
  return {
    hasError: false,
    message: message,
  };
};

export const successResponseWithData = (
  message: string | number,
  data: any
) => {
  return {
    hasError: false,
    message: message,
    data: data,
  };
};

export const sendMethodNotAllowedResponse = (
  res: NextApiResponse,
  method: string
) => {
  res.setHeader("Allow", [GET, POST]);
  res.status(MethodNotAllowed).end(`Method ${method} Not Allowed`);
};
