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
import icon from "@/image/verctor/hamburger.png";
import bpm from "@/image/verctor/bpm.png";
import key from "@/image/verctor/key.png";
import music from "@/image/verctor/music.png";

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

export default function BeatsDialogDetails() {
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

  if (!submission) return <div className="text-white">Loading...</div>;

  const totalPrice = submission.packages.reduce((sum, pkg) => {
    const num = parseFloat(pkg.price.replace("$", ""));
    return sum + (isNaN(num) ? 0 : num);
  }, submission.basePrice).toFixed(2);

  return (
    <div className="bg-[#0f0f10] text-white p-6 font-michroma rounded-xl shadow-xl max-w-5xl mx-auto space-y-6 border border-[#374151]">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-[#374151] pb-2">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Image src={music} alt="icon" className="w-4 h-4" />
          Custom Beat Submission Details
        </h2>
        <button className="text-xs text-[#74f9e0] px-3 py-1 rounded-full flex items-center gap-1">
          <X className="w-3 h-3" />
          Close
        </button>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-4">
          <div className="flex items-center gap-4">
            <img src={submission.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
            <div>
              <p className="text-md font-semibold text-[#ff5f5f]">{submission.name}</p>
              <p className="text-xs text-gray-300">{submission.email}</p>
            </div>
          </div>

          <BeatInfoItem icon={headset.src} label="Music Genre" value={submission.genre} />
          <BeatInfoItem icon={editor.src} label="Mood" value={submission.style} />
          <BeatInfoItem icon={bpm.src} label="BPM" value="140 BPM" />
          <BeatInfoItem icon={key.src} label="Song Key" value="C Minor" />
          <BeatInfoItem icon={music.src} label="Instruments" value="Piano, Drums, Guitar" />
          <BeatInfoItem
            icon={link.src}
            label="Reference Track"
            value={
              <a href={submission.fileLink} className="text-[#74f9e0] underline">
                Open File
              </a>
            }
          />
          <BeatInfoItem
            icon={chat.src}
            label="Additional Instructions"
            value={submission.instructions}
          />
        </div>

        {/* Right Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-4">
          <div className="flex justify-between items-center border-b border-[#374151] pb-2">
            <h3 className="text-md font-semibold">Beat Package</h3>
            <p className="text-xs text-right text-[#b0b0b0]">
              Base Package:{" "}
              <span className="text-white font-semibold">
                ${submission.basePrice.toFixed(2)}
              </span>
            </p>
          </div>

          <ul className="space-y-3 text-sm text-gray-300">
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

      {/* Footer Button */}
      <div>
        <button className="bg-[#00e08f] hover:bg-[#00c97e] text-black px-6 py-2 rounded-md font-semibold text-sm flex items-center gap-2">
          ✔ Mark as Completed
        </button>
      </div>
    </div>
  );
}

function BeatInfoItem({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-2 text-sm text-gray-300">
      <img src={icon} alt={label} className="w-4 h-4 mt-1" />
      <div>
        <span className="text-white">{label}:</span>{" "}
        <span className="text-gray-300">{value}</span>
      </div>
    </div>
  );
}
