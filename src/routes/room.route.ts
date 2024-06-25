import { createRoomSchema, updateRoomSchema } from '../dto/rooms.dto.js';
import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import RoomsController from '../controllers/rooms.controller.js';

class RoomsRoute implements Routes {
  public path = '/rooms';
  public router = Router();
  public roomsController = new RoomsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.roomsController.getRooms);
    this.router.get(`${this.path}/:id`, this.roomsController.getRoomById);
    this.router.post(`${this.path}`, validationMiddleware(createRoomSchema, 'body'), this.roomsController.createRoom);
    this.router.put(`${this.path}/:id`, validationMiddleware(updateRoomSchema, 'body'), this.roomsController.updateRoom);
    this.router.delete(`${this.path}/:id`, this.roomsController.deleteRoom);
  }
}

export default RoomsRoute;
