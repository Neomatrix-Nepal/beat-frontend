"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { useState } from "react";
import { signOut } from "next-auth/react";

export function DashboardHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { clearAuth } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // Extract last segment after last "/"
  const segment =
    pathname === "/"
      ? "Dashboard"
      : pathname.split("/").filter(Boolean).pop() || "Dashboard";

  // Format: replace _ with space, capitalize each word
  const formattedTitle = segment
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/", redirect: true });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed top-0 z-30 w-screen">
      <header className="relative p-4 bg-[#151515] flex items-center justify-between">
        {/* Centered Title */}
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl tracking-wider font-michroma text-white">
          {formattedTitle}
        </h1>

        {/* Logout Button Right-Aligned */}
        <div className="ml-auto mr-2">
          <Button
            variant="ghost"
            className="cursor-pointer bg-purple-700 text-white hover:text-white hover:bg-red-600"
            onClick={handleLogout}
            disabled={isLoading}
          >
            <LogOut size={16} />
            <div className="hidden md:block font-michroma font-semibold">
              {isLoading ? "Logging out..." : "Logout"}
            </div>
          </Button>
        </div>
      </header>
    </div>
  );
}
