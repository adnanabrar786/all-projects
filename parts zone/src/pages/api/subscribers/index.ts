import { NextApiRequest, NextApiResponse } from "next";
import { DELETE, GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";
import {
  createSubscriber,
  deleteSubscriber,
  getSubscribers,
} from "@/api/controllers/subscribers.controller";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case GET:
      return await getSubscribers(req, res);
    case POST:
      return await createSubscriber(req, res);
    case DELETE:
      return await deleteSubscriber(req, res);
    default:
      res.setHeader("Allow", [POST, DELETE]);
      return res
        .status(MethodNotAllowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
