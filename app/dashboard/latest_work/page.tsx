"use client";
import React, { useState } from "react";
import { LatestWorkTable } from "../../../components/table/LatestWorkTable";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

interface Work {
  id: string;
  title: string;
  description: string;
  platform: "YouTube" | "Spotify";
  uploadDate: string;
  selected: boolean;
}

const LatestWorkManager = () => {
  const router = useRouter();

  const [works, setWorks] = useState<Work[]>([
    {
      id: "1",
      title: "Modern UI/UX Design Workflow",
      description: "A quick guide to buildin",
      platform: "YouTube",
      uploadDate: "2024-06-01",
      selected: false,
    },
    {
      id: "2",
      title: "Ultimate Dev Setup Guide 2025",
      description: "A quick guide to buildin",
      platform: "YouTube",
      uploadDate: "2024-05-25",
      selected: false,
    },
    {
      id: "3",
      title: "Ultimate Beat Setup Guide 2025",
      description: "A quick guide to buildin",
      platform: "Spotify",
      uploadDate: "2024-05-21",
      selected: false,
    },
    {
      id: "4",
      title: "Glass Waves Description to2025",
      description: "A quick guide to buildin",
      platform: "Spotify",
      uploadDate: "2024-05-19",
      selected: false,
    },
    {
      id: "5",
      title: "Midnight Dreams",
      description: "A quick guide to buildin",
      platform: "YouTube",
      uploadDate: "2024-06-01",
      selected: false,
    },
    {
      id: "6",
      title: "Velvet Pulse",
      description: "A quick guide to buildin",
      platform: "Spotify",
      uploadDate: "2024-05-25",
      selected: false,
    },
    {
      id: "7",
      title: "Sunset Mirage",
      description: "A quick guide to buildin",
      platform: "YouTube",
      uploadDate: "2024-05-21",
      selected: false,
    },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllWorks = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setWorks(works.map((work) => ({ ...work, selected: newSelectAll })));
  };

  const handleSelectWork = (id: string) => {
    setWorks(
      works.map((work) =>
        work.id === id ? { ...work, selected: !work.selected } : work
      )
    );
  };

  const handleDeleteWork = (id: string) => {
    setWorks(works.filter((work) => work.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* Button aligned right */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => router.push("/dashboard/latest_work/add_work")}
              className="bg-gradient-to-r w-40 from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-4 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              <Upload size={24} />
              Upload
            </button>
          </div>

          {/* Latest Work Table */}
          <LatestWorkTable
            works={works}
            selectAll={selectAll}
            onSelectAll={handleSelectAllWorks}
            onSelectWork={handleSelectWork}
            onDeleteWork={handleDeleteWork}
          />
        </div>
      </div>
    </div>
  );
};

export default LatestWorkManager;