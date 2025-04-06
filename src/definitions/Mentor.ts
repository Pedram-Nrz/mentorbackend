import { Service } from './Service';

type Mentor = {
  id: number;
  fullname: string;
  title: string;
  description: string;
  rating: string;
  skills: string[];
  services: Service[];
  isavailable: boolean;
  avatar: string;
};

export type { Mentor };
