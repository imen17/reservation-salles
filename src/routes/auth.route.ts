import AuthController from '../controllers/auth.controller.js';
import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { registerUserSchema, userSchema } from '../dto/users.dto.js';

class AuthRoute implements Routes {
  public path = '/';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}register`, validationMiddleware(registerUserSchema, 'body'), this.authController.register);
    this.router.post(`${this.path}login`, validationMiddleware(userSchema, 'body'), this.authController.logIn);
    this.router.get(`${this.path}logout`, authMiddleware, this.authController.logOut);
  }
}

export default AuthRoute;
