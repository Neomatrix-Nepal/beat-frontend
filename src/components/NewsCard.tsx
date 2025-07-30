"use client";
import Image from "next/image";

import { NewsRoomProps, Propsdata } from "@/src/types";
import { Card, CardContent } from "./ui/card";
import enhanceHtmlWithTailwind from "../utils/richTextStyleApply";

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
  onContentChange,
}: Propsdata) {
  const isEditing = editingId === index;

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] p-4">
      <CardContent className="p-0">
        {isEditing ? (
          <>
            <div className="mb-4">
              <label className="block text-sm font-bold text-white mb-1">
                Title
              </label>
              <input
                type="text"
                value={editableTitle}
                onChange={(e) => onTitleChange(e.target.value)}
                className="w-full border border-white   rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-white mb-1">
                Datesalxalmsxaksm
              </label>
              <input
                type="date"
                value={editableDate}
                onChange={(e) => onDateChange(e.target.value)}
                className="w-full   border-white border-2 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-white mb-1">
                Image
              </label>
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
                    <span className="mb-2">
                      Click to upload or drag and drop
                    </span>
                    <span className="text-xs text-white">
                      PNG, JPG, GIF up to 5MB
                    </span>
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
              <label className="block text-sm font-bold text-white mb-1">
                Content
              </label>
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
              <h3 className="font-bold text-white text-lg mb-2">
                {news.title}
              </h3>
              <p className="text-white mb-4">{news.des}efwef</p>
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

            <div className="hidden md:flex items-start gap-4 h-[200px]">
              <div className="w-1/3 h-full">
                <Image
                  src={"/image/cat.png"}
                  alt={news.title}
                  width={200}
                  height={150}
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>

              <div className="w-2/3 font-michroma flex flex-col justify-between h-full">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-2xl capitalize text-white max-lines-2 overflow-hidden">
                    {news.title}
                  </h3>
                  <div className="text-gray-300 text-xs text-end min-w-28">
                    {news.date}
                  </div>
                </div>

                <div
                  className="text-white max-lines-2"
                  dangerouslySetInnerHTML={{
                    __html: enhanceHtmlWithTailwind(news.des),
                  }}
                />

                <div className="flex space-x-2 justify-end w-full">
                  <div className="flex gap-2">
                    <button
                      onClick={() => onEditClick(index, news)}
                      className="cursor-pointer px-3 py-1 w-full bg-black text-white rounded-md hover:bg-slate-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(index)}
                      className="cursor-pointer px-3 py-1 w-full bg-red-700 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
