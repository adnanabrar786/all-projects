import asyncHandler from "@/api/handler/asyncHandler";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withValidation } from "@/api/handler/withValidation";
import { CONTACT_US } from "@/config/schema-validators";
import {
  errorResponse,
  successResponse,
  successResponseWithData,
} from "@/helpers";
import {
  createNewFormEntry,
  deleteFormEntryById,
  getAllFormEntries,
} from "../service/contact-us.service";

export const getAllContactUsFormEntries: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const contactUsFormEntries = await getAllFormEntries();
    return res
      .status(200)
      .json(successResponseWithData("200", contactUsFormEntries));
  }
);

export const createContactUsFormEntry = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const contactFormEntry = await createNewFormEntry(req.body);

    if (!contactFormEntry)
      return res.status(404).json(errorResponse("Error Creating Product"));

    return res
      .status(201)
      .json(successResponseWithData("Created Successfully", contactFormEntry));
  }),
  CONTACT_US()
);

export const deleteContactUsFormEntry: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const id = String(req.query.id);

    await deleteFormEntryById(Number(id));
    return res.status(200).json(successResponse("Form Deleted Successfully"));
  }
);
