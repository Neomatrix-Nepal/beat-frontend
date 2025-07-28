"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { CustomerOrderTable } from "@/src/components/table/CustomerOrderTable";
import { CustomerOrderEntry } from "@/src/types";

const CustomerOrdersPage = () => {
  const router = useRouter();

  const generateMockOrders = (count: number): CustomerOrderEntry[] => {
    const customerNames = [
      "Ravi Gupta",
      "Aman Gupta",
      "Rohil Mehra",
      "Teki Shrestha",
      "Midnight Dreams",
      "Velvet Pulse",
      "Sunset Mirage",
      "Glass Waves",
    ];
    const products = [
      "Midnight Dream",
      "Dark Vibes",
      "Real Fantasy",
      "Realistic Coach",
      "Midday Vibes",
      "Sunny Vibes",
      "Winter Beat",
    ];
    const statuses: CustomerOrderEntry["status"][] = [
      "Paid",
      "Pending",
      "Failed",
    ];
    return Array.from({ length: count }, (_, i) => ({
      id: `${112 + i}`,
      customerName: customerNames[i % customerNames.length],
      product: products[i % products.length],
      price: `$${47 + (i % 53)}`,
      orderDate: "2024-01-15",
      status: statuses[i % statuses.length],
      selected: false,
    }));
  };

  const [orders, setOrders] = useState<CustomerOrderEntry[]>(
    generateMockOrders(50)
  );
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const visibleOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    const newVal = !selectAll;
    setSelectAll(newVal);
    setOrders(orders.map((entry) => ({ ...entry, selected: newVal })));
  };

  const toggleSelectEntry = (id: string) => {
    setOrders(
      orders.map((entry) =>
        entry.id === id ? { ...entry, selected: !entry.selected } : entry
      )
    );
  };

  const deleteEntry = (id: string) => {
    setOrders(orders.filter((entry) => entry.id !== id));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const selectedCount = orders.filter((entry) => entry.selected).length;

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="gap-2 pl-4 mb-2 h-16 p-4 flex items-center justify-end">
            <div className="flex font-michroma gap-2">
              {selectedCount > 1 && (
                <button
                  className="flex items-center gap-2 font-michroma text-white px-5 py-3 text-sm font-semibold rounded-lg bg-custom transition-transform transform hover:scale-105"
                  onClick={() =>
                    setOrders(orders.filter((order) => !order.selected))
                  }
                >
                  <RiDeleteBin6Line />
                  Delete
                </button>
              )}

              <div className="relative inline-block">
                <select className="cursor-pointer pl-10 pr-4 py-3 text-sm font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-transform transform hover:scale-105 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
                  <option value="beats">Beats</option>
                  <option value="drips">Drips</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <CustomerOrderTable
            entries={visibleOrders}
            selectAll={selectAll}
            onSelectAll={toggleSelectAll}
            onSelectEntry={toggleSelectEntry}
            onDeleteEntry={deleteEntry}
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

export default CustomerOrdersPage;
