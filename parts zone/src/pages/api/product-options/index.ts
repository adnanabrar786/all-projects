import {
  createProductOptions,
  getAllProductOptions,
  getProductNameAndCount,
  getProductsFromOptions,
} from "@/api/controllers/product-options.controller";
import { GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case GET:
      if (req.query.parent_id) {
        return await getProductNameAndCount(req, res);
      }
      if (req.query.option_id) {
        return await getProductsFromOptions(req, res);
      }
      return await getAllProductOptions(req, res);
    case POST:
      return await createProductOptions(req, res);
    default:
      res.setHeader("Allow", [GET, POST]);
      return res
        .status(MethodNotAllowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
