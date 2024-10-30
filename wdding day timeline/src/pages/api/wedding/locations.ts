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
        const wedding = await prisma.wedding.findUniqueOrThrow({
          include: {
            Ceremony: true,
            Reception: true,
            GettingReady: true,
            FirstLook: true,
            Photography: true,
            SpecialFirstLookPhotos: true,
          },
          where: {
            createdBy: user_id,
          },
        });
        const ceremony = wedding.Ceremony;
        const reception = wedding.Reception;
        const getting_ready = wedding.GettingReady;
        const first_look = wedding.FirstLook;
        const photographyPhotos = wedding.Photography;
        const special_first_look_photos = wedding.SpecialFirstLookPhotos;

        return baseController.ok(res, {
          data: [
            {
              title: 'Ceremony',
              data: ceremony
                ? {
                    ...ceremony,
                    start_time: Number(ceremony.start_time),
                  }
                : null,
            },
            {
              title: 'Reception',
              data: reception
                ? {
                    ...reception,
                    end_time: Number(reception.end_time),
                    start_time: Number(reception.start_time),
                  }
                : null,
            },
            {
              title: 'Getting Ready',
              data: getting_ready,
            },
            {
              title: 'First Look',
              data: first_look,
            },
            {
              title: 'Photography',
              data: photographyPhotos,
            },
            {
              title: 'Special First Look Photos',
              data: special_first_look_photos,
            },
          ],
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
