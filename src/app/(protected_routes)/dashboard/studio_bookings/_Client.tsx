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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { changeBookingStatus, deleteBooking } from "./action";

export default function ManageBookings({
  bookings: initialBookings,
}: {
  bookings: StudioBooking[];
}) {
  const [bookings, setBookings] = useState<StudioBooking[]>(initialBookings);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<StudioBooking | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session } = useSession();
  const token = session?.user?.tokens.accessToken;

  const itemsPerPage = 5;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  const openModal = (booking: StudioBooking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBooking(null);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
                  status: status as "pending" | "cancelled" | "confirmed",
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
    try {
      const result = await deleteBooking(id, token!);
      if (result.success) {
        setBookings(bookings.filter((booking) => booking.id !== id));
        toast.success("Booking deleted successfully");
      } else {
        toast.error(result.error || "Failed to delete booking");
      }
    } catch (error) {
      toast.error("Failed to delete booking");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e1c] p-6 font-michroma text-white">
      <h1 className="text-2xl md:text-3xl mb-6">Manage Bookings</h1>

      <div className="hidden lg:block overflow-auto rounded-lg bg-[#13172b]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1b1f33] text-[#8892b0]">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Client Name</th>
              <th className="px-4 py-3 text-left">Date & Time</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Beat File</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking, index) => (
              <tr
                key={`${booking.id}-${index}`}
                className="border-t border-[#2d324a]"
              >
                <td className="px-4 py-3">BEAT-{booking.id}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${(index % 70) + 1}`}
                    alt={booking.id.toString()}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  {booking.user.fullname}
                </td>
                <td className="px-4 py-3">
                  {formatDateTime(booking.createdAt)}
                </td>
                <td className="px-4 py-3">{booking.duration} hr</td>
                <td className="px-4 py-3 text-blue-400 hover:underline cursor-pointer">
                  <Link href={booking.googleDriveLink} target="_blank">
                    View File
                  </Link>
                </td>{" "}
                <td
                  className={`px-4 py-3 font-medium cursor-pointer  ${
                    booking.status === "pending"
                      ? "text-yellow-500"
                      : booking.status === "confirmed"
                      ? "text-green-500"
                      : booking.status === "cancelled"
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {booking.status}
                </td>
                <td className="px-4 flex justify-center py-3 gap-2">
                  <button disabled={loading} onClick={() => openModal(booking)}>
                    <Eye size={16} className="text-purple-400" />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleChangeStatus(booking.id, "completed")}
                  >
                    <Check size={16} className="text-purple-400" />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleChangeStatus(booking.id, "reject")}
                  >
                    <X size={16} className="text-purple-400" />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => handleDelete(booking.id)}
                  >
                    <Trash size={16} className="text-red-500" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {currentBookings.map((booking, index) => (
          <div
            key={`${booking.id}-mobile-${index}`}
            className="bg-[#13172b] rounded-lg p-4 border border-[#2d324a] flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={`https://i.pravatar.cc/150?img=${(index % 70) + 1}`}
                  alt={booking.user.fullname}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{booking.user.fullname}</p>
                  <p className="text-gray-400 text-sm">{booking.id}</p>
                </div>
              </div>
              <button disabled={loading} onClick={() => openModal(booking)}>
                <Eye size={18} className="text-purple-400" />
              </button>
            </div>
            <div className="text-sm text-gray-400">
              <button
                disabled={loading}
                onClick={() => handleDelete(booking.id)}
                className="flex items-center gap-1"
              >
                <Trash size={16} />
                <span>{formatDateTime(booking.createdAt)}</span>
              </button>
              <div>
                Duration:{" "}
                <span className="font-semibold text-white">
                  {booking.duration} hrs
                </span>
              </div>
            </div>
            <div>
              <Link href={booking.googleDriveLink} target="_blank">
                <span className="text-blue-400 underline">View File</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-end">
        <Pagination>
          <PaginationContent className="flex items-center gap-2 p-2">
            <PaginationItem>
              <PaginationPrevious
                onClick={goToPreviousPage}
                className={
                  currentPage === 1
                    ? "opacity-50 pointer-events-none"
                    : "border"
                }
              />
            </PaginationItem>
            <PaginationItem>
              <button className="px-3 py-1 bg-purple-700 rounded text-white">
                {currentPage}
              </button>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={goToNextPage}
                className={
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : "border"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-[#1C2433] w-full max-w-md p-6 rounded-lg text-white relative border border-[#2C3A4F] shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Client:</span>{" "}
                {selectedBooking.user.fullname}
              </p>
              <p>
                <span className="font-semibold">Email:</span>{" "}
                {selectedBooking.user.email}
              </p>
              <p>
                <span className="font-semibold">Phone:</span>{" "}
                {selectedBooking.phoneNumber}
              </p>
              <p>
                <span className="font-semibold">Duration:</span>{" "}
                {selectedBooking.duration} hr
              </p>
              <p>
                <span className="font-semibold">Booking Date:</span>{" "}
                {formatDateTime(selectedBooking.date)}
              </p>
              <p>
                <span className="font-semibold">Google Drive File:</span>{" "}
                <Link
                  href={selectedBooking.googleDriveLink}
                  target="_blank"
                  className="text-blue-400 underline"
                >
                  Open File
                </Link>
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {selectedBooking.status}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
