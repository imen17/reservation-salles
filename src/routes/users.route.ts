import UsersController from '../controllers/users.controller.js';
import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import { userSchema, updateUserSchema } from '../dto/users.dto.js';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
    this.router.get(`${this.path}/:id`, this.usersController.getUserById);
    this.router.post(`${this.path}`, validationMiddleware(userSchema, 'body'), this.usersController.createUser);
    this.router.put(`${this.path}/:id`, validationMiddleware(updateUserSchema, 'body'), this.usersController.updateUser);
    this.router.delete(`${this.path}/:id`, this.usersController.deleteUser);
  }
}

export default UsersRoute;
