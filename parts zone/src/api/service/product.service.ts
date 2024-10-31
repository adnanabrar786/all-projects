import { prisma } from "@/config/prisma_config";

export const getProducts = async () => {
  try {
    return await prisma.products.findMany({
      include: {
        categories_products: true,
        product_options: true,
        product_images: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async (data: any) => {
  try {
    return await prisma.products.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (id: number) => {
  try {
    const product = await prisma.products.findFirst({
      where: { id },
      include: {
        categories_products: {
          include: {
            categories: {
              include: {
                parent: true,
              },
            },
          },
        },
        product_options: true,
        product_images: true,
      },
    });

    if (!product) return null;

    let parent_category;
    let category;
    if (product.categories_products && product.categories_products.length > 0) {
      const categoryData = product.categories_products[0].categories;
      category = categoryData.name;
      parent_category = categoryData.parent ? categoryData.parent.name : null;
    }

    const simplifiedProduct = {
      ...product,
      category,
      parent_category,
      categories_products: undefined,
    };

    const categoryId = product.categories_products[0]?.categories_id;
    const relatedProducts = await prisma.categoriesProducts.findMany({
      where: {
        categories_id: categoryId,
        NOT: { products_id: id },
      },
      take: 10,
      include: {
        Products: {
          select: {
            id: true,
            name: true,
            slug: true,
            status: true,
            sequence: true,
            code: true,
            meta_keywords: true,
            meta_description: true,
            short_description: true,
            long_description: true,
            created_at: true,
            updated_at: true,
            oem: true,
            product_images: true,
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

    const transformedRelatedProducts = relatedProducts.map((rp) => {
      const productData = rp.Products;
      const categoryInfo = productData.categories_products[0].categories;
      const relatedProductImage =
        productData.product_images.length > 0
          ? productData.product_images[0]
          : null;
      return {
        ...productData,
        category: categoryInfo.name,
        parent_category: categoryInfo.parent ? categoryInfo.parent.name : null,
        categories_products: undefined,
        product_image: relatedProductImage,
      };
    });

    return {
      product: simplifiedProduct,
      relatedProducts: transformedRelatedProducts,
    };

    // try {
    //   // Step 1: Find the product by ID
    //   const product = await prisma.products.findFirst({
    //     where: { id },
    //     include: {
    //       categories_products: {
    //         include: {
    //           categories: {
    //             include: {
    //               parent: true // Include parent category to get category and subcategory
    //             }
    //           }
    //         }
    //       },
    //       product_options: true,
    //       product_images: true,
    //     },
    //   });

    //   if (!product) return null; // If product is not found, return null

    //   // Step 2: Find other products in the same category, including category names
    //   const categoryId = product.categories_products[0]?.categories_id;
    //   const relatedProducts = await prisma.categoriesProducts.findMany({
    //     where: {
    //       categories_id: categoryId,
    //       NOT: { products_id: id }, // Exclude the original product
    //     },
    //     take: 5, // Limit to 5 related products
    //     include: {
    //       Products: {
    //         select: {
    //           id: true,
    //           name: true,
    //           slug: true,
    //           status: true,
    //           sequence: true,
    //           code: true,
    //           meta_keywords: true,
    //           meta_description: true,
    //           short_description: true,
    //           long_description: true,
    //           created_at: true,
    //           updated_at: true,
    //           oem: true,
    //           product_images: true, // Include product images here
    //           categories_products: {
    //             include: {
    //               categories: {
    //                 select: {
    //                   name: true, // Select category name
    //                   parent: {
    //                     select: {
    //                       name: true // Select parent category name for subcategory
    //                     }
    //                   }
    //                 }
    //               }
    //             }
    //           }
    //           // Add any other fields you need from the Products model
    //         }
    //       }
    //     },
    //   });

    //   // Transform the relatedProducts to only include the Products details, now including category information
    //   const transformedRelatedProducts = relatedProducts.map(rp => rp.Products);

    //   // Step 3: Return the product along with the transformed related products
    //   return { product, relatedProducts: transformedRelatedProducts };

    // try {
    //   const product = await prisma.products.findFirst({
    //     where: { id },
    //     include: {
    //       categories_products: true,
    //       product_options: true,
    //       product_images: true,
    //     },
    //   });

    //   if (!product) return null;

    //   const categoryId = product.categories_products[0]?.categories_id;
    //   const relatedProducts = await prisma.categoriesProducts.findMany({
    //     where: {
    //       categories_id: categoryId,
    //       NOT: { products_id: id },
    //     },
    //     take: 5,
    //     include: {
    //       Products: {
    //         select: {
    //           id: true,
    //           name: true,
    //           slug: true,
    //           status: true,
    //           sequence: true,
    //           code: true,
    //           meta_keywords: true,
    //           meta_description: true,
    //           short_description: true,
    //           long_description: true,
    //           created_at: true,
    //           updated_at: true,
    //           oem: true,
    //           product_images: true,
    //         }
    //       }
    //     },
    //   });

    //   const transformedRelatedProducts = relatedProducts.map(rp => rp.Products);

    //   return { product, relatedProducts: transformedRelatedProducts };

    // try {
    //   return await prisma.products.findFirst({
    //     where: {
    //       id,
    //     },
    //     include: {
    //       categories_products: true,
    //       product_options: true,
    //       product_images: true,
    //     },
    //   });
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (id: number, data: any) => {
  try {
    return await prisma.products.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: number) => {
  try {
    return await prisma.products.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
