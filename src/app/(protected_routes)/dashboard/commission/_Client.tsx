"use client";

import { useState } from "react";

import { CustomerOrderTable } from "@/src/components/table/CustomerOrderTable";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { Commission } from "@/src/types";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { changePayoutStatus, deleteCommissionDetail } from "./action";
import { CommissionTable } from "@/src/components/table/CommissionTable";

const CommissionClient = ({
  commissions: initialCommissions,
}: {
  commissions: Commission[];
}) => {
  const [commissions, setCommissions] =
    useState<Commission[]>(initialCommissions);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(commissions.length / itemsPerPage);

  const { data: session } = useSession();

  //   const handleFilter = (status: string) => {
  //     if (status === "all") {
  //       setOrders(initialOrders);
  //     } else {
  //       setOrders(initialOrders.filter((order) => order.status === status));
  //     }
  //     setCurrentPage(1);
  //   };

  const handleChangeStatus = async (id: string) => {
    const { id: commissionId } = await changePayoutStatus(
      id,
      "paid",
      session?.user.tokens.accessToken as string
    );
    if (!commissionId) return toast.error("Failed to change status.");
    const updatedOrders = commissions.map((order) => {
      if (order.id.toString() === id) {
        return {
          ...order,
          status: "paid",
        };
      }
      return order;
    });

    setCommissions(updatedOrders);
    toast.success("Status changed successfully");
  };

  const deleteEntry = async (id: string) => {
    const { message } = await deleteCommissionDetail(
      id,
      session?.user.tokens.accessToken as string
    );
    if (!message) return toast.error("Failed to delete order.");
    toast.success("Order deleted successfully");
    setCommissions(commissions.filter((entry) => entry.id.toString() !== id));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="gap-2 pl-4 mb-2 h-16 p-4 flex items-center justify-end">
            <div className="flex font-michroma gap-2">
              <div className="relative inline-block">
                {/* <select
                  onChange={(e) => handleFilter(e.target.value)}
                  className="cursor-pointer pl-10 pr-4 py-3 text-sm font-semibold rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition-transform transform hover:scale-105 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                >
                  <option value="beats">Beats</option>
                  <option value="drips">Drips</option>
                </select> */}
                {/* <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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
                </div> */}
              </div>
            </div>
          </div>

          <CommissionTable
            entries={commissions}
            onDeleteEntry={deleteEntry}
            handleChangeStatus={handleChangeStatus}
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

export default CommissionClient;
