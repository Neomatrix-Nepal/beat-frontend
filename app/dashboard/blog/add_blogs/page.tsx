"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createBlog, BlogFormData } from "@/app/actions/blog-actions";
import "react-quill-new/dist/quill.snow.css";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function NewNews() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    const formData: BlogFormData = {
      title,
      date,
      content,
    };

    const result = await createBlog(formData, image);

    if (result.success) {
      setSuccess("Blog created successfully!");
      setTitle("");
      setDate("");
      setContent("");
      setImage(null);
    } else {
      setError(result.error || "Failed to create blog");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="w-full h-full bg-[#0f172b] p-6 flex items-center justify-center">
      <div className="bg-[#0f172b] rounded-xl border-white border-2 shadow-sm p-2 md:p-6 w-full mx-auto space-y-6">
        <div className="w-full px-4 md:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg md:text-xl font-medium text-white">
              Add New News
            </h1>
            <Link
              href="/news"
              className="px-4 py-2 bg-black text-white border-2 border-white rounded-md hover:bg-gray-300 transition-colors"
            >
              Back to News
            </Link>
          </div>

          {error && (
            <div className="text-red-500 mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 mb-4">{success}</div>
          )}

          <div>
            <label className="block text-sm md:text-base font-bold text-white mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="News title"
              className="w-full border text-white placeholder-white border-gray-300 rounded-lg px-4 py-2 outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div className="text-white">
            <label className="block text-sm md:text-base font-bold text-white mb-2">
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full md:w-1/2 border border-gray-300 text-white bg-transparent rounded-lg px-4 py-2 outline-none transition-all"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-bold text-white mb-2">
              Thumbnail
            </label>
            <label
              htmlFor="image-upload"
              className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer transition-colors text-gray-400"
            >
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  width={200}
                  height={150}
                  className="max-h-full max-w-full"
                />
              ) : (
                <>
                  <span className="mb-2 text-sm md:text-base">
                    Click to upload or drag and drop
                  </span>
                  <span className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </span>
                </>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                disabled={isSubmitting}
              />
            </label>
          </div>

          <div className="h-[45vh] w-full">
            <label className="block text-sm md:text-base font-bold text-white mb-2">
              Content
            </label>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              modules={{ toolbar: toolbarOptions }}
              className="text-white h-[30vh] bg-[#1e293b] rounded-lg"
              readOnly={isSubmitting}
            />
          </div>

          <div className="flex flex-col items-center pt-4">
            <button
              onClick={handlePublish}
              className="px-4 py-2 bg-black border-2 border-white text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish News"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}