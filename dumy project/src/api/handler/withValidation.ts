import { ICustomer } from "../interfaces/ICustomer";

const withValidation =
  (schema: any) =>
  (handler: (body: any, object: any) => Promise<any>): any => {
    return async (req: Request, object: any) => {
      const body = (await req.json()) as ICustomer;
      await schema.validate(body, { abortEarly: false });
      // If validation succeeds, call the original handler function
      return handler(body, object);
    };
  };

export default withValidation;
