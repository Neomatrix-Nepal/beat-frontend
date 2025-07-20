"use client";
import React, { useState } from "react";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Textarea } from "@/src/components/ui/textarea";
import Image from "next/image";
import { RiSave2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaUpload } from "react-icons/fa6";

const BeatForm = () => {
  const [coverImage, setCoverImage] = useState<string>("/sample.jpg");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
    setCoverImage("https://picsum.photos/536/354"); // Reset to default
  };

  return (
    <div className="min-h-screen w-full flex bg-secondary items-center justify-center">
      <div className="w-full min-h-screen bg-foreground flex flex-col text-white space-y-8 lg:p-24 md:p-16 sm:p-16 p-4">
        {/* Image Section */}
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="relative w-24 sm:w-32 md:w-40 aspect-square rounded-md overflow-hidden border border-gray-700">
              <Image
                src={"/image/logo.png"}
                alt="Beat Cover"
                fill
                className="object-cover"
              />
            </div>
            <label
              htmlFor="imageUpload"
              className="mt-2 text-sm text-gray-300 font-michroma cursor-pointer hover:text-purple-400 transition-colors"
            >
              Change Cover
            </label>

            {/* Hidden file input for image upload */}
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                // handle image change logic here
                const file = e.target.files?.[0];
                if (file) {
                  // e.g., create URL or upload
                }
              }}
            />
          </div>

          <div className="flex-1 flex flex-col gap-4">
            {/* Upload Button */}
            <label
              htmlFor="cover-upload"
              className="mt-2  flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-lg max-w-md cursor-pointer"
            >
              <FaUpload size={24} />
              <span className="font-michroma text-lg">Change beat</span>
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
          <label className="text-xl font-michroma mb-2 block">Beat Title</label>
          <Input
            placeholder="Midnight Dreams"
            className="bg-[#1a1a2e] border-none p-7 text-white font-michroma"
          />
        </div>

        {/* Price and Genre */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1 space-y-1">
            <label className="text-xl font-michroma mb-2 block">Price</label>
            <Input
              placeholder="$68"
              className="bg-[#1a1a2e] p-7 border-none text-white font-michroma"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xl font-michroma mb-2 block">Genre</label>
            <Input
              placeholder="Hip Hop"
              className="bg-[#1a1a2e] p-7 border-none text-white font-michroma"
            />
          </div>
        </div>

        {/* Description and Producer */}
        <div className="flex gap-2 w-full">
          <div className="space-y-1 w-full">
            <label className="text-xl font-michroma mb-2 block">
              Description
            </label>
            <Textarea
              placeholder="HipHop song with classic beats"
              className="bg-[#1a1a2e] p-7 border-none text-white min-h-[100px] font-michroma"
            />
          </div>
          <div className="space-y-1 w-full">
            <label className="text-xl font-michroma mb-2 block">Producer</label>
            <Textarea
              placeholder="Sunny Jaiswal"
              className="bg-[#1a1a2e] p-7 border-none text-white min-h-[100px] font-michroma"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-2 bg-gradient-to-r flex items-center gap-4 max-w-md justify-center p-4 rounded-lg from-purple-500 to-pink-500 text-white cursor-pointer">
          <RiSave2Fill size={28} />
          <span className="font-michroma text-lg">Save</span>
        </div>
      </div>
    </div>
  );
};

export default BeatForm;
