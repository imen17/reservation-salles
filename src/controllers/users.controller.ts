import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '../dto/users.dto.js';
import UserService from '../services/users.service.js';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';


class UsersController {
  public userService = new UserService();

  public getUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const allUsers = await this.userService.findAllUser();
      response.status(StatusCodes.OK).json({ data: allUsers });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = await this.userService.findUserById(request.params.id);
      response.status(StatusCodes.OK).json({ data: user });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = request.body;
      const createdUser = await this.userService.createUser(userData);
      response.status(StatusCodes.CREATED).json({ data: createdUser, message: ReasonPhrases.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = request.body;
      const updatedUser = await this.userService.updateUser(request.params.id, userData);
      response.status(StatusCodes.OK).json({ data: updatedUser });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await this.userService.deleteUser(request.params.id);
      response.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
