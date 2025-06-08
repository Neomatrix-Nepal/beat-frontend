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
import { CreatorEntry, CreatorTable } from "@/components/table/CreatorsTable";

const CreatorsPage = () => {
  const router = useRouter();

  const generateMockCreators = (count: number): CreatorEntry[] => {
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

    return Array.from({ length: count }, (_, i) => ({
      id: `${i + 1}`,
      name: names[i % names.length],
      style: "Hip Hop",
      socialMediaUrl: "https://example.com",
      demoBeat: "https://example.com/demo",
      selected: false,
    }));
  };

  const [creators, setCreators] = useState<CreatorEntry[]>(generateMockCreators(50));
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(creators.length / itemsPerPage);
  const visibleCreators = creators.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    setCreators(creators.map(entry => ({ ...entry, selected: newVal })));
  };

  const toggleSelectEntry = (id: string) => {
    setCreators(creators.map(entry =>
      entry.id === id ? { ...entry, selected: !entry.selected } : entry
    ));
  };

  const deleteEntry = (id: string) => {
    setCreators(creators.filter(entry => entry.id !== id));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const selectedCount = creators.filter(c => c.selected).length;

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
                 
                <button className="flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-transform transform hover:scale-105">
                  <RiDeleteBin6Line size={20} />
                  Delete
                </button>
              </div>
            )}
          </div>

          <CreatorTable
            entries={visibleCreators}
            selectAll={selectAll}
            onSelectAll={toggleSelectAll}
            onSelectEntry={toggleSelectEntry}
            onDeleteEntry={deleteEntry}
          />

          <div className="mt-6 w-full font-michroma text-white flex justify-end items-center">
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
  );
};

export default CreatorsPage;
