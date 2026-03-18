"use client";

import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/src/components/ui/pagination";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const ReusablePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showMax = 5;

    if (totalPages <= showMax) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) {
        pages.push("ellipsis-start");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis-end");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-4">
      {isLoading && (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs text-slate-400">Updating...</span>
        </div>
      )}
      <Pagination>
        <PaginationContent className="flex items-center gap-1">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 1 && !isLoading && onPageChange(currentPage - 1)}
              className={
                currentPage === 1 || isLoading
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer hover:bg-slate-800 border-slate-700"
              }
            />
          </PaginationItem>

          {getPageNumbers().map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <PaginationItem key={`${page}-${index}`}>
                  <PaginationEllipsis className="text-slate-500" />
                </PaginationItem>
              );
            }

            const pageNum = page as number;
            return (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => !isLoading && onPageChange(pageNum)}
                  isActive={currentPage === pageNum}
                  className={`cursor-pointer transition-colors ${
                    currentPage === pageNum
                      ? "bg-purple-700 text-white hover:bg-purple-600 border-purple-600"
                      : "text-slate-300 hover:bg-slate-800 border-slate-700"
                  } ${isLoading ? "pointer-events-none opacity-50" : ""}`}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages && !isLoading && onPageChange(currentPage + 1)}
              className={
                currentPage === totalPages || isLoading
                  ? "opacity-50 pointer-events-none"
                  : "cursor-pointer hover:bg-slate-800 border-slate-700"
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ReusablePagination;
