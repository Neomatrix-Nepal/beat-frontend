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
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { changeCreatorStatus, deleteCreator } from "./action";
import LoadingEffect from "@/src/components/loadingEffect";

import ReusablePagination from "@/src/components/shared/Pagination";
import { useRouter } from "next/navigation";

export default function CreatorsClient({
  creatorsData,
}: {
  creatorsData: { data: CreatorEntry[]; meta: any };
}) {
  const { data: session } = useSession();
  const token = session?.user?.tokens.accessToken;
  const [creators, setCreators] = useState<CreatorEntry[]>(creatorsData.data);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    setCreators(creatorsData.data);
    setIsLoading(false);
  }, [creatorsData]);

  const handleDeleteEntry = async (id: number) => {
    try {
      const result = await deleteCreator(id, token!);
      if (result.success) {
        setCreators(creators.filter((entry) => entry.id !== id));
        toast.success("Creator deleted successfully");
        router.refresh();
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

  const handlePageChange = (page: number) => {
    if (!isLoading) {
      setIsLoading(true);
      router.push(`?page=${page}&limit=${creatorsData.meta.limit || 10}`);
    }
  };

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

          <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{creators.length}</span> of <span className="text-white font-bold">{creatorsData.meta.total}</span> creators
            </div>
            <div className="flex">
              <ReusablePagination
                currentPage={creatorsData.meta.page}
                totalPages={creatorsData.meta.totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading && <LoadingEffect/>}
    </div>
  );
}
