import { PublicUser } from "./PublicUser";

export interface User extends PublicUser {
  email: string;
  status: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
