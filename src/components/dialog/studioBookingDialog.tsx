import { formatDateTime } from "@/src/lib/utils";
import { StudioBooking } from "@/src/types/studio-booking";
import { Calendar, X } from "lucide-react";
import Link from "next/link";

export default function StudioBookingDetails({
  booking,
  onClose,
}: {
  booking: StudioBooking;
  onClose: () => void;
}) {
  return(
        <div className="bg-[#0f0f10] min-w-0 text-white p-6 font-michroma rounded-xl shadow-xl max-w-4xl mx-auto space-y-6 border border-[#333]">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                    Studio Booking Details
                </h2>
                <button
                onClick={onClose}
                className="text-xs text-[#74f9e0] px-3 py-1 rounded-full flex items-center gap-1"
                >
                <X className="w-3 h-3" />
                    Close
                </button>
            </div>

            {/* Booking Panels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Booking Info Panel */}
                <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
                    <h3 className="text-center text-[#00e08f] text-lg mb-4">
                        Booking Information
                    </h3>
                    <InfoRow 
                        label="ID"
                        value={booking.id}
                    />
                    <InfoRow 
                        label="Booked Date"
                        value={booking.date}
                    />
                    <InfoRow 
                        label="Duration"
                        value={`${booking.duration}hr`}
                    />
                    <InfoRow 
                        label="Total Cost"
                        value={`$${booking.totalCost}`}
                    />
                    <div className="text-sm text-gray-300 flex items-start gap-2 max-w-150">
                        <span className="text-[#8f8f8f]">Beat:</span>
                        <Link href={booking.googleDriveLink} target="_blank" className=" text-blue-400 hover:underline cursor-pointer">View Drive Link</Link>
                    </div>
                    <InfoRow 
                        label="Status"
                        value={booking.status}
                    />
                    <InfoRow 
                        label="Created Date"
                        value={formatDateTime(booking.createdAt)}
                    />
                    <InfoRow 
                        label="Created Date"
                        value={formatDateTime(booking.updatedAt)}
                    />
                </div>
        
                {/* Customer Info Panel */}
                <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
                    <h3 className="text-center text-[#00e08f] text-lg mb-4">
                        Customer Information
                    </h3>
                    <InfoRow 
                        label="ID"
                        value={booking.user.id}
                    />
                    <InfoRow 
                        label="Name"
                        value={booking.user.fullname}
                    />
                    <InfoRow 
                        label="email"
                        value={booking.user.email}
                    />
                    <InfoRow 
                        label="Verified"
                        value={booking.user.verified ? "Yes" : "No"}
                    />
                    <InfoRow 
                        label="Role"
                        value={booking.user.roles}
                    />
                </div>
            </div>
        </div>
    );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon?: string;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="text-sm text-gray-300 flex items-start gap-2 max-w-150">
      {icon && <img src={icon} alt={label} className="w-4 h-4" />}
      <span className="text-[#8f8f8f]">{label}:</span>
      <span className="text-white break-words min-w-0">{value}</span>
    </div>
  );
}
