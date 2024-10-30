import { NextApiRequest, NextApiResponse } from "next";
import { GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";
import {
  createCategoriesProduct,
  getAllCategoriesProduct,
  getProductsFromCategories,
} from "@/api/controllers/categories-product.controller";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case GET:
      if (req.query.category_id) {
        return await getProductsFromCategories(req, res);
      }
      return await getAllCategoriesProduct(req, res);

    case POST:
      return await createCategoriesProduct(req, res);
    default:
      res.setHeader("Allow", [GET, POST]);
      return res
        .status(MethodNotAllowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
