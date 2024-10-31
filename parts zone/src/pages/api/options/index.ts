import { NextApiRequest, NextApiResponse } from "next";
import { GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";
import {
  createOptions,
  getAllOptions,
} from "@/api/controllers/options.controller";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case GET:
      return await getAllOptions(req, res);
    case POST:
      return await createOptions(req, res);
    default:
      res.setHeader("Allow", [GET, POST]);
      return res
        .status(MethodNotAllowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
