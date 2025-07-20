"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { FaCheck } from "react-icons/fa";

type CustomerOrder = {
  customer: string;
  email: string;
  product: string;
  price: string;
  orderDate: string;
  paymentStatus: string;
  orderId: number;
  deliveryStatus: string;
  estimatedDelivery: string;
  address: string;
};

export default function CustomerOrderDetails() {
  const [order, setOrder] = useState<CustomerOrder | null>(null);

  useEffect(() => {
    const loadOrderDetails = async () => {
      const mockOrder: CustomerOrder = {
        customer: "Rita Sherpa",
        email: "r@gmail.com",
        product: "Woolen Sweater",
        price: "$23",
        orderDate: "2024-02-08",
        paymentStatus: "Paid",
        orderId: 147,
        deliveryStatus: "In Transit",
        estimatedDelivery: "2024-02-08",
        address: "123 Main Street, Jaisidewal",
      };

      setTimeout(() => setOrder(mockOrder), 500);
    };

    loadOrderDetails();
  }, []);

  if (!order) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-[#0f0f10] text-white p-6 font-michroma rounded-xl shadow-xl max-w-4xl mx-auto space-y-6 border border-[#333]">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-semibold">Order Delivery Details</h2>
        <button className="text-xs text-[#74f9e0] px-3 py-1 rounded-full flex items-center gap-1">
          <X className="w-3 h-3" />
          Close
        </button>
      </div>

      {/* Order Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">Customer Information</h3>
          <OrderInfoRow label="Customer" value={order.customer} />
          <OrderInfoRow label="Email" value={order.email} />
          <OrderInfoRow label="Product" value={order.product} />
          <OrderInfoRow label="Price" value={order.price} />
          <OrderInfoRow label="Order Date" value={order.orderDate} />
          <OrderInfoRow label="Payment Status" value={order.paymentStatus} />
          <OrderInfoRow label="Order ID" value={String(order.orderId)} />
        </div>

        {/* Delivery Info Panel */}
        <div className="bg-[#1d2733] p-6 rounded-lg space-y-2">
          <h3 className="text-center text-[#00e08f] text-lg mb-4">Delivery Information</h3>
          <OrderInfoRow label="Delivery Status" value={order.deliveryStatus} />
          <OrderInfoRow label="Estimated Delivery" value={order.estimatedDelivery} />
          <OrderInfoRow label="Delivery Address" value={order.address} />
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

function OrderInfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-sm text-gray-300">
      <span className="text-[#8f8f8f]">{label}:</span>{" "}
      <span className="text-white">{value}</span>
    </div>
  );
}
