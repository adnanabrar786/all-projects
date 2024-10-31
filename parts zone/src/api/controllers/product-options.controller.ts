import asyncHandler from "@/api/handler/asyncHandler";
import { withValidation } from "@/api/handler/withValidation";
import {
  createProductOption,
  deleteProductOption,
  getProductOptionById,
  getProductOptions,
  getProductsByOptionId,
  getProductsNameAndCount,
  updateProductOption,
} from "@/api/service/product-option.service";
import { PRODUCT_OPTIONS_SCHEMA } from "@/config/schema-validators";
import {
  errorResponse,
  successResponse,
  successResponseWithData,
} from "@/helpers";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const getAllProductOptions: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const productOptions = await getProductOptions();
    return res.status(200).json(successResponseWithData("200", productOptions));
  }
);

export const getProductsFromOptions: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { q, page } = req.query;
    let queryData = "";
    if (q) {
      queryData = q as string;
    }

    const pageSize = 24;
    const options_id = Number(req.query.option_id);

    const products = await getProductsByOptionId(
      options_id,
      Number(page),
      pageSize
    );
    products?.hasNextPage;

    products?.hasNextPage;
    const result = {
      products: products?.products.map((i) => ({
        id: i.id,
        Products: {
          id: i.products.id,
          name: i.products.name,
          slug: i.products.slug,
          code: i.products.code,
          short_descriptilon: i.products.short_description,
          long_description: i.products.long_description,
          status: i.products.status,
          oem: i.products.oem,
          meta_keywords: i.products.meta_keywords,
          meta_description: i.products.meta_description,
          product_images: i.products.product_images.map((img) => ({
            url: img.url,
          })),
        },
      })),
      hasNextPage: products?.hasNextPage,
      hasPreviousPage: products?.hasPreviousPage,
      totalPages: products?.totalPages,
    };

    return res.status(200).json(successResponseWithData("200", result));
  }
);

export const createProductOptions = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const productOption = await createProductOption(req.body);

    if (!productOption)
      return res
        .status(404)
        .json(errorResponse("Error Creating ProductOption"));

    return res
      .status(201)
      .json(successResponseWithData("Created Successfully", productOption));
  }),
  PRODUCT_OPTIONS_SCHEMA()
);

export const getById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const productOptionId = Number(req.query.Id);
    const productOption = await getProductOptionById(productOptionId);
    if (!productOption) return res.status(404).json(errorResponse("Not Found"));

    return res
      .status(200)
      .json(successResponseWithData("ProductOption Data", productOption));
  }
);

export const getProductNameAndCount: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const parent_id = Number(req.query.parent_id);
      const result = await getProductsNameAndCount(parent_id);
      const dataArray: any = [];
      if (result) {
        const length = (result as any).length;
        for (let index = 0; index < length; index++) {
          const element = result[index];
          dataArray.push({
            ...element,
            count: Number(element.count),
          });
        }
        return res
          .status(200)
          .json(successResponseWithData("Products Name and Count", dataArray));
      }
    } catch (error) {
      console.error("Error fetching Products anme and count:", error);
    }
  }
);

export const update: NextApiHandler = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const productOptionId = Number(req.query.Id);
    const productOption = await updateProductOption(productOptionId, req.body);

    if (!productOption)
      return res
        .status(404)
        .json(errorResponse("Error While Updating ProductOption"));

    return res
      .status(200)
      .json(successResponseWithData("ProductOption Updated", productOption));
  }),
  PRODUCT_OPTIONS_SCHEMA()
);

export const deleteProductOptionById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const productOptionId = Number(req.query.Id);
    await deleteProductOption(productOptionId);

    return res
      .status(200)
      .json(successResponse("ProductOption Deleted Successfully"));
  }
);
