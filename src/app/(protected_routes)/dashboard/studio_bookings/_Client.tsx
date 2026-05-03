"use client";

import { formatDate, formatDateTime, formatTime } from "@/src/lib/utils";
import { StudioBooking } from "@/src/types/studio-booking";
import type { BookingStatus } from "@/src/types/studio-booking";
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

const bookingStatusStyles: Record<
  string,
  { label: string; className: string }
> = {
  confirmed: {
    label: "Confirmed",
    className: "bg-green-800/20 text-green-400 border-green-800/30",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-700/20 text-yellow-400 border-yellow-700/30",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-800/20 text-red-400 border-red-800/30",
  },
  completed: {
    label: "Completed",
    className: "bg-blue-800/20 text-blue-400 border-blue-800/30",
  },
};

const paymentStatusStyles: Record<
  string,
  { label: string; className: string }
> = {
  completed: {
    label: "Paid",
    className: "bg-green-800/20 text-green-400 border-green-800/30",
  },
  pending: {
    label: "Not Paid",
    className: "bg-red-800/20 text-red-400 border-red-800/30",
  },
};

const getPaymentStyle = (payment: StudioBooking["payment"]) => {
  if (!payment) return paymentStatusStyles["pending"];
  return (
    paymentStatusStyles[payment.status] ?? {
      label: payment.status,
      className: "bg-gray-800/20 text-gray-400 border-gray-800/30",
    }
  );
};

const getBookingStyle = (status: string) => {
  return (
    bookingStatusStyles[status] ?? {
      label: status,
      className: "bg-gray-800/20 text-gray-400 border-gray-800/30",
    }
  );
};

