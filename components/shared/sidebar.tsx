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
} from "lucide-react";
import logo from "../../image/logo.png";
import Image from "next/image";

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: ShoppingCart, label: "Customer Orders", href: "/dashboard/customer_orders" },
  { icon: Music, label: "Beats Manager", href: "/dashboard/beats_manager" },
  { icon: Users, label: "Mixing Pro", href: "/dashboard/mixing_pro" },
  { icon: Users, label: "Custom Beat", href: "/dashboard/custom_beats" },
  { icon: Droplets, label: "Drips Manager", href: "/dashboard/drips_manager" },
  { icon: Calendar, label: "Studio Bookings", href: "/dashboard/studio_bookings" },
  { icon: Users, label: "Creators", href: "/dashboard/creators" },
  { icon: Briefcase, label: "Latest Work", href: "/dashboard/latest_work" },
];

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden absolute top-2 left-2 z-50 p-2 bg-[#151515] text-white rounded-md shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#151515] z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-[#151515] border-r border-[#2d2d44] min-h-screen transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="flex justify-center py-6">
          <Image
            src={logo}
            alt="Logo"
            width={100}
            height={100}
            className="drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link href={item.href} key={index}>
                <div
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:cursor-hover transition-colors duration-200 ${
                    isActive
                      ? "bg-purple-700 text-white"
                      : "text-slate-300 hover:bg-purple-600 hover:text-white"
                  }`}
                >
                  <Icon />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
