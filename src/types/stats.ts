import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface StatCardProps {
  title: string;
  value: string | number;
  publicCount?: number,
  adminCount?: number,
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconColor: string;
  valueColor: string;
}

export type StatCardData = {
  title: string;
  publicCount?: number;
  adminCount?: number;
  value: number;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  iconColor: string;
  valueColor: string;
};

type SubCount = {
  [key: string]: number; // e.g. "Raus Ray": 1, "other": 0
};

type CountWithSubCount = {
  count: number;
  subCount: SubCount;
};

export interface StatsGridData {
  totalBeatsUploaded: CountWithSubCount;
  beatsSoldThisMonth: CountWithSubCount;
  totalBeatsEarnings: CountWithSubCount;
  totalDripsAdded: number;
  dripsSoldThisMonth: number;
  totalDripsEarnings: number;
}

export interface StatsGridProps {
  data: StatsGridData;
}