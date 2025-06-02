import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const DripForm = () => {
  return (
    <div className="w-full h-full bg-[#0b0b1d] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-[#0b0b1d] text-white space-y-4">
        {/* Image Section */}
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 rounded-md overflow-hidden">
            <Image
              src="/sample.jpg" // replace with actual image path
              alt="Drip Image"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full">
              Change picture
            </Button>
            <Button variant="outline" className="text-white border-white w-full">
              Delete
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <label className="text-sm">Drip Title</label>
          <Input
            placeholder="Classic Pink"
            className="bg-[#1a1a2e] border-none text-white"
          />
        </div>

        {/* Price and Size */}
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
          <div className="flex-1 space-y-1">
            <label className="text-sm">Price</label>
            <Input
              placeholder="$68"
              className="bg-[#1a1a2e] border-none text-white"
            />
          </div>
          <div className="flex-1 space-y-1">
            <label className="text-sm">Size</label>
            <Input
              placeholder="XS"
              className="bg-[#1a1a2e] border-none text-white"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm">Description</label>
          <Textarea
            placeholder="Simple Classic Merch with a logo"
            className="bg-[#1a1a2e] border-none text-white min-h-[100px]"
          />
        </div>

        {/* Save Button */}
        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white w-full">
          Save
        </Button>
      </div>
    </div>
  );
};

export default DripForm;
