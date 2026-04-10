"use client";

import { useState, useTransition } from "react";
import { Card } from "@/src/components/ui/card";
import { ChevronDown } from "lucide-react";

interface DashboardFiltersProps {
  onFilterChange?: (filters: {
    productType: "beats" | "drip" | "all";
    timeRange: "month" | "quarter" | "year" | "all";
  }) => void;
}

const PRODUCT_TYPES = [
  { value: "beats", label: "Beats Only" },
  { value: "drip", label: "Drips Only" },
  { value: "all", label: "All Products" },
];

const TIME_RANGES = [
  { value: "month", label: "This Month" },
  { value: "quarter", label: "This Quarter" },
  { value: "year", label: "This Year" },
  { value: "all", label: "All Time" },
];

export function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
  const [productType, setProductType] = useState<"beats" | "drip" | "all">("all");
  const [timeRange, setTimeRange] = useState<"month" | "quarter" | "year" | "all">("month");
  const [isPending, startTransition] = useTransition();

  const handleProductTypeChange = (value: string) => {
    const newType = value as "beats" | "drip" | "all";
    setProductType(newType);
    startTransition(() => {
      onFilterChange?.({ productType: newType, timeRange });
    });
  };

  const handleTimeRangeChange = (value: string) => {
    const newRange = value as "month" | "quarter" | "year" | "all";
    setTimeRange(newRange);
    startTransition(() => {
      onFilterChange?.({ productType, timeRange: newRange });
    });
  };

  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] p-6 mb-6">
      <div className="flex flex-wrap items-center gap-6">
        {/* Product Type Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">
            Product Type
          </label>
          <div className="relative">
            <select
              value={productType}
              onChange={(e) => handleProductTypeChange(e.target.value)}
              disabled={isPending}
              className="appearance-none bg-[#252540] border border-[#3a3a52] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer pr-10 disabled:opacity-50"
            >
              {PRODUCT_TYPES.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Time Range Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">
            Time Range
          </label>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              disabled={isPending}
              className="appearance-none bg-[#252540] border border-[#3a3a52] rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-blue-500 cursor-pointer pr-10 disabled:opacity-50"
            >
              {TIME_RANGES.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Status Indicator */}
        {isPending && (
          <div className="flex items-center gap-2 text-blue-400 text-sm">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Updating...
          </div>
        )}
      </div>

      {/* Info Text */}
      <p className="text-xs text-gray-500 mt-4">
        The dashboard data below reflects your selected filters.
      </p>
    </Card>
  );
}
