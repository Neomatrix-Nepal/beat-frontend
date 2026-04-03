export interface User {
  id: number;
  email: string;
  fullname: string;
  password?: string;
  roles: "vendor" | "admin" | "customer" | string;
  verified: boolean;
  bio?: string | null;
  city?: string | null;
  country?: string | null;
  phoneNumber?: string | null;
  created_at: string;
  updated_at: string;
  deletedAt: string | null;
}
