import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpException } from '../exceptions/HttpException.js';
import { RequestWithUser } from '../interfaces/auth.interface.js';
import userModel from '../models/users.model.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const authMiddleware = async (request: RequestWithUser, response: Response, next: NextFunction) => {
  try {
    const jwtCookie = request.cookies['jwt'];
    if (!jwtCookie) throw new HttpException(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED);
    const secretKey = 'secretKey'; // TODO ADD
    const { _id } = verify(jwtCookie, secretKey) as { _id: string };
    const existingUser = await userModel.findById(_id);
    if (!existingUser) throw new HttpException(StatusCodes.UNAUTHORIZED, 'Invalid Token');
    request.user = existingUser;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
