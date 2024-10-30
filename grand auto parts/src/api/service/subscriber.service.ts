import { prisma } from "@/config/prisma_config";

export const getAllSubscribers = async () => {
  try {
    return await prisma.subscribers.findMany({});
  } catch (error) {
    console.log(error);
  }
};

export const getSubscriberByEmail = async (email: string) => {
  try {
    return await prisma.subscribers.findUnique({
      where: {
        email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const createNewSubscriber = async (data: any) => {
  try {
    return await prisma.subscribers.create({
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteSubscribersByEmail = async (email: string) => {
  try {
    return await prisma.subscribers.delete({
      where: {
        email: email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
