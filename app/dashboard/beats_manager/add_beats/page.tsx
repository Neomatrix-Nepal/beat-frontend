import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { RiSave2Fill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaUpload } from "react-icons/fa6";

const DripForm = () => {
  return (
    <div className="min-h-screen w-full flex bg-secondary items-center justify-center">
      <div className="w-full min-h-screen bg-foreground flex flex-col text-white space-y-8 lg:p-24 md:p-16 sm:p-16 p-4">
        
        {/* Image Section */}
        <div className="flex items-center space-x-4">
          <div className="relative bg-blue-600 w-32 h-32 rounded-md overflow-hidden" />

          <div className="flex-1 flex flex-col gap-4">
            {/* Upload Button */}
            <div className="mt-2 bg-gradient-to-r flex items-center justify-center gap-3 from-purple-500 to-pink-500 text-white p-4 rounded-lg max-w-md cursor-pointer">
              <FaUpload size={24} />
              <span className="font-michroma text-lg">Change Picture</span>
            </div>

            {/* Delete Button */}
            <div className="mt-2 bg-gradient-to-r flex items-center justify-center gap-3 from-purple-500 to-pink-500 text-white p-4 rounded-lg max-w-md cursor-pointer">
              <MdDelete size={24} />
              <span className="font-michroma text-lg">Delete</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-xl font-michroma mb-2 block">Drip Title</label>
          <Input
            placeholder="Classic Pink"
            className="bg-[#1a1a2e] border-none p-7 text-white font-michroma"
          />
        </div>

        {/* Price and Size */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1 space-y-1">
            <label className="text-xl font-michroma mb-2 block">Price</label>
            <Input
              placeholder="$68"
              className="bg-[#1a1a2e] p-7 border-none text-white font-michroma"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-xl font-michroma mb-2 block">Size</label>
            <Input
              placeholder="XS"
              className="bg-[#1a1a2e] p-7 border-none text-white font-michroma"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xl font-michroma mb-2 block">Description</label>
          <Textarea
            placeholder="Simple Classic Merch with a logo"
            className="bg-[#1a1a2e] p-7 border-none text-white min-h-[100px] font-michroma"
          />
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

export default DripForm;
