"use client";
import React from "react";
import {
  X,
  Printer,
  CheckCircle,
  Clock,
  AlertCircle,
  Mic,
  Calendar,
  Clock as ClockIcon,
  Link2,
  DollarSign,
  Phone,
  CreditCard,
  Info,
  Zap,
} from "lucide-react";

interface StudioBookingReceiptModalProps {
  booking: any;
  onClose: () => void;
}

const statusColor = {
  completed: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  confirmed: "text-[#00e08f] bg-[#00e08f]/10 border-[#00e08f]/20",
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  reject: "text-red-500 bg-red-500/10 border-red-500/20",
};

function formatTime(time: string | null) {
  if (!time) return "N/A";
  const [h, m] = time.split(":");
  let hour = parseInt(h, 10);
  const min = m;
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min} ${ampm}`;
}

function formatDate(date: string) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(dateStr: string) {
  if (!dateStr) return "N/A";
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function StudioBookingReceiptModal({
  booking,
  onClose,
}: StudioBookingReceiptModalProps) {
  const isPaid = booking.payment?.status === "completed";

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "reject":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Info className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-[#0f0f10] text-white p-0 overflow-hidden font-michroma rounded-2xl shadow-2xl max-w-2xl mx-auto border border-white/10 max-h-[90vh] flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00e08f]/10 rounded-lg">
            <Mic className="w-5 h-5 text-[#00e08f]" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">Studio Booking</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">ID: {booking.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <Printer className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
          >
            <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Quick Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#1d2733] border border-white/5">
          <SummaryItem icon={Calendar} label="Date" value={formatDate(booking.date)} />
          <SummaryItem icon={ClockIcon} label="Time" value={formatTime(booking.time)} />
          <SummaryItem icon={Zap} label="Duration" value={`${booking.duration}h`} />
          <SummaryItem icon={DollarSign} label="Total" value={`$${parseFloat(booking.totalCost as string).toFixed(2)}`} />
        </div>

        {/* Status */}
        <div className="flex items-center gap-3">
          {getStatusIcon(booking.status)}
          <span
            className={`text-xs font-bold px-3 py-1 rounded-md border uppercase tracking-widest ${
              statusColor[booking.status as keyof typeof statusColor] ??
              "text-gray-400 bg-gray-400/10 border-gray-400/20"
            }`}
          >
            {booking.status}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-md border uppercase tracking-widest ${
              isPaid
                ? "text-green-400 bg-green-400/10 border-green-400/20"
                : "text-red-500 bg-red-500/10 border-red-500/20"
            }`}
          >
            {isPaid ? "Paid" : "Unpaid"}
          </span>
        </div>

        {/* Booking Details */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
          <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
            <Mic className="w-4 h-4" />
            Booking Details
          </h3>
          <div className="space-y-3">
            <InfoRow icon={Calendar} label="Date" value={formatDate(booking.date)} />
            <InfoRow icon={ClockIcon} label="Time" value={formatTime(booking.time)} />
            <InfoRow icon={Zap} label="Duration" value={`${booking.duration} hour${booking.duration !== 1 ? "s" : ""}`} />
            <InfoRow icon={Phone} label="Phone" value={booking.phoneNumber} />
            {booking.googleDriveLink && (
              <div className="p-3 bg-[#00e08f]/5 rounded-lg border border-[#00e08f]/20">
                <p className="text-[9px] text-gray-500 uppercase tracking-widest mb-1 flex items-center gap-1">
                  <Link2 className="w-3 h-3" /> Google Drive Link
                </p>
                <a
                  href={booking.googleDriveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#00e08f] hover:text-[#00c97e] underline underline-offset-2 break-all transition-colors"
                >
                  {booking.googleDriveLink}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Payment Details */}
        {booking.payment && (
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <CreditCard className="w-4 h-4" />
              Payment Details
            </h3>
            <div className="space-y-3">
              <InfoRow icon={CreditCard} label="Payment ID" value={`#${booking.payment.id}`} mono />
              <InfoRow icon={Info} label="Method" value={booking.payment.paymentMethod.charAt(0).toUpperCase() + booking.payment.paymentMethod.slice(1)} />
              <InfoRow icon={DollarSign} label="Amount" value={`$${parseFloat(booking.payment.amount).toFixed(2)}`} />
              <InfoRow icon={Clock} label="Paid On" value={formatDateTime(booking.payment.createdAt)} />
            </div>
          </div>
        )}

        {/* Total */}
        <div className="flex justify-end">
          <div className="w-64 border-t border-white/10 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Total Amount</span>
              <span className="text-[#00e08f] font-extrabold text-lg">
                ${parseFloat(booking.totalCost as string).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-[10px] text-gray-500 uppercase tracking-widest flex items-center gap-1.5 leading-none text-[#00e08f]">
        <Icon className="w-3 h-3" />
        {label}
      </p>
      <p className="text-xs font-bold text-white truncate">{value}</p>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  mono,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 group">
      <p className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5 leading-none transition-colors group-hover:text-[#00e08f]">
        <Icon className="w-2.5 h-2.5" />
        {label}
      </p>
      <p className={`text-[11px] text-white break-words ${mono ? "font-mono" : ""}`}>
        {value}
      </p>
    </div>
  );
}
