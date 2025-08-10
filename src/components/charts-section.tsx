"use client";

import { EarningsChart } from "./earnings-chart";
import { SalesChart } from "./sales-chart";

// Type for each item in barGraphData array
export type BarGraphDataItem = {
  creatorId: number;
  creatorName: string;
  beatsSold: number;
  beatsEarnings: number;
};

// Type for the entire barGraphData prop (an array of BarGraphDataItem)
export type BarGraphData = BarGraphDataItem[];

// Type for pieChartData object
export type PieChartData = {
  beatsAmount: number;
  dripsAmount: number;
  commissionAmount: number;
};

type ChartsSectionProps = {
  barGraphData: BarGraphData;
  pieChartData: PieChartData;
};

export function ChartsSection({barGraphData, pieChartData} : ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <div className="lg:col-span-2 h-full">
        <SalesChart />
      </div>
      <div className="lg:col-span-1 h-full">
        <EarningsChart />
      </div>
    </div>
  )
}