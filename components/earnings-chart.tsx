import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const pieData = [
  { name: "Beats", value: 70, color: "#ff7675" },
  { name: "Drips", value: 30, color: "#6c5ce7" },
]

export function EarningsChart() {
  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44]">
      <CardHeader>
        <CardTitle className="text-white">Earnings Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={0} outerRadius={120} paddingAngle={0} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#ff7675] rounded-sm"></div>
            <span className="text-sm text-gray-400">Beats</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#6c5ce7] rounded-sm"></div>
            <span className="text-sm text-gray-400">Drips</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
