import { HttpException } from '../exceptions/HttpException.js';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import { z, ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';

function validationMiddleware(schema: z.ZodType, value: 'body' | 'query' | 'params' = 'body'): RequestHandler {
  return (request: Request, response: Response, next: NextFunction) => {
    try {
      const result = schema.parse(request[value]);
      console.log(`Validation result:$\n${JSON.stringify(result, null, 2)}`);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue: z.ZodIssue) => {
          return {
            path: `${issue.path.join('.')}`,
            message: issue.message,
          };
        });

        next(new HttpException(StatusCodes.BAD_REQUEST, 'Invalid data', errorMessages));
      } else {
        next(new HttpException());
      }
    }
  };
}

export default validationMiddleware;
