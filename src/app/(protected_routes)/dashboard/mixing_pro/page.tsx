"use client";

import { MixingProEntry } from "@/src/components/dialog/mixingProDialog";
import { MixingProTable } from "@/src/components/table/MixingProTable";
import api from "@/src/hooks/useApi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteMixingOrder } from "./action";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import ReusablePagination from "@/src/components/shared/Pagination";

const BUTTON_CLASSES =
  "flex items-center gap-2 text-white px-5 py-3 font-michroma text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105";

const MixingProPage = () => {
  const [uploads, setUploads] = useState<MixingProEntry[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 10;
  const { data: session } = useSession();

  const fetchMixingOrders = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(
        `/mixing-order?page=${page}&limit=${itemsPerPage}`
      );
      let data: MixingProEntry[] = [];
      let total = 0;

      if (Array.isArray(response.data)) {
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
  }, [itemsPerPage]);

  // Fetch data when page changes
  useEffect(() => {
    fetchMixingOrders(currentPage);
  }, [currentPage, fetchMixingOrders]);

  const handleDeleteEntry = async (id: number) => {
    try {
      await deleteMixingOrder(id, session?.user.tokens.accessToken as string);
      setUploads((prev) => prev.filter((entry) => entry.id !== id));
      toast.success("Mixing order deleted successfully");
    } catch (err) {
      toast.error("Failed to delete Mixing order");
      console.error("Error deleting entry:", err);
    }
  };

  const handleMarkAsSent = useCallback(async (id: number) => {
    try {
      await api.patch(`/mixing-order/${id}`, { status: "completed" });
      setUploads((prev) =>
        prev.map((entry) =>
          entry.id === id ? { ...entry, status: "completed" } : entry
        )
      );
      toast.success("Order marked as delivered")
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Failed to update status. Please try again");
    }
  }, []);


  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 md:p-6">
          {/* Loading and Error States */}
          {isLoading && <p className="text-white font-michroma">Loading...</p>}
          {error && <p className="text-red-400 font-michroma">{error}</p>}

          {/* Table Display */}
          <MixingProTable
            entries={uploads}
            onDeleteEntry={handleDeleteEntry}
            onMarkAsSent={handleMarkAsSent}
          />

          <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{uploads.length}</span> of <span className="text-white font-bold">{totalPages * itemsPerPage}</span> orders
            </div>
            <div className="flex">
              <ReusablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MixingProPage;
