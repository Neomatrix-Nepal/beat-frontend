import { User } from "./user.type";

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export interface StudioBooking {
  id: number;
  userId: number;
  date: string;
  time: string;
  duration: number;
  phoneNumber: string;
  totalCost: number;
  googleDriveLink: string;
  status: BookingStatus;
  createdAt: string;
  updatedAt: string;
  user: User;
  payment:any
}
