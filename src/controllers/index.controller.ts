import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class IndexController {
  public index = (request: Request, response: Response, next: NextFunction) => {
    try {
      response.sendStatus(StatusCodes.OK);
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
