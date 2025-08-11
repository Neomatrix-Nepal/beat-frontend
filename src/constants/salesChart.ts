import { BarGraphData } from "../types/stats";

export const months = [
  { monthName: "Jan", monthNumber: 1 },
  { monthName: "Feb", monthNumber: 2 },
  { monthName: "Mar", monthNumber: 3 },
  { monthName: "Apr", monthNumber: 4 },
  { monthName: "May", monthNumber: 5 },
  { monthName: "Jun", monthNumber: 6 },
  { monthName: "Jul", monthNumber: 7 },
  { monthName: "Aug", monthNumber: 8 },
  { monthName: "Sep", monthNumber: 9 },
  { monthName: "Oct", monthNumber: 10 },
  { monthName: "Nov", monthNumber: 11 },
  { monthName: "Dec", monthNumber: 12 },
];

export const baseLabels = [
  "Lil Rock",
  "1st Highest",
  "2nd Highest",
  "3rd Highest",
  "4th Highest",
  "5th Highest",
  "Others",
];

export const barColors = [
  "#a29bfe", // Admin
  "#81ecec", // 1st Highest
  "#74b9ff", // 2nd Highest
  "#fab1a0", // 3rd Highest
  "#ffeaa7", // 4th Highest
  "#55efc4", // 5th Highest
  "#dfe6e9", // Others
];

export const dummyBarGraphData: BarGraphData = [
  { creatorId: 1, creatorName: "Admin", sold: 150, earning: 3000 },
  { creatorId: 2, creatorName: "dfwef", sold: 120, earning: 2500 },
  { creatorId: 3, creatorName: "efwefe", sold: 110, earning: 2200 },
  { creatorId: 4, creatorName: "efwe", sold: 80, earning: 1800 },
  { creatorId: 5, creatorName: "efwef", sold: 60, earning: 1500 },
  { creatorId: 6, creatorName: "fewfe", sold: 50, earning: 1300 },
  { creatorId: 7, creatorName: "Others", sold: 200, earning: 5000 },
];
