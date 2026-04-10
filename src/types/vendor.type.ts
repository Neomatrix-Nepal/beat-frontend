export interface VendorUser {
  id: number;
  email: string;
  fullname: string;
  roles: "admin" | "vendor" | "customer";
  verified: boolean;
  isActive: boolean;
  phoneNumber?: string;
  bio?: string;
  city?: string;
  country?: string;
  created_at: string;
  updated_at: string;
  image?: {
    url: string;
  };
  socialLinks: {
    platform: string;
    url: string;
  }[];
}

export interface FetchVendorsResponse {
  data: VendorUser[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
