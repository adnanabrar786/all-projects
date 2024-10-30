import asyncHandler from "@/api/handler/asyncHandler";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withValidation } from "@/api/handler/withValidation";
import { SUBSCRIBERS_EMAIL } from "@/config/schema-validators";
import {
  errorResponse,
  successResponse,
  successResponseWithData,
} from "@/helpers";
import {
  createNewSubscriber,
  deleteSubscribersByEmail,
  getAllSubscribers,
  getSubscriberByEmail,
} from "../service/subscriber.service";

export const getSubscribers: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const subscribers = await getAllSubscribers();
    return res.status(200).json(successResponseWithData("200", subscribers));
  }
);

export const createSubscriber = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const subscriberExists = await getSubscriberByEmail(req.body.email);

    if (subscriberExists) {
      return res.status(404).json(errorResponse("Already Subscribed"));
    }

    const subscriber = await createNewSubscriber(req.body);

    if (!subscriber)
      return res.status(404).json(errorResponse("Error Creating Subscriber"));

    return res
      .status(201)
      .json(successResponseWithData("Created Successfully", subscriber));
  }),
  SUBSCRIBERS_EMAIL()
);

export const deleteSubscriber: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const email = String(req.query.email);

    await deleteSubscribersByEmail(email);
    return res
      .status(200)
      .json(successResponse("Subscriber Deleted Successfully"));
  }
);
