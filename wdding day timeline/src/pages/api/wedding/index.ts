import prisma from 'config/prisma';
import { getUserIDFromJWT } from 'utils/token';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BaseController } from 'controller/base.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;
  const baseController = new BaseController();
  const user_id = getUserIDFromJWT(headers.authorization || '');
  const wedding = await prisma.wedding.findUnique({
    where: {
      createdBy: user_id,
    },
    include: {
      Ceremony: true,
      Couple: true,
    },
  });

  if (!wedding) {
    return baseController.notFound(res, 'No wedding found');
  }

  let body = {
    data: {},
  };

  switch (method) {
    case 'GET':
      body = {
        data: {
          ...wedding,
          date: Number(wedding.date),
        },
      };

      if (!wedding.Ceremony) {
        baseController.ok(res, body);
        return;
      }

      return baseController.ok(res, {
        data: {
          ...body.data,
          Ceremony: {
            ...wedding.Ceremony,
            start_time: Number(wedding.Ceremony.start_time),
          },
        },
        error: false,
      });
    default:
      res.setHeader('Allow', ['GET']);
      baseController.methodNotAllowed(res, `Method ${method} Not Allowed`);
  }
}
