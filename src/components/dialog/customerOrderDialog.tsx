import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaCheck } from "react-icons/fa";
import { Order } from "@/src/types";
import { formatDateTime } from "@/src/lib/utils";

export default function CustomerOrderDetails({
  order: initialOrder,
  onStatusChange,
  onClose,
}: {
  order: Order | null;
  onStatusChange: (id:string) => void;
  onClose: () => void;
}) {
  const [order, setOrder] = useState<Order | null>(initialOrder);
  const [delivered, setDelivered] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  console.log(order)

  const onMarkAsDelivered = async(order: Order) => {
    setLoading(true);
    try{
      await Promise.resolve(onStatusChange((order.id).toString()));
      setDelivered(true);
    }catch(error){
      console.error(error)
    }finally{
      setLoading(false);
    }
  }
  if (!order) return null;

  return (
    <div className="bg-[#0f0f10] text-white p-6 font-michroma rounded-xl shadow-xl max-w-5xl mx-auto space-y-6 border border-[#333]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold">
          Order Delivery Details
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
        {/* Customer Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">
            Customer Information
          </h3>
          <OrderInfoRow label="Customer" value={order.user.fullname} />
          <OrderInfoRow label="Email" value={order.user.email} />
          {/* <OrderInfoRow label="Product" value={order.product} /> */}
          <OrderInfoRow label="Price" value={order.amount} />
          <OrderInfoRow
            label="Order Date"
            value={formatDateTime(order.createdAt)}
          />
          <OrderInfoRow label="Payment Status" value={order.status} />
          <OrderInfoRow label="Order ID" value={String(order.id)} />
        </div>

        {/* Delivery Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">
            Delivery Information
          </h3>
          <OrderInfoRow label="Delivery Status" value={order.status} />
          <OrderInfoRow label="Delivery Address" value={order.address ?? ""} />
          {/* Shipping Details Panel */}
          <h3 className="text-center text-[#00e08f] text-lg mt-4">
            Delivery Information
          </h3>
          {order.city && <OrderInfoRow label="Delivery City" value={order.city} />}
          {order.country && <OrderInfoRow label="Delivery Country" value={order.country} />}
          {order.phone && <OrderInfoRow label="Phone Number" value={order.phone} />}
          {order.email && <OrderInfoRow label="Email" value={order.email}/>}
          {order.couponId && <OrderInfoRow label="Coupon Id" value={order.couponId} />}
          {order.discountPercentage !== null && order.discountPercentage !== undefined && (
            <OrderInfoRow label="Discount" value={order.discountPercentage.toString()} />
          )}
          {order.notes && <OrderInfoRow label="Notes" value={order.notes} />}
          {order.createdAt && <OrderInfoRow label="Created Date" value={formatDateTime(order.createdAt)} />}
          {order.updatedAt && <OrderInfoRow label="Updated Date" value={formatDateTime(order.updatedAt)} />}
        </div>
      </div>

      {/* Action Button */}
      {
        (order.status !== "completed" && !delivered) &&
        <div>
          <button
            onClick={()=>onMarkAsDelivered(order)} 
            className={` hover:bg-[#00c97e] text-black px-5 py-2 rounded-md font-semibold text-sm flex items-center gap-2
              ${loading ? "bg-[#00c97e]" : "bg-[#00e08f]"}
            `}>
              {loading ? (
                  <div className="w-7 h-7 border-3 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <FaCheck className="text-sm" />
                  Mark as Delivered
                </>
              )}
          </button>
        </div>
      }
    </div>
  );
}

function OrderInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm text-gray-300">
      <span className="text-[#8f8f8f]">{label}:</span>{" "}
      <span className="text-white break-words min-w-0">{value}</span>
    </div>
  );
}
