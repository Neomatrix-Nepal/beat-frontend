"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, XCircle } from "lucide-react";
import Image from "next/image";
import remove from '@/icons/Vector.png';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const bookings = [
  {
    id: "BK-1001",
    name: "Daniel Lee",
    time: "2025-05-29, 10:00 AM",
    duration: "1hr",
    avatar: "/avatars/daniel.png",
  },
  {
    id: "BK-1002",
    name: "Mike Carter",
    time: "2025-05-29, 12:30 PM",
    duration: "2hr",
    avatar: "/avatars/mike.png",
  },
  {
    id: "BK-1003",
    name: "Sophia Brown",
    time: "2025-05-29, 3:00 PM",
    duration: "1hr",
    avatar: "/avatars/sophia.png",
  },
  {
    id: "BK-1004",
    name: "Daniel Lee",
    time: "2025-05-29, 10:00 AM",
    duration: "1hr",
    avatar: "/avatars/daniel.png",
  },
  {
    id: "BK-1005",
    name: "Mike Carter",
    time: "2025-05-29, 12:30 PM",
    duration: "2hr",
    avatar: "/avatars/mike.png",
  },
  {
    id: "BK-1006",
    name: "Sophia Brown",
    time: "2025-05-29, 3:00 PM",
    duration: "1hr",
    avatar: "/avatars/sophia.png",
  },
  {
    id: "BK-1004",
    name: "Daniel Lee",
    time: "2025-05-29, 10:00 AM",
    duration: "1hr",
    avatar: "/avatars/daniel.png",
  },
  {
    id: "BK-1005",
    name: "Mike Carter",
    time: "2025-05-29, 12:30 PM",
    duration: "2hr",
    avatar: "/avatars/mike.png",
  },
  {
    id: "BK-1006",
    name: "Sophia Brown",
    time: "2025-05-29, 3:00 PM",
    duration: "1hr",
    avatar: "/avatars/sophia.png",
  },
  {
    id: "BK-1004",
    name: "Daniel Lee",
    time: "2025-05-29, 10:00 AM",
    duration: "1hr",
    avatar: "/avatars/daniel.png",
  },
];

export default function ManageBookings() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBookings = bookings.slice(startIndex, startIndex + itemsPerPage);

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-[#0b0e1c] p-6 font-michroma text-white">
      <div className="flex flex-col md:flex-row justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl mb-6">Manage Bookings</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <Input
            placeholder="Search by User"
            className="bg-[#13172b] border border-[#2d324a] text-white placeholder:text-gray-400"
          />
          <Input
            placeholder="mm/dd/yyyy"
            className="bg-[#13172b] border border-[#2d324a] text-white placeholder:text-gray-400"
          />
          <Button className="bg-[#13172b] border border-[#2d324a] text-white px-4">Status</Button>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-auto rounded-lg bg-[#13172b]">
        <table className="min-w-full text-sm">
          <thead className="bg-[#1b1f33] text-[#8892b0]">
            <tr>
              <th className="px-4 py-3 text-left">Booking ID</th>
              <th className="px-4 py-3 text-left">Client Name</th>
              <th className="px-4 py-3 text-left">Date & Time</th>
              <th className="px-4 py-3 text-left">Duration</th>
              <th className="px-4 py-3 text-left">Beat File</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((b, index) => (
              <tr key={`${b.id}-${index}`} className="border-t border-[#2d324a]">
                <td className="px-4 py-3">{b.id}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <Image
                    src={`https://i.pravatar.cc/150?img=${(index % 70) + 1}`}
                    alt={b.name}
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                  {b.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">{b.time}</td>
                <td className="px-4 py-3">{b.duration}</td>
                <td className="px-4 py-3 text-blue-400 hover:underline cursor-pointer">
                  View File
                </td>
                <td className="px-4 flex justify-center py-3">
                  <button>
                    <Image src={remove} alt="Remove" width={24} height={24} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {currentBookings.map((b, index) => (
          <div
            key={`${b.id}-mobile-${index}`}
            className="bg-[#13172b] rounded-lg p-4 border border-[#2d324a] flex flex-col gap-3"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image
                  src={`https://i.pravatar.cc/150?img=${(index % 70) + 1}`}
                  alt={b.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-gray-400 text-sm">{b.id}</p>
                </div>
              </div>
              <button>
                <Image src={remove} alt="Remove" width={24} height={24} />
              </button>
            </div>

            <div className="flex justify-between text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{b.time}</span>
              </div>
              <div>
                <span className="font-semibold text-white">{b.duration}</span>
              </div>
            </div>

            <div>
              <button className="text-blue-400 hover:underline cursor-pointer text-sm">
                View File
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
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
                      : " border-2 border-white"
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
                    className="  text-white px-3 py-1 rounded border-2 border-white hover:bg-slate-700"
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
                      : " border-2 border-white"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}