import type React from "react"
import { DashboardHeader } from "./header"
import { DashboardSidebar } from "./sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#0f0f23] text-white">
      
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1   space-y-6">{children}</main>
      </div>
    </div>
  )
}
