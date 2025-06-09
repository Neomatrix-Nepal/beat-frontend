"use client";
import React, { useState } from "react";
import { DripsTable } from "../../../components/table/DripsTable";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Drip {
  id: string;
  title: string;
  price: number;
  size: string;
  uploadDate: string;
  selected: boolean;
}

const BUTTON_CLASSES =
  "flex items-center gap-2 px-5 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-transform transform hover:scale-105";

const DripManager = () => {
  const router = useRouter();

  const generateDrips = (count: number): Drip[] => {
    const titles = [
      "Summer Sweat",
      "Velvet Pulse",
      "Sunset Mirage",
      "Glass Waves",
      "Midnight Dreams",
    ];
    const sizes = ["XS", "S", "M", "L", "XL", "XXL", "XXS"];

    return Array.from({ length: count }, (_, i) => ({
      id: (i + 1).toString(),
      title: titles[i % titles.length],
      price: 20 + (i % 30), // price between 20-49
      size: sizes[i % sizes.length],
      uploadDate: `2024-05-${((i % 28) + 1).toString().padStart(2, "0")}`,
      selected: false,
    }));
  };

  const [drips, setDrips] = useState<Drip[]>(generateDrips(50));
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(drips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDrips = drips.slice(startIndex, startIndex + itemsPerPage);

  const selectedCount = drips.filter((drip) => drip.selected).length;

  const handleSelectAllDrips = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setDrips(drips.map((drip) => ({ ...drip, selected: newSelectAll })));
  };

  const handleSelectDrip = (id: string) => {
    setDrips(
      drips.map((drip) =>
        drip.id === id ? { ...drip, selected: !drip.selected } : drip
      )
    );
  };

  const handleDeleteDrip = (id: string) => {
    setDrips(drips.filter((drip) => drip.id !== id));
  };

  const handleDeleteSelectedDrips = () => {
    setDrips(drips.filter((drip) => !drip.selected));
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
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllDrips}
                className="w-5 h-5 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <p className="text-white font-michroma">Select All</p>
              {selectedCount >= 2 && (
                <button onClick={handleDeleteSelectedDrips} className={BUTTON_CLASSES}>
                  <RiDeleteBin6Line size={20} />
                  Delete
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/dashboard/drips_manager/add_drips")}
                className="  w-40 bg-custom text-white px-6 py-4 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
              >
                <Upload size={24} />
                Upload
              </button>

              
            </div>
          </div>

          <DripsTable
            drips={currentDrips}
            selectAll={selectAll}
            onSelectAll={handleSelectAllDrips}
            onSelectDrip={handleSelectDrip}
            onDeleteDrip={handleDeleteDrip}
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

export default DripManager;
