"use client";

import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

import { updateCustomBeatStatus } from "@/src/app/actions/customs-beats-actions";

import { CustomBeat } from "@/src/types";

interface BeatsDialogDetailsProps {
  onClose: () => void;
  beat: CustomBeat | null;
}

export default function BeatsDialogDetails({
  onClose,
  beat,
}: BeatsDialogDetailsProps) {
  if (!beat) return null;

  const totalPrice = beat.packages
    .reduce((sum, pkg) => {
      const num = parseFloat(pkg.price);
      return sum + (isNaN(num) ? 0 : num);
    }, 0)
    .toFixed(2);

  return (
    <div className="bg-[#0f0f10] text-white p-6 font-michroma rounded-xl shadow-xl max-w-5xl mx-auto space-y-6 border border-[#333]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          <Image
            src={"/image/verctor/music.png"}
            alt="icon"
            className="w-5 h-5"
          />
          Custom Beat Submission Details
        </h2>
        <button
          onClick={onClose}
          className="text-xs text-[#74f9e0] px-3 py-1 rounded-full flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Close
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Submission Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">
            Submission Information
          </h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center">
              <span className="text-xl">{beat.name[0]}</span>
            </div>
            <div>
              <p className="text-md font-semibold text-[#ff5f5f]">
                {beat.name}
              </p>
              <p className="text-xs text-gray-300">{beat.email}</p>
            </div>
          </div>
          <InfoRow
            icon={"/image/verctor/headset.png"}
            label="Music Genre"
            value={beat.musicGenre || "Not specified"}
          />
          <InfoRow
            icon={"/image/verctor/editor.png"}
            label="Mood"
            value={beat.mood || "Not specified"}
          />
          <InfoRow
            icon={"/image/verctor/bpm.png"}
            label="BPM"
            value={beat.bpm.toString()}
          />
          <InfoRow
            icon={"/image/verctor/key.png"}
            label="Song Key"
            value={beat.songKey}
          />
          <InfoRow
            icon={"/image/verctor/music.png"}
            label="Instruments"
            value={beat.instruments.join(", ")}
          />
          <InfoRow
            icon={"/image/verctor/link.png"}
            label="Reference Track"
            value={
              <a
                href={beat.referenceTrack}
                className="text-[#74f9e0] underline"
              >
                Open File
              </a>
            }
          />
          <InfoRow
            icon={"/image/verctor/chat.png"}
            label="Additional Instructions"
            value={beat.additionalInstructions}
          />
        </div>

        {/* Package Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">
            Beat Package
          </h3>
          <ul className="space-y-2 text-sm text-gray-300">
            {beat.packages.map((pkg, index) => (
              <li className="flex justify-between items-center" key={index}>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#74f9e0]" />
                  <span>{pkg.name}</span>
                </div>
                <span>${pkg.price}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-[#374151] pt-3 flex justify-between font-semibold text-white">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div>
        <button
          onClick={() => {
            updateCustomBeatStatus(beat.id, "sent", (success) => {
              if (success) {
                onClose();
              }
            });
          }}
          className="bg-[#00e08f] hover:bg-[#00c97e] text-black px-5 py-2 rounded-md font-semibold text-sm flex items-center gap-2"
        >
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
