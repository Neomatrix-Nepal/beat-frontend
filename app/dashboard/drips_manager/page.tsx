// pages/dashboard/drips_manager/DripManager.tsx
"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { DripsTable } from "@/components/table/DripsTable";
import { Upload, } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import api from "@/hooks/useApi";
import { Drip } from "@/types/drip";

const BUTTON_CLASSES =
  "flex items-center gap-2 font-michroma text-white px-5 py-3 text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105";

const DripManager = () => {
  const router = useRouter();
  const [drips, setDrips] = useState<Drip[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 2; // Matches API limit

  // Fetch products from API
  const fetchProducts = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/products/getall?page=${page}&limit=${itemsPerPage}`);
      const { data, meta } = response.data;
      setDrips(data.map((item: Drip) => ({ ...item, selected: false })));
      setTotalPages(meta.totalPages);
    } catch (err) {
      setError("Failed to fetch products. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch products when page changes
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  // Memoize selected count
  const selectedCount = useMemo(() => drips.filter((drip) => drip.selected).length, [drips]);

  // Handlers
  const handleSelectAllDrips = useCallback(() => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setDrips((prev) => prev.map((drip) => ({ ...drip, selected: newSelectAll })));
  }, [selectAll]);

  const handleSelectDrip = useCallback((id: number) => {
    setDrips((prev) =>
      prev.map((drip) => (drip.id === id ? { ...drip, selected: !drip.selected } : drip))
    );
  }, []);

  const handleDeleteDrip = useCallback(
    async (id: number) => {
      try {
        await api.delete(`/products/${id}`);
        setDrips((prev) => prev.filter((drip) => drip.id !== id));
      } catch (err) {
        console.error("Failed to delete product:", err);
        setError("Failed to delete product. Please try again.");
      }
    },
    []
  );

  const handleDeleteSelectedDrips = useCallback(async () => {
    const selectedIds = drips.filter((drip) => drip.selected).map((drip) => drip.id);
    try {
      await Promise.all(selectedIds.map((id) => api.delete(`/products/${id}`)));
      setDrips((prev) => prev.filter((drip) => !drip.selected));
      setSelectAll(false);
    } catch (err) {
      console.error("Failed to delete selected products:", err);
      setError("Failed to delete selected products. Please try again.");
    }
  }, [drips]);

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
          {isLoading && <p className="text-white font-michroma">Loading...</p>}
          {error && <p className="text-red-400 font-michroma">{error}</p>}
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
                  {/* <RiDeleteBin6Line size={20} /> */}
                  Delete
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/dashboard/drips_manager/add_drips")}
                className="w-40 bg-custom text-white px-6 py-4 rounded-lg flex items-center gap-2 transition-all duration-200 transform hover:scale-105"
              >
                <Upload size={24} />
                Upload
              </button>
            </div>
          </div>

          <DripsTable
            drips={drips}
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
                    className={currentPage === 1 ? "bg-gray-600 opacity-50" : "border-2 border-white"}
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