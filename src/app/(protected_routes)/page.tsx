import { StatsGrid } from "@/src/components/stats-grid";
import { ChartsSection } from "@/src/components/charts-section";
import { LatestUploads } from "@/src/components/latest-uploads";
import AdminLayout from "./dashboard/layout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/option";
import { getBarGraphData, getPieChartData, getStatGridData } from "./action";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  let gridData = [];
  let barGraphData = [];
  let pieChartData = [];

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
  } catch (error) {
    console.error("Failed to fetch dashboard info: ", error);
  }

  console.log("gridData:", gridData);
  console.log("barGraphData:", barGraphData);
  console.log("pieChartData:", pieChartData);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <StatsGrid data={gridData} />
        <ChartsSection
          barGraphData={barGraphData}
          pieChartData={pieChartData}
          token={session?.user?.tokens.accessToken!}
        />
        <LatestUploads />
      </div>
    </AdminLayout>
  );
}
