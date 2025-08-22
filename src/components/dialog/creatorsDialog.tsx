"use client";

import { X } from "lucide-react";
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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="p-5 bg-black rounded-lg">
        <div className="bg-slate-800 text-white p-6 rounded-lg max-w-md w-full shadow-lg relative space-y-3">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-lg md:text-xl font-semibold text-[#00e08f]">
              Payment Details
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-xs text-[#00e08f] px-3 py-1 rounded-full flex items-center gap-1"
            >
              <X className="w-3 h-3" />
              Close
            </button>
          </div>

          {/* Info Rows */}
          <InfoRow label="Method" value={payment.method} />
          <InfoRow label="Full Name" value={payment.fullName} />
          <InfoRow label="Email" value={payment.email} />

          {payment.method === "khalti" && (
            <InfoRow label="Khalti Number" value={payment.khaltiNumber || "N/A"} />
          )}
          {payment.method === "stripe" && (
            <InfoRow
              label="Stripe Account ID"
              value={payment.stripeAccountId || "N/A"}
            />
          )}

          <InfoRow
            label="Submitted At"
            value={formatDateTime(payment.createdAt)}
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
    <div className="text-sm text-gray-300 flex items-center gap-2">
      {icon && <img src={icon} alt={label} className="w-4 h-4" />}
      <span className="text-[#8f8f8f] min-w-[100px]">{label}:</span>
      <span className="text-white break-words">{value}</span>
    </div>
  );
}
