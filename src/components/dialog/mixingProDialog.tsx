"use client";

import { Blend, X } from "lucide-react";
import React, { useState } from "react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";

export interface MixingProEntry {
  id: number;
  email: string;
  name: string;
  musicGenre: string | null;
  musicStyle: string | null;
  description: string;
  referenceTrack: string;
  additionalInstructions: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  selected: boolean;
  packages: {
    id: number;
    name: string;
    price: string;
  }[];
}

interface MixingProSubmissionDetailsProps {
  entry: MixingProEntry | null;
  onClose: () => void;
  onStatusChange: (id: number) => void;
}

export default function MixingProSubmissionDetails({
  entry,
  onClose,
  onStatusChange,
}: MixingProSubmissionDetailsProps) {
  if (!entry) return null;

    const [completed, setCompleted] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

  // Fallbacks for fields not present in backend data
  const avatar = "https://i.pravatar.cc/150?img=1";
  const basePrice = 149.99; // Default base price from image

  const packageTotal = entry.packages.reduce(
    (sum, pkg) => sum + parseFloat(pkg.price || "0"),
    0
  );
  const total = (basePrice + packageTotal).toFixed(2);

  const handleMarkAsCompleted = async(entry:MixingProEntry) => {
    setLoading(true);
    try{
      await Promise.resolve(onStatusChange(entry.id));
      setCompleted(true);
    }catch(error){
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0f0f10] text-white p-6 font-michroma rounded-xl shadow-xl max-w-4xl mx-auto space-y-6 border border-[#333]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          <Blend className="w-5 h-5" />
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
          <h3 className="text-center text-[#00e08f] text-lg mb-4">
            Submission Information
          </h3>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center shrink-0">
              <span className="text-xl">{entry.name[0].toLocaleUpperCase()}</span>
            </div>
            <div className="min-w-0">
              <p className="text-lg font-semibold text-[#e7625f]">
                {entry.name}
              </p>
              <p className="text-sm text-gray-300 break-words">{entry.email}</p>
            </div>
          </div>
          <InfoRow
            icon={"/image/verctor/headset.png"}
            label="Music Genre"
            value={entry.musicGenre || "N/A"}
          />
          <InfoRow
            icon={"/image/verctor/mic.png"}
            label="Music Needs"
            value={entry.description}
          />
          <InfoRow
            icon={"/image/verctor/link.png"}
            label="File Upload"
            value={
              <a
                href={entry.referenceTrack}
                className="text-[#74f9e0] underline"
              >
                Open File
              </a>
            }
          />
          {entry.additionalInstructions &&
            <InfoRow
              icon={"/image/verctor/chat.png"}
              label="Additional Instructions"
              value={entry.additionalInstructions}
            />
          }
        </div>

        {/* Package Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">
            Mixing Package
          </h3>
          <InfoRow label="Base Package" value={`$${basePrice.toFixed(2)}`} />
          <ul className="space-y-2 text-sm text-gray-300">
            {entry.packages.map((pkg, index) => (
              <li className="flex justify-between" key={index}>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-400" />
                  <span>{pkg.name}</span>
                </div>
                <span>{pkg.price}</span>
              </li>
            ))}
            <li className="flex justify-between">
              <div className="flex items-center gap-2"></div>
            </li>
          </ul>
          <div className="mt-4 border-t border-gray-600 pt-3 flex justify-between font-semibold text-white">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      {
        (entry.status !== "completed" && !completed) &&
        <div>
          <button
            onClick={()=>handleMarkAsCompleted(entry)} 
            className={` hover:bg-[#00c97e] text-black px-5 py-2 rounded-md font-semibold text-sm flex items-center gap-2
              ${loading ? "bg-[#00c97e]" : "bg-[#00e08f]"}
            `}>
              {loading ? (
                  <div className="w-7 h-7 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaCheck className="text-sm" />
                  Mark as Delivered
                </>
              )}
          </button>
        </div>
      }
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
