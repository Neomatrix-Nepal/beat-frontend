import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

const salesData = [
  { month: "Jan", beats: 40, drips: 30 },
  { month: "Feb", beats: 30, drips: 25 },
  { month: "Mar", beats: 50, drips: 35 },
  { month: "Apr", beats: 45, drips: 40 },
  { month: "May", beats: 35, drips: 30 },
  { month: "Jun", beats: 55, drips: 45 },
  { month: "Jul", beats: 70, drips: 55 },
  { month: "Aug", beats: 45, drips: 35 },
  { month: "Sep", beats: 60, drips: 50 },
  { month: "Oct", beats: 75, drips: 60 },
  { month: "Nov", beats: 50, drips: 40 },
  { month: "Dec", beats: 65, drips: 45 },
]

export function SalesChart() {
  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44]">
      <CardHeader>
        <CardTitle className="text-white">Sales Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto md:overflow-x-hidden">
          <ChartContainer
            config={{
              beats: {
                label: "Beats",
                color: "#ff7675",
              },
              drips: {
                label: "Drips",
                color: "#6c5ce7",
              },
            }}
            className="h-[300px]    "
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9ca3af", fontSize: 12 }} domain={[0, 200]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="beats"
                  stroke="#ff7675"
                  strokeWidth={2}
                  dot={{ fill: "#ff7675", strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="drips"
                  stroke="#6c5ce7"
                  strokeWidth={2}
                  dot={{ fill: "#6c5ce7", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
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