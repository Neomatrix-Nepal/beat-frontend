import React, { useEffect, useState } from "react";
import api from "@/src/hooks/useApi";
import { Coupon } from "@/src/types";
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Info,
  Hash,
  DollarSign,
  FileText,
  Globe,
  Clock,
  Receipt,
} from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { Order } from "@/src/types";
import { formatDateTime } from "@/src/lib/utils";
import ReceiptModal from "@/src/components/receipt/ReceiptModal";


export default function CustomerOrderDetails({
  order: initialOrder,
  onStatusChange,
  onClose,
}: {
  order: Order | null;
  onStatusChange: (id: string) => void;
  onClose: () => void;
}) {
  const [order, setOrder] = useState<Order | null>(initialOrder);
  const [delivered, setDelivered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [showReceipt, setShowReceipt] = useState(false);

  // useEffect(() => {
  //   if (order?.couponId) {
  //     api.get(`/coupons/${order.couponId}`)
  //       .then(res => setCoupon(res.data))
  //       .catch(() => setCoupon(null));
  //   }
  // }, [order?.couponId]);

  const onMarkAsDelivered = async (order: Order) => {
    setLoading(true);
    try {
      await Promise.resolve(onStatusChange(order.id.toString()));
      setDelivered(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  } 

  if (!order) return null;

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-[#00e08f] bg-[#00e08f1a] border-[#00e08f33]";
      case "pending":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      case "failed":
        return "text-red-500 bg-red-500/10 border-red-500/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  return (
    <div className="bg-[#0f0f10] text-white p-0 overflow-hidden font-michroma rounded-2xl shadow-2xl max-w-4xl mx-auto border border-white/10 max-h-[90vh] flex flex-col">
      {/* Header Bar */}
      <div className="flex-shrink-0 flex justify-between items-center px-6 py-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00e08f]/10 rounded-lg">
            <Hash className="w-5 h-5 text-[#00e08f]" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white">Order Details</h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">ID: {order.id}</p>
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
          <SummaryItem icon={DollarSign} label="Amount" value={`$${order.amount}`} />
          <SummaryItem
            icon={Clock}
            label="Created"
            value={formatDateTime(order.createdAt).split(",")[0]}
          />
          <SummaryItem icon={CreditCard} label="Method" value={order.paymentMethod} />
          <div>
            <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">Status</p>
            <span className={`px-2 py-0.5 rounded-md text-[10px] border font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Items Section */}
                  {order.items && order.items.length > 0 && (
                    <div className="md:col-span-2 bg-[#1d2733] p-6 rounded-lg border border-white/5 mt-2">
                      <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2 mb-3">
                        <FileText className="w-4 h-4" /> Order Items
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                          <thead className="bg-[#1a2233] text-gray-400">
                            <tr>
                              <th className="text-left px-4 py-2">Item</th>
                              <th className="text-center px-4 py-2">Qty</th>
                              <th className="text-right px-4 py-2">Unit Price</th>
                              <th className="text-right px-4 py-2">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, idx) => (
                              <tr
                                key={item.id}
                                className={`border-t border-white/5 ${idx % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"}`}
                              >
                                <td className="px-4 py-2 text-white font-medium">
                                  {item.product?.name ?? `Product #${item.productId}`}
                                  {item.product?.product_type && (
                                    <span className="ml-2 text-[9px] text-gray-500 uppercase border border-gray-600 px-1.5 py-0.5 rounded">
                                      {item.product.product_type}
                                    </span>
                                  )}
                                </td>
                                <td className="px-4 py-2 text-center text-gray-300">{item.quantity}</td>
                                <td className="px-4 py-2 text-right text-gray-300">${parseFloat(item.price).toFixed(2)}</td>
                                <td className="px-4 py-2 text-right text-white font-semibold">
                                  ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
          {/* Section: Customer Information */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <User className="w-4 h-4" />
              Customer Information
            </h3>
            <div className="space-y-3">
              <OrderInfoRow icon={User} label="Full Name" value={order.user.fullname} />
              <OrderInfoRow icon={Mail} label="Email" value={order.user.email} />
              {order.user.bio && (
                <div className="mt-2 p-3 bg-white/5 rounded-lg border border-white/5 group">
                  <p className="text-[10px] text-gray-500 mb-1 flex items-center gap-1">
                    <FileText className="w-3 h-3" /> Bio
                  </p>
                  <p className="text-xs text-gray-300 italic">{order.user.bio}</p>
                </div>
              )}
            </div>
          </div>

          {/* Section: Delivery Address */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <MapPin className="w-4 h-4" />
              Delivery Address
            </h3>
            <div className="space-y-3">
              <OrderInfoRow icon={MapPin} label="Address" value={order.address || "N/A"} />
              <div className="grid grid-cols-2 gap-4">
                <OrderInfoRow icon={Globe} label="City" value={order.city || "N/A"} />
                <OrderInfoRow icon={Globe} label="Country" value={order.country || "N/A"} />
              </div>
              <OrderInfoRow icon={Phone} label="Phone" value={order.phone || "N/A"} />
            </div>
          </div>

          {/* Section: Payment & Transaction */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <CreditCard className="w-4 h-4" />
              Payment & Transaction
            </h3>
            <div className="space-y-3">
              <OrderInfoRow icon={Info} label="Payment Type" value={order.paymentType} />
              {order.khaltiId && <OrderInfoRow icon={Hash} label="Khalti ID" value={order.khaltiId} />}
              {order.stripePaymentId && <OrderInfoRow icon={Hash} label="Stripe ID" value={order.stripePaymentId} />}
              {order.couponId && (
                <div className="p-3 bg-[#00e08f]/5 rounded-lg border border-[#00e08f]/20">
                  <div className="flex items-center gap-2 mb-1">
                    <DollarSign className="w-4 h-4 text-[#00e08f]" />
                    <span className="font-bold text-[#00e08f]">Coupon Applied</span>
                  </div>
                  <div className="text-xs text-white font-mono">
                    <span className="font-bold">Code:</span> {coupon?.code || order.couponId}<br />
                    <span className="font-bold">Discount:</span> {coupon?.discountPercentage ? `${coupon.discountPercentage}%` : (order.discountPercentage ? `${order.discountPercentage}%` : 'N/A')}<br />
                    {coupon?.description && (<><span className="font-bold">Description:</span> {coupon.description}<br /></>)}
                    {coupon?.validFrom && coupon?.validUntil && (
                      <><span className="font-bold">Valid:</span> {coupon.validFrom.slice(0, 10)} to {coupon.validUntil.slice(0, 10)}<br /></>
                    )}
                  </div>
                </div>
              )}
              {/* {order.discountPercentage && <OrderInfoRow icon={DollarSign} label="Discount" value={`${order.discountPercentage}%`} />} */}
            </div>
          </div>

          {/* Section: Additional Notes */}
          <div className="bg-[#1d2733] p-6 rounded-lg space-y-4 border border-white/5">
            <h3 className="flex items-center gap-2 text-[#00e08f] text-sm font-bold border-b border-[#00e08f]/20 pb-2">
              <FileText className="w-4 h-4" />
              Additional Details
            </h3>
            <div className="space-y-3">
              <OrderInfoRow icon={Clock} label="Last Updated" value={formatDateTime(order.updatedAt)} />
              {order.notes ? (
                <div className="p-3 bg-[#00e08f]/5 rounded-lg border border-[#00e08f]/20">
                  <p className="text-[10px] text-gray-500 mb-1">Customer Notes</p>
                  <p className="text-xs text-gray-300">{order.notes}</p>
                </div>
              ) : (
                <p className="text-[10px] text-gray-600 italic">No special instructions provided.</p>
              )}
            </div>
          </div>
        </div>

      </div>
      
      {/* Footer Action */}
      <div className="flex-shrink-0 p-6 border-t border-white/10 flex justify-between items-center bg-white/5">
        {/* View Receipt button — always visible */}
        <button
          onClick={() => setShowReceipt(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all border border-[#00e08f]/30 text-[#00e08f] hover:bg-[#00e08f]/10 active:scale-95"
        >
          <Receipt className="w-4 h-4" />
          View Receipt
        </button>

        {/* Mark as Delivered — only when not yet completed */}
        {(order.status !== "completed" && !delivered) && (
          <button
            onClick={() => onMarkAsDelivered(order)}
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
        )}
      </div>

      {/* Receipt Modal */}
      {showReceipt && (
        <ReceiptModal order={order} onClose={() => setShowReceipt(false)} />
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
