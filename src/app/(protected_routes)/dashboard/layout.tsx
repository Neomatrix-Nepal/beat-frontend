"use client";

import { DashboardHeader } from "@/src/components/shared/header";
import { DashboardSidebar } from "@/src/components/shared/sidebar";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex  ">
      <div className="sticky top-0 z-50  ">
        <DashboardSidebar />
      </div>
      <div className="w-full ">
        <DashboardHeader />
        <main className="w-full">{children}</main>
      </div>
    </div>
  );
}
