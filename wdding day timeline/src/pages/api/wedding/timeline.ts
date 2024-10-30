import { DateTime } from 'luxon';
import prisma from 'config/prisma';
import { getUserIDFromJWT } from 'utils/token';
import type { NextApiRequest, NextApiResponse } from 'next';
import { BaseController } from 'controller/base.controller';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, headers } = req;
  const baseController = new BaseController();
  const user_id = getUserIDFromJWT(headers.authorization || '');

  switch (method) {
    case 'GET':
      try {
        const timeline = await prisma.timeline.findUniqueOrThrow({
          where: {
            createdBy: user_id,
          },
        });
        return baseController.ok(res, {
          data: timeline,
          error: false,
        });
      } catch (error) {
        baseController.notFound(res, 'Invalid timeline');
      }
    default:
      res.setHeader('Allow', ['GET']);
      baseController.methodNotAllowed(res, `Method ${method} Not Allowed`);
  }
}
