
export interface CreatorEntry {
  id: string;
  producername: string;
  paymentMethod: string;
  demoBeat: string;
  stripeFullName: string | null;
  stripeCardLast4: string | null;
  stripeAccountId: string | null;
  paypalEmailOrRef: string | null;
  sociamediaurl: string;
  producerStyle: string;
  created_at: string;
  updated_at: string;
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