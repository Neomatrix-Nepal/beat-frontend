export interface Package {
  id: number;
  name: string;
  description?: string;
  price: number;
  purpose: "product" | "mixing_order" | "custom_beats";
  features?: string[];
}
