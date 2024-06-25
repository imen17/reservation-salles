import { CreateRoomDto, UpdateRoomDto } from '../dto/rooms.dto.js';
import { HttpException } from '../exceptions/HttpException.js';
import { StatusCodes } from 'http-status-codes';
import roomModel from '../models/rooms.model.js';

class RoomService {
  public rooms = roomModel;

  public async findAllRooms() {
    const rooms = await this.rooms.find();
    return rooms;
  }

  public async findRoomById(roomId: string) {
    const existingRoom = await this.rooms.findOne({ _id: roomId });
    if (!existingRoom) throw new HttpException(StatusCodes.NOT_FOUND, "Room doesn't exist");
    return existingRoom;
  }

  public async createRoom(roomData: CreateRoomDto) {
    const createdroom = await this.rooms.create(roomData);
    return createdroom;
  }

  public async updateRoom(roomId: string, roomData: UpdateRoomDto) {
    const existingRoom = await this.findRoomById(roomId);
    existingRoom.updateOne(roomData);
    const updatedRoom = await existingRoom.save();
    return updatedRoom;
  }

  public async deleteRoom(roomId: string) {
    await this.rooms.findByIdAndDelete(roomId);
  }
}

export default RoomService;
