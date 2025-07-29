export interface User {
  id: number;
  email: string;
  fullname: string;
  password: string;
  roles: "vendor" | "admin" | "customer";
  verified: boolean;
  created_at: string;
  updated_at: string;
  deletedAt: string | null;
}
