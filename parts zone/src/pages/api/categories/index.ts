import { NextApiRequest, NextApiResponse } from "next";
import { GET, POST } from "@/config/api/methods";
import {
  getAllCategories,
  createCategories,
  getCategoriesWithSubCategories,
  subCategoryNameAndCount,
  categoryNameAndCount,
} from "@/api/controllers/categoriess.controller";
import { sendMethodNotAllowedResponse } from "@/helpers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.method === "undefined") {
    return res.status(400).send("Bad Request: Method is undefined");
  }

  switch (req.method) {
    case GET:
      return await handleGetRequest(req, res);
    case POST:
      return await createCategories(req, res);
    default:
      return sendMethodNotAllowedResponse(res, req.method);
  }
}

function handleGetRequest(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  switch (query.name) {
    case "sub-category":
      return subCategoryNameAndCount(req, res);
    case "categories":
      return categoryNameAndCount(req, res);
    case "menuitems":
      return getCategoriesWithSubCategories(req, res);
    default:
      return getAllCategories(req, res);
  }
}

export default handler;
