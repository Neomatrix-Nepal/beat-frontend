
export interface CreatorEntry {
  id: number;
  userId:number;
  producername: string;
  paymentMethod: string;
  demoBeat: string;
  isRoleChanged:boolean;
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