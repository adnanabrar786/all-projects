import { prisma } from "@/config/prisma_config";

export const getProductOptions = async () => {
  try {
    return await prisma.productOptions.findMany({});
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByOptionId = async (
  options_id: number,
  page: number,
  pageSize: number
) => {
  try {
    const skip = (page - 1) * pageSize;
    const products_count = await prisma.productOptions.count({
      where: {
        options_id,
        products: {
          status: true,
        },
      },
    });

    const result = await prisma.productOptions.findMany({
      where: {
        options_id,
        products: {
          status: true,
        },
      },
      select: {
        id: true,
        products: {
          select: {
            id: true,
            name: true,
            slug: true,
            code: true,
            meta_keywords: true,
            meta_description: true,
            status: true,
            oem: true,
            short_description: true,
            long_description: true,
            product_images: {
              select: {
                url: true,
              },
            },
          },
        },
      },
      skip: skip,
      take: pageSize,
    });

    const totalPages = Math.ceil(products_count / pageSize);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      products: result,
      hasNextPage,
      hasPreviousPage,
      totalPages,
    };
  } catch (error) {
    console.log(error);
  }
};

export const createProductOption = async (data: any) => {
  try {
    return await prisma.productOptions.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductOptionById = async (id: number) => {
  try {
    const productOptionsWithDetails = await prisma.productOptions.findMany({
      where: {
        options_id: id,
      },
      take: 30,
      include: {
        products: {
          select: {
            id: true,
            name: true,
            product_images: {
              select: {
                url: true,
              },
            },
            categories_products: {
              include: {
                categories: {
                  select: {
                    name: true,
                    parent: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const transformedData = productOptionsWithDetails.map((option) => {
      return {
        productId: option.products.id,
        productName: option.products.name,
        productImage: option.products.product_images[0].url,
        productOptionId: option.id,
        parentCategoryName:
          option.products.categories_products[0].categories.parent?.name,
        subCategoryName:
          option.products.categories_products.length > 0
            ? option.products.categories_products[0].categories.name
            : "No Category",
      };
    });

    return transformedData;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsNameAndCount = async (parent_id: number) => {
  return await prisma.$queryRaw`
    SELECT o.value, po.options_id, COUNT(p.id)
    FROM "ProductOptions" po
    LEFT JOIN "Products" p ON po.products_id = p.id
    LEFT JOIN "CategoriesProducts" cp ON cp.products_id = p.id
    LEFT JOIN "Categories" c ON cp.categories_id = c.id
    LEFT JOIN "Options" o ON po.options_id = o.id
    WHERE c.parent_id = ${parent_id}
    GROUP BY o.value, po.options_id;
  `;
};

export const updateProductOption = async (id: number, data: any) => {
  try {
    return await prisma.productOptions.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductOption = async (id: number) => {
  try {
    return await prisma.productOptions.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
