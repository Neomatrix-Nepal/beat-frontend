"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import chat from "@/image/verctor/chat.png";
import mic from "@/image/verctor/mic.png";
import editor from "@/image/verctor/editor.png";
import headset from "@/image/verctor/headset.png";
import link from "@/image/verctor/link.png";
import icon from '@/image/verctor/hamburger.png'
import Image from "next/image";
type MixingData = {
  id: number;
  name: string;
  email: string;
  avatar: string;
  genre: string;
  style: string;
  needs: string;
  fileLink: string;
  instructions: string;
  basePrice: number;
  packages: {
    name: string;
    price: string;
    included: boolean;
  }[];
};

export default function MixingProSubmissionDetails() {
  const [data, setData] = useState<MixingData | null>(null);

  // Simulate API call
  useEffect(() => {
    const fetchData = async () => {
      // Dummy data
      const result: MixingData = {
        id: 1,
        name: "Ravi Shrestha",
        email: "ravi@email.com",
        avatar: "https://i.pravatar.cc/150?img=1",
        genre: "Hip-Hop",
        style: "Crisp",
        needs: "I want something like Travis Scott’s style.",
        fileLink: "#",
        instructions: "Add some echo in the second verse.",
        basePrice: 149.99,
        packages: [
          { name: "Professional Mastering", price: "$25", included: true },
          { name: "Custom Beat Pro", price: "$199.99", included: true },
          { name: "Cute Boka Feature", price: "TBD", included: false },
          { name: "Promo Campaign", price: "$50", included: true },
        ],
      };

      // Simulate network delay
      setTimeout(() => setData(result), 500);
    };

    fetchData();
  }, []);

  if (!data) return <div className="text-white">Loading...</div>;

  const total = data.packages
    .reduce((sum, pkg) => {
      const num = parseFloat(pkg.price.replace("$", ""));
      return sum + (isNaN(num) ? 0 : num);
    }, data.basePrice)
    .toFixed(2);

  return (
    <div className="bg-[#1B1B1D] text-white p-6 font-michroma rounded-xl shadow-xl max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold flex items-center gap-2">
         <Image src={icon} alt="sd"></Image>
          Mixing Pro Submission Details
        </h2>
        <button className="text-sm text-[#74f9e0] flex items-center gap-1">
          <X className="w-4 h-4" /> Close
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-[#273142] p-6 rounded-lg space-y-3">
          <div className="flex items-center gap-3">
            <img
              src={data.avatar}
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-lg font-semibold text-[#e7625f]">
                {data.name}
              </p>
              <p className="text-sm text-gray-300">{data.email}</p>
            </div>
          </div>

          <InfoItem icon={headset.src} label="Music Genre" value={data.genre} />
          <InfoItem
            icon={editor.src}
            label="Preferred Mixing Style"
            value={data.style}
          />
          <InfoItem
            icon={mic.src}
            label="Music Needs"
            value={data.needs}
          />
          <InfoItem
            icon={link.src}
            label="File Upload"
            value={
              <a href={data.fileLink} className="text-[#74f9e0] underline">
                Open File
              </a>
            }
          />
          <InfoItem
            icon={chat.src}
            label="Additional Instructions"
            value={data.instructions}
          />
        </div>

        {/* Right Panel */}
        <div className="bg-[#273142] p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <h3 className="text-lg font-semibold">Mixing Package</h3>
            <p className="text-sm   text-right text-gray-400">
              Base Package:{" "}
              <span className="font-semibold text-white">
                ${data.basePrice.toFixed(2)}
              </span>
            </p>
          </div>
          <ul className="space-y-2 text-sm text-gray-300">
            {data.packages.map((pkg, index) => (
              <li className="flex justify-between" key={index}>
                <div className="flex items-center gap-2">
                 
                    <FaCheckCircle className="text-green-400" />
                
                  
                  <span>{pkg.name}</span>
                </div>
                <span>{pkg.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-gray-600 pt-3 flex justify-between font-semibold text-white">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      <div>
        <button className="bg-[#00e08f] hover:bg-[#00c97e] text-black px-6 py-2 rounded-md font-semibold text-sm">
          <div className="flex">
            <div className="mr-2">✔</div> Mark as Completed
          </div>
        </button>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: React.ReactNode;
}) {
return (
  <p className="flex  text-sm text-gray-400 items-center gap-2">
    <img src={icon} alt={label} className="w-4 h-4" />
    <div className="font-medium text-white whitespace-nowrap">{label}:</div>
    <div className="break-words">{value}</div>
  </p>
);

}
