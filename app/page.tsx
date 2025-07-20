"use client";
import { StatsGrid } from "@/components/stats-grid";
import { ChartsSection } from "@/components/charts-section";
import { LatestUploads } from "@/components/latest-uploads";
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
