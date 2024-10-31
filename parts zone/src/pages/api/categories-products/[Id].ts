import {
  deleteCategoriesProductById,
  getById,
  update,
} from "@/api/controllers/categories-product.controller";
import { DELETE, GET, PUT } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";
import type { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case GET:
      return await getById(req, res);
    case PUT:
      return await update(req, res);
    case DELETE:
      return await deleteCategoriesProductById(req, res);
    default:
      res.setHeader("Allow", [GET, PUT, DELETE]);
      return res
        .status(MethodNotAllowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
