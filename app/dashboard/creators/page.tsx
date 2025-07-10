"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { CreatorTable  } from "@/components/table/CreatorsTable";
import { fetchCreators, deleteMultipleCreators, deleteCreator, approveCreator, CreatorEntry, FetchCreatorsResponse } from "@/app/actions/creator-actions";
import { showDeleteToast, showUpdateToast } from "@/lib/util";

interface FrontendCreatorEntry extends CreatorEntry {
  name: string;
  style: string;
  socialMediaUrl: string;
  selected: boolean;
}

const ITEMS_PER_PAGE = 10;

const CreatorsPage = () => {
  const router = useRouter();
  const [creators, setCreators] = useState<FrontendCreatorEntry[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (page: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: FetchCreatorsResponse = await fetchCreators(page, ITEMS_PER_PAGE);
      setCreators(response.data.map(creator => ({
        ...creator,
        name: creator.producername,
        style: creator.producerStyle,
        socialMediaUrl: creator.sociamediaurl,
        selected: false,
      })));
      console.log(response)
      setTotalPages(response.meta.totalPages);
    } catch (error: any) {
      console.error('Error fetching creators:', error);
      setError(error.message || 'Failed to fetch creators');
      showDeleteToast('Error', 'Failed to fetch creators', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  const toggleSelectAll = useCallback(() => {
    setSelectAll(prev => {
      const newVal = !prev;
      setCreators(creators.map(entry => ({ ...entry, selected: newVal })));
      return newVal;
    });
  }, [creators]);

  const toggleSelectEntry = useCallback((id: string) => {
    setCreators(prev =>
      prev.map(entry =>
        entry.id === id ? { ...entry, selected: !entry.selected } : entry
      )
    );
  }, []);

  const handleDeleteEntry = useCallback(async (id: string) => {
    try {
      const result = await deleteCreator(id);
      if (result.success) {
        showDeleteToast('Success', 'Creator deleted successfully', 'success');
        fetchData(currentPage);
      } else {
        showDeleteToast('Error', result.error || 'Failed to delete creator', 'error');
      }
    } catch (error) {
      showDeleteToast('Error', 'Failed to delete creator', 'error');
    }
  }, [currentPage, fetchData]);

  const handleDeleteMultiple = useCallback(async () => {
    const selectedIds = creators.filter(c => c.selected).map(c => c.id);
    if (selectedIds.length === 0) return;

    try {
      const result = await deleteMultipleCreators(selectedIds);
      if (result.success) {
        showDeleteToast('Success', 'Selected creators deleted successfully', 'success');
        setSelectAll(false);
        fetchData(currentPage);
      } else {
        showDeleteToast('Error', result.error || 'Failed to delete creators', 'error');
      }
    } catch (error) {
      showDeleteToast('Error', 'Failed to delete creators', 'error');
    }
  }, [creators, currentPage, fetchData]);

  const handleApproveCreator = useCallback(async (id: string) => {
    try {
      const result = await approveCreator(id, 'producer');
      if (result.success) {
        showUpdateToast('Success', 'Creator approved successfully', 'success');
        fetchData(currentPage);
      } else {
        showUpdateToast('Error', result.error || 'Failed to approve creator', 'error');
      }
    } catch (error) {
      showUpdateToast('Error', 'Failed to approve creator', 'error');
    }
  }, [currentPage, fetchData]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  }, [totalPages]);

  const selectedCount = creators.filter(c => c.selected).length;

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="gap-2 pl-4 mb-2 h-16 p-4 flex items-center justify-between">
            <div className="flex gap-2">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={toggleSelectAll}
                className="w-5 h-5 text-purple-600 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                disabled={isLoading}
              />
              <p className="text-white font-michroma">Select All</p>
            </div>

            {selectedCount >= 1 && (
              <div className="flex gap-2">
                <button
                  onClick={handleDeleteMultiple}
                  className="flex items-center font-michroma gap-2 text-white px-5 py-3 text-sm font-semibold rounded-lg bg-red-600 transition-transform transform hover:scale-105"
                  disabled={isLoading}
                >
                  <RiDeleteBin6Line size={20} />
                  Delete Selected ({selectedCount})
                </button>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="text-white font-michroma text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-400 font-michroma text-center">{error}</div>
          ) : (
            <CreatorTable
              entries={creators}
              selectAll={selectAll}
              onSelectAll={toggleSelectAll}
              onSelectEntry={toggleSelectEntry}
              onDeleteEntry={handleDeleteEntry}
              onApproveEntry={handleApproveCreator}
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

export default CreatorsPage;