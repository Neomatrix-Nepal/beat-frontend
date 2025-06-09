"use client";
import React, { useState } from "react";
import { LatestWorkTable } from "../../../components/table/LatestWorkTable";
import { Upload } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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

  const generateWorks = (count: number): Work[] => {
    const titles = [
      "UI/UX Workflow",
      "Dev Setup",
      "Beat Setup",
      "Glass Waves",
      "Midnight",
      "Velvet",
      "Mirage",
    ];
    const platforms: ("YouTube" | "Spotify")[] = ["YouTube", "Spotify"];
    const descriptions = [
      "Modern UI guide",
      "Dev environment",
      "Audio tips",
      "CSS effects",
      "Dark design",
      "Animations",
      "Responsive",
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: (i + 1).toString(),
      title: titles[i % titles.length],
      description: descriptions[i % descriptions.length],
      platform: platforms[i % platforms.length],
      uploadDate: `2024-05-${((i % 28) + 1).toString().padStart(2, "0")}`,
      selected: false,
    }));
  };

  const [works, setWorks] = useState<Work[]>(generateWorks(50));
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(works.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentWorks = works.slice(startIndex, startIndex + itemsPerPage);

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

  const handleBatchDelete = () => {
    setWorks(works.filter((work) => !work.selected));
    setSelectAll(false);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const selectedCount = works.filter((work) => work.selected).length;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="flex-1 flex flex-col  mx-auto w-full p-4  sm:p-6">
        {/* Header controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllWorks}
                className="w-5 h-5 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span className="text-white font-michroma text-sm sm:text-base">
                Select All
              </span>
            </label>
            {selectedCount > 1 && (
              <button
                onClick={handleBatchDelete}
                className="flex items-center gap-2 text-white px-4 py-2 text-sm sm:text-base font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-transform transform hover:scale-105"
              >
                <RiDeleteBin6Line size={20} />
                Delete
              </button>
            )}
          </div>

          <button
            onClick={() => router.push("/dashboard/latest_work/add_work")}
            className=" w-full sm:w-40 bg-custom text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-transform duration-200 transform hover:scale-105"
          >
            <Upload size={20} />
            <span className="whitespace-nowrap text-sm sm:text-base">Upload</span>
          </button>
        </div>

        {/* Table container - make horizontally scrollable on small screens */}
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <LatestWorkTable
            works={currentWorks}
            selectAll={selectAll}
            onSelectAll={handleSelectAllWorks}
            onSelectWork={handleSelectWork}
            onDeleteWork={handleDeleteWork}
          />
        </div>

        {/* Pagination */}
        <div className="mt-6 w-full font-michroma text-white flex justify-center sm:justify-end items-center">
          <Pagination>
            <PaginationContent className="flex flex-wrap justify-center sm:justify-end items-center gap-2 p-2 rounded">
              <PaginationItem>
                <PaginationPrevious
                  onClick={goToPreviousPage}
                  className={
                    currentPage === 1
                      ? "bg-gray-600 opacity-50 cursor-not-allowed"
                      : "border-2 border-white cursor-pointer"
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
                      ? "pointer-events-none bg-gray-600 opacity-50 cursor-not-allowed"
                      : "border-2 border-white cursor-pointer"
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

export default LatestWorkManager;
