import Express from 'express';
import BookingController from '../controllers/BookingController';
import AuthController from '../controllers/AuthController';

const BookingRouter = Express.Router({ caseSensitive: false });

BookingRouter.route('/')
  .get(AuthController.check, BookingController.getBookings)
  .post(AuthController.check, BookingController.addBookings);

export default BookingRouter;
