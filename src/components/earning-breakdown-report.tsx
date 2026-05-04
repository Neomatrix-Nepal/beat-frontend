"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Music, Shirt, Mic2, Users, TrendingUp } from "lucide-react";

export type EarningBreakdownData = {
  adminBeatsEarnings: number;
  creatorBeatsEarnings: number;
  customBeatsEarnings: number;
  mixingProEarnings: number;
  studioBookingsEarnings: number;
};

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const segments = [
  {
    key: "adminBeatsEarnings" as keyof EarningBreakdownData,
    label: "Admin Beats",
    sublabel: "Direct beat sales by admin",
    icon: Music,
    color: "from-rose-500/20 to-rose-600/10",
    border: "border-rose-500/30",
    iconBg: "bg-rose-500/20",
    iconColor: "text-rose-400",
    valueColor: "text-rose-300",
  },
  {
    key: "creatorBeatsEarnings" as keyof EarningBreakdownData,
    label: "Commission from Creators",
    sublabel: "Revenue from 3rd-party beats",
    icon: Users,
    color: "from-violet-500/20 to-violet-600/10",
    border: "border-violet-500/30",
    iconBg: "bg-violet-500/20",
    iconColor: "text-violet-400",
    valueColor: "text-violet-300",
  },
  {
    key: "customBeatsEarnings" as keyof EarningBreakdownData,
    label: "Custom Beats",
    sublabel: "Paid custom beat orders",
    icon: Mic2,
    color: "from-blue-500/20 to-blue-600/10",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
    valueColor: "text-blue-300",
  },
  {
    key: "mixingProEarnings" as keyof EarningBreakdownData,
    label: "Mixing Pro",
    sublabel: "Professional mixing orders",
    icon: TrendingUp,
    color: "from-cyan-500/20 to-cyan-600/10",
    border: "border-cyan-500/30",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-400",
    valueColor: "text-cyan-300",
  },
  {
    key: "studioBookingsEarnings" as keyof EarningBreakdownData,
    label: "Studio Bookings",
    sublabel: "Studio session revenue",
    icon: Shirt,
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-400",
    valueColor: "text-emerald-300",
  },
];

export function EarningBreakdownReport({ data }: { data: EarningBreakdownData }) {
  const total = segments.reduce((sum, s) => sum + (data?.[s.key] ?? 0), 0);

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white font-michroma text-base">
            Sales Analytics — Revenue Breakdown
          </CardTitle>
          <span className="text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full font-michroma">
            Total: ${fmt(total)}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Breakdown of all revenue streams across the platform.
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {segments.map((seg) => {
            const value = data?.[seg.key] ?? 0;
            const pct = total > 0 ? (value / total) * 100 : 0;
            const Icon = seg.icon;
            return (
              <div
                key={seg.key}
                className={`relative rounded-xl p-4 bg-gradient-to-br ${seg.color} border ${seg.border} flex flex-col gap-3`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${seg.iconBg}`}>
                    <Icon className={`w-4 h-4 ${seg.iconColor}`} />
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-black/20 px-2 py-0.5 rounded-full">
                    {pct.toFixed(1)}%
                  </span>
                </div>
                <div>
                  <p className={`text-lg font-bold font-michroma ${seg.valueColor}`}>
                    ${fmt(value)}
                  </p>
                  <p className="text-[11px] font-semibold text-white mt-0.5">{seg.label}</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">{seg.sublabel}</p>
                </div>
                {/* Progress bar */}
                <div className="w-full h-1 rounded-full bg-black/20 overflow-hidden mt-auto">
                  <div
                    className={`h-full rounded-full ${seg.iconBg}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
