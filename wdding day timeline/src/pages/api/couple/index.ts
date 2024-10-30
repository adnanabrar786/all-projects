import prisma from 'config/prisma';
import { getUserIDFromJWT } from 'utils/token';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BaseController } from 'controller/base.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;
  const baseController = new BaseController();
  const user_id = getUserIDFromJWT(headers.authorization || '');
  const couples = await prisma.couple.findMany({
    where: {
      createdBy: user_id,
    },
    include: {
      Users: true,
      Wedding: true,
      Category: true,
    },
  });

  if (!couples.length) {
    return baseController.notFound(res, 'No couples found');
  }

  switch (method) {
    case 'GET': {
      const list = couples.map(({ Wedding, ...rest }) => ({
        ...rest,
        user: rest.Users,
        category: rest.Category,
        wedding: {
          ...Wedding,
          date: Number(Wedding.date),
        },
      }));
      return baseController.ok(res, { data: list });
    }

    default:
      res.setHeader('Allow', ['GET']);
      baseController.methodNotAllowed(res, `Method ${method} Not Allowed`);
  }
}
