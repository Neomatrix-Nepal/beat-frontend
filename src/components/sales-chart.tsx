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
import { BarGraphData, FetchBarGraphParams, SalesChartProps } from "../types/stats";
import { barColors, baseLabels, months } from "../constants/salesChart";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();
const startYear = 2025;
const years : number[] = [];
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
  const [barGraphData, setBarGraphData] = useState<BarGraphData>(initialData ?? []);
  const [animationKey,setAnimationKey] = useState(0);
  const labelsToShow = baseLabels.slice(0,barGraphData.length);

  useEffect(() => {
    async function fetchData() {
      if (!passedToken) {
        console.log("no token");
        return;
      } else {
        console.log("token exists");
      }
      try {
        console.log("selected Month: ", filterBarGraph.month);
        const data = await getBarGraphData(passedToken, {
          type: filterBarGraph.type,
          year: filterBarGraph.year,
          month: filterBarGraph.month,
        });
        setBarGraphData(data);
        console.log("data fetched", data);
      } catch (error) {
        console.error("Failed to fetch bar graph data", error);
      }
    }

    fetchData();

    //remount the chart for animation
    setAnimationKey((k) => k + 1);
    
  }, [filterBarGraph]);

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
        <CardTitle className="text-white">Sales Performance</CardTitle>
        <div className="flex gap-2 md:gap-4 w-full flex-row justify-center md:justify-between items-center shrink">
          <select
            className="bg-[#3b3b5c] text-white px-2 py-1 rounded-md outline-none"
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
              className="bg-[#3b3b5c] text-white px-2 md:px-4 py-1 rounded-md outline-none"
              value={months.find(m => m.monthNumber === filterBarGraph.month)!.monthName}
              onChange={(e) =>{
                  const selectedMonth = months.find(m => m.monthName === e.target.value);
                  if (selectedMonth) {
                    setFilterBarGraph({
                      ...filterBarGraph,
                      month: selectedMonth.monthNumber,
                    });
                  }
                }
              }
            >
              {months.map((item, index) => (
                <option key={index}>{item.monthName}</option>
              ))}
            </select>

            <select
              className="bg-[#3b3b5c] text-white px-2 md:px-4 py-1 rounded-md outline-none"
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

      <CardContent className="w-full">
        <ResponsiveContainer  key={animationKey} width="100%" height={300} className="-ml-7">
          <BarChart data={barGraphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="creatorName" hide />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="sold"
              radius={[6, 6, 0, 0]}
              activeBar={{ stroke: "black", strokeWidth: 2 }}
              barSize={barSize}
            >
              {barGraphData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[index]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Overlay when there's no data */}
        {(barGraphData.length === 1 && barGraphData[0]?.earning === 0) && (
          <div className="absolute top-25 bottom-10 left-10 right-10 bg-black/50 bg-opacity-60 flex items-center justify-center text-white text-lg font-semibold">
            No Data
          </div>
        )}

        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-400">
          {
          (barGraphData.length === 1 && barGraphData[0]?.earning === 0)?
          ""
          :
          <>
            {barGraphData.map((_, index) => (
              <div key={index} className="flex items-center gap-2">
              <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: barColors[index] }}
              />
              <span>{labelsToShow[index]}</span>
              </div>
            ))}
          </>
          }
        </div>
      </CardContent>
    </Card>
  );
}
