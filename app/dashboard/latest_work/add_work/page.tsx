"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { RiSave2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaUpload } from "react-icons/fa6";
import logo from "@/image/logo.png";
import { createLatestWork } from "@/app/actions/work-action";
 import { Platform } from "../update_work/page";

 

export interface FormData {
  title: string;
  platform: Platform | "";
  workLink: string;
  description: string;
}

const AddWorkForm: React.FC = () => {
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const platformOptions = Object.values(Platform);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      platform: "",
      workLink: "",
      description: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setCoverImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setCoverImage(null); // reset to default logo
    setSelectedFile(null);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await createLatestWork(data, selectedFile);

    if (result.success) {
      console.log("Successfully created latest work:", result.data);
      reset();
      setCoverImage(null); // reset to default logo
      setSelectedFile(null);
    } else {
      console.error("Error:", result.error);
      // You might want to show an error message to the user here
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
            {coverImage ? (
              <Image
                src={coverImage}
                alt="Cover Image"
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <Image
                src={logo}
                alt="Default Logo"
                fill
                className="object-contain"
              />
            )}
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {/* Upload Button */}
            <label
              htmlFor="cover-upload"
              className="mt-2 flex items-center justify-center gap-3 bg-custom text-white p-3 rounded-lg max-w-md cursor-pointer"
            >
              <FaUpload size={24} />
              <span className="font-michroma text-lg">Change Picture</span>
            </label>
            <input
              type="file"
              id="cover-upload"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />

            {/* Delete Button */}
            <div
              onClick={handleDeleteImage}
              className="mt-2 bg-gradient-to-r flex items-center justify-center gap-3 from-purple-500 to-pink-500 text-white p-3 rounded-lg max-w-md cursor-pointer"
            >
              <MdDelete size={24} />
              <span className="font-michroma text-lg">Delete</span>
            </div>
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
                <option value="" disabled>
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
          className="mt-2 bg-gradient-to-r flex items-center justify-center gap-3 from-purple-500 to-pink-500 text-white p-7 rounded-lg max-w-md cursor-pointer"
        >
          <RiSave2Fill size={28} />
          <span className="font-michroma  text-lg">Save</span>
        </Button>
      </form>
    </div>
  );
};

export default AddWorkForm;
