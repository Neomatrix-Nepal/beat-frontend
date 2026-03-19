"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination";
import { formatDateTime } from "@/src/lib/utils";
import { StudioBooking } from "@/src/types/studio-booking";
import { Check, Eye, Trash, X } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { changeBookingStatus, deleteBooking } from "./action";
import { IoMdEye } from "react-icons/io";
import ConfirmPopUp from "@/src/components/ui/confirmPopUp";
import LoadingEffect from "@/src/components/loadingEffect";
import PopupWrapper from "@/src/components/shared/PopupWrapper";
import StudioBookingDetails from "@/src/components/dialog/studioBookingDialog";

import ReusablePagination from "@/src/components/shared/Pagination";
import { useRouter } from "next/navigation";

const statusStyles = {
  confirmed: "bg-green-800/20 text-green-400 border-green-800/30",
  pending: "bg-yellow-700/20 text-yellow-400 border-yellow-700/30",
  cancelled: "bg-red-800/20 text-red-400 border-red-800/30",
};

export default function ManageBookings({
  bookingsData,
}: {
  bookingsData: { data: StudioBooking[]; meta: any };
}) {
  const [bookings, setBookings] = useState<StudioBooking[]>(bookingsData.data);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<StudioBooking | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);

  const { data: session } = useSession();
  const token = session?.user?.tokens.accessToken;
  const router = useRouter();

  useEffect(() => {
    setBookings(
      bookingsData.data.map((booking) => ({
        ...booking,
        status: formatStatus(booking.status),
      }))
    );
    setIsLoading(false);
  }, [bookingsData]);

  const openModal = (booking: StudioBooking) => {
    setSelectedBooking(booking);
    setViewDetails(true);
  };

  const closeModal = () => {
    setSelectedBooking(null);
    setViewDetails(false);
  };

  const handlePageChange = (page: number) => {
    if (!isLoading) {
      setIsLoading(true);
      router.push(`?page=${page}&limit=${bookingsData.meta.limit || 10}`);
    }
  };

  const handleChangeStatus = async (bookingId: number, status: string) => {
    setLoading(true);
    try {
      const result = await changeBookingStatus(bookingId, { status }, token!);
      if (result.success) {
        toast.success(result.message || "Creator approved successfully");
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId
              ? {
                  ...booking,
                  status: formatStatus(status),
                }
              : booking
          )
        );
      } else {
        toast.error(result.error || "Failed to approve creator");
      }
    } catch (error) {
      toast.error("Failed to approve creator");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    try {
      const result = await deleteBooking(id, token!);
      if (result.success) {
        setBookings(bookings.filter((booking) => booking.id !== id));
        toast.success("Booking deleted successfully");
        router.refresh();
      } else {
        toast.error(result.error || "Failed to delete booking");
      }
    } catch (error) {
      toast.error("Failed to delete booking");
    } finally {
      setSelectedBooking(null);
      setLoading(false);
    }
  };

  const formatStatus = (
    status: string
  ): "pending" | "cancelled" | "confirmed" => {
    const statusMapping: Record<string, string> = {
      pending: "pending",
      reject: "cancelled",
      completed: "confirmed",
    };
    return (status = statusMapping[status] as
      | "pending"
      | "cancelled"
      | "confirmed");
  };

  return (
    <div className="min-h-screen bg-[#0b0e1c] p-6 font-michroma text-white">
      <div className="hidden lg:block overflow-auto rounded-lg bg-[#13172b]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1b1f33] text-[#8892b0]">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Client Name</th>
              <th className="px-4 py-3 text-left">Date & Time</th>
              <th className="px-4 py-3 text-left">Beat File</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              return (
                <tr
                  key={`${booking.id}-${index}`}
                  className="border-t border-[#2d324a]"
                >
                  <td className="px-4 py-3">BEAT-{booking.id}</td>
                  <td className="px-4 py-3 break-words">
                    {booking.user.fullname}
                  </td>
                  <td className="px-4 py-3">{formatDateTime(booking.date)}</td>
                  <td className="px-4 py-3 text-blue-400 hover:underline cursor-pointer">
                    <Link href={booking.googleDriveLink} target="_blank">
                      View File
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {/* dont display till status value formatting is completed */}
                    {booking.status === "cancelled" ||
                    booking.status === "confirmed" ||
                    booking.status === "pending" ? (
                      <div
                        className={`border-2 font-medium p-2 rounded-md text-center
                    ${statusStyles[booking.status]}
                  `}
                      >
                        {booking.status}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-4 flex justify-center py-3 gap-2">
                    <button
                      onClick={() => {
                        openModal(booking);
                      }}
                      className="cursor-pointer p-2 text-white bg-foreground hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <IoMdEye size={16} />
                    </button>
                    <button
                      disabled={loading || booking.status === "confirmed"}
                      onClick={() =>
                        handleChangeStatus(booking.id, "completed")
                      }
                      className={`${
                        booking.status === "confirmed"
                          ? "cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Check size={16} className="text-purple-400" />
                    </button>
                    <button
                      disabled={loading || booking.status === "cancelled"}
                      onClick={() => handleChangeStatus(booking.id, "reject")}
                      className={`${
                        booking.status === "cancelled"
                          ? "cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <X size={16} className="text-purple-400" />
                    </button>
                    <button
                      disabled={loading}
                      onClick={() => {
                        setSelectedBooking(booking);
                        setDeletePopUp(true);
                      }}
                      className="cursor-pointer p-2 text-red-400 bg-black hover:bg-red-500/20 rounded-lg transition-colors"
                    >
                      <Trash size={16} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {bookings.map((booking, index) => (
          <div
            key={`${booking.id}-mobile-${index}`}
            className="bg-[#13172b] rounded-lg p-4 border border-[#2d324a] flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-semibold">{booking.user.fullname}</p>
                  <p className="text-gray-400 text-sm">{booking.id}</p>
                </div>
              </div>
              <div>
                <button
                  disabled={loading}
                  onClick={() => {
                    setSelectedBooking(booking);
                    setDeletePopUp(true);
                  }}
                  className="flex items-center gap-1"
                >
                  <Trash size={16} className="text-red-400" />
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <div className="flex gap-2 mb-2">
                <button
                  disabled={loading}
                  onClick={() => {
                    openModal(booking);
                  }}
                  className="p-2 bg-black shrink-0 rounded-md"
                >
                  <Eye size={18} className="text-purple-400" />
                </button>
                <button
                  disabled={loading || booking.status === "confirmed"}
                  onClick={() => handleChangeStatus(booking.id, "completed")}
                  className="p-2 shrink-0  rounded-md"
                >
                  <Check size={16} className="text-green-400 " />
                </button>
                <button
                  disabled={loading || booking.status === "cancelled"}
                  onClick={() => handleChangeStatus(booking.id, "reject")}
                  className="p-2 shrink-0  rounded-md"
                >
                  <X size={16} className="text-red-400" />
                </button>
              </div>
              <div>
                {/* dont display till status value formatting is completed */}
                {booking.status === "cancelled" ||
                booking.status === "confirmed" ||
                booking.status === "pending" ? (
                  <div
                    className={`border-2 font-medium p-2 rounded-md text-center
                    ${statusStyles[booking.status]}
                  `}
                  >
                    {booking.status}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-[#13172b] p-4 rounded-xl border border-[#2d324a]">
        <div className="text-sm text-slate-400">
          Showing <span className="text-white font-bold">{bookings.length}</span> of <span className="text-white font-bold">{bookingsData.meta.total}</span> bookings
        </div>
        <div className="flex">
          <ReusablePagination
            currentPage={bookingsData.meta.page}
            totalPages={bookingsData.meta.totalPages}
            onPageChange={handlePageChange}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Modal */}
      {selectedBooking && viewDetails && (
        <PopupWrapper isOpen={!!selectedBooking}>
          <StudioBookingDetails
            booking={selectedBooking}
            onClose={() => closeModal()}
          />
        </PopupWrapper>
      )}

      {deletePopUp && (
        <ConfirmPopUp
          title={"Delete this booking?"}
          message={"Are you sure you want to delete this booking?"}
          onCancel={() => setDeletePopUp(false)}
          onConfirm={() => {
            setDeletePopUp(false);
            handleDelete(selectedBooking!.id);
          }}
        />
      )}

      {loading && <LoadingEffect />}
    </div>
  );
}
