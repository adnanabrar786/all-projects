import { NextApiRequest, NextApiResponse } from "next";
import { GET, POST } from "@/config/api/methods";
import { MethodNotAllowed } from "@/config/api/responses";
import {
  createProductImages,
  getAllProductImages,
} from "@/api/controllers/product-images.controller";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case GET:
      return await getAllProductImages(req, res);
    case POST:
      return await createProductImages(req, res);
    default:
      res.setHeader("Allow", [GET, POST]);
      return res
        .status(MethodNotAllowed)
        .end(`Method ${req.method} Not Allowed`);
  }
}

export default handler;
