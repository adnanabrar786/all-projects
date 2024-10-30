import { BadRequestException } from "@/Errors/BadRequestException";
import { NotFoundException } from "@/Errors/NotFoundException";
import { ValidationException } from "@/Errors/ValidationException";
// // import dbConnect from '@/lib/database/dbConnect';
import {
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND_CODE,
  VALIDATION_ERROR_CODE,
} from "@/utils/http";
import { NextResponse } from "next/server";
import { ValidationError } from "yup";

type AsyncHandler = (body: any, object?: any) => Promise<any>;

export const withHandler =
  (handler: AsyncHandler) => async (body: Request, object?: any) => {
    try {
      const data = await handler(body, object);
      return NextResponse.json(data, { status: 200 });
    } catch (err: any) {
      if (err instanceof BadRequestException) {
        return NextResponse.json(
          { error: err.message },
          { status: BAD_REQUEST },
        );
      }
      if (err instanceof ValidationException) {
        return NextResponse.json(
          { error: err.message },
          { status: VALIDATION_ERROR_CODE },
        );
      }

      if (err instanceof NotFoundException) {
        return NextResponse.json(
          { error: err.message },
          { status: NOT_FOUND_CODE },
        );
      }

      // Handle validation errors
      if (err instanceof ValidationError) {
        const validationErrors = err.inner.reduce(
          (acc: any, err: ValidationError) => {
            acc[err.path as string] = err.message;
            return acc;
          },
          {},
        );
        return NextResponse.json(validationErrors, {
          status: VALIDATION_ERROR_CODE,
        });
      }

      return NextResponse.json(
        { error: err.message },
        { status: INTERNAL_SERVER_ERROR },
      );
    }
  };
