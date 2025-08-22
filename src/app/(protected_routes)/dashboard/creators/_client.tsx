"use client";

import { CreatorTable } from "@/src/components/table/CreatorsTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { CreatorEntry } from "@/src/types/creator";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { changeCreatorStatus, deleteCreator } from "./action";
import LoadingEffect from "@/src/components/loadingEffect";

export default function CreatorsClient({
  creators: initialCreators,
}: {
  creators: CreatorEntry[];
}) {
  const { data: session } = useSession();
  const token = session?.user?.tokens.accessToken;
  const [creators, setCreators] = useState<CreatorEntry[]>(initialCreators);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteEntry = async (id: number) => {
    try {
      const result = await deleteCreator(id, token!);
      if (result.success) {
        setCreators(creators.filter((entry) => entry.id !== id));
        toast.success("Creator deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete creator");
      }
    } catch (error) {
      toast.error("Failed to delete creator");
    }
  };

  const handleChangeStatus = async (
    producerRequestId: number,
    status: string
  ) => {
    setIsLoading(true);
    try {
      const result = await changeCreatorStatus(
        producerRequestId,
        { status },
        token!
      );
      setIsLoading(false);
      if (result.success) {
        toast.success(result.message || "Creator approved successfully");
        setCreators(
          creators.map((entry) =>
            entry.id === producerRequestId
              ? {
                  ...entry,
                  status: status as "pending" | "approved" | "reject",
                }
              : entry
          )
        );
      } else {
        toast.error(result.error || "Failed to approve creator");
      }
    } catch (error) {
      toast.error("Failed to approve creator");
    } finally {
      setIsLoading(false);
    }
  };

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <CreatorTable
            entries={creators}
            onDeleteEntry={handleDeleteEntry}
            onChangeStatus={handleChangeStatus}
            isLoading={isLoading}
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
      {isLoading && <LoadingEffect/>}
    </div>
  );
}
