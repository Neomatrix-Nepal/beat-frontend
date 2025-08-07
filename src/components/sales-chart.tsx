"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { useState } from "react";
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

//temporary prop
const salesData = [
  { month: "Jan", lilRock: 43, firstHighest: 71, secondHighest: 25, thirdHighest: 30, fourthHighest: 20, fifthHighest: 15, others: 52 },
  { month: "Feb", lilRock: 65, firstHighest: 29, secondHighest: 80, thirdHighest: 42, fourthHighest: 10, fifthHighest: 30, others: 34 },
  { month: "Mar", lilRock: 55, firstHighest: 61, secondHighest: 39, thirdHighest: 20, fourthHighest: 18, fifthHighest: 27, others: 23 },
  { month: "Apr", lilRock: 22, firstHighest: 78, secondHighest: 45, thirdHighest: 12, fourthHighest: 30, fifthHighest: 10, others: 60 },
  { month: "May", lilRock: 90, firstHighest: 30, secondHighest: 67, thirdHighest: 10, fourthHighest: 25, fifthHighest: 18, others: 40 },
  { month: "Jun", lilRock: 38, firstHighest: 58, secondHighest: 48, thirdHighest: 33, fourthHighest: 15, fifthHighest: 21, others: 77 },
  { month: "Jul", lilRock: 81, firstHighest: 41, secondHighest: 33, thirdHighest: 55, fourthHighest: 22, fifthHighest: 12, others: 59 },
  { month: "Aug", lilRock: 66, firstHighest: 70, secondHighest: 25, thirdHighest: 24, fourthHighest: 33, fifthHighest: 26, others: 46 },
  { month: "Sep", lilRock: 20, firstHighest: 86, secondHighest: 40, thirdHighest: 36, fourthHighest: 11, fifthHighest: 13, others: 35 },
  { month: "Oct", lilRock: 52, firstHighest: 60, secondHighest: 49, thirdHighest: 44, fourthHighest: 21, fifthHighest: 17, others: 73 },
  { month: "Nov", lilRock: 77, firstHighest: 28, secondHighest: 69, thirdHighest: 30, fourthHighest: 14, fifthHighest: 29, others: 31 },
  { month: "Dec", lilRock: 61, firstHighest: 55, secondHighest: 80, thirdHighest: 50, fourthHighest: 25, fifthHighest: 33, others: 42 },
];

const currentMonthName = salesData[new Date().getMonth()].month;

export function SalesChart() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);
  const monthData = salesData.find((d) => d.month === selectedMonth);

  const barData = [
    { name: "Lil Rock", value: monthData?.lilRock || 0 },
    { name: "1st Highest", value: monthData?.firstHighest || 0 },
    { name: "2nd Highest", value: monthData?.secondHighest || 0 },
    { name: "3rd Highest", value: monthData?.thirdHighest || 0 },
    { name: "4th Highest", value: monthData?.fourthHighest || 0 },
    { name: "5th Highest", value: monthData?.fifthHighest || 0 },
    { name: "Others", value: monthData?.others || 0 },
  ];

  const barColors = {
    "Lil Rock": "#a29bfe",
    "1st Highest": "#81ecec",
    "2nd Highest": "#74b9ff",
    "3rd Highest": "#fab1a0",
    "4th Highest": "#ffeaa7",
    "5th Highest": "#55efc4",
    "Others": "#dfe6e9",
  };

  const windowWidth = useWindowSize();
  let barSize = 40;

  if (windowWidth !== null) {
    if (windowWidth < 480) barSize = 20;
    else if(windowWidth < 780) barSize = 40;
    else if (windowWidth < 1024) barSize = 75;
    else barSize = 60;
  }

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] flex flex-col w-full h-full">
      <CardHeader>
        <CardTitle className="text-white">Sales Performance</CardTitle>
        <div className="flex flex-col gap-2 w-full items-start md:flex-row md:justify-between md:items-center ">
          <div className="flex w-full justify-center md:block md:flex-1">
            <select
              className="bg-[#3b3b5c] text-white px-4 py-1 rounded-md outline-none"
              value={"selectedWeek"}
              onChange={()=>{}}
            >
              <option value="">Beats</option>
              <option value="">Drips</option>
            </select>
          </div>
          <div className="flex justify-start md:justify-end gap-2 flex-wrap md:flex-2">
            <select
              className="bg-[#3b3b5c] text-white px-4 py-1 rounded-md outline-none"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {salesData.map((item, index) => (
                <option key={index}>{item.month}</option>
              ))}
            </select>

            <select
              className="bg-[#3b3b5c] text-white px-4 py-1 rounded-md outline-none"
              value={"selectedWeek"}
              onChange={()=>{}}
            >
              <option value="">week 1</option>
            </select>

            <select
              className="bg-[#3b3b5c] text-white px-4 py-1 rounded-md outline-none"
              value={"selectedYear"}
              onChange={()=>{}}
            >
              <option value="">2025</option>
            </select>
          </div>
        </div>
        
      </CardHeader>

      <CardContent className="w-full">
        <ResponsiveContainer width="100%" height={300} className="-ml-7">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              activeBar={{ stroke: "black", strokeWidth: 2 }}
              barSize={barSize}
            >
              {barData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={barColors[entry.name as keyof typeof barColors]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-gray-400">
          {Object.entries(barColors).map(([name, color]) => (
            <div key={name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: color }} />
              <span>{name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
