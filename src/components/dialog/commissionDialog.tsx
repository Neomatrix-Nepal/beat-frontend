import React, { useState } from "react";
import { X } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { Commission } from "@/src/types";
import { formatDateTime } from "@/src/lib/utils";

export default function CommissionDetails({
  commission: initialCommission,
  onClose,
}: {
  commission: Commission | null;
  onClose: () => void;
}) {
  const [commission, setCommission] = useState<Commission | null>(initialCommission);

  if (!commission) return null;

  return (
    <div className="bg-[#0f0f10] text-white p-6 font-michroma rounded-xl shadow-xl max-w-5xl mx-auto space-y-6 border border-[#333]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold">
          Commission Details
        </h2>
        <button
          onClick={onClose}
          className="cursor-pointer text-xs text-[#74f9e0] px-3 py-1 rounded-full flex items-center gap-1"
        >
          <X className="w-3 h-3" />
          Close
        </button>
      </div>

      {/* Order Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Commission Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
            <h3 className="text-center text-[#00e08f] text-lg mb-4">
            Commission Information
          </h3>
          <CommissionInfoRow label="Commission ID" value={String(commission.id)} />
          <CommissionInfoRow
            label="Created Date"
            value={formatDateTime(commission.createdAt)}
          />
          <CommissionInfoRow
            label="Updated Date"
            value={formatDateTime(commission.updatedAt)}
          />
          <CommissionInfoRow label="Commmission Status" value={commission.status} />
          <CommissionInfoRow label="Commission Amount" value={commission.amount} />
          <CommissionInfoRow
            label="Created Date"
            value={formatDateTime(commission.createdAt)}
          />
          <CommissionInfoRow
            label="Updated Date"
            value={formatDateTime(commission.updatedAt)}
          />
        </div>

        
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
        
        {/* Creator Info Panel */}
          <h3 className="text-center text-[#00e08f] text-lg mb-4">
            Creator Information
          </h3>
          <CommissionInfoRow label="Creator Id" value={commission.creator.id.toString()} />
          <CommissionInfoRow label="Creator Name" value={commission.creator.fullname} />
          <CommissionInfoRow label="Email" value={commission.creator.email} />
          <CommissionInfoRow label="Verification Status" value={commission.creator.verified ? "Verified" : "Not Verified"} />

          {/* Payment Item Info Panel */}
          <h3 className="text-center text-[#00e08f] text-lg mt-4">
            Payment Information
          </h3>
          <CommissionInfoRow label="Item Id" value={commission.paymentItem.id.toString()} />
          <CommissionInfoRow label="Product Id" value={commission.paymentItem.productId.toString()} />
          <CommissionInfoRow label="Price" value={commission.paymentItem.price} />
          <CommissionInfoRow label="Quantity" value={commission.paymentItem.quantity.toString()} />
          <CommissionInfoRow
            label="Created Date"
            value={formatDateTime(commission.paymentItem.createdAt)}
          />
          <CommissionInfoRow
            label="Updated Date"
            value={formatDateTime(commission.paymentItem.updatedAt)}
          />
        </div>
      </div>

      {/* Action Button */}
      <div>
        <button className="bg-[#00e08f] hover:bg-[#00c97e] text-black px-5 py-2 rounded-md font-semibold text-sm flex items-center gap-2">
          <FaCheck className="text-sm" />
          Mark as Delivered
        </button>
      </div>
    </div>
  );
}

function CommissionInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm text-gray-300">
      <span className="text-[#8f8f8f]">{label}:</span>{" "}
      <span className="text-white">{value}</span>
    </div>
  );
}
