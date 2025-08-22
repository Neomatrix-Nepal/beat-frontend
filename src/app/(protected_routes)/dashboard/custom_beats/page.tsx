"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  fetchCustomBeats,
  updateCustomBeatStatus,
} from "@/src/app/actions/customs-beats-actions";
import { CustomBeat } from "@/src/types/custom-beats";
import { useSession } from "next-auth/react";

const BUTTON_CLASSES =
  "flex items-center gap-2 text-white font-michroma px-5 py-3 text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105";

const CustomBeatsPage = () => {
  const itemsPerPage = 10;
  const [beats, setBeats] = useState<CustomBeat[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();

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
          
          {isLoading ? (
            <div className="text-white font-michroma text-center">
              Loading...
            </div>
          ) : (
            <CustombeatsTable
              entries={visibleBeats}
              onDeleteEntry={(id: number) => {
                deleteCustomBeat(
                  id,
                  session?.user.tokens.accessToken as string
                );
              }}
              onStatusChange={(id:number, status:string)=>{
                updateCustomBeatStatus(
                  id,
                  status as "pending" | "completed" | "in_progress",
                  session?.user.tokens.accessToken as string
                );
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
