import { prisma } from "@/config/prisma_config";

export const getOptions = async () => {
  try {
    return await prisma.options.findMany({
      include: {
        product_options: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createOption = async (data: any) => {
  try {
    return await prisma.options.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOptionById = async (id: number) => {
  try {
    return await prisma.options.findFirst({
      where: {
        id,
      },
      include: {
        product_options: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateOption = async (id: number, data: any) => {
  try {
    return await prisma.options.update({
      where: {
        id,
      },
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteOption = async (id: number) => {
  try {
    return await prisma.options.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
