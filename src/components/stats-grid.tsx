"use client";
import { StatCard } from "./stat-card";
import { StatCardData, StatsGridData, StatsGridProps } from "../types/stats";
import { statConfig } from "../constants/statGrid";

function mapStatsResponseToData(stats: StatsGridData): StatCardData[] {
  return statConfig.map(cfg => {
    const statItem = stats?.[cfg.key as keyof StatsGridData] as any;

    return {
      title: cfg.title,
      publicCount: cfg.hasSubCount ? statItem?.subCount?.other ?? 0 : undefined,
      adminCount: cfg.hasSubCount ? statItem?.subCount?.admin ?? 0 : undefined,
      value: statItem?.count ?? statItem ?? 0,
      icon: cfg.icon,
      iconColor: cfg.iconColor,
      valueColor: cfg.valueColor,
    };
  });
}

export function StatsGrid({ data }: StatsGridProps) {
  const statsData = mapStatsResponseToData(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsData.map((stat, index) => (
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
  );
}
