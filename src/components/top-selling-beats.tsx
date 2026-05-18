"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { TopSellingBeat } from "@/src/types/stats";
import { Trophy, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface TopSellingBeatsProps {
  data: TopSellingBeat[];
}

export function TopSellingBeats({ data }: TopSellingBeatsProps) {
  // Helper to format date without date-fns
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(date);
    } catch (e) {
      return "N/A";
    }
  };

  if (!data || data.length === 0) {
    return (
      <Card className="bg-[#1a1a2e] border-[#2d2d44]">
        <CardHeader>
          <CardTitle className="text-white font-michroma text-lg flex items-center gap-2">
            <Trophy className="text-yellow-500 w-5 h-5" />
            Top Selling Beats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">No sales data available yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] h-full">
      <CardHeader>
        <CardTitle className="text-white font-michroma text-lg flex items-center gap-2">
          <Trophy className="text-yellow-500 w-5 h-5" />
          Top Selling Beats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((beat, index) => (
            <div
              key={beat.productId}
              className="group flex items-center justify-between p-3 rounded-lg bg-[#252540] border border-[#3a3a52] hover:border-[#ff7675]/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 font-michroma">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1a1a2e] text-[#ff7675] font-bold text-sm border border-[#3a3a52]">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-sm group-hover:text-[#ff7675] font-michroma transition-colors">
                    {beat.productName}
                  </h3>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      {beat.totalSold} sold
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Calendar className="w-3 h-3 text-blue-500" />
                      Last: {beat.lastSoldAt ? formatDate(beat.lastSoldAt) : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right font-michroma">
                <div className="flex items-center justify-end gap-1 text-[#ff7675] font-bold text-sm">
                  <DollarSign className="w-3 h-3" />
                  {beat.totalRevenue.toFixed(2)}
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">Total Revenue</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
