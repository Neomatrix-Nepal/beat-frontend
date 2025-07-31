"use client";

import {
  updateProduct,
  uploadMusic,
  uploadProduct,
} from "@/src/app/(protected_routes)/dashboard/beats_manager/action";
import { Product } from "@/src/types";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUpload } from "react-icons/fa";
import { FiSave, FiX } from "react-icons/fi";
import { MdInsertPhoto } from "react-icons/md";

export type FormData = {
  dripTitle: string;
  price: string;
  size: string;
  description: string;
  cover: File | null;
  audio: File | null;
};

type DripFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Product | null;
};

export default function DripFormModal({
  isOpen,
  onClose,
  initialData,
}: DripFormModalProps) {
  const [loading, setLoading] = useState(false);
  const [previewCover, setPreviewCover] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      dripTitle: "",
      price: "",
      size: "",
      description: "",
      cover: null,
      audio: null,
    },
  });

  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const coverFile = watch("cover");

  useEffect(() => {
    if (!initialData) {
      reset();
      setPreviewCover(null);
      return;
    }

    setValue("dripTitle", initialData.name);
    setValue("price", initialData.price);
    setValue("size", initialData.size ?? "");
    setValue("description", initialData.description ?? "");

    if (typeof initialData.images[0].url === "string") {
      setPreviewCover(
        process.env.NEXT_PUBLIC_API_URL + "/" + initialData.images[0].url
      );
    }
  }, [initialData, reset, setValue]);

  const openCoverDialog = () => coverInputRef.current?.click();

  const handleClose = () => {
    reset();
    setPreviewCover(null);
    onClose();
  };
  const onSubmit = async (data: FormData) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.dripTitle);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("user_id", "1");
      formData.append("product_type", "drip");

      if (data.cover instanceof File) {
        formData.append("images", data.cover);
      }

      let result;

      if (initialData) {
        result = await updateProduct(formData, initialData.id.toString());
      } else {
        result = await uploadProduct(formData);
      }

      if (result?.id && data.audio instanceof File) {
        const audioFormData = new FormData();
        audioFormData.append("product_id", result.id.toString());
        audioFormData.append("audio", data.audio);
        await uploadMusic(audioFormData);
      }

      toast.success(
        initialData
          ? "Drip updated successfully!"
          : "Drip uploaded successfully!"
      );
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-[#1E293B] w-full max-w-4xl rounded-xl p-6 relative text-white overflow-y-auto max-h-[90vh] border border-gray-700">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-red-500"
        >
          <FiX size={20} />
        </button>

        <h2 className="flex items-center mb-6 text-2xl font-semibold">
          <FaUpload className="mr-2" />
          {initialData ? "Edit Drip" : "Upload New Drip"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Upload Inputs */}
          <div>
            <p className="mb-2 text-sm text-gray-400">
              Upload Cover & Drip Audio
            </p>
            <div className="flex space-x-4 items-center">
              <div
                onClick={openCoverDialog}
                className="w-24 h-24 bg-[#162133] rounded-lg cursor-pointer overflow-hidden relative flex items-center justify-center border border-gray-600"
              >
                {coverFile ? (
                  <Image
                    src={URL.createObjectURL(coverFile)}
                    alt="Cover"
                    fill
                    className="object-cover"
                  />
                ) : previewCover ? (
                  <Image
                    src={previewCover}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <MdInsertPhoto className="w-10 h-10 text-gray-500" />
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                ref={coverInputRef}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  if (file) setPreviewCover(URL.createObjectURL(file));
                  setValue("cover", file, { shouldValidate: true });
                }}
              />
            </div>
          </div>

          <InputField
            label="Drip Title"
            placeholder="Enter Drip name"
            name="dripTitle"
            register={register}
            error={errors.dripTitle?.message}
            rules={{ required: "Drip Title is required" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InputField
              label="Price"
              placeholder="Set Drip price"
              name="price"
              type="number"
              register={register}
              error={errors.price?.message}
              rules={{ required: "Price is required" }}
            />
            <InputField
              label="Size"
              placeholder="Size of Drip"
              name="size"
              register={register}
              error={errors.size?.message}
            />
          </div>

          <TextareaField
            label="Description"
            placeholder="Describe your Drip"
            name="description"
            register={register}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-custom text-white py-3 rounded-lg flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <svg
                className="w-5 h-5 mr-2 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                <path d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z" />
              </svg>
            ) : (
              <FiSave className="mr-2" />
            )}
            {loading ? "Saving..." : initialData ? "Update Drip" : "Save Drip"}
          </button>
        </form>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  type = "text",
  placeholder,
  name,
  register,
  error,
  rules,
}: {
  label: string;
  type?: string;
  placeholder: string;
  name: keyof FormData;
  register: ReturnType<typeof useForm<FormData>>["register"];
  error?: string;
  rules?: object;
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-300">
      {label}
    </label>
    <input
      placeholder={placeholder}
      type={type}
      {...register(name, rules)}
      className="w-full bg-[#162133] border border-gray-600 text-white py-2 px-3 rounded-lg"
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
);

const TextareaField = ({
  label,
  placeholder,
  name,
  register,
}: {
  label: string;
  placeholder: string;
  name: keyof FormData;
  register: ReturnType<typeof useForm<FormData>>["register"];
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-300">
      {label}
    </label>
    <textarea
      placeholder={placeholder}
      {...register(name)}
      rows={4}
      className="w-full bg-[#162133] border border-gray-600 text-white py-2 px-3 rounded-lg resize-none"
    />
  </div>
);
