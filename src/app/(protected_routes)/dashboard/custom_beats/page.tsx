"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { CustombeatsTable } from "@/src/components/table/CustombeatsTable";
import {
  deleteCustomBeat,
  deleteMultipleCustomBeats,
  fetchCustomBeats,
} from "@/src/app/actions/customs-beats-actions";
import { CustomBeat } from "@/src/types/custom-beats";

const BUTTON_CLASSES =
  "flex items-center gap-2 text-white font-michroma px-5 py-3 text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105";

const CustomBeatsPage = () => {
  const router = useRouter();
  const itemsPerPage = 10;
  const [beats, setBeats] = useState<CustomBeat[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBeatsCallback = useCallback((response: any) => {
    setBeats(
      response.data.map((beat: CustomBeat) => ({
        ...beat,
        selected: false,
      }))
    );
    setTotalPages(response.meta.totalPages);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetchCustomBeats(currentPage, itemsPerPage, fetchBeatsCallback).finally(
      () => setIsLoading(false)
    );
  }, [currentPage, fetchBeatsCallback]);

  const selectedCount = beats.filter((entry) => entry.selected).length;
  const visibleBeats = beats.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    // setBeats(beats.map((entry) => ({ ...entry, selected: newVal })));
  };

  const toggleSelectEntry = (id: number) => {
    // setBeats(
    //   beats.map((entry) =>
    //     entry.id === id ? { ...entry, selected: !entry.selected } : entry
    //   )
    // );
  };

  const deleteSelectedEntries = () => {
    const selectedIds = beats
      .filter((entry) => entry.selected)
      .map((entry) => entry.id);

    deleteMultipleCustomBeats(selectedIds, (success) => {
      if (success) {
        fetchCustomBeats(currentPage, itemsPerPage, fetchBeatsCallback);
        setSelectAll(false);
      }
    });
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
            {selectedCount >= 2 && (
              <div className="flex gap-2">
                <button className={BUTTON_CLASSES}>
                  <IoMdCheckmark size={20} />
                  Sent
                </button>
                <button
                  onClick={deleteSelectedEntries}
                  className={BUTTON_CLASSES}
                >
                  <RiDeleteBin6Line size={20} />
                  Delete
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="text-white font-michroma text-center">
              Loading...
            </div>
          ) : (
            <CustombeatsTable
              entries={visibleBeats}
              selectAll={selectAll}
              onSelectAll={toggleSelectAll}
              onSelectEntry={toggleSelectEntry}
              onDeleteEntry={(id: string) => {
                deleteCustomBeat(Number(id), () => {
                  fetchCustomBeats(
                    currentPage,
                    itemsPerPage,
                    fetchBeatsCallback
                  );
                });
              }}
            />
          )}

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
