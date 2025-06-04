"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MixingProTable } from "@/components/table/MixingProTable";

interface MixingProEntry {
  id: string;
  name: string;
  link: string;
  uploadDate: string;
  status: "Pending" | "Sent";
  selected: boolean;
}

const MixingProPage = () => {
  const router = useRouter();

  const generateMockData = (count: number): MixingProEntry[] => {
  const names = [
    "Ravi Gupta", "Aman Gupta", "Rohil Mehra", "Teki Shrestha",
    "Midnight Dreams", "Velvet Pulse", "Sunset Mirage", "Glass Waves",
     "Ravi Gupta", "Aman Gupta", "Rohil Mehra", "Teki Shrestha",
    "Midnight Dreams", "Velvet Pulse", "Sunset Mirage", "Glass Waves",
     "Ravi Gupta", "Aman Gupta", "Rohil Mehra", "Teki Shrestha",
    "Midnight Dreams", "Velvet Pulse", "Sunset Mirage", "Glass Waves",
  ];
  const statuses: MixingProEntry["status"][] = ["Pending", "Sent"];

  return Array.from({ length: count }, (_, i) => ({
    id: `${i + 1}`,
    name: names[i % names.length],
    link: "https://drive.gc",
    uploadDate: `2024-05-${String(19 + (i % 10)).padStart(2, "0")}`,
    status: statuses[i % statuses.length],
    selected: false,
  }));
};

  const [uploads, setUploads] = useState<MixingProEntry[]>(generateMockData(50));
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(uploads.length / itemsPerPage);
  const visibleUploads = uploads.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const toggleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    setUploads(uploads.map(entry => ({ ...entry, selected: newVal })));
  };

  const toggleSelectEntry = (id: string) => {
    setUploads(uploads.map(entry =>
      entry.id === id ? { ...entry, selected: !entry.selected } : entry
    ));
  };

  const deleteEntry = (id: string) => {
    setUploads(uploads.filter(entry => entry.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-6 font-michroma text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex ml-4 items-center gap-3">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="w-4 h-4 accent-purple-600 rounded"
            />
            <span className="text-sm">Select All</span>
          </div>
          <button
            onClick={() => router.push("/dashboard/beats_manager/add_beats")}
            className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-transform transform hover:scale-105"
          >
            <Upload size={18} />
            Upload
          </button>
        </div>

        <MixingProTable
          entries={visibleUploads}
          selectAll={selectAll}
          onSelectAll={toggleSelectAll}
          onSelectEntry={toggleSelectEntry}
          onDeleteEntry={deleteEntry}
        />

        <div className="flex justify-center">
          <Pagination>
            <PaginationContent className="gap-2">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={
                    currentPage === 1
                      ? "pointer-events-none bg-gray-700 text-white opacity-50"
                      : "bg-gray-200 text-black hover:bg-white"
                  }
                />
              </PaginationItem>
              <PaginationItem className="px-4 text-sm text-gray-300">
                Page {currentPage} of {totalPages}
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none bg-gray-700 text-white opacity-50"
                      : "bg-gray-200 text-black hover:bg-white"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default MixingProPage;
