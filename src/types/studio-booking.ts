import { User } from "./user.type";

export type BookingStatus = "pending" | "confirmed" | "cancelled";
export interface StudioBooking {
  id: number;
  userId: number;
  date: string;
  duration: number;
  phoneNumber: string;
  totalCost: number;
  googleDriveLink: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
}
