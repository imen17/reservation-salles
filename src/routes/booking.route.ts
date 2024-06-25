import { bookingSchema } from '../dto/bookings.dto.js';
import { Router } from 'express';
import { Routes } from '../interfaces/routes.interface.js';
import validationMiddleware from '../middlewares/validation.middleware.js';
import BookingsController from '../controllers/bookings.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

class BookingsRoute implements Routes {
  public path = '/bookings';
  public router = Router();
  public bookingsController = new BookingsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.bookingsController.getBookings);
    this.router.get(`${this.path}/:id`, this.bookingsController.getBookingById);
    this.router.post(`${this.path}/:roomId`, authMiddleware, validationMiddleware(bookingSchema, 'body'), this.bookingsController.createBooking);
    this.router.delete(`${this.path}/:id`, this.bookingsController.deleteBooking);
  }
}

export default BookingsRoute;
