import CatchAsync from '../utils/CatchAsync';
import ErrorHandler from '../utils/ErrorHandler';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Mentor } from '../definitions/Mentor';
import { Booking } from '../definitions/Booking';
import { getMentors } from '../services/MentorService';
import { getBookings } from '../services/BookingService';

const __dirFile = fileURLToPath(import.meta.url);
const __dirName = dirname(__dirFile);

export default {
  getMentors: CatchAsync(async (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler('Unathorized access request. Please log in first.', 401));
    }
    const mentorsFilePath = join(__dirName, '../data/mentors.json');
    const bookingsFilePath = join(__dirName, '../data/bookings.json');

    let allMentors: Mentor[] = await getMentors(mentorsFilePath);
    const allBookings: Booking[] = await getBookings(bookingsFilePath);

    if (!allMentors) {
      return next(new ErrorHandler('Something went wrong getting mentors', 400));
    }
    if (allBookings?.length > 0) {
      allMentors = allMentors?.map((mentor) => {
        const isThere = allBookings.some((booking) => {
          return +booking.mentorId == +mentor.id;
        });
        if (isThere) {
          return { ...mentor, isavailable: false };
        } else {
          return mentor;
        }
      });
    }

    return res.status(200).json({
      status: 'success',
      length: allMentors?.length || 0,
      data: { mentors: allMentors },
    });
  }),
  getMentor: CatchAsync(async (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler('Unathorized access request. Please log in first.', 401));
    }

    if (!req?.params || !req?.params?.mentorid) {
      return next(new ErrorHandler('Invalid get mentor param.', 401));
    }

    const mentorid = req?.params?.mentorid;

    const mentorsFilePath = join(__dirName, '../data/mentors.json');
    const bookingsFilePath = join(__dirName, '../data/bookings.json');

    let allMentors: Mentor[] = await getMentors(mentorsFilePath);
    const allBookings: Booking[] = await getBookings(bookingsFilePath);

    if (!allMentors) {
      return next(new ErrorHandler('Something went wrong getting mentors', 400));
    }

    if (allBookings?.length > 0) {
      allMentors = allMentors?.map((mentor) => {
        const isThere = allBookings.some((booking) => {
          return +booking.mentorId == +mentor.id;
        });
        if (isThere) {
          return { ...mentor, isavailable: false };
        } else {
          return mentor;
        }
      });
    }

    const mentor = allMentors?.find((mentor) => {
      return mentor?.id == +mentorid;
    });

    return res.status(200).json({
      status: 'success',
      length: mentor ? 1 : 0,
      data: { mentors: mentor ? [mentor] : [] },
    });
  }),
};
