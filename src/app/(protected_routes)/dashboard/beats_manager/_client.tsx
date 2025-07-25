"use client";
import { Upload } from "lucide-react";
import { useState } from "react";

import BeatFormModal from "@/src/components/form/BeatForm";
import { BeatsTable } from "@/src/components/table/BeatsTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { Beat, Genre } from "@/src/types";
import { deleteProduct } from "./action";

export default function _Client({
  genres,
  beatData,
}: {
  genres: Genre[];
  beatData: Beat[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBeats, setSelectedBeats] = useState<Beat | null>(null);

  const [beats, setBeats] = useState<Beat[]>(beatData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(beats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const handleEditBeat = (beat: Beat) => {
    setSelectedBeats(beat);
    setIsOpen(true);
  };

  const handleDeleteBeat = async (id: string) => {
    const { message } = await deleteProduct(id);
    if (!message) return alert("Failed to delete beat");
    setBeats(beats.filter((beat) => beat.id.toString() !== id));
    alert("Beat deleted successfully");
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-6">
            <div className="gap-2 pl-4 mb-2 h-16 p-4 flex items-center justify-between">
              <div className="flex gap-2 items-center">
                {/* {selectedCount >= 1 && (
                  <button
                    className="flex items-center gap-2 font-michroma text-white px-5 py-3 text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105"
                    onClick={() =>
                      setBeats(beats.filter((beat) => !beat.selected))
                    }
                  >
                    <RiDeleteBin6Line />
                    Delete
                  </button>
                )} */}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => setIsOpen(true)}
                  className="bg-custom cursor-pointer  text-white px-6 py-3 rounded-lg flex justify-center items-center gap-2 transition-all duration-200 transform hover:scale-105"
                >
                  <Upload size={20} />
                  <span>Upload</span>
                </button>
              </div>
            </div>

            <BeatsTable
              beats={beats}
              onDeleteBeat={handleDeleteBeat}
              onEditBeat={handleEditBeat}
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
      <BeatFormModal
        initialData={selectedBeats}
        genres={genres}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
