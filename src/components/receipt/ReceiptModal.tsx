"use client";
import React from "react";
import { Order } from "@/src/types";
import { exportReceiptAsPDF } from "@/src/lib/exportReceipt";
import {
  X,
  Download,
  Printer,
  CheckCircle,
  Clock,
  XCircle,
  Hash,
  CreditCard,
  MapPin,
  User,
  Phone,
  Mail,
} from "lucide-react";
import { formatDateTime } from "@/src/lib/utils";

interface ReceiptModalProps {
  order: Order;
  onClose: () => void;
}

export default function ReceiptModal({ order, onClose }: ReceiptModalProps) {
  const handleExport = () => {
    exportReceiptAsPDF(order);
  };

  const handlePrint = () => {
    exportReceiptAsPDF(order); // Opens print window
  };

  const statusIcon = {
    completed: <CheckCircle className="w-4 h-4 text-[#00e08f]" />,
    pending: <Clock className="w-4 h-4 text-yellow-400" />,
    failed: <XCircle className="w-4 h-4 text-red-400" />,
    cancelled: <XCircle className="w-4 h-4 text-red-400" />,
  };

  const statusColor = {
    completed: "text-[#00e08f] bg-[#00e08f]/10 border-[#00e08f]/30",
    pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    failed: "text-red-400 bg-red-400/10 border-red-400/30",
    cancelled: "text-red-400 bg-red-400/10 border-red-400/30",
  };

  const subtotal = parseFloat(order.amount);
  const discountAmount = order.discountPercentage
    ? (subtotal * order.discountPercentage) / (100 - order.discountPercentage)
    : 0;
  const originalTotal = subtotal + discountAmount;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      {/* Modal Shell */}
      <div className="bg-[#0a0f1a] rounded-2xl shadow-2xl border border-white/10 w-full max-w-2xl max-h-[95vh] flex flex-col font-michroma">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#00e08f]/10 rounded-lg">
              <Hash className="w-5 h-5 text-[#00e08f]" />
            </div>
            <div>
              <h2 className="text-white font-bold text-base">Order Receipt</h2>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                #{order.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>
            <button
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg bg-[#00e08f] hover:bg-[#00c97e] text-black font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Export PDF
            </button>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Scrollable Receipt Body */}
        <div className="overflow-y-auto flex-1 custom-scrollbar">
          {/* Printable / Exportable area */}
          <div
            id={`receipt-print-${order.id}`}
            className="bg-[#0f1117] text-white p-8 space-y-6"
          >
            {/* Receipt Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-6">
              <div>
                <h1 className="text-2xl font-extrabold tracking-tight text-[#00e08f]">
                  BEATS NEPAL
                </h1>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">
                  Official Receipt / Tax Invoice
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">Receipt No.</p>
                <p className="text-lg font-bold text-white">#{order.id}</p>
                <p className="text-[10px] text-gray-500 mt-1">
                  {formatDateTime(order.createdAt)}
                </p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-2">
              {statusIcon[order.status as keyof typeof statusIcon] ?? (
                <Clock className="w-4 h-4 text-gray-400" />
              )}
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border uppercase tracking-widest ${
                  statusColor[order.status as keyof typeof statusColor] ??
                  "text-gray-400 bg-gray-400/10 border-gray-400/30"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* 2-Col: Bill To / Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bill To */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                <h3 className="text-[10px] font-bold text-[#00e08f] uppercase tracking-widest border-b border-[#00e08f]/20 pb-2 flex items-center gap-1.5">
                  <User className="w-3 h-3" /> Bill To
                </h3>
                <InfoLine label="Name" value={order.user?.fullname ?? "N/A"} />
                <InfoLine
                  label="Email"
                  value={order.user?.email ?? order.email ?? "N/A"}
                  icon={<Mail className="w-3 h-3" />}
                />
                {order.phone && (
                  <InfoLine
                    label="Phone"
                    value={order.phone}
                    icon={<Phone className="w-3 h-3" />}
                  />
                )}
                {(order.address || order.city || order.country) && (
                  <InfoLine
                    label="Address"
                    value={[order.address, order.city, order.country]
                      .filter(Boolean)
                      .join(", ")}
                    icon={<MapPin className="w-3 h-3" />}
                  />
                )}
              </div>

              {/* Payment Info */}
              <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                <h3 className="text-[10px] font-bold text-[#00e08f] uppercase tracking-widest border-b border-[#00e08f]/20 pb-2 flex items-center gap-1.5">
                  <CreditCard className="w-3 h-3" /> Payment Info
                </h3>
                <InfoLine
                  label="Method"
                  value={order.paymentMethod?.toUpperCase() ?? "N/A"}
                />
                <InfoLine
                  label="Type"
                  value={order.paymentType?.toUpperCase() ?? "N/A"}
                />
                {order.khaltiId && (
                  <InfoLine label="Transaction ID" value={order.khaltiId} mono />
                )}
                {order.stripePaymentId && (
                  <InfoLine
                    label="Transaction ID"
                    value={order.stripePaymentId}
                    mono
                  />
                )}
                {order.couponId && (
                  <InfoLine
                    label="Coupon"
                    value={`Applied (${order.discountPercentage}% off)`}
                  />
                )}
              </div>
            </div>

            {/* Items Table */}
            {order.items && order.items.length > 0 && (
              <div>
                <h3 className="text-[10px] font-bold text-[#00e08f] uppercase tracking-widest mb-3 flex items-center gap-1.5">
                  Order Items
                </h3>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <table className="w-full text-xs">
                    <thead className="bg-[#1a2233] text-gray-400">
                      <tr>
                        <th className="text-left px-4 py-3">Item</th>
                        <th className="text-center px-4 py-3">Qty</th>
                        <th className="text-right px-4 py-3">Unit Price</th>
                        <th className="text-right px-4 py-3">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.items.map((item, idx) => (
                        <tr
                          key={item.id}
                          className={`border-t border-white/5 ${
                            idx % 2 === 0
                              ? "bg-white/[0.02]"
                              : "bg-white/[0.04]"
                          }`}
                        >
                          <td className="px-4 py-3 text-white font-medium">
                            {item.product?.name ?? `Product #${item.productId}`}
                            {item.product?.product_type && (
                              <span className="ml-2 text-[9px] text-gray-500 uppercase border border-gray-600 px-1.5 py-0.5 rounded">
                                {item.product.product_type}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-center text-gray-300">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-300">
                            ${parseFloat(item.price).toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right text-white font-semibold">
                            $
                            {(
                              parseFloat(item.price) * item.quantity
                            ).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-64 space-y-2">
                {order.discountPercentage && discountAmount > 0 ? (
                  <>
                    <TotalRow
                      label="Subtotal"
                      value={`$${originalTotal.toFixed(2)}`}
                    />
                    <TotalRow
                      label={`Discount (${order.discountPercentage}%)`}
                      value={`-$${discountAmount.toFixed(2)}`}
                      accent
                    />
                    <div className="border-t border-white/20 pt-2">
                      <TotalRow
                        label="Total Paid"
                        value={`$${subtotal.toFixed(2)}`}
                        bold
                      />
                    </div>
                  </>
                ) : (
                  <div className="border-t border-white/20 pt-2">
                    <TotalRow
                      label="Total Paid"
                      value={`$${subtotal.toFixed(2)}`}
                      bold
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Notes */}
            {order.notes && (
              <div className="bg-[#00e08f]/5 border border-[#00e08f]/20 rounded-xl p-4">
                <p className="text-[10px] text-[#00e08f] uppercase tracking-widest mb-1">
                  Customer Notes
                </p>
                <p className="text-xs text-gray-300">{order.notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-white/10 pt-6 text-center space-y-1">
              <p className="text-xs text-gray-400">
                Thank you for your purchase!
              </p>
              <p className="text-[10px] text-gray-600">
                Beats Nepal · beatsnepal.com · support@beatsnepal.com
              </p>
              <p className="text-[10px] text-gray-700 mt-2">
                This is a computer-generated receipt. No signature required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoLine({
  label,
  value,
  icon,
  mono,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1">
        {icon}
        {label}
      </p>
      <p
        className={`text-[11px] text-white break-all ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}

function TotalRow({
  label,
  value,
  bold,
  accent,
}: {
  label: string;
  value: string;
  bold?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex justify-between items-center text-xs">
      <span className={`text-gray-400 ${bold ? "text-white font-bold" : ""}`}>
        {label}
      </span>
      <span
        className={`${bold ? "text-[#00e08f] font-extrabold text-sm" : ""} ${
          accent ? "text-[#00e08f]" : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
