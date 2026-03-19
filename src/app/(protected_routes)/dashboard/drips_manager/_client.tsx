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
import { Product } from "@/src/types";
import toast from "react-hot-toast";
import DripFormModal from "@/src/components/form/DripForm";
import { deleteProduct } from "../beats_manager/action";
import { useSession } from "next-auth/react";

import ReusablePagination from "@/src/components/shared/Pagination";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function _Client({
  dripsData,
}: {
  dripsData: { data: Product[]; meta: any };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBeats, setSelectedBeats] = useState<Product | null>(null);

  const [beats, setBeats] = useState<Product[]>(dripsData.data);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    setBeats(dripsData.data);
    setIsLoading(false);
  }, [dripsData]);

  const handleEditDrip = (beat: Product) => {
    setSelectedBeats(beat);
    setIsOpen(true);
  };

  const handleDeleteDrip = async (id: number) => {
    setIsLoading(true);
    try {
      const { message } = await deleteProduct(
        id.toString(),
        session?.user?.tokens?.accessToken as string
      );
      if (!message) {
        setIsLoading(false);
        return toast.error("Failed to delete beat");
      }
      toast.success("Beat deleted successfully");
      router.refresh();
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while deleting");
    }
  };

  const handlePageChange = (page: number) => {
    if (!isLoading) {
      setIsLoading(true);
      router.push(`?page=${page}&limit=${dripsData.meta.limit || 10}`);
    }
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
                  className="flex items-center gap-2 cursor-pointer py-3 px-5 text-sm font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-transform transform hover:scale-105 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <Upload size={20} />
                  <span className="font-michroma font-semibold">Upload</span>
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

                <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="text-sm text-slate-400">
                    Showing <span className="text-white font-bold">{beats.length}</span> of <span className="text-white font-bold">{dripsData.meta.total}</span> drips
                  </div>
                  <div className="flex">
                    <ReusablePagination
                      currentPage={dripsData.meta.page}
                      totalPages={dripsData.meta.totalPages}
                      onPageChange={handlePageChange}
                      isLoading={isLoading}
                    />
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
        allBeats={beats}
        setAllBeats={setBeats}
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
