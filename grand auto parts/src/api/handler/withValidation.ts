import { NextApiRequest, NextApiResponse } from "next";
import { errorResponse } from "@/helpers";

export const withValidation = (handler: Function, schema: any) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const requestData = req.body;

    try {
      await schema.validate(requestData, { abortEarly: false });
    } catch (error: any) {
      return res.status(400).json(errorResponse(error.message));
    }

    return handler(req, res);
  };
};
