"use client";
import React, { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import Image from "next/image";
import { RiSave2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaImage, FaUpload } from "react-icons/fa6";

import { createLatestWork } from "@/src/app/actions/work-action";
import { Platform, platformBaseUrls } from "@/src/types/latest-work";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export interface FormData {
  title: string;
  platform: Platform | "";
  workLink: string;
  description: string;
  coverImage: File | string | null;
}

export interface Work {
  id: number;
  title: string;
  description: string;
  platform: Platform;
  workLink: string;
  uploadDate: string;
  images: Image[];
}

interface Image {
  id: number;
  product_id: number | null;
  latestWork_id: number;
  url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface WorkFormProps {
  initialData?: Work;
  onSave?: (data: FormData, imageFile: File | null) => Promise<void>;
}

const AddWorkForm: React.FC<WorkFormProps> = ({ initialData, onSave }) => {
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [passedCoverImagePreview, setPassedCoverImagePreview] = useState<
    string | null
  >(initialData?.images[0].url ?? null);
  const platformOptions = Object.values(Platform);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [startValidation, setStartValidation] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    reset,
    watch,
  } = useForm<FormData>({
    mode: "onSubmit",
    defaultValues: {
      title: initialData?.title ?? "",
      platform: initialData?.platform ?? "",
      workLink: initialData?.workLink ?? "",
      description: initialData?.description ?? "",
      coverImage: initialData?.images[0].url ?? null,
    },
  });

  const selectedPlatform = watch("platform");

  useEffect(() => {
    // trigger validation on workLink when platform changes
    if (selectedPlatform !== undefined && startValidation) {
      trigger("workLink");
    }
  }, [selectedPlatform, trigger]);

  // Cleanup on unmount to prevent memory leak
  useEffect(() => {
    console.log(coverImagePreview);
    return () => {
      if (coverImagePreview) {
        URL.revokeObjectURL(coverImagePreview);
      }
    };
  }, [coverImagePreview]);

  // Handle file input change, update preview & react-hook-form value
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPassedCoverImagePreview(null);

    // Revoke previous object URL if it exists(to prevent memory leak)
    if (coverImagePreview) {
      URL.revokeObjectURL(coverImagePreview);
    }

    setValue("coverImage", file, { shouldValidate: true });
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
    } else {
      setCoverImagePreview(null);
    }
  };

  // Delete image preview and reset input + RHF value
  const handleDeleteImage = () => {
    setCoverImagePreview(null);
    setPassedCoverImagePreview(null);
    setValue("coverImage", null, { shouldValidate: true });
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onAddWork: SubmitHandler<FormData> = async (data) => {
    const result = await createLatestWork(
      data,
      data.coverImage as File,
      session?.user?.tokens?.accessToken as string
    );

    if (result.success) {
      toast.success("Successfully created latest work:");
      reset();
      setCoverImagePreview(null);
      setStartValidation(false);
    } else {
      console.error("Error:", result.error);
    }
  };

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (onSave) {
        await onSave(data, data.coverImage as File | null);
      } else {
        await onAddWork(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-secondary items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full min-h-screen bg-foreground flex flex-col text-white space-y-8 lg:p-24 md:p-16 sm:p-16 p-4"
      >
        {/* Image Section */}
        <div className="flex items-center space-x-4">
          <div className="relative w-32 h-32 rounded-md overflow-hidden border border-gray-700 bg-[#1a1a2e] flex items-center justify-center">
            {coverImagePreview ? (
              <Image
                src={coverImagePreview}
                alt="Cover Image"
                fill
                className="object-cover"
              />
            ) : passedCoverImagePreview ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/${passedCoverImagePreview}`}
                alt="Cover Image"
                fill
                className="object-cover"
              />
            ) : (
              <FaImage size={40} />
            )}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {/* Upload Button */}
            <label
              htmlFor="cover-upload"
              className="mt-2 flex items-center justify-center gap-3 bg-custom text-white p-3 rounded-lg max-w-md cursor-pointer"
            >
              <FaUpload size={24} />
              <span className="font-michroma text-lg">
                {coverImagePreview || passedCoverImagePreview
                  ? "Change Picture"
                  : "Upload Cover Picture"}
              </span>
            </label>

            {/* Single registered file input */}
            <input
              type="file"
              id="cover-upload"
              className="hidden"
              accept="image/*"
              {...register("coverImage", {
                validate: () => {
                  if (!startValidation) return true;
                  const value = watch("coverImage");
                  return value ? true : "Cover image is required";
                },
              })}
              onChange={onFileChange}
              ref={fileInputRef}
            />

            {/* Delete Button */}
            {(coverImagePreview || passedCoverImagePreview) && (
              <div
                onClick={handleDeleteImage}
                className="mt-2 bg-gradient-to-r flex items-center justify-center gap-3 from-purple-500 to-pink-500 text-white p-3 rounded-lg max-w-md cursor-pointer"
              >
                <MdDelete size={24} />
                <span className="font-michroma text-lg">Delete</span>
              </div>
            )}

            {/* Show error */}
            {errors.coverImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.coverImage.message}
              </p>
            )}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-xl font-michroma mb-2 block">Title</label>
          <Input
            placeholder="Enter a title"
            className="bg-[#1a1a2e] border-none p-7 text-white font-michroma"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Platform and Work Link */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1 space-y-1">
            <label className="text-xl font-michroma mb-2 block">
              Choose Platform
            </label>
            <div className="relative w-full">
              <select
                className="pl-10 pr-10 py-5 rounded-lg bg-[#1a1a2e] transition-transform transform hover:scale-105 appearance-none focus:outline-none focus:ring-2 focus:ring-opacity-50 w-full font-michroma"
                {...register("platform", {
                  required: "Platform is required",
                })}
              >
                <option value="" disabled hidden>
                  Select a platform
                </option>
                {platformOptions.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm">
                ▼
              </div>
            </div>
            {errors.platform && (
              <p className="text-red-500 text-sm">{errors.platform.message}</p>
            )}
          </div>

          <div className="flex-1 space-y-1">
            <label className="text-xl font-michroma mb-2 block">
              Work Link
            </label>
            <Input
              placeholder="https://www.youtube.com/watch?v=..."
              className="bg-[#1a1a2e] p-8 border-none text-white font-michroma"
              {...register("workLink", {
                required: "Work link is required",
                pattern: {
                  value: /^(https?:\/\/)/,
                  message: "Please enter a valid URL",
                },
                validate: (value) => {
                  const selectedPlatform = watch("platform") as Platform | "";
                  if (!selectedPlatform)
                    return "Please select a platform first";

                  const baseUrl = platformBaseUrls[selectedPlatform];
                  if (!baseUrl) return true; // no validation if no base URL defined

                  return value.startsWith(baseUrl)
                    ? true
                    : `URL must start with ${baseUrl}`;
                },
              })}
            />
            {errors.workLink && (
              <p className="text-red-500 text-sm">{errors.workLink.message}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="flex gap-2 w-full">
          <div className="space-y-1 w-full">
            <label className="text-xl font-michroma mb-2 block">
              Description
            </label>
            <Textarea
              placeholder="Describe your work in a few words"
              className="bg-[#1a1a2e] p-7 border-none text-white min-h-[100px] font-michroma"
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 10,
                  message: "Description must be at least 10 characters",
                },
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>

        {/* Save Button */}
        <Button
          type="submit"
          disabled={isLoading}
          onClick={() => setStartValidation(true)}
          className={`mt-2 bg-gradient-to-r flex items-center justify-center gap-3 from-purple-500 to-pink-500 text-white p-7 rounded-lg max-w-md cursor-pointer
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
            `}
        >
          <RiSave2Fill size={28} />
          <span className="font-michroma text-lg">
            {isLoading ? "Saving..." : "Save"}
          </span>
        </Button>
      </form>
    </div>
  );
};

export default AddWorkForm;
