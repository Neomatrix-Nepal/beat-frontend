import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Beats", value: 34, color: "#ff7675" },
  { name: "Drips", value: 16, color: "#6c5ce7" },
  { name: "Commission", value: 7, color: "#00b894" },
  { name: "Mixing Pro", value: 47, color: "#fff45e" },
];

export function EarningsChart() {
  return (
    <Card className="bg-[#1a1a2e] border-[#2d2d44] h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-white">Earnings Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={0}
                outerRadius={120}
                paddingAngle={0}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-2 mt-4 shrink flex-wrap">
          {
            pieData.map((item,index)=>{
              return(
                <div 
                  key={index}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{backgroundColor:item.color}}
                  />
                  <span className="text-sm text-gray-400">{item.name}</span>
                </div>
              )
            })
          }
        </div>
      </CardContent>
    </Card>
  );
}