export interface PaymentDetail {
  id: number;
  method: "stripe" | "khalti"; // adjust if there are more methods
  fullName: string;
  email: string;
  khaltiNumber: string | null;
  stripeAccountId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreatorEntry {
  id: number;
  userId: number;
  name: string;
  style: string;
  socialUrl: string;
  demoLink: string;
  status: "pending" | "approved" | "reject";
  createdAt: string;
  updatedAt: string;
  paymentDetail: PaymentDetail;
}

export interface FetchCreatorsResponse {
  data: CreatorEntry[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
