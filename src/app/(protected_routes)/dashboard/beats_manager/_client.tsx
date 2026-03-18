/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Upload } from "lucide-react";
import { useState } from "react";

import BeatFormModal from "@/src/components/form/BeatForm";
import { BeatsTable } from "@/src/components/table/BeatsTable";
import { Product, Genre } from "@/src/types";
import toast from "react-hot-toast";
import { deleteProduct, getBeats } from "./action";
import { useSession } from "next-auth/react";
import ReusablePagination from "@/src/components/shared/Pagination";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function _Client({
  genres,
  beatData,
}: {
  genres: Genre[];
  beatData: { data: Product[]; meta: any };
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBeats, setSelectedBeats] = useState<Product | null>(null);

  const [beats, setBeats] = useState<Product[]>(beatData.data || []);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  // Update local state when beatData (from server component) change
  useEffect(() => {
    setBeats(beatData.data);
    setIsLoading(false);
  }, [beatData]);

  const fetchBeats = async () => {
    try {
      const response = await getBeats("digital-asset", beatData.meta.page);
      setBeats(response.data);
      router.refresh();
    } catch (error) {
      console.error("Failed to fetch beats:", error);
      toast.error("Failed to refresh beats list");
    }
  };

  const handleEditBeat = (beat: Product) => {
    setSelectedBeats(beat);
    setIsOpen(true);
  };

  const handleDeleteBeat = async (id: string) => {
    const { message } = await deleteProduct(
      id,
      session?.user?.tokens?.accessToken as string
    );
    if (!message) return toast.error("Failed to delete beat");
    setBeats(beats.filter((beat) => beat.id.toString() !== id));
    toast.success("Beat deleted successfully");
    router.refresh();
  };

  const handlePageChange = (page: number) => {
    if (!isLoading) {
      setIsLoading(true);
      router.push(`?page=${page}&limit=${beatData.meta.limit || 10}`);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-900 flex">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 p-2 lg:p-6">
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
                <BeatsTable
                  beats={beats}
                  onDeleteBeat={handleDeleteBeat}
                  onEditBeat={handleEditBeat}
                />

                <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="text-sm text-slate-400">
                    Showing <span className="text-white font-bold">{beats.length}</span> of <span className="text-white font-bold">{beatData.meta.total}</span> beats
                  </div>
                  <div className="flex">
                    <ReusablePagination
                      currentPage={beatData.meta.page}
                      totalPages={beatData.meta.totalPages}
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
      <BeatFormModal
        initialData={selectedBeats}
        genres={genres}
        isOpen={isOpen}
        onSuccess={fetchBeats}
        onClose={() => {
          setIsOpen(false);
          setSelectedBeats(null);
        }}
      />
    </>
  );
}
