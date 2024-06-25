import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { BookingDTO } from '../dto/bookings.dto.js';
import BookingService from '../services/bookings.service.js';
import { RequestWithUser } from '../interfaces/auth.interface.js';
import { HttpException } from '../exceptions/HttpException.js';

class Bookings {
  public bookingService = new BookingService();

  public getBookings = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const allBookings = await this.bookingService.findAllBookings();
      response.status(StatusCodes.OK).json({ data: allBookings });
    } catch (error) {
      next(error);
    }
  };

  public getBookingById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const booking = await this.bookingService.findBookingById(request.params.id);
      response.status(StatusCodes.OK).json({ data: booking });
    } catch (error) {
      next(error);
    }
  };

  public createBooking = async (request: RequestWithUser, response: Response, next: NextFunction) => {
    try {
      const user = request.user!;
      const roomId = request.params.roomId;
      const bookingDto: BookingDTO = request.body;
      const existingBookings = await this.bookingService.getBookingsByRoomId(roomId, {
        bookingEnd: bookingDto.bookingEnd,
        bookingStart: bookingDto.bookingStart,
      });
      if (existingBookings.length > 0) throw new HttpException(StatusCodes.CONFLICT, 'Room is already booked at that time');
      const createdBooking = await this.bookingService.createBooking(user._id, roomId, bookingDto);
      response.status(StatusCodes.CREATED).json({ data: createdBooking, message: ReasonPhrases.CREATED });
    } catch (error) {
      next(error);
    }
  };

  public deleteBooking = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await this.bookingService.deleteBooking(request.params.id);
      response.sendStatus(StatusCodes.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  };
}

export default Bookings;
