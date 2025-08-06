"use client";
import { Upload } from "lucide-react";
import { useState } from "react";
import { DripsTable } from "@/src/components/table/DripsTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { Genre, Product } from "@/src/types";
import toast from "react-hot-toast";
import { deleteProduct } from "./action";
import DripFormModal from "@/src/components/form/DripForm";

export default function _Client({ dripsData }: { dripsData: Product[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBeats, setSelectedBeats] = useState<Product | null>(null);

  const [beats, setBeats] = useState<Product[]>(dripsData || []);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(beats.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;

  const handleEditDrip = (beat: Product) => {
    setSelectedBeats(beat);
    setIsOpen(true);
  };

  const handleDeleteDrip = async (id: number) => {
    const { message } = await deleteProduct(id);
    if (!message) return toast.error("Failed to delete beat");
    setBeats(beats.filter((beat) => beat.id !== id));
    toast.success("Beat deleted successfully");
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
              <div className="flex gap-2 items-center"></div>

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

            {beats.length > 0 ? (
              <>
                <DripsTable
                  drips={beats}
                  onDeleteDrip={handleDeleteDrip}
                  onEditDrip={handleEditDrip}
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
              </>
            ) : (
              <>
                <div className="text-white text-center">No beats found</div>
              </>
            )}
          </div>
        </div>
      </div>
      <DripFormModal
        initialData={selectedBeats}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedBeats(null);
        }}
      />
    </>
  );
}
