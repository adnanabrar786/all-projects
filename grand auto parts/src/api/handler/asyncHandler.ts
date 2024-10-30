import { INTERNAL_SERVER_ERROR_MESSAGE } from "@/config/api/error_message";
import { InternalServerError } from "@/config/api/responses";
import { errorResponse } from "@/helpers";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

type AsyncHandler = (
  req: NextApiRequest,
  res: NextApiResponse
) => Promise<void>;

const asyncHandler = (handler: AsyncHandler): NextApiHandler => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      res
        .status(InternalServerError)
        .json(errorResponse(INTERNAL_SERVER_ERROR_MESSAGE));
    }
  };
};

export default asyncHandler;
