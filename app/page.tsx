"use client"
import { LayoutDashboard, Music, Droplets, Calendar, ShoppingCart, Briefcase, Users } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsGrid } from "@/components/stats-grid"
import { ChartsSection } from "@/components/charts-section"
import { LatestUploads } from "@/components/latest-uploads"
import { DashboardHeader } from "@/components/shared/header"
import AdminLayout from "./dashboard/layout"

const salesData = [
  { month: "Jan", beats: 40, drips: 30 },
  { month: "Feb", beats: 30, drips: 25 },
  { month: "Mar", beats: 50, drips: 35 },
  { month: "Apr", beats: 45, drips: 40 },
  { month: "May", beats: 35, drips: 30 },
  { month: "Jun", beats: 55, drips: 45 },
  { month: "Jul", beats: 70, drips: 55 },
  { month: "Aug", beats: 45, drips: 35 },
  { month: "Sep", beats: 60, drips: 50 },
  { month: "Oct", beats: 75, drips: 60 },
  { month: "Nov", beats: 50, drips: 40 },
  { month: "Dec", beats: 65, drips: 45 },
]

const pieData = [
  { name: "Beats", value: 70, color: "#ff7675" },
  { name: "Drips", value: 30, color: "#6c5ce7" },
]

const latestUploads = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    price: "$20",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    title: "Sunkiss Bliss",
    artist: "Hailey Rivera",
    price: "$10",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    price: "$20",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    price: "$20",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Music, label: "Beats Manager", active: false },
  { icon: Droplets, label: "Drips Manager", active: false },
  { icon: Calendar, label: "Studio Bookings", active: false },
  { icon: ShoppingCart, label: "Custom Orders", active: false },
  { icon: Briefcase, label: "Latest Work", active: false },
  { icon: Users, label: "User Management", active: false },
]

export default function Dashboard() {
  return (
    <AdminLayout>
   
    <div className="p-6  bg-[#252525] space-y-6">
      <StatsGrid />
      <ChartsSection />
      <LatestUploads />
      </div>
    </AdminLayout>
  )
}
