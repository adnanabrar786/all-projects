import { NextApiResponse } from 'next';

export class BaseController {
  public static jsonResponse(res: NextApiResponse, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: NextApiResponse, dto?: T) {
    if (dto) {
      res.setHeader('content-type', 'application/json');
      return res.status(200).json(dto);
    } else {
      return res.status(200);
    }
  }

  public created(res: NextApiResponse) {
    return res.status(201);
  }

  public clientError(res: NextApiResponse, message?: string) {
    return BaseController.jsonResponse(res, 400, message ? message : 'Unauthorized');
  }

  public unauthorized(res: NextApiResponse, message?: string) {
    return BaseController.jsonResponse(res, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired(res: NextApiResponse, message?: string) {
    return BaseController.jsonResponse(res, 402, message ? message : 'Payment required');
  }

  public forbidden(res: NextApiResponse, message?: string) {
    return BaseController.jsonResponse(res, 403, message ? message : 'Forbidden');
  }

  public notFound(res: NextApiResponse, message?: string) {
    return BaseController.jsonResponse(res, 404, message ? message : 'Not found');
  }

  public methodNotAllowed(res: NextApiResponse, message?: string) {
    BaseController.jsonResponse(res, 405, message ? message : 'Not Allowed');
  }

  public conflict(res: NextApiResponse, message?: string) {
    return BaseController.jsonResponse(res, 409, message ? message : 'Conflict');
  }

  public tooMany(res: NextApiResponse, message?: string) {
    return BaseController.jsonResponse(res, 429, message ? message : 'Too many requests');
  }

  public todo(res: NextApiResponse) {
    return BaseController.jsonResponse(res, 400, 'TODO');
  }

  public fail(res: NextApiResponse, error: Error | string) {
    return res.status(500).json({
      message: error.toString(),
    });
  }
}
