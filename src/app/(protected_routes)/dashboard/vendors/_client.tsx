"use client";

import React, { useState, useEffect } from "react";
import { VendorUser, FetchVendorsResponse } from "@/src/types/vendor.type";
import { toggleVendorStatus } from "./action";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, Calendar, ShieldCheck, ShieldAlert } from "lucide-react";
import ReusablePagination from "@/src/components/shared/Pagination";
import { formatDateTime } from "@/src/lib/utils";
import LoadingEffect from "@/src/components/loadingEffect";

interface VendorsClientProps {
  vendorsData: FetchVendorsResponse;
}

export default function VendorsClient({ vendorsData }: VendorsClientProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [vendors, setVendors] = useState<VendorUser[]>(vendorsData.data);
  const [loading, setLoading] = useState<number | null>(null);
  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    setVendors(vendorsData.data);
    setIsLoadingPage(false);
  }, [vendorsData]);

  const handleToggleStatus = async (vendor: VendorUser) => {
    setLoading(vendor.id);
    const oldStatus = vendor.isActive;

    // Optimistic UI update
    setVendors((prev) =>
      prev.map((v) => (v.id === vendor.id ? { ...v, isActive: !oldStatus } : v))
    );

    try {
      const response = await toggleVendorStatus(vendor.id, session?.user?.tokens.accessToken!);
      if (response.success) {
        toast.success(`Creator ${!oldStatus ? "activated" : "deactivated"} successfully`);
        router.refresh();
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
      // Revert on error
      setVendors((prev) =>
        prev.map((v) => (v.id === vendor.id ? { ...v, isActive: oldStatus } : v))
      );
    } finally {
      setLoading(null);
    }
  };

  const handlePageChange = (page: number) => {
    if (!isLoadingPage) {
      setIsLoadingPage(true);
      router.push(`?page=${page}&limit=${vendorsData.meta.limit}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6">
          <div className="bg-[#101828] rounded-xl border border-[#1D2939] overflow-hidden font-michroma">
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#1A2233] text-[#E4E4E7] border-b border-[#2C3A4F]">
                  <tr>
                    <th className="text-center p-4">Creator</th>
                    <th className="text-left p-4">Contact</th>
                    <th className="text-left p-4">Joined Date</th>
                    <th className="text-center p-4">Status</th>
                    <th className="text-center p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vendors.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">
                        No creators found in the system.
                      </td>
                    </tr>
                  ) : (
                    vendors.map((vendor, index) => (
                      <tr
                        key={vendor.id}
                        className={`border-b border-[#2C3A4F] hover:bg-[#1A2233]/50 transition-colors ${
                          index % 2 === 0 ? "bg-[#1C2433]" : "bg-[#1A1F2E]"
                        }`}
                      >
                        <td className="p-4 text-white font-medium text-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-[#2C3A4F] flex items-center justify-center overflow-hidden shrink-0">
                              {vendor.image?.url ? (
                                <img src={vendor.image.url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <User className="w-5 h-5 text-gray-500" />
                              )}
                            </div>
                            <div className="text-left">
                              <div className="text-sm font-bold text-white transition-colors">
                                {vendor.fullname}
                              </div>
                              <div className="text-[10px] text-gray-500 font-sans">ID: {vendor.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-white font-medium">
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-[11px] text-gray-400 font-sans">
                              <Mail className="w-3.5 h-3.5 text-[#00e08f]/50" />
                              {vendor.email}
                            </div>
                            {vendor.phoneNumber && (
                              <div className="flex items-center gap-2 text-[11px] text-gray-500 font-sans">
                                <Phone className="w-3.5 h-3.5 text-blue-500/50" />
                                {vendor.phoneNumber}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-white xl">
                          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-sans">
                            <Calendar className="w-3.5 h-3.5 text-purple-500/50" />
                            {formatDateTime(vendor.created_at).split(",")[0]}
                          </div>
                        </td>
                        <td className="p-4 text-center font-semibold">
                          <div
                            className={`border-2 font-medium p-2 rounded-md text-center max-w-[120px] mx-auto text-xs
                              ${
                                vendor.isActive
                                  ? "bg-green-800/20 text-green-400 border-green-800/30"
                                  : "bg-red-800/20 text-red-400 border-red-800/30"
                              }
                            `}
                          >
                            {vendor.isActive ? "Active" : "Inactive"}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleToggleStatus(vendor)}
                              disabled={loading === vendor.id}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none disabled:opacity-50 active:scale-95
                                ${vendor.isActive ? "bg-[#00e08f]" : "bg-[#2C3A4F]"}
                              `}
                            >
                              {loading === vendor.id ? (
                                <div className="mx-auto w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                                    vendor.isActive ? "translate-x-6" : "translate-x-1"
                                  }`}
                                />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden space-y-4 p-4">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  className="bg-[#1A1F2E] rounded-lg p-4 border border-[#2C3A4F]"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#2C3A4F] flex items-center justify-center overflow-hidden shrink-0">
                      {vendor.image?.url ? (
                        <img src={vendor.image.url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{vendor.fullname}</h3>
                      <p className="text-gray-400 text-xs">ID: {vendor.id}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Mail className="w-4 h-4 text-[#00e08f]" />
                      {vendor.email}
                    </div>
                    {vendor.phoneNumber && (
                      <div className="flex items-center gap-2 text-sm text-gray-300">
                        <Phone className="w-4 h-4 text-blue-400" />
                        {vendor.phoneNumber}
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      {formatDateTime(vendor.created_at).split(",")[0]}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 border-t border-[#2C3A4F] pt-3">
                    <div
                      className={`border-2 font-medium px-3 py-1 rounded-md text-center text-xs
                        ${
                          vendor.isActive
                            ? "bg-green-800/20 text-green-400 border-green-800/30"
                            : "bg-red-800/20 text-red-400 border-red-800/30"
                        }
                      `}
                    >
                      {vendor.isActive ? "Active" : "Inactive"}
                    </div>
                    
                    <button
                      onClick={() => handleToggleStatus(vendor)}
                      disabled={loading === vendor.id}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all focus:outline-none disabled:opacity-50 active:scale-95
                        ${vendor.isActive ? "bg-[#00e08f]" : "bg-[#2C3A4F]"}
                      `}
                    >
                      {loading === vendor.id ? (
                        <div className="mx-auto w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                            vendor.isActive ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white font-bold">{vendors.length}</span> of{" "}
              <span className="text-white font-bold">{vendorsData.meta.total}</span> vendors
            </div>
            <div className="flex">
              <ReusablePagination
                currentPage={vendorsData.meta.page}
                totalPages={vendorsData.meta.totalPages}
                onPageChange={handlePageChange}
                isLoading={isLoadingPage}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoadingPage && <LoadingEffect />}
    </div>
  );
}
