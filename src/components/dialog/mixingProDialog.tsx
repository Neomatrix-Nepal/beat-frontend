import {
  Blend,
  X,
  User,
  Mail,
  FileText,
  Music,
  Link as LinkIcon,
  Clock,
  Hash,
  DollarSign,
  CheckCircle,
  CreditCard,
  Calendar,
  AlertCircle,
} from "lucide-react";
import React, { useState } from "react";
import { FaCheck, FaCheckCircle } from "react-icons/fa";
import { formatDateTime } from "@/src/lib/utils";
import { Order } from "@/src/types/payment.type";

export interface MixingProEntry {
  id: number;
  email: string;
  name: string;
  musicGenre: string | null;
  musicStyle: string | null;
  description: string;
  referenceTrack: string;
  additionalInstructions: string;
  status: "pending" | "in_progress" | "completed";
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  selected: boolean;
  payment: Order | null;
  packages: {
    id: number;
    name: string;
    price: string;
  }[];
}

interface MixingProSubmissionDetailsProps {
  entry: MixingProEntry | null;
  onClose: () => void;
  onStatusChange: (id: number) => void;
}

export default function MixingProSubmissionDetails({
  entry,
  onClose,
  onStatusChange,
}: MixingProSubmissionDetailsProps) {
  if (!entry) return null;

  const [completed, setCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const basePrice = 0;
  const packageTotal = entry.packages.reduce(
    (sum, pkg) => sum + parseFloat(pkg.price || "0"),
    0
  );
  const total = (basePrice + packageTotal).toFixed(2);

  const handleMarkAsCompleted = async (entry: MixingProEntry) => {
    setLoading(true);
    try {
      await Promise.resolve(onStatusChange(entry.id));
      setCompleted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-[#00e08f] bg-[#00e08f1a] border-[#00e08f33]";
      case "in_progress":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "pending":
      default:
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-green-400";
      case "pending":
        return "text-yellow-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="bg-[#0f0f10] text-white p-0 overflow-hidden font-michroma rounded-2xl shadow-2xl max-w-4xl mx-auto border border-white/10 max-h-[90vh] flex flex-col">
      {/* Header Bar */}
      <div className="flex-shrink-0 flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00e08f]/10 rounded-lg">
            <Blend className="w-5 h-5 text-[#00e08f]" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">Mixing Pro Details</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">ID: {entry.id}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors group"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>
      </div>

      <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
        {/* Quick Summary Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#1d2733] border border-white/5">
          <SummaryItem icon={DollarSign} label="Total" value={`$${total}`} />
          <SummaryItem
            icon={Clock}
            label="Received"
            value={formatDateTime(entry.createdAt).split(",")[0]}
          />
          <SummaryItem icon={Music} label="Genre" value={entry.musicGenre || "N/A"} />
          <div>
            <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Status</p>
            <span className={`px-2 py-0.5 rounded-md text-[10px] border font-bold uppercase tracking-wider ${getStatusColor(entry.status)}`}>
              {entry.status}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section: Customer Information */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <User className="w-4 h-4" />
              Customer Information
            </h3>
            <div className="space-y-3">
              <InfoRow icon={User} label="Full Name" value={entry.name} />
              <InfoRow icon={Mail} label="Email" value={entry.email} />
            </div>
          </div>

          {/* Section: Project Assets */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <LinkIcon className="w-4 h-4" />
              Project Assets
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <p className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5 leading-none">
                  <LinkIcon className="w-2.5 h-2.5" />
                  Reference Track
                </p>
                <a
                  href={entry.referenceTrack}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#00e08f] hover:underline truncate inline-flex items-center gap-1"
                >
                  Visit Drive Link
                </a>
              </div>
            </div>
          </div>

          {/* Section: Payment & Transaction */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <CreditCard className="w-4 h-4" />
              Payment & Transaction
            </h3>
            {entry.payment ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-500 uppercase tracking-wider">Method</span>
                  <span className="text-white font-bold uppercase">{entry.payment.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-500 uppercase tracking-wider">Status</span>
                  <span className={`font-bold uppercase ${getPaymentStatusColor(entry.payment.status)}`}>
                    {entry.payment.status}
                  </span>
                </div>
                {entry.payment.khaltiId && (
                  <InfoRow icon={Hash} label="Khalti ID" value={entry.payment.khaltiId} />
                )}
                {entry.payment.stripePaymentId && (
                  <InfoRow icon={Hash} label="Stripe ID" value={entry.payment.stripePaymentId} />
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-[10px] text-red-300 italic">No payment record found.</p>
              </div>
            )}
          </div>

          {/* Section: Timeline */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <Calendar className="w-4 h-4" />
              Timeline
            </h3>
            <div className="space-y-3">
              <InfoRow icon={Clock} label="Submited At" value={formatDateTime(entry.createdAt)} />
              <InfoRow icon={Clock} label="Last Updated" value={formatDateTime(entry.updatedAt)} />
            </div>
          </div>

          {/* Section: Project Requirements */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5 md:col-span-1">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <FileText className="w-4 h-4" />
              Project Requirements
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-[#0f0f10] rounded-lg border border-white/5">
                <p className="text-[10px] text-gray-500 mb-1 flex items-center gap-1 uppercase tracking-wider">
                  <Music className="w-3 h-3" /> Description
                </p>
                <p className="text-xs text-gray-300 leading-relaxed italic">
                  "{entry.description}"
                </p>
              </div>
              {entry.additionalInstructions && (
                <div className="p-3 bg-[#00e08f]/5 rounded-lg border border-[#00e08f]/10">
                  <p className="text-[10px] text-[#00e08f] mb-1 flex items-center gap-1 uppercase tracking-wider">
                    <FileText className="w-3 h-3" /> Additional Instructions
                  </p>
                  <p className="text-xs text-gray-200 leading-relaxed">
                    {entry.additionalInstructions}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section: Package Breakdown */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5 md:col-span-1">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <DollarSign className="w-4 h-4" />
              Package Breakdown
            </h3>
            <div className="space-y-3">
              {entry.packages.length > 0 ? (
                <div className="space-y-2">
                  {entry.packages.map((pkg, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] bg-white/5 p-2 rounded border border-white/5">
                      <div className="flex items-center gap-2 text-gray-300">
                        <CheckCircle className="w-3 h-3 text-[#00e08f]" />
                        <span>{pkg.name}</span>
                      </div>
                      <span className="font-bold text-white">${pkg.price}</span>
                    </div>
                  ))}
                  <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center px-2">
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total Amount</span>
                    <span className="text-sm font-bold text-[#00e08f]">${total}</span>
                  </div>
                </div>
              ) : (
                <p className="text-[10px] text-gray-500 italic">No specific packages selected.</p>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Footer Action */}
      {entry.status !== "completed" && !completed && (
        <div className="flex-shrink-0 p-6 border-t border-white/10 flex justify-end bg-white/5">
          <button
            onClick={() => handleMarkAsCompleted(entry)}
            disabled={loading}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50
              ${loading ? "bg-[#00c97e]/70 cursor-not-allowed" : "bg-[#00e08f] text-black hover:bg-[#00c97e]"}
            `}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <FaCheck className="text-sm" />
                Mark as Delivered
              </>
            )}
          </button>
        </div>
      )}
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
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 group">
      <p className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5 leading-none transition-colors group-hover:text-[#00e08f]">
        <Icon className="w-2.5 h-2.5" />
        {label}
      </p>
      <p className="text-[11px] text-white break-words lowercase first-letter:uppercase">
        {value}
      </p>
    </div>
  );
}
