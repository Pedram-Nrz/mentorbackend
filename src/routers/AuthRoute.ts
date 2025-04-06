import Express from 'express';
import AuthController from '../controllers/AuthController';

const BookingRouter = Express.Router({ caseSensitive: false });

BookingRouter.route('/').post(AuthController.login);

export default BookingRouter;
