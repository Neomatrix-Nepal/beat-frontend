"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createBlog } from "@/src/app/actions/blog-actions";
import { AddBlogFormType, BlogFormData, BlogFormErrorsType } from "@/src/types";
import RichText from "@/src/components/ui/richText";
import toast from "react-hot-toast";

export default function NewNews() {
  const[touched, setTouched] = useState(false);
  const [blogForm, setBlogForm] = useState<AddBlogFormType>({
    title: "",
    date: "",
    content: "",
    image: null,
  });

  const [errors, setErrors] = useState<BlogFormErrorsType>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (msg: string, type: "success" | "error") => {
    toast.dismiss("status-toast");
    type === "error"
      ? toast.error(msg, { id: "status-toast" })
      : toast.success(msg, { id: "status-toast" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setBlogForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time validation
    validateField(name, value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setBlogForm((prev) => ({ ...prev, image: file }));
      validateField("image", file);
    }
  };

  const validateField = (name: string, value: any) => {
    const newErrors: BlogFormErrorsType = { ...errors };

    if (name === "title" && !value.trim()) {
      newErrors.title = "Title is required";
    } else if (name === "date" && !value) {
      newErrors.date = "Date is required";
    } else if (name === "content") {
      const plainText = value.replace(/<[^>]*>/g, "").trim();
      if (!plainText) {
        newErrors.content = "Content is required";
      } else {
        delete newErrors.content;
      }
    } else if (name === "image" && !value) {
      newErrors.image = "Image is required";
    } else {
      delete newErrors[name as keyof BlogFormErrorsType];
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const { title, date, content, image } = blogForm;
    const newErrors: BlogFormErrorsType = {};

    if (!title.trim()) newErrors.title = "Title is required";

    if (!date) newErrors.date = "Date is required";

    //strip html tags off to get plain text
    const plainTextContent = content.replace(/<[^>]*>/g, "").trim();

    if (!plainTextContent.trim()) newErrors.content = "Content is required";

    if (!image) newErrors.image = "Image is required";

    setErrors(newErrors);
    console.log(newErrors);
    console.log(content);
    return Object.keys(newErrors).length === 0;
  };

  const handlePublish = async () => {
    setIsSubmitting(true);

    if (!validateForm()) {
      showToast("Please fix form errors", "error");
      setIsSubmitting(false);
      return;
    }

    try {
      const { title, date, content, image } = blogForm;
      const formData: BlogFormData = { title, date, content };

      const result = await createBlog(formData, image);

      if (result.error) {
        throw new Error(result.error);
      }

      showToast("Blog published successfully", "success");

      setBlogForm({
        title: "",
        date: "",
        content: "",
        image: null,
      });
      setErrors({});
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to publish blog";
      showToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContentChange = (value:string) =>{
    console.log("called");
    setBlogForm((prev) => ({
      ...prev,
      "content": value,
    }));

    validateField("content", value)
  }

  return (
    <div className="w-full h-full font-michroma p-6 flex items-center justify-center">
      <div className="bg-[#0f172b] rounded-xl border-white border-2 shadow-sm p-2 md:p-6 w-full mx-auto space-y-6">
        <div className="w-full px-4 md:px-0 flex flex-col gap-5">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-lg md:text-xl font-medium text-white">
              Add New News
            </h1>
            <Link
              href="/dashboard/blog"
              className="cursor-pointer px-5 py-3 text-sm font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-transform transform hover:scale-105 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Back to Blogs
            </Link>
          </div>

          <div>
            <label className="block text-sm md:text-base font-bold text-white mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={blogForm.title}
              onChange={handleChange}
              placeholder="News title"
              className={`w-full border text-white placeholder-white border-gray-300 rounded-lg px-4 py-2 outline-none transition-all ${
                errors.title ? "border-2 border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-1">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={blogForm.date}
              onChange={handleChange}
              className={`w-full md:w-1/2 border border-gray-300 text-white bg-transparent rounded-lg px-4 py-2 outline-none transition-all ${
                errors.date ? "border-2 border-red-500" : ""
              }`}
              disabled={isSubmitting}
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-white mb-1">
              Thumbnail
            </label>
            <label
              htmlFor="image-upload"
              className={`border-2 border-dashed border-gray-300 rounded-lg h-40 flex flex-col items-center justify-center cursor-pointer transition-colors text-gray-400 ${
                errors.image ? "border-2 border-red-500" : ""
              }`}
            >
              {blogForm.image ? (
                <Image
                  src={URL.createObjectURL(blogForm.image)}
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
                  <span className="text-xs text-white">
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
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image}</p>
            )}
          </div>

          <div className="h-[45vh] w-full">
            <label className="block text-sm font-bold text-white mb-1">
              Content
            </label>
            <RichText
              content={blogForm.content}
              onChange={(value: string) => {
                if(!touched){
                  setTouched(true);
                  return;
                }
                handleContentChange(value)
              }
            }
              readOnly={isSubmitting}
              error={!!errors.content}
            />
            {errors.content && (
              <p className="text-red-500 text-sm pt-4 mt-20 sm:mt-10 md:mt-12">
                {errors.content}
              </p>
            )}
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
