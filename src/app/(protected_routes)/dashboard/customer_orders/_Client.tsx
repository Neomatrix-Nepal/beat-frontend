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
import { Order } from "@/src/types";
import { changeStatus, deleteOrder } from "./action";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

const CustomerOrdersClient = ({
  orders: initialOrders,
}: {
  orders: Order[];
}) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const { data: session } = useSession();

  const handleChangeStatus = async (id: string) => {
    const { id: orderId } = await changeStatus(
      id,
      "completed",
      session?.user.tokens.accessToken as string
    );
    if (!orderId) return toast.error("Failed to change status.");

    toast.success("Order marked as delivered");
    const updatedOrders = orders.map((order) => {
      if (order.id.toString() === id) {
        return {
          ...order,
          status: order.status === "pending" ? "completed" : "pending",
        };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const deleteEntry = async (id: string) => {
    const { message } = await deleteOrder(
      id,
      session?.user.tokens.accessToken as string
    );
    if (!message) return toast.error("Failed to delete order.");
    toast.success("Order deleted successfully");
    setOrders(orders.filter((entry) => entry.id.toString() !== id));
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
          
          <CustomerOrderTable
            entries={orders}
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

export default CustomerOrdersClient;
