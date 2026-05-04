"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
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

export type GenreSalesItem = {
  genre: string;
  totalSold: number;
  totalRevenue: number;
};

const COLORS = [
  "#818cf8", "#34d399", "#f472b6", "#fb923c", "#60a5fa",
  "#a78bfa", "#f87171", "#4ade80", "#facc15", "#2dd4bf",
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const revenue = payload[0]?.payload?.totalRevenue ?? 0;
    return (
      <div className="bg-[#1e1e3a] border border-[#3a3a5c] rounded-lg p-3 text-xs font-michroma shadow-xl">
        <p className="text-white font-bold mb-1">{label}</p>
        <p className="text-indigo-300">
          Sold: <span className="text-white font-bold">{payload[0]?.value}</span>
        </p>
        <p className="text-green-400">
          Revenue:{" "}
          <span className="text-white font-bold">
            ${revenue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export function GenreSalesChart({ data }: { data: GenreSalesItem[] }) {
  const total = data.reduce((sum, d) => sum + d.totalSold, 0);
  const totalRevenue = data.reduce((sum, d) => sum + d.totalRevenue, 0);
  const hasData = data.length > 0 && total > 0;

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44]">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <CardTitle className="text-white font-michroma text-base">
            Beats Sold by Genre
          </CardTitle>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full font-michroma">
              {total} total sold
            </span>
            <span className="text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full font-michroma">
              ${totalRevenue.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} revenue
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500">Units sold per music genre, all time.</p>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Bar chart */}
            <div className="lg:col-span-2 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#2d2d44" />
                  <XAxis
                    dataKey="genre"
                    tick={{ fill: "#9ca3af", fontSize: 10, fontFamily: "michroma" }}
                    axisLine={{ stroke: "#2d2d44" }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "#9ca3af", fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Bar dataKey="totalSold" radius={[4, 4, 0, 0]}>
                    {data.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Numerical list */}
            <div className="space-y-2 font-michroma">
              {data.map((item, index) => {
                const pct = total > 0 ? (item.totalSold / total) * 100 : 0;
                const color = COLORS[index % COLORS.length];
                return (
                  <div
                    key={item.genre}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-[#252540] border border-[#3a3a52]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-[11px] text-gray-300 truncate">{item.genre}</span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[11px] font-bold text-white">{item.totalSold}</span>
                      <span className="text-[9px] text-gray-500">({pct.toFixed(0)}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="h-40 flex items-center justify-center text-gray-500 text-sm font-michroma">
            No sales data by genre yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
