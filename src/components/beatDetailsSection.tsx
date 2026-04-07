"use client";
import { StatCard } from "./stat-card";
import { BeatDetailsData, StatCardData } from "../types/stats";
import { statConfig } from "../constants/beatDescriptionStatGrid";

export default function BeatDetailsSection({
  data,
}: {
  data: BeatDetailsData;
}) {
  function mapStatsResponseToData(stats: BeatDetailsData): StatCardData[] {
    return statConfig.map((cfg) => {
      const statItem = stats?.[cfg.key as keyof BeatDetailsData] as any;

      let finalValue = 0;
      if (
        typeof statItem === "object" &&
        statItem !== null &&
        "count" in statItem
      ) {
        finalValue = statItem.count;
      } else {
        finalValue = statItem ?? 0;
      }

      return {
        title: cfg.title,
        value: finalValue,
        icon: cfg.icon,
        iconColor: cfg.iconColor,
        valueColor: cfg.valueColor,
      };
    });
  }

  const statsData = mapStatsResponseToData(data);

  return (
    <>
      <h2 className="text-lg text-white font-bold mb-4 font-michroma">Beat Sales Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            iconColor={stat.iconColor}
            valueColor={stat.valueColor}
          />
        ))}
      </div>
    </>
  );
}
