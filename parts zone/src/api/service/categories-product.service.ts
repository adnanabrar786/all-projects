import { prisma } from "@/config/prisma_config";

export const getCategoriesProducts = async () => {
  try {
    return await prisma.categoriesProducts.findMany({});
  } catch (error) {
    console.log(error);
  }
};

export const createCategoryProduct = async (data: any) => {
  try {
    return await prisma.categoriesProducts.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryProductById = async (id: number) => {
  try {
    return await prisma.categoriesProducts.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductListFromCategories = async (
  category_id: number,
  queryData: string,
  page: number,
  pageSize: number
) => {
  try {
    const skip = (page - 1) * pageSize;
    const totalProductsCount = await prisma.categoriesProducts.count({
      where: {
        OR: [
          {
            categories_id: category_id,
          },
          {
            categories: {
              parent_id: category_id,
            },
          },
        ],
        Products: {
          name: {
            contains: queryData.toLowerCase(),
            mode: "insensitive",
          },
          status: true,
        },
      },
    });
    const totalPages = Math.ceil(totalProductsCount / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    const products = await prisma.categoriesProducts.findMany({
      select: {
        id: true,
        Products: {
          select: {
            id: true,
            name: true,
            slug: true,
            code: true,
            status: true,
            short_description: true,
            long_description: true,
            oem: true,
            meta_keywords: true,
            meta_description: true,
            product_images: {
              select: {
                url: true,
              },
            },
          },
        },
      },
      where: {
        OR: [
          {
            categories_id: category_id,
          },
          {
            categories: {
              parent_id: category_id,
            },
          },
        ],
        Products: {
          name: {
            contains: queryData.toLowerCase(),
            mode: "insensitive",
          },
          status: true,
        },
      },
      skip: skip,
      take: pageSize,
    });

    return {
      products,
      hasNextPage,
      hasPreviousPage,
      totalPages,
    };
  } catch (error) {
    console.log(error);
  }
};

export const updateCategoryProduct = async (id: number, data: any) => {
  try {
    return await prisma.categoriesProducts.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategoryProduct = async (id: number) => {
  try {
    return await prisma.categoriesProducts.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
