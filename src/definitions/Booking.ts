import { Service } from './Service';

type Booking = {
  id: number;
  menteeId: number;
  mentorId: number;
  service: Service;
};

export type { Booking };
