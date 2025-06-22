"use client";

import React from "react";
import { X } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import chat from "@/image/verctor/chat.png";
import mic from "@/image/verctor/mic.png";
import editor from "@/image/verctor/editor.png";
import headset from "@/image/verctor/headset.png";
import link from "@/image/verctor/link.png";
import icon from "@/image/verctor/hamburger.png";
import Image from "next/image";

interface MixingProEntry {
  id: number;
  email: string;
  name: string;
  musicGenre: string;
  musicStyle: string;
  description: string;
  referenceTrack: string;
  additionalInstructions: string;
  status: "pending" | "sent";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  selected: boolean;
}

interface MixingProSubmissionDetailsProps {
  entry: MixingProEntry | null;
  onClose: () => void;
  onMarkAsCompleted?: (id: number) => void; // Optional callback for marking as completed
}

export default function MixingProSubmissionDetails({
  entry,
  onClose,
  onMarkAsCompleted,
}: MixingProSubmissionDetailsProps) {
  if (!entry) return null;

  // Fallbacks for fields not present in backend data
  const avatar = "https://i.pravatar.cc/150?img=1"; // Placeholder avatar
  const basePrice = 0; // Default base price if not provided
  const packages = []; // Empty packages array since not provided in backend

  const total = (basePrice).toFixed(2); // Total is just basePrice since no packages

  const handleMarkAsCompleted = () => {
    if (onMarkAsCompleted && entry.status !== "sent") {
      onMarkAsCompleted(entry.id);
    }
  };

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
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-lg font-semibold text-[#e7625f]">{entry.name}</p>
              <p className="text-sm text-gray-300">{entry.email}</p>
            </div>
          </div>
          <InfoRow icon={headset.src} label="Music Genre" value={entry.musicGenre} />
          <InfoRow icon={editor.src} label="Preferred Mixing Style" value={entry.musicStyle} />
          <InfoRow icon={mic.src} label="Music Needs" value={entry.description} />
          <InfoRow
            icon={link.src}
            label="File Upload"
            value={
              <a href={entry.referenceTrack} className="text-[#74f9e0] underline">
                Open File
              </a>
            }
          />
          <InfoRow icon={chat.src} label="Additional Instructions" value={entry.additionalInstructions} />
        </div>

        {/* Package Info Panel */}
        {/* <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">Mixing Package</h3>
          <InfoRow label="Base Package" value={`$${basePrice.toFixed(2)}`} />
          {packages.length > 0 ? (
            <ul className="space-y-2 text-sm text-gray-300">
              {packages.map((pkg, index) => (
                <li className="flex justify-between" key={index}>
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400" />
                    <span>{pkg.name}</span>
                  </div>
                  <span>{pkg.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-300">No additional packages selected.</p>
          )}
          <div className="mt-4 border-t border-gray-600 pt-3 flex justify-between font-semibold text-white">
            <span>Total:</span>
            <span>${total}</span>
          </div>
        </div> */}
      </div>

      {/* Action Button */}
      <div>
        <button
          onClick={handleMarkAsCompleted}
          disabled={entry.status === "sent"}
          className={`bg-[#00e08f] hover:bg-[#00c97e] text-black px-5 py-2 rounded-md font-semibold text-sm flex items-center gap-2 ${
            entry.status === "sent" ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaCheckCircle className="text-sm" />
          {entry.status === "sent" ? "Completed" : "Mark as Completed"}
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