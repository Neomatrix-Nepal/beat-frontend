"use client";
import {
  deleteLatestWork,
  fetchLatestWorks,
  updateLatestWork,
} from "@/src/app/actions/work-action";
import { LatestWorkTable } from "@/src/components/table/LatestWorkTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { showDeleteToast } from "@/src/lib/util";
import { FormData, Platform } from "@/src/types/latest-work";
import { Upload, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { toDateInputValue } from "@/src/lib/utils";
import AddWorkForm from "@/src/components/form/WorkForm";

interface Image {
  id: number;
  product_id: number | null;
  latestWork_id: number;
  url: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Work {
  id: number;
  title: string;
  description: string;
  platform: Platform;
  workLink: string;
  uploadDate: string;
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
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<Meta>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

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

  const handleDeleteWork = useCallback(
    async (id: number) => {
      const work = works.find((w) => w.id === id);
      if (!work) return;

      try {
        const result = await deleteLatestWork(
          id,
          session?.user?.tokens?.accessToken as string
        );
        if (result.success) {
          setWorks((prevWorks) => prevWorks.filter((work) => work.id !== id));
          showDeleteToast("Deleted", work.title, id.toString());
        } else {
          setError(result.error);
        }
      } catch (err: any) {
        setError(err.message || "Failed to delete work");
      }
    },
    [works]
  );

  const handleEditWork = (work: Work) => {
    setEditingId(work.id);
  };

  const handleSaveEdit = async (data: FormData, imageFile: File | null) => {
    if (!editingId) {
      return;
    }

    const result = await updateLatestWork(
      editingId,
      session?.user?.tokens?.accessToken as string,
      data,
      imageFile
    );

    if (result.success) {
      const updatedWork: Work = {
        id: result.data.id,
        title: result.data.title,
        description: result.data.description,
        platform: result.data.platform,
        workLink: result.data.workLink,
        uploadDate: toDateInputValue(result.data.createdAt),
        images: result.data.images,
      };

      setWorks((prev) =>
        prev.map((w) => (w.id === editingId ? updatedWork : w))
      );
      toast.success("Successfully updated latest work:");
      setEditingId(null);
    } else {
      console.error("Error:", result.error);
    }
  };
  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(prev + 1, meta.totalPages));
  }, [meta.totalPages]);

  const currentWorks = useMemo(() => works, [works]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <div className="flex-1 flex flex-col mx-auto w-full p-4 sm:p-6">
        {loading && <p className="text-white font-michroma">Loading...</p>}
        {error && <p className="text-red-500 font-michroma">{error}</p>}
        <div className="flex justify-end gap-4 mb-4">
          <button
            onClick={() => router.push("/dashboard/latest_work/add_work")}
            className="flex items-center gap-2 cursor-pointer py-3 px-5 text-sm font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-transform transform hover:scale-105 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
            <Upload size={20} />
            <span className="font-michroma font-semibold">Upload</span>
          </button>
        </div>
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <LatestWorkTable
            works={currentWorks}
            onEditWork={handleEditWork}
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
      {editingId && (
        <div className="fixed z-100 inset-0">
          <div className="absolute inset-0 bg-black/70 z-90" />
          <div className="absolute z-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="absolute z-100 top-20 right-10 cursor-pointer"
              onClick={() => setEditingId(null)}
            >
              <X color="white" />
            </div>
            <AddWorkForm
              initialData={works.find((item) => item.id === editingId)}
              onSave={handleSaveEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestWorkManager;
