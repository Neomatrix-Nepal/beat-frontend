"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Upload } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { MixingProTable } from "@/components/table/MixingProTable";
import { CustombeatsTable } from "@/components/table/CustombeatsTable";

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
 const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  return (
    <div className="min-h-screen bg-[#0F172A] p-6 font-michroma text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center   justify-between">
          <div className="flex ml-4  items-center gap-3">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={toggleSelectAll}
              className="w-4 h-4 accent-purple-600 rounded"
            />
            <span className="text-sm">Select All</span>
          </div>
        {  <div className="flex gap-2">
          <button
             className="flex items-center  font-michroma gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-transform transform hover:scale-105"
          >
           <IoMdCheckmark size={20}/>
            Sent
          </button>
          <button
             className="flex items-center font-michroma gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-transform transform hover:scale-105"
          >
            <RiDeleteBin6Line size={20} />
            Delete
          </button></div>}
        </div>

        <CustombeatsTable
          entries={visibleUploads}
          selectAll={selectAll}
          onSelectAll={toggleSelectAll}
          onSelectEntry={toggleSelectEntry}
          onDeleteEntry={deleteEntry}
        />

  <div className="mt-6 w-full font-michroma text-white flex justify-end items-center">
        <div className="flex">
          <Pagination>
            <PaginationContent className="flex items-center gap-2 p-2 rounded">
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  className={
                    currentPage === 1
                      ? "bg-gray-600 opacity-50"
                      : " border-2 border-white"
                  }
                />
              </PaginationItem>

              {currentPage > 1 && (
                <PaginationItem>
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="border-2 border-white text-white px-3 py-1 rounded hover:bg-slate-700"
                  >
                    {currentPage - 1}
                  </button>
                </PaginationItem>
              )}

              <PaginationItem>
                <button
                  disabled
                  className="bg-purple-700 text-white font-semibold px-3 py-1 rounded"
                >
                  {currentPage}
                </button>
              </PaginationItem>

              {currentPage < totalPages && (
                <PaginationItem>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="  text-white px-3 py-1 rounded border-2 border-white hover:bg-slate-700"
                  >
                    {currentPage + 1}
                  </button>
                </PaginationItem>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={goToNextPage}
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none bg-gray-600 opacity-50"
                      : " border-2 border-white"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      </div>
    </div>
  );
};

export default MixingProPage;
