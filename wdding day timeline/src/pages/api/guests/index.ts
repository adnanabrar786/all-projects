import prisma from 'config/prisma';
import { getUserIDFromJWT } from 'utils/token';
import { BaseController } from 'controller/base.controller';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;
  const baseController = new BaseController();
  const user_id = getUserIDFromJWT(headers.authorization || '');
  const wedding = await prisma.wedding.findUnique({
    where: {
      createdBy: user_id,
    },
  });

  if (!wedding) {
    return baseController.notFound(res, 'No wedding found');
  }

  switch (method) {
    case 'GET': {
      const guests = await prisma.guestsHasWedding.findMany({
        where: {
          wedding_id: wedding.id,
        },
        include: {
          GuestsHasCategories: {
            select: {
              category_id: true,
            },
          },
          Guests: true,
        },
      });
      const list = guests.map((item) => ({
        ...item,
        guest: item.Guests,
        categories: item.GuestsHasCategories.map((item) => item.category_id),
      }));
      return baseController.ok(res, { data: list });
    }

    default:
      res.setHeader('Allow', ['GET']);
      baseController.methodNotAllowed(res, `Method ${method} Not Allowed`);
  }
}
