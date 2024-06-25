import { HttpException } from '../exceptions/HttpException.js';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = ({ status, message, errors }: HttpException, request: Request, response: Response, next: NextFunction) => {
  try {
    response.status(status).json({ message, details: errors });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
