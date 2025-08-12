"use client";

import { ChartsSectionProps } from "../types/stats";
import { EarningsChart } from "./earnings-chart";
import { SalesChart } from "./sales-chart";

export function ChartsSection({
  barGraphData,
  pieChartData,
  token,
}: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div className="lg:col-span-2 h-full">
        <SalesChart barGraphData={barGraphData} passedToken={token} />
      </div>
      <div className="lg:col-span-1 h-full">
        <EarningsChart pieChartData={pieChartData} />
      </div>
    </div>
  );
}
