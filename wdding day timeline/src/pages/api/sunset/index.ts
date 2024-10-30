import prisma from 'config/prisma';
import { TEvent } from 'utils/types/timeline';
import { getUserIDFromJWT } from 'utils/token';
import { Response } from 'interfaces/response';
import { TIMELINE_EVENT_NAME } from 'utils/enums';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<Date>>) {
  const { method, headers } = req;
  if (!headers.authorization) {
    return res.status(404).json({ data: { message: 'Invalid Token' }, error: true });
  }

  const id = getUserIDFromJWT(headers.authorization || '');
  const wedding = await prisma.wedding.findFirst({
    include: {
      Timeline: true,
    },
    where: {
      createdBy: id,
    },
  });

  if (!wedding) {
    return res.status(404).json({ data: { message: 'No wedding found' }, error: true });
  }

  switch (method) {
    case 'GET':
      const timeline = wedding.Timeline?.timeline as TEvent[];
      const sunset = timeline.find((i) => i.event_name === TIMELINE_EVENT_NAME.SUNSET)!;

      return res.status(200).json({
        data: new Date(sunset.start_time * 1000),
        error: false,
      });
    default:
      res.setHeader('Allow', ['GET']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
