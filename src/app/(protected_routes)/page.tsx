import { StatsGrid } from "@/src/components/stats-grid";
import { ChartsSection } from "@/src/components/charts-section";
import AdminLayout from "./dashboard/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";
import { getBarGraphData, getBeatDetails, getPieChartData, getStatGridData } from "./action";
import BeatDetailsSection from "@/src/components/beatDetailsSection";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  let gridData = [];
  let barGraphData = [];
  let pieChartData = [];
  let beatDetails = [];

  try {
    gridData = await getStatGridData(
      session?.user?.tokens.accessToken as string
    );
    barGraphData = await getBarGraphData(
      session?.user?.tokens.accessToken as string
    );
    pieChartData = await getPieChartData(
      session?.user?.tokens.accessToken as string
    );
    beatDetails = await getBeatDetails(
      session?.user?.tokens.accessToken as string
    );
  } catch (error) {
    console.error("Failed to fetch dashboard info: ", error);
  }

  return (
    <AdminLayout>
      <div className="space-y-6 xl:pl-2">
        <StatsGrid data={gridData} />
        <BeatDetailsSection data={beatDetails}/>
        <ChartsSection
          barGraphData={barGraphData}
          pieChartData={pieChartData}
          token={(session?.user?.tokens.accessToken as string) || ""}
        />
      </div>
    </AdminLayout>
  );
}
