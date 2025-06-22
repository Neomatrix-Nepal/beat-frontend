// types/drip.ts
export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Drip {
  id: number;
  user_id: number;
  name: string;
  description: string;
  price: string;
  category_id: number;
  size: string;
  status: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  images: ProductImage[];
  selected?: boolean; // Optional for selection functionality
}