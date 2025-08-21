import { formatDateTime } from "@/src/lib/utils";
import { Product } from "@/src/types";
import { Droplets, X } from "lucide-react";
import Image from "next/image";

const sizeMapping : Record<string,string>= {
    "XS":"Extra Small",
    "S":"Small",
    "M":"Medium",
    "L":"Large",
    "XL":"Extra Large"
}

export default function DripDetails({
  drip,
  onClose,
}: {
  drip: Product;
  onClose: () => void;
}) {
  return(
        <div className="bg-[#0f0f10] min-w-0 text-white p-6 font-michroma rounded-xl shadow-xl max-w-4xl mx-auto space-y-6 border border-[#333]">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                <Droplets className="w-5 h-5" />
                    Drip Details
                </h2>
                <button
                onClick={onClose}
                className="text-xs text-[#74f9e0] px-3 py-1 rounded-full flex items-center gap-1"
                >
                <X className="w-3 h-3" />
                    Close
                </button>
            </div>
            <div className="bg-[#1d2733] p-6 rounded-lg space-y-2 min-w-0">
                <div className="pb-2">
                    <div className="flex justify-center pb-2">
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}/${drip.images[0].url}`}
                            alt="drip-img"
                            width={350}
                            height={350}
                            className="w-full max-w-50"
                        />
                    </div>
                    <div className="min-w-0">
                        <p className="text-lg font-semibold text-[#e7625f]">
                            {drip.name}
                        </p>
                        <InfoRow
                            label="ID"
                            value={drip.id}
                        />
                    </div>
                </div>
                <hr className="my-3 border border-gray-500"/>
                <InfoRow
                    label="Size"
                    value={sizeMapping[drip.size as string] || "N/A"}
                />
                <InfoRow
                    label="Uploaded At"
                    value={formatDateTime(drip.updated_at) || "N/A"}
                />
                <InfoRow
                    label="Wishlist Count"
                    value={drip.wishlistCount || 0}
                />
                <InfoRow
                    label="Stock"
                    value={Math.floor(Number(drip.stock)) || 0}
                />
                <InfoRow
                    label="Description"
                    value={drip.description||"no description"}
                />
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
