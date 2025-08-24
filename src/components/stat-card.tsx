import { Card, CardContent } from "@/src/components/ui/card";
import { useState } from "react";
import { StatCardProps } from "../types/stats";

export function StatCard({
  title,
  value,
  publicCount,
  adminCount,
  icon: Icon,
  iconColor,
  valueColor,
}: StatCardProps) {
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(
    null
  );

  const FloatingHoverPanel = () => {
    const hasCounts = publicCount !== undefined || adminCount !== undefined;

    if (!hasCounts) {
      return;
    }

    return (
      <div className="bg-white w-40 text-black text-sm px-4 py-2 rounded-lg shadow-lg whitespace-nowrap">
        <h2 className="font-semibold mb-2">Counts</h2>
        {publicCount !== undefined && (
          <div className="flex flex-col">
            <div className="flex w-full gap-2 items-center mb-2">
              <div className="w-4 h-3 rounded-xs bg-[#6c5ce7]" />
              <p className="flex w-full text-xs text-gray-500 items-center justify-between">
                Lil Rock Look
                <span className="text-black font-semibold">{adminCount  }</span>
              </p>
            </div>
            <div className="flex w-full gap-2 items-center mb-2">
              <div className="w-4 h-3 rounded-xs bg-yellow-300" />
              <p className="flex w-full text-xs text-gray-500 items-center justify-between">
                Other Users
                <span className="text-black font-semibold">{publicCount}</span>
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <Card
        className="bg-[#1a1a2e] border-[#2d2d44] relative"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          setHoverPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          });
        }}
        onMouseLeave={() => setHoverPos(null)}
      >
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 ${iconColor} rounded-lg flex items-center justify-center`}
            >
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm font-michroma">{title}</p>
              <p className={`text-3xl font-bold font-michroma ${valueColor}`}>
                {value}
              </p>
            </div>
          </div>
        </CardContent>

        {/* 🟢 Floating Panel */}
        {hoverPos && (
          <div
            className="absolute z-50 pointer-events-none transition-opacity duration-200"
            style={{
              top: hoverPos.y + 10,
              left: hoverPos.x + 10,
            }}
          >
            <FloatingHoverPanel />
          </div>
        )}
      </Card>
    </>
  );
}
