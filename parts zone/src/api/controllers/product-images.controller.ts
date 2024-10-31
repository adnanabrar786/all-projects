import asyncHandler from "@/api/handler/asyncHandler";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { withValidation } from "@/api/handler/withValidation";
import { PRODUCT_IMAGES } from "@/config/schema-validators";
import {
  errorResponse,
  successResponse,
  successResponseWithData,
} from "@/helpers";
import {
  createProductImage,
  deleteProductImage,
  getProductImageById,
  getProductImages,
  updateProductImage,
} from "@/api/service/product-image.service";

export const getAllProductImages: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const products = await getProductImages();
    return res.status(200).json(successResponseWithData("200", products));
  }
);

export const createProductImages = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const product = await createProductImage(req.body);

    if (!product)
      return res.status(404).json(errorResponse("Error Creating Product"));

    return res
      .status(201)
      .json(successResponseWithData("Created Successfully", product));
  }),
  PRODUCT_IMAGES()
);

export const getById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Id = Number(req.query.Id);
    const productImage = await getProductImageById(Id);
    if (!productImage) return res.status(404).json(errorResponse("Not Found"));

    return res
      .status(200)
      .json(successResponseWithData("ProductImage Data", productImage));
  }
);

export const update: NextApiHandler = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const Id = Number(req.query.Id);
    const productImage = await updateProductImage(Id, req.body);

    if (!productImage)
      return res
        .status(404)
        .json(errorResponse("Error While Updating ProductImage"));

    return res
      .status(200)
      .json(successResponseWithData("ProductImage Updated", productImage));
  }),
  PRODUCT_IMAGES()
);

export const deleteProductImageById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const Id = Number(req.query.Id);
    await deleteProductImage(Id);

    return res
      .status(200)
      .json(successResponse("Product Deleted Successfully"));
  }
);
