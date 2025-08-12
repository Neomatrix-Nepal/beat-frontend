"use client";
import Image from "next/image";

import { Blog, BlogFormData, NewsRoomProps, Propsdata } from "@/src/types";
import { Card, CardContent } from "./ui/card";
import enhanceHtmlWithTailwind from "../utils/richTextStyleApply";
import BlogForm from "./form/BlogForm";
import { useState, useEffect } from "react";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface test {
  news: Blog;
  index: number;
  editingId: number | null;
  onEditClick: (index: number, news: Blog) => void;
  onCancelEdit: () => void;
  onSaveEdit: (updatedBlog: BlogFormData, imageFile: File|string) => Promise<void>;
  onDelete: (index: number) => void;
}

export default function NewsCard({
  news,
  index,
  editingId,
  onEditClick,
  onCancelEdit,
  onSaveEdit,
  onDelete,
}: test) {
  const isEditing = editingId === index;

  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  //Prevent memory leak
  useEffect(() => {
    if (typeof news.thumbnailUrl !== "string") {
      const url = URL.createObjectURL(news.thumbnailUrl);
      setObjectUrl(url);

      return () => {
        URL.revokeObjectURL(url);
        setObjectUrl(null);
      };
    } else {
      // If thumbnailUrl is a string, clear any previous object URL
      setObjectUrl(null);
    }
  }, [news.thumbnailUrl]);

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] p-4">
      <CardContent className="p-0">
        {isEditing ? (
          <>
           <BlogForm mode="edit" initialData={news} onSubmit={onSaveEdit} onCancel={onCancelEdit}/>
          </>
        ) : (
          <>
            <div className="md:hidden flex flex-col">
              <div className="w-full mb-3">
                <Image
                  src={`${baseUrl}/${news.thumbnailUrl}`} // Use base URL and normalize path
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
              <p className="text-white mb-4">{news.content}efwef</p>
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
                {typeof news.thumbnailUrl === "string" ? (
                    <Image
                      src={`${baseUrl}/${news.thumbnailUrl}`}
                      alt={news.title}
                      width={400}
                      height={250}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  ) : objectUrl ? (
                    <Image
                      src={objectUrl}
                      alt={news.title}
                      width={400}
                      height={250}
                      className="rounded-lg object-cover w-full h-full"
                    />
                  ) : null
                }
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
                    __html: enhanceHtmlWithTailwind(news.content),
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
