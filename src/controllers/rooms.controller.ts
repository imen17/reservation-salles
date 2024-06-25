import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { CreateRoomDto, UpdateRoomDto } from '../dto/rooms.dto.js';
import RoomService from '../services/rooms.service.js';

class RoomsController {
  public roomService = new RoomService();

  public getRooms = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const allRooms = await this.roomService.findAllRooms();
      response.status(StatusCodes.OK).json({ data: allRooms });
    } catch (error) {
      next(error);
    }
  };

  public getRoomById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const room = await this.roomService.findRoomById(request.params.id);
      response.status(StatusCodes.OK).json({ data: room });
    } catch (error) {
      next(error);
    }
  };

  public createRoom = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const roomDto: CreateRoomDto = request.body;
      const createdRoom = await this.roomService.createRoom(roomDto);
      response.status(StatusCodes.CREATED).json({ data: createdRoom, message: ReasonPhrases.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public updateRoom = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const roomDto: UpdateRoomDto = request.body;
      const updatedRoom = await this.roomService.updateRoom(request.params.id, roomDto);
      response.status(StatusCodes.OK).json({ data: updatedRoom });
    } catch (error) {
      next(error);
    }
  };

  public deleteRoom = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await this.roomService.deleteRoom(request.params.id);
      response.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  };
}

export default RoomsController;
