import { User } from "./user.type";
interface Items {
  id: number;
  productId: number;
  price: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  userId: number;
  amount: string;
  stripePaymentId: string | null;
  user: User;
  items: Items[];
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

export interface Commission {
  id: number;
  creatorId: number;
  paymentItemId: number;
  amount: string;
  status: "pending" | "requested" | "paid" | "failed" | string;
  createdAt: string;
  updatedAt: string;
  paymentItem: {
    id: number;
    productId: number;
    price: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
  };
  creator: User;
}
