"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import chat from "@/image/verctor/chat.png";
import mic from "@/image/verctor/mic.png";
import editor from "@/image/verctor/editor.png";
import headset from "@/image/verctor/headset.png";
import link from "@/image/verctor/link.png";
import icon from '@/image/verctor/hamburger.png';
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

export default function MixingProSubmissionDetails({ onClose }: { onClose: () => void }) {
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

  if (!data) return null;

  const total = data.packages
    .reduce((sum, pkg) => {
      const num = parseFloat(pkg.price.replace("$", ""));
      return sum + (isNaN(num) ? 0 : num);
    }, data.basePrice)
    .toFixed(2);

  return (
    <div className="bg-[#0f0f10] text-white p-6 font-michroma rounded-xl shadow-xl max-w-4xl mx-auto space-y-6 border border-[#333]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          <Image src={icon} alt="icon" className="w-5 h-5" />
          Mixing Pro Submission Details
        </h2>
        <button
          onClick={onClose}
          className="text-xs text-[#74f9e0] px-3 py-1 rounded-full flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Close
        </button>
      </div>

      {/* Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Submission Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">Submission Information</h3>
          <div className="flex items-center gap-3 mb-4">
            <img src={data.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-lg font-semibold text-[#e7625f]">{data.name}</p>
              <p className="text-sm text-gray-300">{data.email}</p>
            </div>
          </div>
          <InfoRow icon={headset.src} label="Music Genre" value={data.genre} />
          <InfoRow icon={editor.src} label="Preferred Mixing Style" value={data.style} />
          <InfoRow icon={mic.src} label="Music Needs" value={data.needs} />
          <InfoRow
            icon={link.src}
            label="File Upload"
            value={
              <a href={data.fileLink} className="text-[#74f9e0] underline">
                Open File
              </a>
            }
          />
          <InfoRow icon={chat.src} label="Additional Instructions" value={data.instructions} />
        </div>

        {/* Package Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">Mixing Package</h3>
          <InfoRow
            label="Base Package"
            value={`$${data.basePrice.toFixed(2)}`}
          />
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

      {/* Action Button */}
      <div>
        <button className="bg-[#00e08f] hover:bg-[#00c97e] text-black px-5 py-2 rounded-md font-semibold text-sm flex items-center gap-2">
          <FaCheckCircle className="text-sm" />
          Mark as Completed
        </button>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="text-sm text-gray-300 flex items-center gap-2">
      {icon && <img src={icon} alt={label} className="w-4 h-4" />}
      <span className="text-[#8f8f8f]">{label}:</span>
      <span className="text-white">{value}</span>
    </div>
  );
}