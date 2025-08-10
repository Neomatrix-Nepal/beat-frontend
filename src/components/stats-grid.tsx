"use client";
import { Download, Tag, DollarSign, LucideProps } from "lucide-react"
import { StatCard } from "./stat-card"
import { StatCardData, StatsGridData, StatsGridProps } from "../types/stats";

function mapStatsResponseToData(stats: StatsGridData): StatCardData[] {
  return [
    {
      title: "Total Beats Uploaded",
      publicCount: stats.totalBeatsUploaded.subCount.other,
      adminCount: stats.totalBeatsUploaded.subCount["Raus Ray"] || 0,
      value: stats.totalBeatsUploaded.count,
      icon: Download,
      iconColor: "bg-[#6c5ce7]",
      valueColor: "text-[#6c5ce7]",
    },
    {
      title: "Beats Sold This Month",
      publicCount: stats.beatsSoldThisMonth.subCount.other,
      adminCount: stats.beatsSoldThisMonth.subCount["Raus Ray"] || 0,
      value: stats.beatsSoldThisMonth.count,
      icon: Tag,
      iconColor: "bg-[#fd79a8]",
      valueColor: "text-[#fd79a8]",
    },
    {
      title: "Total Beats Earnings",
      publicCount: stats.totalBeatsEarnings.subCount.other,
      adminCount: stats.totalBeatsEarnings.subCount["Raus Ray"] || 0,
      value: stats.totalBeatsEarnings.count,
      icon: DollarSign,
      iconColor: "bg-[#fdcb6e]",
      valueColor: "text-[#fdcb6e]",
    },
    {
      title: "Total Drips Added",
      value: stats.totalDripsAdded,
      icon: Download, // or other icon
      iconColor: "bg-[#74b9ff]",
      valueColor: "text-[#74b9ff]",
    },
    {
      title: "Drips Sold This Month",
      value: stats.dripsSoldThisMonth,
      icon: Tag,
      iconColor: "bg-[#a29bfe]",
      valueColor: "text-[#a29bfe]",
    },
    {
      title: "Total Drips Earnings",
      value: stats.totalDripsEarnings,
      icon: DollarSign,
      iconColor: "bg-[#00b894]",
      valueColor: "text-[#00b894]",
    },
  ];
}

export function StatsGrid({data}:StatsGridProps) {
  const test = mapStatsResponseToData(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {test.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          publicCount={stat.publicCount} 
          adminCount={stat.adminCount}        
          value={stat.value}
          icon={stat.icon}
          iconColor={stat.iconColor}
          valueColor={stat.valueColor} 
        />
      ))}
    </div>
  )
}