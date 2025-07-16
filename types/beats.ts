
// Request and Response interfaces for beats API
export interface BeatsRequest {
  // Add request parameters if needed, e.g., pagination, filters
}

export interface BeatsResponse {
  // Add response structure, e.g.,
  beats: Beat[];
  total: number;
}

// Beat entity interface
export interface Beat {
  id: string;
  title: string;
  genre: string;
  price: number;
  producer: string;
  uploadDate: string; // Consider using `Date` if working with JS Date objects
  selected: boolean;
}

// Props for Beats Table Component
export interface BeatsTableProps {
  beats: Beat[];
  selectAll: boolean;
  onSelectAll: () => void;
  onSelectBeat: (id: string) => void;
  onDeleteBeat: (id: string) => void;
}
