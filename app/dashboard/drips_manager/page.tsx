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

interface Drip {
  id: string;
  title: string;
  price: number;
  size: string;
  uploadDate: string;
  selected: boolean;
}

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
                onChange={handleSelectAllDrips}
                className="w-5 h-5 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <p className="text-white font-michroma">Select All</p>
            </div>
            <button
              onClick={() => router.push("/dashboard/drips_manager/add_drips")}
              className="bg-gradient-to-r w-40 from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-4 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              <Upload size={24} />
              Upload
            </button>
          </div>

          <DripsTable
            drips={currentDrips}
            selectAll={selectAll}
            onSelectAll={handleSelectAllDrips}
            onSelectDrip={handleSelectDrip}
            onDeleteDrip={handleDeleteDrip}
          />

          <div className="mt-6 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={goToPreviousPage}
                    className={
                      currentPage === 1
                        ? "pointer-events-none bg-gray-600 opacity-50"
                        : "bg-white"
                    }
                  />
                </PaginationItem>
                <PaginationItem className="text-white text-sm px-3 py-1">
                  Page {currentPage} of {totalPages}
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={goToNextPage}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none bg-gray-600 opacity-50"
                        : "bg-white"
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

export default DripManager;