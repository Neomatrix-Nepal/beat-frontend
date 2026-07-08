"use client";

import { useState } from "react";

import { CommissionTable } from "@/src/components/table/CommissionTable";
import { Commission } from "@/src/types";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { changePayoutStatus, deleteCommissionDetail } from "./action";

import ReusablePagination from "@/src/components/shared/Pagination";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const CommissionClient = ({
  commissionsData,
}: {
  commissionsData: { data: Commission[]; meta: any };
}) => {
  const [commissions, setCommissions] = useState<Commission[]>(
    commissionsData.data
  );
  const [isLoading, setIsLoading] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<Set<string>>(new Set());
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    setCommissions(commissionsData.data);
    setIsLoading(false);
  }, [commissionsData]);

  const handleChangeStatus = async (id: string) => {
    setUpdatingIds((prev) => new Set(prev).add(id));
    try {
      const { id: commissionId } = await changePayoutStatus(
        id,
        "paid",
        session?.user.tokens.accessToken as string
      );
      if (!commissionId) {
        toast.error("Failed to change status.");
        return;
      }
      setCommissions((prev) =>
        prev.map((order) =>
          order.id.toString() === id ? { ...order, status: "paid" } : order
        )
      );
      toast.success("Status changed successfully");
    } catch {
      toast.error("Failed to change status.");
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const deleteEntry = async (id: string) => {
    const { message } = await deleteCommissionDetail(
      id,
      session?.user.tokens.accessToken as string
    );
    toast.success("Order deleted successfully");
    setCommissions(commissions.filter((entry) => entry.id.toString() !== id));
    router.refresh();
  };

  const handlePageChange = (page: number) => {
    if (!isLoading) {
      setIsLoading(true);
      router.push(`?page=${page}&limit=${commissionsData.meta.limit || 10}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="gap-2 pl-4 mb-2 h-16 p-4 flex items-center justify-end">
            <div className="flex font-michroma gap-2"></div>
          </div>

          <CommissionTable
            entries={commissions}
            onDeleteEntry={deleteEntry}
            handleChangeStatus={handleChangeStatus}
            updatingIds={updatingIds}
          />

          <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{commissions.length}</span> of <span className="text-white font-bold">{commissionsData.meta.total}</span> commissions
            </div>
            <div className="flex">
              <ReusablePagination
                currentPage={commissionsData.meta.page}
                totalPages={commissionsData.meta.totalPages}
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

export default CommissionClient;
