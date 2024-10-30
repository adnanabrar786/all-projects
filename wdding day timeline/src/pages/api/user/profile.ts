import prisma from 'config/prisma';
import { Users } from '@prisma/client';
import { getUserIDFromJWT } from 'utils/token';
import { Response } from 'interfaces/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Users>>) {
  const { method, headers } = req;
  const id = getUserIDFromJWT(headers.authorization || '');
  const user = await prisma.users.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return res.status(404).json({ data: { message: 'No user found' }, error: true });
  }

  switch (method) {
    case 'GET':
      res.status(200).json({
        data: user,
        error: false,
      });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
