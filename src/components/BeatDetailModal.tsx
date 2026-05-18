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
import Image from "next/image";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const getNormalizedImageUrl = (url: string | null) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // Make sure baseURL has no trailing slash, url has no leading slash
  return `${baseURL.replace(/\/$/, "")}/${url.replace(/^\/+/, "")}`;
};

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
  const hasDetails = !!(product?.bpm || product?.key || product?.tags);

  const CustomChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1e1e3a] border border-[#3a3a5c] rounded-lg p-2 text-[10px] font-michroma shadow-xl">
          <p className="text-white font-bold mb-0.5">{label}</p>
          <p className="text-indigo-300">
            Sold: <span className="text-white font-bold">{payload[0]?.value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

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

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
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

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Top Row: Image, Info, Metadata */}
                <div className="md:col-span-1">
                  {/* Product Image */}
                  <div className="aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 relative group">
                    {product.images?.[0]?.url ? (
                      <Image 
                        width={500}
                        height={500}
                        src={getNormalizedImageUrl(product.images[0].url)} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-2">
                        <Music className="w-12 h-12 opacity-20" />
                        <p className="text-[10px] uppercase tracking-widest">No Image</p>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-md rounded text-[9px] font-bold text-[#00e08f] uppercase tracking-widest border border-white/10">
                      {product.mood || "Standard"}
                    </div>
                  </div>
                </div>

                {/* Section: Beat Information */}
                <div className="bg-[#1d2733] p-6 rounded-xl space-y-4 border border-white/5 h-full md:col-span-2">
                  <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
                    <Info className="w-4 h-4" />
                    Beat Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <OrderInfoRow icon={Music} label="Name" value={product.name} />
                      <OrderInfoRow icon={Globe} label="Genre" value={product.subCategory?.name || "Unknown"} />
                    </div>
                    <div className="space-y-3">
                      <OrderInfoRow icon={DollarSign} label="Base Price" value={`$${product.price}`} />
                      <OrderInfoRow icon={Clock} label="Upload Date" value={formatDateTime(product.created_at)} />
                      {product.mood && <OrderInfoRow icon={Info} label="Mood" value={product.mood} />}
                      {product.key && <OrderInfoRow icon={FileText} label="Key" value={product.key} />}
                    </div>
                  </div>
                </div>

                {/* Second Row: Performance & Trend */}
                <div className="md:col-span-1">
                  {/* Section: Performance Analytics */}
                  <div className="bg-[#1d2733] p-6 rounded-xl space-y-4 border border-white/5 h-full">
                    <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
                      <TrendingUp className="w-4 h-4" />
                      Performance
                    </h3>
                    <div className="space-y-3">
                      <OrderInfoRow icon={TrendingUp} label="Total Units Sold" value={analytics?.totalSold?.toString() || "0"} />
                      <OrderInfoRow icon={DollarSign} label="Total Revenue" value={`$${analytics?.totalRevenue || 0}`} />
                      <OrderInfoRow icon={Heart} label="Wishlist Count" value={analytics?.wishlistCount?.toString() || "0"} />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  {/* Monthly Sales Trend */}
                  {analytics?.monthlySales && analytics.monthlySales.length > 0 && (
                    <div className="bg-[#1d2733] p-6 rounded-xl border border-white/5 h-full">
                      <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2 mb-4">
                        <TrendingUp className="w-4 h-4" />
                        Monthly Sales Trend
                      </h3>
                      <div className="h-40 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={analytics.monthlySales}
                            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#2d2d44" vertical={false} />
                            <XAxis
                              dataKey="month"
                              tick={{ fill: "#9ca3af", fontSize: 9, fontFamily: "michroma" }}
                              axisLine={{ stroke: "#2d2d44" }}
                              tickLine={false}
                            />
                            <YAxis
                              tick={{ fill: "#9ca3af", fontSize: 9 }}
                              axisLine={false}
                              tickLine={false}
                              allowDecimals={false}
                            />
                            <Tooltip content={<CustomChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                            <Bar dataKey="sold" radius={[4, 4, 0, 0]} barSize={40}>
                              {analytics.monthlySales.map((_: any, index: number) => (
                                <Cell key={`cell-${index}`} fill="#00e08f" fillOpacity={0.6} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </div>
              </div>

                {/* Section: Description */}
                {product.description && (
                  <div className="md:col-span-3 bg-[#1d2733] p-6 rounded-xl border border-white/5">
                    <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2 mb-4">
                      <FileText className="w-4 h-4" />
                      Description
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed whitespace-pre-wrap">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Section: Producer Details */}
                {!isAdmin && owner && (
                  <div className="md:col-span-3 bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
                    <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
                      <User className="w-4 h-4" />
                      Producer Information
                    </h3>
                    <div className="flex items-center gap-5 mb-4">
                      {owner.image?.url ? (
                        <Image 
                          width={64}
                          height={64}
                          src={getNormalizedImageUrl(owner.image.url)} 
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
                  <div className="md:col-span-3 bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl text-center">
                    <p className="text-blue-400 text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                      <User className="w-4 h-4" />
                      Ownership: Managed by Admin
                    </p>
                  </div>
                )}
            </>
          )}
        </div>

        {/* Footer Bar */}
        <div className="flex-shrink-0 p-6 border-t border-white/10 flex justify-between items-center bg-white/5">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4 text-[9px] text-gray-500 uppercase tracking-widest">
              <span>Created: {product ? formatDateTime(product.created_at) : "N/A"}</span>
              {product?.updated_at && (
                <span>Last Updated: {formatDateTime(product.updated_at)}</span>
              )}
            </div>
          </div>
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

