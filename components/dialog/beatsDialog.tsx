"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaCheckCircle } from "react-icons/fa";
import Image from "next/image";

import chat from "@/image/verctor/chat.png";
import mic from "@/image/verctor/mic.png";
import editor from "@/image/verctor/editor.png";
import headset from "@/image/verctor/headset.png";
import link from "@/image/verctor/link.png";
import music from "@/image/verctor/music.png";
import bpm from "@/image/verctor/bpm.png";
import key from "@/image/verctor/key.png";

type BeatSubmission = {
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

export default function BeatsDialogDetails({ onClose }: { onClose: () => void }) {
  const [submission, setSubmission] = useState<BeatSubmission | null>(null);

  useEffect(() => {
    const loadSubmissionData = async () => {
      const result: BeatSubmission = {
        id: 1,
        name: "Ravi Shrestha",
        email: "ravi@email.com",
        avatar: "https://i.pravatar.cc/150?img=1",
        genre: "Hip-Hop",
        style: "Exciting",
        needs: "140 BPM",
        fileLink: "#",
        instructions: "Add some echo in the second verse.",
        basePrice: 199.99,
        packages: [
          { name: "Book a Studio Time", price: "$50", included: true },
          { name: "Mixing Pro", price: "$149.99", included: true },
          { name: "Extra Option", price: "TBD", included: false },
        ],
      };

      setTimeout(() => setSubmission(result), 500);
    };

    loadSubmissionData();
  }, []);

  if (!submission) return null;

  const totalPrice = submission.packages
    .reduce((sum, pkg) => {
      const num = parseFloat(pkg.price.replace("$", ""));
      return sum + (isNaN(num) ? 0 : num);
    }, submission.basePrice)
    .toFixed(2);

  return (
    <div className="bg-[#0f0f10] text-white p-6 font-michroma rounded-xl shadow-xl max-w-5xl mx-auto space-y-6 border border-[#333]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
          <Image src={music} alt="icon" className="w-5 h-5" />
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
          <h3 className="text-center text-[#00e08f] text-lg mb-4">Submission Information</h3>
          <div className="flex items-center gap-4 mb-4">
            <img src={submission.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
            <div>
              <p className="text-md font-semibold text-[#ff5f5f]">{submission.name}</p>
              <p className="text-xs text-gray-300">{submission.email}</p>
            </div>
          </div>
          <InfoRow icon={headset.src} label="Music Genre" value={submission.genre} />
          <InfoRow icon={editor.src} label="Mood" value={submission.style} />
          <InfoRow icon={bpm.src} label="BPM" value="140 BPM" />
          <InfoRow icon={key.src} label="Song Key" value="C Minor" />
          <InfoRow icon={music.src} label="Instruments" value="Piano, Drums, Guitar" />
          <InfoRow
            icon={link.src}
            label="Reference Track"
            value={
              <a href={submission.fileLink} className="text-[#74f9e0] underline">
                Open File
              </a>
            }
          />
          <InfoRow icon={chat.src} label="Additional Instructions" value={submission.instructions} />
        </div>

        {/* Package Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">Beat Package</h3>
          <InfoRow
            label="Base Package"
            value={`$${submission.basePrice.toFixed(2)}`}
          />
          <ul className="space-y-2 text-sm text-gray-300">
            {submission.packages.map((pkg, index) => (
              <li className="flex justify-between items-center" key={index}>
                <div className="flex items-center gap-2">
                  {pkg.included && <FaCheckCircle className="text-[#74f9e0]" />}
                  <span>{pkg.name}</span>
                </div>
                <span>{pkg.price}</span>
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