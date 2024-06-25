import { BookingDTO } from '../dto/bookings.dto.js';
import { HttpException } from '../exceptions/HttpException.js';
import { StatusCodes } from 'http-status-codes';
import bookingModel from '../models/bookings.model.js';

class BookingService {
  public bookings = bookingModel;

  public async findAllBookings() {
    const bookings = await this.bookings.find();
    return bookings;
  }

  public async findBookingById(bookingId: string) {
    const existingBooking = await this.bookings.findOne({ _id: bookingId });
    if (!existingBooking) throw new HttpException(StatusCodes.NOT_FOUND, "Booking doesn't exist");
    return existingBooking;
  }

  public async createBooking(userId: string, roomId: string, bookingData: BookingDTO) {
    const createdbooking = await this.bookings.create({ ...bookingData, userId, roomId });
    return createdbooking;
  }

  public async deleteBooking(bookingId: string) {
    await this.bookings.findByIdAndDelete(bookingId);
  }

  public async getBookingsByRoomId(roomId: string, { bookingStart, bookingEnd }: { bookingEnd: Date; bookingStart: Date }) {
    const bookings = await this.bookings.find({ bookingStart: { $gte: bookingStart, $lte: bookingEnd } });
    return bookings;
  }
}

export default BookingService;
