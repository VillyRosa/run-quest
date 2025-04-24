import { User } from "./User";

export interface Race {
  id: string;
  distance: number;
  duration: number;
  startTime: string;
  endTime: string;
  user: User;
  createdAt: string;
  updatedAt: string;
};
