"use client";
import { StatsGrid } from "@/src/components/stats-grid";
import { ChartsSection } from "@/src/components/charts-section";
import { LatestUploads } from "@/src/components/latest-uploads";
import AdminLayout from "./dashboard/layout";

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="p-6bg-[#252525] space-y-6">
        <StatsGrid />
        <ChartsSection />
        <LatestUploads />
      </div>
    </AdminLayout>
  );
}
