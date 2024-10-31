import asyncHandler from "@/api/handler/asyncHandler";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
} from "@/api/service/product.service";
import { withValidation } from "@/api/handler/withValidation";
import { PRODUCTS_SCHEMA } from "@/config/schema-validators";
import {
  errorResponse,
  successResponse,
  successResponseWithData,
} from "@/helpers";

export const getAllProducts: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const products = await getProducts();
    return res.status(200).json(successResponseWithData("200", products));
  }
);

export const createProducts = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const product = await createProduct(req.body);

    if (!product)
      return res.status(404).json(errorResponse("Error Creating Product"));

    return res
      .status(201)
      .json(successResponseWithData("Created Successfully", product));
  }),
  PRODUCTS_SCHEMA()
);

export const getById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const productId = Number(req.query.productId);
    const product = await getProductById(productId);
    if (!product) return res.status(404).json(errorResponse("Not Found"));

    return res
      .status(200)
      .json(successResponseWithData("Products Data", product));
  }
);

export const update: NextApiHandler = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const productId = Number(req.query.productId);
    const product = await updateProduct(productId, req.body);

    if (!product)
      return res
        .status(404)
        .json(errorResponse("Error While Updating Product"));

    return res
      .status(200)
      .json(successResponseWithData("Product Updated", product));
  }),
  PRODUCTS_SCHEMA()
);

export const deleteProductById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const productId = Number(req.query.productId);
    await deleteProduct(productId);

    return res
      .status(200)
      .json(successResponse("Product Deleted Successfully"));
  }
);
