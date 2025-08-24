import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { PieChartData } from "../types/stats";
import { RevenueData } from "../types";

const pieData = [
  { name: "Beats", value: 34, color: "#ff7675" },
  { name: "Drips", value: 16, color: "#6c5ce7" },
  { name: "Commission", value: 7, color: "#00b894" },
  { name: "Mixing Pro", value: 47, color: "#fff45e" },
];

function transformToPieData(data: PieChartData) {
  const colorMap: Record<keyof RevenueData, string> = {
    beatsAmount: "#ff7675",
    dripsAmount: "#6c5ce7",
    totalRevenue: "#00b894",
    adminEarnings: "#fff45e",
    creatorCommissions: "#0984e3",
    platformEarnings: "#fd79a8",
  };

  const nameMap: Record<keyof RevenueData, string> = {
    beatsAmount: "Beats",
    dripsAmount: "Drips",
    totalRevenue: "Total Revenue",
    adminEarnings: "Admin Earnings",
    creatorCommissions: "Creator Commissions",
    platformEarnings: "Platform Earnings",
  };

  return (Object.entries(data) as [keyof RevenueData, number][]).map(
    ([key, value]) => ({
      name: nameMap[key],
      value,
      color: colorMap[key],
    })
  );
}

export function EarningsChart({
  pieChartData,
}: {
  pieChartData: PieChartData;
}) {
  const transformedData = transformToPieData(pieChartData);
  const hasData = transformedData.some((entry) => entry.value > 0);

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-white">Earnings Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[300px] flex items-center justify-center">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transformedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={0}
                  outerRadius={120}
                  paddingAngle={0}
                  dataKey="value"
                >
                  {transformedData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      name={entry.name}
                    />
                  ))}
                </Pie>

                {/* Tooltip on hover */}
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `$${value}`,
                    name,
                  ]}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "none",
                    borderRadius: "4px",
                    color: "#000",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[240px] h-[240px] rounded-full border-4 border-dashed border-gray-500 flex items-center justify-center">
                <span className="text-gray-400 font-semibold text-lg">
                  No Data
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-4 shrink flex-wrap">
          {transformedData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-400">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
