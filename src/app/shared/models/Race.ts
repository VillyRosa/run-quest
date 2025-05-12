import { PublicUser } from "./PublicUser";

export interface Race {
  id: string;
  distance: number;
  duration: number;
  startTime: string;
  endTime: string;
  user: PublicUser;
  createdAt: string;
  updatedAt: string;
};
