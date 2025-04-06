import CatchAsync from '../utils/CatchAsync';
import ErrorHandler from '../utils/ErrorHandler';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Booking } from '../definitions/Booking';
import { addBooking, getBookings } from '../services/BookingService';

const __dirFile = fileURLToPath(import.meta.url);
const __dirName = dirname(__dirFile);

export default {
  getBookings: CatchAsync(async (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler('Unathorized access request. Please log in first.', 401));
    }
    const mentorsFilePath = join(__dirName, '../data/bookings.json');
    const allBookings: Booking[] = await getBookings(mentorsFilePath);

    if (!allBookings) {
      return next(new ErrorHandler('Something went wrong getting bookings', 400));
    }
    return res.status(200).json({
      status: 'success',
      length: allBookings?.length || 0,
      data: { bookings: allBookings },
    });
  }),
  addBookings: CatchAsync(async (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler('Unathorized access request. Please log in first.', 401));
    }

    const bookingData = req?.body;

    if (!bookingData || !bookingData?.manteeId || !bookingData?.mentorId || !bookingData?.service) {
      return next(new ErrorHandler('Invalid create booking request.', 401));
    }

    if (!bookingData?.service?.title || !bookingData?.service?.duration || !bookingData?.service?.price) {
      return next(new ErrorHandler('Invalid create booking request.', 401));
    }

    const { manteeId, mentorId, service } = bookingData;

    const mentorsFilePath = join(__dirName, '../data/bookings.json');
    const updatedBookings: Booking[] = await addBooking(mentorsFilePath, {
      id: Date.now(),
      menteeId: manteeId,
      mentorId: mentorId,
      service: service,
    });

    if (!updatedBookings) {
      return next(new ErrorHandler('Something went wrong creating bookings', 400));
    }
    return res.status(201).json({
      status: 'success',
      length: updatedBookings?.length || 0,
      data: { bookings: updatedBookings },
    });
  }),
};
