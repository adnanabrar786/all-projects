import { prisma } from "@/config/prisma_config";

export const getProductImages = async () => {
  try {
    return await prisma.productImages.findMany({});
  } catch (error) {
    console.log(error);
  }
};

export const createProductImage = async (data: any) => {
  try {
    return await prisma.productImages.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProductImageById = async (id: number) => {
  try {
    return await prisma.productImages.findFirst({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProductImage = async (id: number, data: any) => {
  try {
    return await prisma.productImages.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductImage = async (id: number) => {
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
