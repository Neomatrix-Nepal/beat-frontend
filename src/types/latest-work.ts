export enum Platform {
  YOUTUBE = "youtube",
  SPOTIFY = "spotify",
}

export const platformBaseUrls: Record<Platform, string> = {
  youtube: "https://www.youtube.com",
  spotify: "https://open.spotify.com",
};
 
export interface Image {
  id: number;
  product_id: number | null;
  latestWork_id: number;
  url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface LatestWork {
  id: number;
  title: string;
  platform: Platform;
  workLink: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
}

export interface FetchLatestWorksResponse {
  data: LatestWork[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateLatestWorkDto {
  title: string;
  platform: string;
  workLink: string;
  description: string;
}

export interface FormData {
  title: string;
  platform: Platform | "";
  workLink: string;
  description: string;
  coverImage: File | string | null;
}