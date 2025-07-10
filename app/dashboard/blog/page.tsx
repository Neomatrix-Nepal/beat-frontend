"use client";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";
import { useState, useEffect } from "react";
 import { updateBlog,fetchBlogs, Blog, deleteBlog } from "@/app/actions/blog-actions";

export interface NewsRoomProps {
  img: string;
  img1: string;
  date: string;
  title: string;
  des: string;
}

export default function NewsManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editableTitle, setEditableTitle] = useState("");
  const [editableDate, setEditableDate] = useState("");
  const [editableContent, setEditableContent] = useState("");
  const [editableImage, setEditableImage] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch blogs when component mounts or page changes
  useEffect(() => {
    const loadBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetchBlogs(page, 5);
        setBlogs(response.data);
        setTotalPages(response.meta.totalPages);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to load blogs");
        setLoading(false);
        //toast.error(err.message || "Failed to load blogs");
      }
    };
    loadBlogs();
  }, [page]);

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditableImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditClick = (id: number, blog: Blog) => {
    setEditingId(id);
    setEditableTitle(blog.title);
    setEditableDate(blog.date);
    setEditableContent(blog.content);
    setEditableImage(blog.thumbnailUrl);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditableTitle("");
    setEditableDate("");
    setEditableContent("");
    setEditableImage("");
  };

  const handleSaveEdit = async (id: number) => {
    try {
      // Placeholder for updateBlog action (you need to implement this in actions.ts)
      const response = await updateBlog(id, {
        title: editableTitle,
        date: editableDate,
        content: editableContent,
      });
      if (response.success) {
        setBlogs(blogs.map((blog) => (blog.id === id ? { ...blog, title: editableTitle, date: editableDate, content: editableContent } : blog)));
        setEditingId(null);
        ////toast.success("Blog updated successfully");
      } else {
        ////toast.error(response.error || "Failed to update blog");
      }
    } catch (err) {
      ////toast.error("Failed to update blog");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // Placeholder for deleteBlog action (you need to implement this in actions.ts)
      const response = await deleteBlog(id);
      if (response.success) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        ////toast.success("Blog deleted successfully");
      } else {
        ////toast.error(response.error || "Failed to delete blog");
      }
    } catch (err) {
      //toast.error("Failed to delete blog");
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="w-full bg-[#0f172b] p-6 flex items-center justify-center">
      <div className="bg-[#0f172b] rounded-xl shadow-sm p-4 md:p-6 w-full mx-auto">
        <div className="space-y-6 mb-8 md:mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-medium text-white">Existing News</h2>
            <Link
              href="/dashboard/blog/add_blogs"
              className="px-4 py-2 font-semibold bg-black text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Add New
            </Link>
          </div>
          <div className="space-y-4">
            {blogs.map((blog) => (
              <NewsCard
                key={blog.id}
                news={{
                  img: blog.thumbnailUrl,
                  img1: "/img/default.png", // Replace with a default or dynamic secondary image if available
                  date: blog.date,
                  title: blog.title,
                  des: blog.content,
                }}
                index={blog.id}
                editingId={editingId}
                editableTitle={editableTitle}
                editableDate={editableDate}
                editableContent={editableContent}
                editableImage={editableImage}
                onEditClick={() => handleEditClick(blog.id, blog)}
                onCancelEdit={handleCancelEdit}
                onSaveEdit={() => handleSaveEdit(blog.id)}
                onDelete={() => handleDelete(blog.id)}
                onImageChange={handleEditImageChange}
                onTitleChange={setEditableTitle}
                onDateChange={setEditableDate}
                onContentChange={setEditableContent}
              />
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-white">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}