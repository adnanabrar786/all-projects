import { Response } from 'interfaces/response';
import { GOOGLE_API_KEY } from 'config/environment';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse<Response<string | object[]>>) {
  const { method, body } = req;

  switch (method) {
    case 'POST': {
      if (!body) {
        return res.status(400).json({
          data: 'body not found',
          error: true,
        });
      }
      const place_id = body.data.place_id;
      const axios = (await import('axios')).default;
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&key=${GOOGLE_API_KEY}`,
      );
      // Get data from your database
      res.status(200).json({
        data: data,
        error: false,
      });
      break;
    }
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
