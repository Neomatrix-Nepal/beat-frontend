import { StatsGrid } from "@/src/components/stats-grid";
import { ChartsSection } from "@/src/components/charts-section";
import AdminLayout from "./dashboard/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";
import {
  getBarGraphData,
  getBeatDetails,
  getStatGridData,
  getGenreSalesBreakdown,
  getEarningBreakdown,
  getTopSellingBeats,
  getRecentOrders,
} from "./action";
import BeatDetailsSection from "@/src/components/beatDetailsSection";
import { GenreSalesChart } from "@/src/components/genre-sales-chart";
import { TopSellingBeats } from "@/src/components/top-selling-beats";
import { RecentOrdersList } from "@/src/components/recent-orders-list";
import type { EarningBreakdownData } from "@/src/components/earning-breakdown-report";
import type { GenreSalesItem } from "@/src/components/genre-sales-chart";
import type { BarGraphData, BeatDetailsData, StatsGridData, TopSellingBeat } from "@/src/types/stats";

const emptyStatsData: StatsGridData = {
  totalBeatsUploaded: { count: 0, subCount: {} },
  beatsSoldThisMonth: { count: 0, subCount: {} },
  totalBeatsEarnings: { count: 0, subCount: {} },
  totalDripsAdded: 0,
  dripsSoldThisMonth: 0,
  totalDripsEarnings: 0,
};

const emptyBeatDetailsData: BeatDetailsData = {
  standard: 0,
  premium: 0,
  "mixing-pro": 0,
  "custom-beat": 0,
};

const emptyEarningBreakdownData: EarningBreakdownData = {
  adminBeatsEarnings: 0,
  creatorBeatsEarnings: 0,
  customBeatsEarnings: 0,
  mixingProEarnings: 0,
  studioBookingsEarnings: 0,
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  const token = (session?.user?.tokens.accessToken as string) || "";

  let gridData: StatsGridData = emptyStatsData;
  let barGraphData: BarGraphData = [];
  let beatDetails: BeatDetailsData = emptyBeatDetailsData;
  let genreSalesData: GenreSalesItem[] = [];
  let earningBreakdown: EarningBreakdownData = emptyEarningBreakdownData;
  let topSellingBeats: TopSellingBeat[] = [];
  let recentOrders: any[] = [];

  try {
    const results = await Promise.all([
        getStatGridData(token),
        getBarGraphData(token),
        getBeatDetails(token),
        getGenreSalesBreakdown(token),
        getEarningBreakdown(token),
        getTopSellingBeats(token),
        // getRecentOrders(token),
      ]);
    
    gridData = results[0];
    barGraphData = results[1];
    beatDetails = results[2];
    genreSalesData = results[3];
    earningBreakdown = results[4];
    topSellingBeats = results[5];
    // recentOrders = results[6]?.data || [];
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GenreSalesChart data={genreSalesData} />
            <TopSellingBeats data={topSellingBeats} />
          </div>

          {/* <div className="mt-6">
            <RecentOrdersList data={recentOrders} />
          </div> */}
        </section>

        <ChartsSection
          barGraphData={barGraphData}
          pieChartData={earningBreakdown}
          token={token}
        />
      </div>
    </AdminLayout>
  );
}
