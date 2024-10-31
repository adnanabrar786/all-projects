import asyncHandler from "@/api/handler/asyncHandler";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withValidation } from "@/api/handler/withValidation";
import { OPTIONS_SCHEMA } from "@/config/schema-validators";
import {
  errorResponse,
  successResponse,
  successResponseWithData,
} from "@/helpers";
import {
  createOption,
  deleteOption,
  getOptionById,
  getOptions,
  updateOption,
} from "@/api/service/option.service";

export const getAllOptions: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const options = await getOptions();
    return res.status(200).json(successResponseWithData("200", options));
  }
);

export const createOptions = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const option = await createOption(req.body);

    if (!option)
      return res.status(404).json(errorResponse("Error Creating Option"));

    return res
      .status(201)
      .json(successResponseWithData("Created Successfully", option));
  }),
  OPTIONS_SCHEMA()
);

export const getById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const optionId = Number(req.query.optionId);
    const option = await getOptionById(optionId);
    if (!option) return res.status(404).json(errorResponse("Not Found"));

    return res
      .status(200)
      .json(successResponseWithData("Options Data", option));
  }
);

export const update: NextApiHandler = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const optionId = Number(req.query.optionId);
    const option = await updateOption(optionId, req.body);

    if (!option)
      return res.status(404).json(errorResponse("Error While Updating Option"));

    return res
      .status(200)
      .json(successResponseWithData("Option Updated", option));
  }),
  OPTIONS_SCHEMA()
);

export const deleteOptionById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const optionId = Number(req.query.optionId);
    const option = await deleteOption(optionId);

    if (!option)
      return res.status(404).json(errorResponse("Error While Deleting Option"));

    return res.status(200).json(successResponse("Option Deleted Successfully"));
  }
);
