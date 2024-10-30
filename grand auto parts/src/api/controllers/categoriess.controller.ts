import asyncHandler from "@/api/handler/asyncHandler";
import { withValidation } from "@/api/handler/withValidation";
import { CATEGORIES_SCHEMA } from "@/config/schema-validators";
import {
  errorResponse,
  successResponse,
  successResponseWithData,
} from "@/helpers";
import {
  getCategories,
  createCategory,
  deleteCategory,
  getCategoryById,
  updateCategory,
  getMainCategoriesList,
  getSubCategoriesList,
  getSubCategoriesListAndCount,
  getCategoryInfo,
} from "@/api/service/categories.service";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export const getAllCategories: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const categories = await getCategories();
    return res.status(200).json(successResponseWithData("200", categories));
  }
);

export const createCategories = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const category = await createCategory(req.body);

    if (!category)
      return res.status(404).json(errorResponse("Error Creating Categories"));

    return res
      .status(201)
      .json(successResponseWithData("Created Successfully", category));
  }),
  CATEGORIES_SCHEMA()
);

export const getById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryId = Number(req.query.Id);
    const category = await getCategoryById(categoryId);
    if (!category) return res.status(404).json(errorResponse("Not Found"));

    return res
      .status(200)
      .json(successResponseWithData("Category Data", category));
  }
);

export const getCategoriesWithSubCategories: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const mainCategories = await getMainCategoriesList();

      if (mainCategories.length) {
        mainCategories.sort((a, b) => a.id - b.id);
        const mainCategoriesIds = mainCategories!.map(
          (category) => category.id
        );
        const subCategories = await getSubCategoriesList(mainCategoriesIds);

        const subCategoriesMap = subCategories!.reduce((acc, subCategory) => {
          const parentId = subCategory.parent_id;
          if (!acc[parentId!]) {
            acc[parentId!] = [];
          }
          acc[parentId!].push(subCategory);
          return acc;
        }, {});

        const categoriesWithSubcategories = mainCategories!.map((category) => ({
          ...category,
          sub_categories: subCategoriesMap[category.id] || [],
        }));

        const response = {
          menu: categoriesWithSubcategories,
        };

        return res
          .status(200)
          .json(
            successResponseWithData("categories with sub categories", response)
          );
      } else {
        return res.status(404).json(errorResponse("No main categories found"));
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(errorResponse("Internal Server Error"));
    }
  }
);

export const subCategoryNameAndCount: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const parent_id = Number(req.query.parent_id);
      const result = await getSubCategoriesListAndCount(parent_id);

      if (result) {
        const dataArray = result.map((i) => ({
          id: i.id,
          name: i.name,
          slug: i.slug,
          sequence: i.sequence,
          count: i.categories_products.length,
        }));

        return res
          .status(200)
          .json(successResponseWithData("Sub Category Count", dataArray));
      }
    } catch (error) {
      console.error("Error fetching sub-category information:", error);
      return res.status(500).json(errorResponse("Internal Server Error"));
    }
  }
);
export const categoryNameAndCount: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const result = await getCategoryInfo();
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
          .json(successResponseWithData("Category Count", dataArray));
      }
    } catch (error) {
      console.error("Error fetching category information:", error);
    }
  }
);

export const update: NextApiHandler = withValidation(
  asyncHandler(async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryId = Number(req.query.Id);
    const category = await updateCategory(categoryId, req.body);

    if (!category)
      return res
        .status(404)
        .json(errorResponse("Error While Updating Category"));

    return res
      .status(200)
      .json(successResponseWithData("Category Updated", category));
  }),
  CATEGORIES_SCHEMA()
);

export const deleteCategoryById: NextApiHandler = asyncHandler(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const categoryId = Number(req.query.Id);
    await deleteCategory(categoryId);

    return res
      .status(200)
      .json(successResponse("Category Deleted Successfully"));
  }
);
