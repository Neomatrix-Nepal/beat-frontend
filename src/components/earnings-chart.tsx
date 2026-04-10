"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PieChartData } from "../types/stats";

function transformToPieData(data: PieChartData) {
  return [
    {
      name: "Admin Beats",
      value: Math.round(data.adminBeatsEarnings * 100) / 100,
      color: "#ff7675",
    },
    {
      name: "Creator Beats",
      value: Math.round(data.creatorBeatsEarnings * 100) / 100,
      color: "#a29bfe",
    },
    {
      name: "Custom Beats",
      value: Math.round(data.customBeatsEarnings * 100) / 100,
      color: "#6c5ce7",
    },
    {
      name: "Mixing Pro",
      value: Math.round(data.mixingProEarnings * 100) / 100,
      color: "#74b9ff",
    },
    {
      name: "Studio Bookings",
      value: Math.round(data.studioBookingsEarnings * 100) / 100,
      color: "#00b894",
    },
  ].filter((item) => item.value > 0);
}

export function EarningsChart({
  pieChartData,
}: {
  pieChartData: PieChartData;
}) {
  const transformedData = transformToPieData(pieChartData);
  const hasData = transformedData.some((entry) => entry.value > 0);
  const totalEarnings = transformedData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] h-full flex flex-col">
      <CardHeader>
        <div>
          <CardTitle className="text-white font-michroma">Earnings Breakdown</CardTitle>
          <p className="text-green-400 text-sm mt-2 font-semibold">
            Total: $
            {totalEarnings.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="relative h-75 flex items-center justify-center">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transformedData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) =>
                    `${name}: $${value.toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}`
                  }
                  outerRadius={100}
                  dataKey="value"
                >
                  {transformedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      style={{ outline: "none" }}
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`,
                    "Amount",
                  ]}
                  contentStyle={{
                    backgroundColor: "#2d2d44",
                    border: "1px solid #444",
                    borderRadius: "6px",
                  }}
                  labelStyle={{
                    color: "#ffffff",
                  }}
                  itemStyle={{
                    color: "#ffffff",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-60 h-60 rounded-full border-4 border-dashed border-gray-500 flex items-center justify-center">
                <span className="text-gray-400 font-semibold text-lg">
                  No Data
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Legend and Details */}
        <div className="mt-6 space-y-2 font-michroma">
          {transformedData.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded bg-[#252540] border border-[#3a3a52]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-sm shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-300 font-medium">
                  {item.name}
                </span>
              </div>
              <span className="text-sm text-green-400 font-semibold">
                $
                {item.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
