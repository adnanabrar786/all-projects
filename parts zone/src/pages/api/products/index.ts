import {
  createProducts,
  getAllProducts,
} from "@/api/controllers/products.controller";
import { NextApiRequest, NextApiResponse } from "next";
import { GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case GET:
      return await getAllProducts(req, res);
    case POST:
      return await createProducts(req, res);
    default:
      res.setHeader("Allow", [GET, POST]);
      return res
        .status(MethodNotAllowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
