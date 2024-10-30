import prisma from 'config/prisma';
import { Users } from '@prisma/client';
import { Response } from 'interfaces/response';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Users>>) {
  const { method, query } = req;
  if (!query.email) {
    return res.status(404).json({ data: { message: 'No Email Found' }, error: true });
  }
  const user = await prisma.users.findFirst({
    where: {
      email: String(query.email),
    },
  });

  if (!user) {
    return res.status(404).json({ data: { message: 'No user found' }, error: true });
  }

  switch (method) {
    case 'GET':
      res.status(200).json({
        data: user as any,
        error: false,
      });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
