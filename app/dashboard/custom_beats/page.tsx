"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CustombeatsTable } from "@/components/table/CustombeatsTable";

interface MixingProEntry {
  id: string;
  name: string;
  link: string;
  uploadDate: string;
  status: "Pending" | "Sent";
  selected: boolean;
}

const BUTTON_CLASSES =
 "flex items-center gap-2 text-white font-michroma px-5 py-3 text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105"
const CustomBeatsPage = () => {
  const router = useRouter();
  const itemsPerPage = 10;

  const generateMockData = (count: number): MixingProEntry[] => {
    const names = [
      "Ravi Gupta",
      "Aman Gupta",
      "Rohil Mehra",
      "Teki Shrestha",
      "Midnight Dreams",
      "Velvet Pulse",
      "Sunset Mirage",
      "Glass Waves",
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

  const selectedCount = uploads.filter((entry) => entry.selected).length;
  const totalPages = Math.ceil(uploads.length / itemsPerPage);
  const visibleUploads = uploads.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    setUploads(uploads.map((entry) => ({ ...entry, selected: newVal })));
  };

  const toggleSelectEntry = (id: string) => {
    setUploads(
      uploads.map((entry) =>
        entry.id === id ? { ...entry, selected: !entry.selected } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setUploads(uploads.filter((entry) => entry.id !== id));
  };

  const deleteSelectedEntries = () => {
    setUploads(uploads.filter((entry) => !entry.selected));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="gap-2 pl-4 mb-2 h-16 p-4 flex items-center justify-between">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="w-5 h-5 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <p className="text-white font-michroma">Select All</p>
            </div>
                          {selectedCount >= 2 && (

            <div className="flex gap-2">
              <button className={BUTTON_CLASSES}>
                <IoMdCheckmark size={20} />
                Sent
              </button>
                <button onClick={deleteSelectedEntries} className={BUTTON_CLASSES}>
                  <RiDeleteBin6Line size={20} />
                  Delete
                </button>
             
            </div> )}
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
                          : "border-2 border-white"
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
                        className="text-white px-3 py-1 rounded border-2 border-white hover:bg-slate-700"
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
                          : "border-2 border-white"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomBeatsPage;
