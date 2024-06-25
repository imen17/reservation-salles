import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, RegisterUserDto } from '../dto/users.dto.js';
import { RequestWithUser } from '../interfaces/auth.interface.js';
import AuthService from '../services/auth.service.js';
import { StatusCodes } from 'http-status-codes';

class AuthController {
  public authService = new AuthService();

  public register = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userData: RegisterUserDto = request.body;
      const newUser = await this.authService.register(userData);
      response.status(201).json({ data: newUser, message: 'Account created.' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = request.body;
      const {
        jsonWebToken: { expiresIn, token },
        existingUser: user,
      } = await this.authService.login(userData);

      response.cookie('jwt', token, { maxAge: expiresIn * 1000, httpOnly: true, secure: true });
      response.status(StatusCodes.OK).json({ data: user, message: 'Logged in' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      response.cookie('jwt', '', { maxAge: 0, httpOnly: true, secure: true });
      response.status(StatusCodes.OK).json({ message: 'Logged out' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
