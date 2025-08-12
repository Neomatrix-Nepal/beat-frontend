"use client";
import BlogForm from "@/src/components/form/BlogForm";
import { createBlog } from "@/src/app/actions/blog-actions";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BlogFormData } from "@/src/types";
import { useSession } from "next-auth/react";

export default function NewNews() {
  const { data: session } = useSession();
  const router = useRouter();
  const showToast = (msg: string, type: "success" | "error") => {
    toast.dismiss("status-toast");
    type === "error"
      ? toast.error(msg, { id: "status-toast" })
      : toast.success(msg, { id: "status-toast" });
  };

  const addBlog = async (formData: BlogFormData, image: File) => {
    try {
      const result = await createBlog(
        formData,
        image,
        session?.user?.tokens?.accessToken as string
      );
      if (result.error) throw new Error(result.error);
      toast.success("Blog created!");
      router.push("/dashboard/blog");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        showToast("An unexpected error occurred", "error");
      }
    }
  };

  return (
    <BlogForm mode="add" onSubmit={addBlog} onCancel={() => router.back()} />
  );
}
