export interface BeatsResponse {
  beats: Product[];
  total: number;
}

export interface Product {
  id: number;
  user_id: number;
  name: string;
  description: string;
  price: string;
  stock: string;
  category_id: number;
  subcategory_id: number;
  size: string | null;
  status: "active" | "inactive" | string;
  product_type: "regular" | "exclusive" | string;
  created_at: string;
  updated_at: string;
  wishlistCount: number;
  images: BeatImage[];
  digital_assets: DigitalAsset[];
  category: Category;
  subCategory: SubCategory;
}

export interface BeatImage {
  id: number;
  product_id: number;
  url: string;
}

export interface DigitalAsset {
  id: number;
  product_id: number;
  contentPath: string;
  manifestPath: string;
  fileType: string;
  assetId: string;
  isEncrypted: boolean;
  metadata: {
    playlistUrl: string;
    keyUrl: string;
  };
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface SubCategory {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface BeatsTableProps {
  beats: Product[];
  onEditBeat: (beat: Product) => void;
  onDeleteBeat: (id: string) => void;
}

export interface DripsTableProps {
  drips: Product[];
  onEditDrip: (beat: Product) => void;
  onDeleteDrip: (id: string) => void;
}
