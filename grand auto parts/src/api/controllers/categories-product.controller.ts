import asyncHandler from "@/api/handler/asyncHandler";
import { withValidation } from "@/api/handler/withValidation";
import {
  createCategoryProduct,
  deleteCategoryProduct,
  getCategoriesProducts,
  getCategoryProductById,
  getProductListFromCategories,
  updateCategoryProduct,
} from "@/api/service/categories-product.service";
import { CATEGORIES_PRODUCT_SCHEMA } from "@/config/schema-validators";
import {
  errorResponse,
  successResponse,
  successResponseWithData,
} from "@/helpers";
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const getAllCategoriesProduct: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const categoriesProducts = await getCategoriesProducts();
    return res
      .status(200)
      .json(successResponseWithData("200", categoriesProducts));
  }
);

export const getProductsFromCategories: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const category_id = Number(req.query.category_id);

    const { q, page } = req.query;
    let queryData = "";
    if (q) {
      queryData = q as string;
    }

    const pageSize = 24;
    if (!category_id) {
      return res
        .status(400)
        .json(errorResponse("Invalid parent_id or category_id"));
    }
    const result = await getProductListFromCategories(
      category_id,
      queryData,
      Number(page),
      pageSize
    );

    return res.status(200).json(successResponseWithData("200", result));
  }
);

export const createCategoriesProduct = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryProducts = await createCategoryProduct(req.body);

    if (!categoryProducts)
      return res
        .status(404)
        .json(errorResponse("Error Creating CategoryProducts"));

    return res
      .status(201)
      .json(successResponseWithData("Created Successfully", categoryProducts));
  }),
  CATEGORIES_PRODUCT_SCHEMA()
);

export const getById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryProductId = Number(req.query.Id);
    const categoryProducts = await getCategoryProductById(categoryProductId);
    if (!categoryProducts)
      return res.status(404).json(errorResponse("Not Found"));

    return res
      .status(200)
      .json(successResponseWithData("CategoryProducts Data", categoryProducts));
  }
);

export const update: NextApiHandler = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryProductId = Number(req.query.Id);
    const categoryProducts = await updateCategoryProduct(
      categoryProductId,
      req.body
    );

    if (!categoryProducts)
      return res
        .status(404)
        .json(errorResponse("Error While Updating CategoryProducts"));

    return res
      .status(200)
      .json(
        successResponseWithData("CategoryProducts Updated", categoryProducts)
      );
  }),
  CATEGORIES_PRODUCT_SCHEMA()
);

export const deleteCategoriesProductById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryProductId = Number(req.query.Id);
    await deleteCategoryProduct(categoryProductId);

    return res
      .status(200)
      .json(successResponse("CategoryProducts Deleted Successfully"));
  }
);