export default function ManageBookings({
  bookingsData,
}: {
  bookingsData: { data: StudioBooking[]; meta: any };
}) {
  const [bookings, setBookings] = useState<StudioBooking[]>(bookingsData.data);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<StudioBooking | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [viewDetails, setViewDetails] = useState(false);

  const { data: session } = useSession();
  const token = session?.user?.tokens.accessToken;
  const router = useRouter();

  useEffect(() => {
    setBookings(bookingsData.data);
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

  const handleChangeStatus = async (bookingId: number, status: BookingStatus) => {
    setLoading(true);
    try {
      const result = await changeBookingStatus(bookingId, { status }, token!);
      if (result.success) {
        toast.success(result.message || "Status updated successfully");
        setBookings(
          bookings.map((booking) =>
            booking.id === bookingId ? { ...booking, status } : booking,
          ),
        );
      } else {
        toast.error(result.error || "Failed to update status");
      }
    } catch (error) {
      toast.error("Failed to update status");
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

  return (
    <div className="min-h-screen bg-[#0b0e1c] p-6 font-michroma text-white">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-auto rounded-lg bg-[#13172b]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1b1f33] text-[#8892b0]">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Client</th>
              <th className="px-4 py-3 text-left">Date & Time</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Beat File</th>
              <th className="px-4 py-3 text-left">Payment</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => {
              const bookingStyle = getBookingStyle(booking.status);
              const paymentStyle = getPaymentStyle(booking.payment);

              return (
                <tr
                  key={`${booking.id}-${index}`}
                  className="border-t border-[#2d324a]"
                >
                  <td className="px-4 py-3 text-[#8892b0]">#{booking.id}</td>

                  {/* Client info */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div>
                        <p className="text-sm font-medium">
                          {booking.user?.fullname ?? "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date & Time */}
                  <td className="px-4 py-3">
                    <p>{formatDate(booking.date)}</p>
                    <p className="text-xs text-[#8892b0]">
                      {booking.time ? formatTime(booking.time) : "-"}
                    </p>
                  </td>

                  {/* Duration */}
                  <td className="px-4 py-3">
                    {booking.duration} {booking.duration === 1 ? "hr" : "hrs"}
                  </td>

                  {/* Amount */}
                  <td className="px-4 py-3 text-[#B5C8F2] font-semibold">
                    ${booking.totalCost}
                  </td>

                  {/* Beat file */}
                  <td className="px-4 py-3 text-blue-400 hover:underline cursor-pointer">
                    <Link href={booking.googleDriveLink} target="_blank">
                      View File
                    </Link>
                  </td>

                  {/* Payment status */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-xs px-2 py-1 rounded-full border text-center ${paymentStyle.className}`}
                      >
                        {paymentStyle.label}
                      </span>
                      {booking.payment && (
                        <span className="text-xs text-[#8892b0] capitalize text-center">
                          {booking.payment.paymentMethod}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Booking status */}
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full border ${bookingStyle.className}`}
                    >
                      {bookingStyle.label}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => openModal(booking)}
                        className="cursor-pointer p-2 text-white bg-foreground hover:bg-purple-700 rounded-lg transition-colors"
                      >
                        <IoMdEye size={16} />
                      </button>
                      <button
                        disabled={loading || booking.status === "completed"}
                        onClick={() => {
                          const nextStatus = booking.status === "pending" ? ("confirmed" as BookingStatus) : ("completed" as BookingStatus);
                          handleChangeStatus(booking.id, nextStatus);
                        }}
                        className={`p-2 rounded-lg transition-colors ${
                          booking.status === "completed"
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-green-500/20"
                        }`}
                        title={booking.status === "pending" ? "Confirm booking" : "Mark as completed"}
                      >
                        <Check size={16} className="text-green-400" />
                      </button>
                      <button
                        disabled={loading || booking.status === "cancelled"}
                        onClick={() => handleChangeStatus(booking.id, "reject" as BookingStatus)}
                        className={`p-2 rounded-lg transition-colors ${
                          booking.status === "cancelled"
                            ? "opacity-40 cursor-not-allowed"
                            : "hover:bg-red-500/20"
                        }`}
                        title="Reject booking"
                      >
                        <X size={16} className="text-red-400" />
                      </button>
                      <button
                        disabled={loading}
                        onClick={() => {
                          setSelectedBooking(booking);
                          setDeletePopUp(true);
                        }}
                        className="cursor-pointer p-2 text-red-400 bg-black hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete booking"
                      >
                        <Trash size={16} className="text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {bookings.map((booking, index) => {
          const bookingStyle = getBookingStyle(booking.status);
          const paymentStyle = getPaymentStyle(booking.payment);

          return (
            <div
              key={`${booking.id}-mobile-${index}`}
              className="bg-[#13172b] rounded-lg p-4 border border-[#2d324a] flex flex-col gap-3"
            >
              {/* Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="font-semibold text-sm">
                      {booking.user?.fullname ?? "-"}
                    </p>
                  </div>
                </div>
                <button
                  disabled={loading}
                  onClick={() => {
                    setSelectedBooking(booking);
                    setDeletePopUp(true);
                  }}
                >
                  <Trash size={16} className="text-red-400" />
                </button>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-[#8892b0] text-xs">Date</p>
                  <p>{formatDate(booking.date)}</p>
                </div>
                <div>
                  <p className="text-[#8892b0] text-xs">Time</p>
                  <p>{booking.time ? formatTime(booking.time) : "-"}</p>
                </div>
                <div>
                  <p className="text-[#8892b0] text-xs">Duration</p>
                  <p>
                    {booking.duration} {booking.duration === 1 ? "hr" : "hrs"}
                  </p>
                </div>
                <div>
                  <p className="text-[#8892b0] text-xs">Amount</p>
                  <p className="text-[#B5C8F2] font-semibold">
                    ${booking.totalCost}
                  </p>
                </div>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${bookingStyle.className}`}
                >
                  {bookingStyle.label}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full border ${paymentStyle.className}`}
                >
                  {paymentStyle.label}
                </span>
                {booking.payment && (
                  <span className="text-xs text-[#8892b0] capitalize">
                    via {booking.payment.paymentMethod}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(booking)}
                  className="p-2 bg-black rounded-md"
                >
                  <Eye size={18} className="text-purple-400" />
                </button>
                <button
                  disabled={loading || booking.status === 'completed'}
                  onClick={() => {
                    const nextStatus = booking.status === "pending" ? ("confirmed" as BookingStatus) : ("completed" as BookingStatus);
                    handleChangeStatus(booking.id, nextStatus);
                  }}
                  className={`p-2 rounded-md ${
                    booking.status === "completed"
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <Check size={16} className="text-green-400" />
                </button>
                <button
                  disabled={loading || booking.status === "cancelled"}
                  onClick={() => handleChangeStatus(booking.id, "reject" as BookingStatus)}
                  className={`p-2 rounded-md ${
                    booking.status === "cancelled"
                      ? "opacity-40 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <X size={16} className="text-red-400" />
                </button>
                <Link
                  href={booking.googleDriveLink}
                  target="_blank"
                  className="p-2 rounded-md bg-black text-xs text-blue-400 flex items-center"
                >
                  Beat File
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-8 w-full font-michroma text-white flex justify-between items-center bg-[#13172b] p-4 rounded-xl border border-[#2d324a]">
        <div className="text-sm text-slate-400">
          Showing{" "}
          <span className="text-white font-bold">{bookings.length}</span> of{" "}
          <span className="text-white font-bold">
            {bookingsData.meta.total}
          </span>{" "}
          bookings
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

      {/* Detail Modal */}
      {selectedBooking && viewDetails && (
        <PopupWrapper isOpen={!!selectedBooking}>
          <StudioBookingDetails
            booking={selectedBooking}
            onClose={() => closeModal()}
          />
        </PopupWrapper>
      )}

      {/* Delete Confirm */}
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
