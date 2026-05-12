"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ShoppingCart, User, Package, Clock } from "lucide-react";

interface RecentOrder {
  customerName: string;
  packageName: string;
  message: string;
}

interface RecentOrdersListProps {
  data: RecentOrder[];
}

export function RecentOrdersList({ data }: RecentOrdersListProps) {
  if (!data || data.length === 0) {
    return (
      <Card className="bg-[#1a1a2e] border-[#2d2d44]">
        <CardHeader>
          <CardTitle className="text-white font-michroma text-lg flex items-center gap-2">
            <ShoppingCart className="text-blue-500 w-5 h-5" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">No recent orders.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] h-full">
      <CardHeader>
        <CardTitle className="text-white font-michroma text-lg flex items-center gap-2">
          <ShoppingCart className="text-blue-500 w-5 h-5" />
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.slice(0, 10).map((order, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg bg-[#252540] border border-[#3a3a52] transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                <User className="w-4 h-4 text-blue-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200">
                  <span className="font-bold text-white">{order.customerName}</span>
                </p>
                <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {order.packageName}
                </p>
                <p className="text-[10px] text-gray-500 mt-1 italic">
                  "{order.message}"
                </p>
              </div>
              <div className="flex-shrink-0">
                <Clock className="w-3 h-3 text-gray-600" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
