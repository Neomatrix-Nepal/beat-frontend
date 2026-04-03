import { X, User, CreditCard, Hash, Calendar, Mail } from "lucide-react";
import React from "react";
import { CreatorEntry } from "@/src/types";
import { formatDateTime } from "@/src/lib/utils";

interface CreatorsDialogDetailsProps {
  onClose: () => void;
  details: CreatorEntry | null;
}

export default function CreatorsDialogDetails({
  onClose,
  details,
}: CreatorsDialogDetailsProps) {
  if (!details) return null;

  const payment = details.paymentDetail;

  return (
    <div className="bg-[#0f0f10] text-white p-0 overflow-hidden font-michroma rounded-2xl shadow-2xl max-w-md mx-auto border border-white/10 max-h-[80vh] flex flex-col">
      {/* Header Bar */}
      <div className="flex-shrink-0 flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00e08f]/10 rounded-lg">
            <CreditCard className="w-5 h-5 text-[#00e08f]" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">Payment Details</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">ID: {details.userId}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/10 rounded-full transition-colors group"
        >
          <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
        </button>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
        {/* Info Rows */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
           <InfoRow icon={User} label="Full Name" value={payment.fullName} />
           <InfoRow icon={Mail} label="Email" value={payment.email} />
           <InfoRow icon={Hash} label="User ID" value={details.userId.toString()} />
        </div>

        <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
           <InfoRow icon={CreditCard} label="Method" value={payment.method.toUpperCase()} />
           {payment.method === "khalti" && (
             <InfoRow icon={Hash} label="Khalti Number" value={payment.khaltiNumber || "N/A"} />
           )}
           {payment.method === "stripe" && (
             <InfoRow
               icon={Hash}
               label="Stripe ID"
               value={payment.stripeAccountId || "N/A"}
             />
           )}
        </div>

        <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
          <InfoRow
            icon={Calendar}
            label="Submitted At"
            value={formatDateTime(payment.createdAt)}
          />
        </div>
      </div>

      {/* Footer Bar */}
      <div className="flex-shrink-0 p-6 border-t border-white/10 flex justify-end bg-white/5">
         <button
           onClick={onClose}
           className="bg-[#00e08f] hover:bg-[#00c97e] text-black px-6 py-2 rounded-xl font-bold text-sm transition-all shadow-lg active:scale-95"
         >
           Close Details
         </button>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ElementType;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1 group">
      <p className="text-[9px] text-gray-500 uppercase flex items-center gap-1.5 leading-none transition-colors group-hover:text-[#00e08f]">
        {Icon && <Icon className="w-2.5 h-2.5" />}
        {label}
      </p>
      <p className="text-[11px] text-white break-words lowercase first-letter:uppercase leading-tight font-michroma">
        {value}
      </p>
    </div>
  );
}
