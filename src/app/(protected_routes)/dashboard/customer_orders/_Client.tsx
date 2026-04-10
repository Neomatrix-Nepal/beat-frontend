"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { CustomerOrderTable } from "@/src/components/table/CustomerOrderTable";
import { Order } from "@/src/types";
import { changeStatus, deleteOrder } from "./action";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ReusablePagination from "@/src/components/shared/Pagination";

interface PaginationMetadata {
  page: number;
  pageSize?: number;
  total: number;
  totalPages: number;
}

const CustomerOrdersClient = ({
  orders: initialOrders,
  metadata,
}: {
  orders: Order[];
  metadata: PaginationMetadata;
}) => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const limit = metadata.pageSize || 10;

  console.log("ORDERS", orders)

  const { data: session } = useSession();

  // Update local state when initialOrders (from server component) change
  useEffect(() => {
    setOrders(initialOrders);
    setIsLoading(false);
  }, [initialOrders]);

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
    router.refresh();
  };

  const handlePageChange = (page: number) => {
    if (!isLoading) {
      setIsLoading(true);
      router.push(`?page=${page}&limit=${limit}`);
    }
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

          <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{orders.length}</span> of <span className="text-white font-bold">{metadata.total}</span> orders
            </div>
            <div className="flex">
              <ReusablePagination
                currentPage={metadata.page}
                totalPages={metadata.totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrdersClient;
