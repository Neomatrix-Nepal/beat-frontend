"use client";
import {
  deleteBlog,
  fetchBlogs,
  updateBlog,
} from "@/src/app/actions/blog-actions";
import NewsCard from "@/src/components/NewsCard";
import { Blog, BlogFormData } from "@/src/types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function NewsManagement() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { data: session } = useSession();

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

  const handleEditClick = (id: number, blog: Blog) => {
    setEditingId(id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
  };

  const handleSaveEdit = async (
    updatedBlog: BlogFormData,
    imageFile: File | string
  ) => {
    try {
      const editedBlog = blogs.find((item) => item.id === editingId);

      if (!editedBlog) return;
      // Placeholder for updateBlog action (you need to implement this in actions.ts)
      const response = await updateBlog(
        editedBlog.id,
        {
          title: updatedBlog.title,
          date: updatedBlog.date,
          content: updatedBlog.content,
        },
        typeof imageFile === "string" ? null : imageFile,
        session?.user?.tokens?.accessToken as string
      );
      if (response.success) {
        setBlogs(
          blogs.map((blog) =>
            blog.id === editedBlog.id
              ? {
                  ...blog,
                  title: updatedBlog.title,
                  date: updatedBlog.date,
                  content: updatedBlog.content,
                  thumbnailUrl: imageFile,
                }
              : blog
          )
        );
        setEditingId(null);
        toast.success("Blog updated successfully");
      } else {
        toast.error(response.error || "Failed to update blog");
      }
    } catch (err) {
      toast.error("Failed to update blog");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // Placeholder for deleteBlog action (you need to implement this in actions.ts)
      const response = await deleteBlog(
        id,
        session?.user?.tokens?.accessToken as string
      );
      if (response.success) {
        setBlogs(blogs.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully");
      } else {
        toast.error(response.error || "Failed to delete blog");
      }
    } catch (err) {
      toast.error("Failed to delete blog");
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
    <div className="w-full min-h-screen p-6 flex justify-center font-michroma">
      <div className=" rounded-xl shadow-sm p-4 md:p-6 w-full mx-auto">
        <div className="space-y-6 mb-8 md:mb-10">
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-medium text-white">
              Existing News
            </h2>
            <Link
              href="/dashboard/blog/add_blogs"
              className="cursor-pointer px-5 py-3 text-sm font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-transform transform hover:scale-105 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Add New
            </Link>
          </div>
          <div className="space-y-4">
            {blogs.map((blog) => (
              <NewsCard
                key={blog.id}
                news={blog}
                editingId={editingId}
                index={blog.id}
                onEditClick={() => handleEditClick(blog.id, blog)}
                onCancelEdit={handleCancelEdit}
                onSaveEdit={handleSaveEdit}
                onDelete={() => handleDelete(blog.id)}
              />
            ))}
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-4 mt-6">
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
