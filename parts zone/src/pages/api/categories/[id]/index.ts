import {
  update,
  getById,
  deleteCategoryById,
} from "@/api/controllers/categoriess.controller";
import { DELETE, GET, PUT } from "@/config/api/methods";
import { sendMethodNotAllowedResponse } from "@/helpers";
import type { NextApiRequest, NextApiResponse } from "next";

const methodHandlers = {
  [GET]: getById,
  [PUT]: update,
  [DELETE]: deleteCategoryById,
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.method === "undefined") {
    return res.status(400).send("Bad Request: Method is undefined");
  }

  const handle = methodHandlers[req.method || ""];
  if (handle) {
    return await handle(req, res);
  }

  sendMethodNotAllowedResponse(res, req.method);
}

export default handler;
