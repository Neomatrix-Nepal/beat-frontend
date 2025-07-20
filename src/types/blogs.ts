export interface NewsRoomProps {
  img: string;
 // img1: string;
  date: string;
  title: string;
  des: string;
}

export interface Propsdata {
  news: NewsRoomProps;
  index: number;
  editingId: number | null;
  editableTitle: string;
  editableDate: string;
  editableContent: string;
  editableImage: string;
  onEditClick: (index: number, news: NewsRoomProps) => void;
  onCancelEdit: () => void;
  onSaveEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTitleChange: (val: string) => void;
  onDateChange: (val: string) => void;
  onContentChange: (val: string) => void;
}



export interface BlogFormData {
  title: string;
  date: string;
  content: string;
}

export interface Blog {
  id: number;
  title: string;
  date: string;
  content: string;
  thumbnailUrl: string;
}

export interface FetchBlogsResponse {
  data: Blog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
