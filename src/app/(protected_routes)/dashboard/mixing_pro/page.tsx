"use client";

import { MixingProEntry } from "@/src/components/dialog/mixingProDialog";
import { MixingProTable } from "@/src/components/table/MixingProTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import api from "@/src/hooks/useApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteMixingOrder } from "./action";
import toast from "react-hot-toast";

const BUTTON_CLASSES =
  "flex items-center gap-2 text-white px-5 py-3 font-michroma text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105";

const MixingProPage = () => {
  const [uploads, setUploads] = useState<MixingProEntry[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;

  // Fetch mixing orders from API
  const fetchMixingOrders = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/mixing-order?page=${page}&limit=${itemsPerPage}`
      );
      let data: MixingProEntry[] = [];
      let total = 0;

      // Handle different API response structures
      if (Array.isArray(response.data)) {
        // Flat array response
        data = response.data;
        total = response.data.length; // Approximate total; adjust if API provides total
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        // Nested data response
        data = response.data.data;
        total = response.data.meta?.total || data.length;
      } else {
        throw new Error("Unexpected API response format");
      }

      const formattedData = data.map((item: MixingProEntry) => ({
        ...item,
        selected: false,
      }));
      setUploads(formattedData);
      setTotalPages(Math.ceil(total / itemsPerPage) || 1); // Fallback to 1 page if total is 0
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to fetch mixing orders. Please try again.";
      setError(errorMessage);
      console.error("Error fetching mixing orders:", err);
      setUploads([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data when page changes
  useEffect(() => {
    fetchMixingOrders(currentPage);
  }, [currentPage, fetchMixingOrders]);

  // Memoize selected count
  const selectedCount = useMemo(
    () => uploads.filter((entry) => entry.selected).length,
    [uploads]
  );

  // Handlers
  const handleSelectAll = useCallback(() => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    setUploads((prev) => prev.map((entry) => ({ ...entry, selected: newVal })));
  }, [selectAll]);

  const handleSelectEntry = useCallback((id: number) => {
    setUploads((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, selected: !entry.selected } : entry
      )
    );
  }, []);

  const handleDeleteEntry = async (id: number) => {
    try {
      await deleteMixingOrder(id);
      setUploads((prev) => prev.filter((entry) => entry.id !== id));
      toast.success("Mixing order deleted successfully");
    } catch (err) {
      setError("Failed to delete mixing order. Please try again.");
      console.error("Error deleting entry:", err);
    }
  };

  const handleDeleteSelectedEntries = useCallback(async () => {
    const selectedIds = uploads
      .filter((entry) => entry.selected)
      .map((entry) => entry.id);
    try {
      await Promise.all(
        selectedIds.map((id) => api.delete(`/mixing-order/${id}`))
      );
      setUploads((prev) => prev.filter((entry) => !entry.selected));
      setSelectAll(false);
    } catch (err) {
      setError("Failed to delete selected mixing orders. Please try again.");
      console.error("Error deleting selected entries:", err);
    }
  }, [uploads]);

  const handleMarkAsSent = useCallback(async (id: number) => {
    try {
      await api.patch(`/mixing-order/${id}`, { status: "completed" });
      setUploads((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, status: "completed" } : entry
        )
      );
    } catch (err) {
      setError("Failed to update status. Please try again.");
      console.error("Error updating status:", err);
    }
  }, []);

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
          {/* Loading and Error States */}
          {isLoading && <p className="text-white font-michroma">Loading...</p>}
          {error && <p className="text-red-400 font-michroma">{error}</p>}

          {/* Header Controls */}
          <div className="gap-2 pl-4 mb-2 h-16 p-4 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              {selectedCount >= 2 && (
                <button
                  onClick={handleDeleteSelectedEntries}
                  className={BUTTON_CLASSES}
                >
                  <RiDeleteBin6Line size={20} />
                  Delete
                </button>
              )}
            </div>
          </div>

          {/* Table Display */}
          <MixingProTable
            entries={uploads}
            selectAll={selectAll}
            onSelectAll={handleSelectAll}
            onSelectEntry={handleSelectEntry}
            onDeleteEntry={handleDeleteEntry}
            onMarkAsSent={handleMarkAsSent}
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

export default MixingProPage;
