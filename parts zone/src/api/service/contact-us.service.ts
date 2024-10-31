import { prisma } from "@/config/prisma_config";

export const getAllFormEntries = async () => {
  try {
    return await prisma.contactUs.findMany({});
  } catch (error) {
    console.log(error);
  }
};

export const getFormEntryById = async (id: number) => {
  try {
    return await prisma.contactUs.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNewFormEntry = async (data: any) => {
  try {
    return await prisma.contactUs.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFormEntryById = async (id: number) => {
  try {
    return await prisma.contactUs.delete({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
