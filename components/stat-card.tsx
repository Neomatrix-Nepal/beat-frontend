import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  iconColor: string
  valueColor: string
}

export function StatCard({ title, value, icon: Icon, iconColor, valueColor }: StatCardProps) {
  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44]">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-michroma">{title}</p>
            <p className={`text-3xl font-bold font-michroma ${valueColor}`}>{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
