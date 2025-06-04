'use client';

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

export function DashboardHeader() {
  const pathname = usePathname();

  // Extract last segment after last "/"
  const segment = pathname === '/' 
    ? 'Dashboard' 
    : pathname.split('/').filter(Boolean).pop() || 'Dashboard';

  // Format: replace _ with space, capitalize each word
  const formattedTitle = segment
    .replace(/_/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase());

  return (
    <header className="relative p-4 bg-primary flex items-center justify-between">
      {/* Centered Title */}
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl tracking-wider font-michroma text-white">
        {formattedTitle}
      </h1>

      {/* Logout Button Right-Aligned */}
      <div className="ml-auto">
        <Button variant="ghost" className="text-gray-300 hover:text-white">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}
