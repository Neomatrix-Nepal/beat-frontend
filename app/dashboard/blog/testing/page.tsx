"use client";
import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { fetchBlogs } from "@/app/actions/blog-actions";
import { Blog } from "@/types";

interface FetchBlogsResponse {
  data: Blog[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const NewsPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const response: FetchBlogsResponse = await fetchBlogs(1, 100); // Fetch all blogs
        console.log(response.data)
        setBlogs(response.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch blogs");
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <Head>
        <title>News & Updates</title>
        <meta
          name="description"
          content="Latest news and updates with rich content and images"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg space-y-12">
        {blogs.map((blog) => (
          <div key={blog.id} className="space-y-6">
            {/* Display thumbnail image */}
            {blog.thumbnailUrl && (
              <Image
                src={`${baseUrl}/${blog.thumbnailUrl.replace(/\\/g, '/')}`} // Use base URL and normalize path
                alt={`${blog.title} thumbnail`}
                width={800}
                height={400}
                className="w-full rounded-lg my-6 object-cover"
              />
            )}
            {/* Blog title as h1 */}
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              {blog.title}
            </h1>
            {/* Blog date */}
            <p className="text-sm text-gray-500 mb-4">{blog.date}</p>
            {/* Blog content */}
            <div
              className="[&>p]:text-lg [&>p]:text-gray-700 [&>p>i]:italic [&>p]:mb-6 [&>h1]:text-4xl [&>h1]:font-extrabold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-gray-800 [&>h2]:mb-5 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:text-gray-800 [&>h3]:mb-4 [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:text-gray-700 [&>h4]:mb-4 [&>img]:w-full [&>img]:rounded-lg [&>img]:my-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        ))}
      </main>
    </div>
  );
};

export default NewsPage;