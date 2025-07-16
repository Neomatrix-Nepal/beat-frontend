export interface CustomBeat {
  selected: boolean;
  id: number;
  email: string;
  name: string;
  musicGenre: string | null;
  mood: string | null;
  bpm: number;
  songKey: string;
  instruments: string[];
  referenceTrack: string;
  additionalInstructions: string;
  status: 'pending' | 'sent';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  packages: {
    id: number;
    name: string;
    description: string;
    purpose: string;
    price: string;
    features: string[];
    status: string;
    created_at: string;
    updated_at: string;
  }[];
}

export interface FetchCustomBeatsResponse {
  data: CustomBeat[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}