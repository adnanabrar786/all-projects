import { UnAuthorizedException } from "@/Errors/UnAuthorizedException";
import { getUserIDFromJWT } from "@/utils/string";
import * as yup from "yup";

const withValidation =
  <T>(schema: yup.Schema<object>) =>
  (handler: (body: T, user: string) => Promise<any>): any => {
    return async (req: Request, object: any) => {
      const requestHeaders = new Headers(req.headers);
      const accessTokenFromHeader = requestHeaders.get("authorization");

      let userID = null;
      if (accessTokenFromHeader) {
        userID = getUserIDFromJWT(accessTokenFromHeader);
      }

      const body = (await req.json()) as T;
      await schema.validate(body, { abortEarly: false });
      if (!userID) throw new UnAuthorizedException();
      // If validation succeeds, call the original handler function
      return handler(body, userID);
    };
  };

export default withValidation;
