import { NotFoundException } from "../Errors/NotFoundException";
import dbConnect from "../lib/database/dbConnect";
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_CODE,
  VALIDATION_ERROR_CODE,
} from "../utils/http";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

type AsyncHandler = (body: any, object?: any) => Promise<any>;

export const withHandler =
  (handler: AsyncHandler) => async (body: Request, object?: any) => {
    try {
      await dbConnect();
      const data = await handler(body, object);
      return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
      if (err instanceof NotFoundException) {
        return NextResponse.json(
          { error: err.message },
          { status: NOT_FOUND_CODE }
        );
      }

      // Handle validation errors
      if (err instanceof ValidationError) {
        const validationErrors = err.inner.reduce(
          (acc: any, err: ValidationError) => {
            acc[err.path as string] = err.message;
            return acc;
          },
          {}
        );
        return NextResponse.json(validationErrors, {
          status: VALIDATION_ERROR_CODE,
        });
      }

      return NextResponse.json(
        { error: err.message },
        { status: INTERNAL_SERVER_ERROR }
      );
    }
  };
