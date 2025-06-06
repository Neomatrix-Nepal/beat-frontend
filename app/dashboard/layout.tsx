"use client";

import { DashboardHeader } from "@/components/shared/header";
import { DashboardSidebar } from "@/components/shared/sidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 z-50 max-h-screen">
        <DashboardSidebar />
      </div>
      <div className="w-full">
        <DashboardHeader />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
