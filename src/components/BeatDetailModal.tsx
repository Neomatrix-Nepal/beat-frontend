import React, { useEffect, useState } from "react";
import { getBeatDetail } from "@/src/app/(protected_routes)/dashboard/beats_manager/action";
import { useSession } from "next-auth/react";
import { 
  Loader2, 
  User, 
  Music, 
  DollarSign, 
  Heart, 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Mail, 
  X, 
  Hash, 
  Phone, 
  FileText, 
  Info, 
  Globe, 
  Clock 
} from "lucide-react";
import { formatDateTime } from "@/src/lib/utils";

interface BeatDetailModalProps {
  beatId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function BeatDetailModal({ beatId, isOpen, onClose }: BeatDetailModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (isOpen && beatId) {
      fetchDetail();
    } else {
      setData(null);
    }
  }, [isOpen, beatId]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const response = await getBeatDetail(beatId!, session?.user?.tokens?.accessToken as string);
      setData(response);
    } catch (error) {
      console.error("Error fetching beat detail:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  const product = data?.product;
  const analytics = data?.analytics;
  const owner = product?.user;
  const isAdmin = owner?.roles === "admin";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4  ">
      <div className="bg-[#0f0f10] text-white p-0 overflow-hidden font-michroma rounded-2xl shadow-2xl w-full max-w-4xl mx-auto border border-white/10 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex-shrink-0 flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00e08f]/10 rounded-lg">
              <Hash className="w-5 h-5 text-[#00e08f]" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">Beat Details</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">ID: {beatId}</p>
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
          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-[#00e08f]" />
              <p className="text-xs text-gray-500 uppercase tracking-widest animate-pulse">Fetching Details...</p>
            </div>
          ) : !data ? (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500 gap-2">
              <Info className="w-8 h-8 opacity-20" />
              <p className="text-sm italic">Failed to load beat details.</p>
            </div>
          ) : (
            <>
              {/* Quick Summary Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-[#1d2733] border border-white/5">
                <SummaryItem icon={Music} label="Title" value={product.name} />
                <SummaryItem icon={DollarSign} label="Price" value={`$${product.price}`} />
                <SummaryItem icon={Calendar} label="Uploaded" value={formatDateTime(product.created_at).split(",")[0]} />
                <SummaryItem icon={TrendingUp} label="Units Sold" value={analytics?.totalSold?.toString() || "0"} />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Section: Beat Information */}
                <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
                  <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
                    <Music className="w-4 h-4" />
                    Beat Information
                  </h3>
                  <div className="space-y-3">
                    <OrderInfoRow icon={Music} label="Title" value={product.name} />
                    <OrderInfoRow icon={Globe} label="Genre" value={product.subCategory?.name || "Unknown"} />
                    <OrderInfoRow icon={DollarSign} label="Base Price" value={`$${product.price}`} />
                    <OrderInfoRow icon={Clock} label="Upload Date" value={formatDateTime(product.created_at)} />
                  </div>
                </div>

                {/* Section: Performance Analytics */}
                <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
                  <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
                    <BarChart3 className="w-4 h-4" />
                    Performance Analytics
                  </h3>
                  <div className="space-y-3">
                    <OrderInfoRow icon={TrendingUp} label="Total Units Sold" value={analytics?.totalSold?.toString() || "0"} />
                    <OrderInfoRow icon={DollarSign} label="Total Revenue" value={`$${analytics?.totalRevenue || 0}`} />
                    <OrderInfoRow icon={Heart} label="Wishlist Count" value={analytics?.wishlistCount?.toString() || "0"} />
                    <div className="mt-2 p-3 bg-[#00e08f]/5 rounded-lg border border-[#00e08f]/10">
                      <p className="text-[10px] text-[#00e08f] font-bold uppercase tracking-wider mb-1">Status</p>
                      <span className="text-[10px] bg-[#00e08f]/10 text-[#00e08f] border border-[#00e08f]/30 px-2 py-0.5 rounded font-bold uppercase tracking-widest">
                        {analytics?.totalSold > 0 ? "Trending" : "New Release"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section: Producer Details */}
                {!isAdmin && owner && (
                  <div className="md:col-span-2 bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
                    <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
                      <User className="w-4 h-4" />
                      Producer Information
                    </h3>
                    <div className="flex items-center gap-5 mb-4">
                      {owner.image?.url ? (
                        <img 
                          src={process.env.NEXT_PUBLIC_API_URL + owner.image.url} 
                          alt="Owner" 
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/10" 
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border-2 border-white/10 shrink-0">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="text-lg font-bold text-white truncate">{owner.fullname}</p>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">Beat Producer</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <OrderInfoRow icon={Mail} label="Email Address" value={owner.email} />
                      <OrderInfoRow icon={Phone} label="Phone Number" value={owner.phoneNumber || owner.phone || "N/A"} />
                    </div>
                    {owner.bio && (
                      <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/5 group">
                        <p className="text-[10px] text-gray-500 mb-1 flex items-center gap-1 group-hover:text-[#00e08f] transition-colors">
                          <FileText className="w-3 h-3" /> Producer Bio
                        </p>
                        <p className="text-xs text-gray-300 italic leading-relaxed">{owner.bio}</p>
                      </div>
                    )}
                  </div>
                )}

                {isAdmin && (
                  <div className="md:col-span-2 bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl text-center">
                    <p className="text-blue-400 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      Ownership: Managed by Admin
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Bar */}
        <div className="flex-shrink-0 p-6 border-t border-white/10 flex justify-end items-center bg-white/5">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold text-sm transition-all text-white active:scale-95"
          >
            Close Details
          </button>
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

function OrderInfoRow({
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

