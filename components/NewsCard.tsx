"use client";
import Image from "next/image";
import cat from "@/image/cat.png";
import { NewsRoomProps } from "@/app/dashboard/blog/page"; // Update path accordingly

interface Props {
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
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function NewsCard({
  news,
  index,
  editingId,
  editableTitle,
  editableDate,
  editableContent,
  editableImage,
  onEditClick,
  onCancelEdit,
  onSaveEdit,
  onDelete,
  onImageChange,
  onTitleChange,
  onDateChange,
  onContentChange
}: Props) {
  const isEditing = editingId === index;

  return (
    <div className="border border-gray-200 rounded-lg  p-2 hover:shadow-sm transition-shadow">
      {isEditing ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-bold text-white mb-1">Title</label>
            <input
              type="text"
              value={editableTitle}
              onChange={(e) => onTitleChange(e.target.value)}
              className="w-full border border-white   rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-white mb-1">Date</label>
            <input
              type="date"
              value={editableDate}
              onChange={(e) => onDateChange(e.target.value)}
              className="w-full   border-white border-2 rounded-lg px-3 py-2 outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-bold text-white mb-1">Image</label>
            <label
              htmlFor={`edit-image-upload-${index}`}
              className="  border-dashed border-white border-2 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer transition-colors text-gray-400"
            >
              {editableImage ? (
                <Image
                src={`${baseUrl}/${news.img}`} // Use base URL and normalize path
                  alt="Preview"
                  width={200}
                  height={150}
                  className="max-h-full max-w-full object-contain"
                />
 


              ) : (
                <>
                  <span className="mb-2">Click to upload or drag and drop</span>
                  <span className="text-xs text-white">PNG, JPG, GIF up to 5MB</span>
                </>
              )}
              <input
                id={`edit-image-upload-${index}`}
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mb-4 ">
            <label className="block text-sm font-bold text-white mb-1">Content</label>
            <textarea
              value={editableContent}
              onChange={(e) => onContentChange(e.target.value)}
              className="w-full border border-white  rounded-lg px-3 py-2 outline-none resize-y min-h-[100px]"
            />
          </div>

          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 justify-end">
            <button
              onClick={onCancelEdit}
              className="px-3 py-2 bg-gray-200 text-white rounded-md hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSaveEdit(index)}
              className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-500 transition-colors"
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="md:hidden flex flex-col">
            <div className="w-full mb-3">
              <Image
                src={`${baseUrl}/${news.img}`} // Use base URL and normalize path
                alt={news.title}
                width={400}
                height={250}
                className="rounded-lg object-cover w-full h-full"
              />
               
            </div>
            <div className="text-white text-sm mb-2">{news.date}</div>
            <h3 className="font-bold text-white text-lg mb-2">{news.title}</h3>
            <p className="text-white mb-4">{news.des}</p>
            <div className="flex space-x-2 w-full">
              <button
                onClick={() => onEditClick(index, news)}
                className="px-3 py-2 w-full bg-black text-white rounded-md hover:bg-white transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(index)}
                className="px-3 py-2 w-full bg-red-700 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-start gap-4">
            <div className="w-1/4">
              <Image
                src={cat}
                alt={news.title}
                width={200}
                height={150}
                className="rounded-lg object-cover w-full h-32"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-white">{news.title}</h3>
                <div className="text-white text-sm">{news.date}</div>
              </div>
              



  <div
              className="[&>p]:text-lg [&>p]:text-white [&>p>i]:italic [&>p]:mb-6 [&>h1]:text-4xl [&>h1]:font-extrabold [&>h1]:white [&>h1]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-gray-800 [&>h2]:mb-5 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mb-4 [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:text-white [&>h4]:mb-4 [&>img]:w-full [&>img]:rounded-lg [&>img]:my-6"
              dangerouslySetInnerHTML={{ __html: news.des }}
            />
           
              
              <div className="flex space-x-2 justify-start w-40 mt-4">
                <button
                  onClick={() => onEditClick(index, news)}
                  className="px-3 py-1 w-full bg-black text-white rounded-md hover:bg-white transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(index)}
                  className="px-3 py-1 w-full bg-red-700 text-white rounded-md hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
