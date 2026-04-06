"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useWindowSize } from "../hooks/useWindowSize";
import { getBarGraphData } from "../app/(protected_routes)/action";
import {
  BarGraphData,
  FetchBarGraphParams,
  SalesChartProps,
} from "../types/stats";
import { barColors, months } from "../constants/salesChart";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const startYear = 2025;
const years: number[] = [];
for (let year = startYear; year <= currentYear; year++) {
  years.push(year);
}

export function SalesChart({
  barGraphData: initialData,
  passedToken,
}: SalesChartProps) {
  const [filterBarGraph, setFilterBarGraph] = useState<FetchBarGraphParams>({
    type: "beats",
    month: currentMonth,
    year: currentYear,
  });
  const [barGraphData, setBarGraphData] = useState<BarGraphData>(
    initialData ?? [],
  );
  const [animationKey, setAnimationKey] = useState(0);

  // Transform data to add labels showing Admin vs Creator
  const transformedData = barGraphData.map((item, index) => ({
    ...item,
    displayName:
      index === 0
        ? `${item.creatorName} (Admin)`
        : `${item.creatorName} (Creator)`,
    type: index === 0 ? "admin" : "creator",
  }));

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBarGraphData(passedToken, {
          type: filterBarGraph.type,
          year: filterBarGraph.year,
          month: filterBarGraph.month,
        });
        setBarGraphData(data);
      } catch (error) {
        console.error("Failed to fetch bar graph data", error);
      }
    }

    fetchData();

    //remount the chart for animation
    setAnimationKey((k) => k + 1);
  }, [filterBarGraph, passedToken]);

  const windowWidth = useWindowSize();
  let barSize = 40;

  if (windowWidth !== null) {
    if (windowWidth < 480) barSize = 20;
    else if (windowWidth < 780) barSize = 40;
    else if (windowWidth < 1024) barSize = 75;
    else barSize = 60;
  }

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] flex flex-col w-full h-full relative">
      <CardHeader>
        <CardTitle className="text-white">
          Sales Performance (Admin & Creators)
        </CardTitle>
        <div className="flex gap-2 md:gap-4 w-full flex-row justify-center md:justify-between items-center shrink">
          <select
            className="bg-[#3b3b5c] text-white px-2 py-1 rounded-md outline-none text-sm"
            value={filterBarGraph.type}
            onChange={(e) => {
              setFilterBarGraph({
                ...filterBarGraph,
                type: e.target.value as "beats" | "drip",
              });
            }}
          >
            <option value="beats">Beats</option>
            <option value="drip">Drips</option>
          </select>

          <div className="flex gap-2 md:gap-4">
            <select
              className="bg-[#3b3b5c] text-white px-2 md:px-4 py-1 rounded-md outline-none text-sm"
              value={
                months.find((m) => m.monthNumber === filterBarGraph.month)!
                  .monthName
              }
              onChange={(e) => {
                const selectedMonth = months.find(
                  (m) => m.monthName === e.target.value,
                );
                if (selectedMonth) {
                  setFilterBarGraph({
                    ...filterBarGraph,
                    month: selectedMonth.monthNumber,
                  });
                }
              }}
            >
              {months.map((item, index) => (
                <option key={index}>{item.monthName}</option>
              ))}
            </select>

            <select
              className="bg-[#3b3b5c] text-white px-2 md:px-4 py-1 rounded-md outline-none text-sm"
              value={filterBarGraph.year}
              onChange={(e) => {
                setFilterBarGraph({
                  ...filterBarGraph,
                  year: Number(e.target.value),
                });
              }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="w-full h-full flex-1">
        <ResponsiveContainer
          key={animationKey}
          width="100%"
          height="100%"
          minHeight={500}
          className="-ml-7"
        >
          <BarChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3a3a52" />
            <XAxis
              dataKey="displayName"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12, fill: "#a0aec0" }}
            />
            <YAxis tick={{ fontSize: 12, fill: "#a0aec0" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#252540",
                border: "1px solid #3a3a52",
                borderRadius: "6px",
              }}
              formatter={(value: number) => [`${value} units`, "Units Sold"]}
              labelStyle={{
                color: "#ffffff",
              }}
              itemStyle={{
                color: "#ffffff",
              }}
            />
            <Bar
              dataKey="sold"
              radius={[6, 6, 0, 0]}
              activeBar={{ stroke: "white", strokeWidth: 2 }}
              barSize={barSize}
            >
              {transformedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.type === "admin" ? "#ff7675" : barColors[index]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Overlay when there's no data */}
        {barGraphData.length === 1 && barGraphData[0]?.earning === 0 && (
          <div className="absolute top-25 bottom-10 left-10 right-10 bg-black/50 bg-opacity-60 flex items-center justify-center text-white text-lg font-semibold rounded-lg">
            No Data Available
          </div>
        )}
      </CardContent>
    </Card>
  );
}
