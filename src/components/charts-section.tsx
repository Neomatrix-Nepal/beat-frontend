import { EarningsChart } from "./earnings-chart";
import { SalesChart } from "./sales-chart";

export function ChartsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <SalesChart />
      </div>
      <div className="lg:col-span-1">
        <EarningsChart />
      </div>
    </div>
  )
}
