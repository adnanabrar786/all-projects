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
      const vendors = await prisma.vendorsHasWedding.findMany({
        where: {
          wedding_id: wedding.id,
        },
        include: {
          VendorsHasCategories: {
            select: {
              category_id: true,
            },
          },
          Vendors: true,
        },
      });
      const list = vendors.map((item) => ({
        ...item,
        vendor: item.Vendors,
        categories: item.VendorsHasCategories.map((item) => item.category_id),
      }));
      return baseController.ok(res, { data: list });
    }

    default:
      res.setHeader('Allow', ['GET']);
      baseController.methodNotAllowed(res, `Method ${method} Not Allowed`);
  }
}
