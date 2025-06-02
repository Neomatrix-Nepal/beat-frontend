"use client";

import { DashboardHeader } from "@/components/header";
import { DashboardSidebar } from "@/components/sidebar";
 import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
       <div className="sticky top-0 z-50 max-h-screen">
  <DashboardSidebar />
  
</div>
<div className="w-full"> 
  <DashboardHeader/>
        <main className="w-full">{children}</main>
        </div>
    </div>
  );
}
