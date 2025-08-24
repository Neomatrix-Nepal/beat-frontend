"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Music,
  Droplets,
  Calendar,
  ShoppingCart,
  Briefcase,
  Users,
  Menu,
  X,
  Ticket,
  Drum,
  Package,
  Blend,
  Settings,
} from "lucide-react";
import Image from "next/image";
import { RiFilePdfFill } from "react-icons/ri";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  {
    icon: ShoppingCart,
    label: "Customer Orders",
    href: "/dashboard/customer_orders",
  },
  { icon: Music, label: "Beats Manager", href: "/dashboard/beats_manager" },
  { icon: Blend, label: "Mixing Pro", href: "/dashboard/mixing_pro" },
  { icon: Drum, label: "Custom Beat", href: "/dashboard/custom_beats" },
  {
    icon: Package,
    label: "Package Manager",
    href: "/dashboard/package_manager",
  },
  { icon: Droplets, label: "Drips Manager", href: "/dashboard/drips_manager" },
  {
    icon: Ticket,
    label: "Discount Coupon",
    href: "/dashboard/discount_coupon",
  },
  {
    icon: Ticket,
    label: "Payment Manager",
    href: "/dashboard/commission",
  },
  {
    icon: Calendar,
    label: "Studio Bookings",
    href: "/dashboard/studio_bookings",
  },
  { icon: Users, label: "Creators", href: "/dashboard/creators" },
  {
    icon: RiFilePdfFill,
    label: "License Agreement",
    href: "/dashboard/license-agreement",
  },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: Briefcase, label: "Latest Work", href: "/dashboard/latest_work" },
  { icon: Briefcase, label: "Blogs", href: "/dashboard/blog" },
];

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="xl:hidden fixed top-4 left-4 z-50 p-2 bg-[#151515] text-white rounded-xl shadow-xl"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-60 z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed overflow-y-auto h-screen top-0 left-0 z-50 w-7/10 md:w-2/3 xl:w-80 bg-[#151515] transform transition-transform duration-300 ease-in-out
        ${
          isOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
        } min-h-[100dvh] xl:min-h-screen`}
      >
        {/* Logo */}
        <div className="flex justify-center pt-6">
          <a href="/">
            <Image
              src={"/image/logo.png"}
              alt="Logo"
              width={120}
              height={120}
              className=""
            />
          </a>
        </div>

        {/* Navigation */}
        <nav className="p-4 font-michroma gap-2 flex flex-col">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

            return (
              <Link href={item.href} key={index}>
                <div
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-[10px] rounded-xl hover:cursor-pointer transition-colors duration-200 ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "text-slate-300 hover:bg-purple-600 hover:text-white"
                  }`}
                >
                  <Icon />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
