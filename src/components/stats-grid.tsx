import { Download, Tag, DollarSign } from "lucide-react"
import { StatCard } from "./stat-card"

const statsData = [
  {
    title: "Total Beats Uploaded",
    value: "100",
    publicCount: 53,
    adminCount: 47,
    icon: Download,
    iconColor: "bg-[#6c5ce7]",
    valueColor: "text-[#6c5ce7]",
  },
  {
    title: "Beats Sold This Month",
    value: "25",
    publicCount: 17,
    adminCount: 8,
    icon: Tag,
    iconColor: "bg-[#fd79a8]",
    valueColor: "text-[#fd79a8]",
  },
  {
    title: "Total Beats Earnings",
    value: "$250",
    publicCount: 75,
    adminCount:74,
    icon: DollarSign,
    iconColor: "bg-[#fdcb6e]",
    valueColor: "text-[#fdcb6e]",
  },
  {
    title: "Total Drips Added",
    value: "8",
    publicCount: 64,
    adminCount: 35,
    icon: Download,
    iconColor: "bg-[#74b9ff]",
    valueColor: "text-[#74b9ff]",
  },
  {
    title: "Drips Sold This Month",
    value: "3",
    publicCount: 72,
    adminCount: 67,
    icon: Tag,
    iconColor: "bg-[#a29bfe]",
    valueColor: "text-[#a29bfe]",
  },
  {
    title: "Total Drips Earnings",
    value: "$50",
    publicCount: 43,
    adminCount: 25,
    icon: DollarSign,
    iconColor: "bg-[#00b894]",
    valueColor: "text-[#00b894]",
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
  )
}