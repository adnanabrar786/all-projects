import { NextApiRequest, NextApiResponse } from "next";
import { DELETE, GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";
import {
  createContactUsFormEntry,
  deleteContactUsFormEntry,
  getAllContactUsFormEntries,
} from "@/api/controllers/contact-us.controller";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case GET:
      return await getAllContactUsFormEntries(req, res);
    case POST:
      return await createContactUsFormEntry(req, res);
    case DELETE:
      return await deleteContactUsFormEntry(req, res);
    default:
      res.setHeader("Allow", [GET, POST, DELETE]);
      return res
        .status(MethodNotAllowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
