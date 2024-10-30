import { prisma } from "@/config/prisma_config";

export const getCategories = async () => {
  try {
    return await prisma.categories.findMany({
      include: {
        categories: true,
        categories_products: true,
        parent: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMainCategoriesList = async () => {
  return await prisma.categories.findMany({
    where: {
      parent_id: null,
      status: true,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      picture: true,
      meta_keywords: true,
      meta_description: true,
    },
  });
};

export const getSubCategoriesList = (ids: number[]) => {
  return prisma.categories.findMany({
    where: {
      parent_id: { in: ids },
      status: true,
    },
    select: {
      id: true,
      parent_id: true,
      name: true,
      slug: true,
      picture: true,
    },
    orderBy: {
      parent: {
        sequence: "asc",
      },
    },
  });
};

export const getSubCategoriesListAndCount = (parent_id: number) => {
  return prisma.categories.findMany({
    where: {
      parent_id,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      sequence: true,
      categories_products: {
        select: {
          id: true,
        },
      },
    },
    orderBy: {
      sequence: "asc",
    },
  });
};

export const getCategoryInfo = async () => {
  return await prisma.$queryRaw`
    SELECT
      c2.id,
      c2.slug,
      c2.name,
      COUNT(cp.id) as count
    FROM
      "CategoriesProducts" cp
    LEFT JOIN "Categories" c ON cp.categories_id = c.id
    LEFT JOIN "Categories" c2 ON c.parent_id = c2.id
    WHERE
      c.parent_id IS NOT NULL
    GROUP BY
      c2.id,
      c2.slug,
      c2.name
    ORDER BY
      c2."sequence";
  `;
};

export const createCategory = async (data: any) => {
  try {
    return await prisma.categories.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCategoryById = async (id: number) => {
  try {
    return await prisma.categories.findFirst({
      where: {
        id,
      },
      include: {
        categories: true,
        categories_products: true,
        parent: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCategory = async (id: number, data: any) => {
  try {
    return await prisma.categories.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (id: number) => {
  try {
    return await prisma.categories.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
