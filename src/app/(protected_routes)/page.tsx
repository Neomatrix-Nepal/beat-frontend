import { StatsGrid } from "@/src/components/stats-grid";
import { ChartsSection } from "@/src/components/charts-section";
import AdminLayout from "./dashboard/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";
import {
  getBarGraphData,
  getBeatDetails,
  getPieChartData,
  getStatGridData,
  getGenreSalesBreakdown,
  getEarningBreakdown,
} from "./action";
import BeatDetailsSection from "@/src/components/beatDetailsSection";
import { EarningBreakdownReport } from "@/src/components/earning-breakdown-report";
import { GenreSalesChart } from "@/src/components/genre-sales-chart";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const token = (session?.user?.tokens.accessToken as string) || "";

  let gridData: any = [];
  let barGraphData: any = [];
  let pieChartData: any = {};
  let beatDetails: any = [];
  let genreSalesData: any = [];
  let earningBreakdown: any = {};

  try {
    [gridData, barGraphData, pieChartData, beatDetails, genreSalesData, earningBreakdown] =
      await Promise.all([
        getStatGridData(token),
        getBarGraphData(token),
        getPieChartData(token),
        getBeatDetails(token),
        getGenreSalesBreakdown(token),
        getEarningBreakdown(token),
      ]);
  } catch (error) {
    console.error("Failed to fetch dashboard info: ", error);
  }

  return (
    <AdminLayout>
      <div className="space-y-6 xl:pl-2">
        <StatsGrid data={gridData} />
        <BeatDetailsSection data={beatDetails} />

        <section className="space-y-6">
          <h2 className="text-lg text-white font-bold font-michroma">
            Sales Analytics
          </h2>

          {/* <EarningBreakdownReport data={earningBreakdown} /> */}

          <GenreSalesChart data={genreSalesData} />
        </section>

        <ChartsSection
          barGraphData={barGraphData}
          pieChartData={pieChartData}
          token={token}
        />
      </div>
    </AdminLayout>
  );
}
