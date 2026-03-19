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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReusablePagination from "@/src/components/shared/Pagination";

export default function NewsManagement() {
  const router = useRouter();
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
        const response = await fetchBlogs(page, 2);
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
        router.refresh();
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
        router.refresh();
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
          <div className="flex justify-center mt-6">
            <ReusablePagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
