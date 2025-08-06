import { User } from "./user.type";

export interface Order {
  id: number;
  userId: number;
  amount: string;
  stripePaymentId: string | null;
  user: User;
  khaltiId: string | null;
  paymentMethod: "stripe" | "khalti";
  paymentType: "cart" | string;
  status: "pending" | "completed" | "failed" | string;
  address: string | null;
  city: string | null;
  country: string | null;
  phone: string | null;
  email: string | null;
  couponId: string | null;
  discountPercentage: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}
