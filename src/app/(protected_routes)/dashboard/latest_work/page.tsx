// page.tsx
"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { LatestWorkTable } from "@/src/components/table/LatestWorkTable";
import { Upload } from "lucide-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import {
  fetchLatestWorks,
  deleteLatestWork,
  deleteMultipleLatestWorks,
} from "@/src/app/actions/work-action"; // Import new functions
import { showDeleteToast } from "@/src/lib/util"; // Import toast utility
import { Platform } from "@/src/types/latest-work";

interface Image {
  id: number;
  product_id: number | null;
  latestWork_id: number;
  url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

interface Work {
  id: number;
  title: string;
  description: string;
  platform: Platform;
  workLink: string;
  uploadDate: string;
  selected: boolean;
  images: Image[];
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const LatestWorkManager: React.FC = () => {
  const router = useRouter();
  const [works, setWorks] = useState<Work[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchLatestWorks(currentPage, meta.limit);
      const worksWithSelection = response.data.map((work) => ({
        ...work,
        selected: false,
        uploadDate: new Date(work.createdAt).toISOString().split("T")[0],
      }));
      setWorks(worksWithSelection);
      setMeta(response.meta);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, meta.limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectAllWorks = useCallback(() => {
    setSelectAll((prev) => {
      const newSelectAll = !prev;
      setWorks((prevWorks) =>
        prevWorks.map((work) => ({ ...work, selected: newSelectAll }))
      );
      return newSelectAll;
    });
  }, []);

  const handleSelectWork = useCallback((id: number) => {
    setWorks((prevWorks) =>
      prevWorks.map((work) =>
        work.id === id ? { ...work, selected: !work.selected } : work
      )
    );
  }, []);

  // page.tsx
  const handleDeleteWork = useCallback(
    async (id: number) => {
      const work = works.find((w) => w.id === id);
      if (!work) return;

      if (confirm(`Are you sure you want to delete "${work.title}"?`)) {
        try {
          const result = await deleteLatestWork(id);
          if (result.success) {
            setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
            showDeleteToast("Deleted", work.title, id.toString());
          } else {
            setError(result.error);
          }
        } catch (err: any) {
          setError(err.message || "Failed to delete work");
        }
      }
    },
    [works]
  );

  const handleBatchDelete = useCallback(async () => {
    const selectedWorks = works.filter((work) => work.selected);
    const selectedIds = selectedWorks.map((work) => work.id);

    if (selectedIds.length === 0) return;

    if (
      confirm(
        `Are you sure you want to delete ${selectedIds.length} selected work(s)?`
      )
    ) {
      try {
        const result = await deleteMultipleLatestWorks(selectedIds);
        if (result.success) {
          setWorks((prevWorks) => prevWorks.filter((work) => !work.selected));
          setSelectAll(false);
          selectedWorks.forEach((work) => {
            showDeleteToast("Deleted", work.title, work.id.toString());
          });
        } else {
          setError(result.error);
        }
      } catch (err: any) {
        setError(err.message || "Failed to delete selected works");
      }
    }
  }, [works]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, meta.totalPages));
  }, [meta.totalPages]);

  const currentWorks = useMemo(() => works, [works]);

  const selectedCount = useMemo(
    () => works.filter((work) => work.selected).length,
    [works]
  );

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="flex-1 flex flex-col mx-auto w-full p-4 sm:p-6">
        {loading && <p className="text-white font-michroma">Loading...</p>}
        {error && <p className="text-red-500 font-michroma">{error}</p>}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            {selectedCount > 0 && ( // Changed to show button when at least one is selected
              <button
                onClick={handleBatchDelete}
                className="flex items-center gap-2 font-michroma text-white px-5 py-3 text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105"
              >
                <RiDeleteBin6Line size={20} />
                Delete Selected
              </button>
            )}
          </div>
          <button
            onClick={() => router.push("/dashboard/latest_work/add_work")}
            className="w-full sm:w-40 bg-custom text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-transform duration-200 transform hover:scale-105"
          >
            <Upload size={20} />
            <span className="whitespace-nowrap text-sm sm:text-base">
              Upload
            </span>
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <LatestWorkTable
            works={currentWorks}
            selectAll={selectAll}
            onSelectAll={handleSelectAllWorks}
            onSelectWork={handleSelectWork}
            onDeleteWork={handleDeleteWork}
          />
        </div>
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
                {currentPage < meta.totalPages && (
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
                      currentPage === meta.totalPages
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
  );
};

export default LatestWorkManager;
