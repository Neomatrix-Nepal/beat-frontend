"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";

import { BeatsTable } from "../../../components/table/BeatsTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Beat {
  id: string;
  title: string;
  genre: string;
  price: number;
  producer: string;
  uploadDate: string;
  selected: boolean;
}

const DripManager = () => {
  const router = useRouter();

  const generateBeats = (count: number): Beat[] => {
    const genres = [
      "Trap",
      "R&B",
      "Hip Hop",
      "Pop",
      "Drill",
      "Ambient",
      "Jazz",
      "Electronic",
    ];
    const producers = [
      "Suraj Raj",
      "Irfan Aktar",
      "Hina Khan",
      "Chris Shift",
      "Zayn Ali",
      "Lina Wu",
      "Amit Joshi",
      "Tara V.",
    ];

    return Array.from({ length: count }, (_, i) => ({
      id: (i + 1).toString(),
      title: `Beat #${i + 1}`,
      genre: genres[i % genres.length],
      price: 20 + (i % 30), // price between 20-49
      producer: producers[i % producers.length],
      uploadDate: `2024-05-${((i % 28) + 1).toString().padStart(2, "0")}`,
      selected: false,
    }));
  };

  const [beats, setBeats] = useState<Beat[]>(generateBeats(50));
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(beats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBeats = beats.slice(startIndex, startIndex + itemsPerPage);

  const selectedCount = beats.filter((beat) => beat.selected).length;

  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setBeats(beats.map((beat) => ({ ...beat, selected: newSelectAll })));
  };

  const handleSelectBeat = (id: string) => {
    setBeats(
      beats.map((beat) =>
        beat.id === id ? { ...beat, selected: !beat.selected } : beat
      )
    );
  };

  const handleDeleteBeat = (id: string) => {
    setBeats(beats.filter((beat) => beat.id !== id));
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
                onChange={handleSelectAll}
                className="w-5 h-5 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
              />
              <p className="text-white font-michroma">Select All</p>

              {selectedCount >= 2 && (
                <button
                  className="flex items-center gap-2 text-white px-5 py-3 text-sm font-semibold rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-transform transform hover:scale-105"
                  onClick={() =>
                    setBeats(beats.filter((beat) => !beat.selected))
                  }
                >
                  <RiDeleteBin6Line />
                  Delete
                </button>
              )}
            </div>

            <button
              onClick={() => router.push("/dashboard/beats_manager/add_beats")}
              className="bg-gradient-to-r w-40 from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-4 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
            >
              <Upload size={24} />
              Upload
            </button>
          </div>

          <BeatsTable
            beats={currentBeats}
            selectAll={selectAll}
            onSelectAll={handleSelectAll}
            onSelectBeat={handleSelectBeat}
            onDeleteBeat={handleDeleteBeat}
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
