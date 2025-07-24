export interface Coupon {
  id?: number;
  code: string;
  description?: string;
  discountPercentage: number;
  validFrom: string;
  validUntil: string;
}
