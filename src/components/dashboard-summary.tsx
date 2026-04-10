"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { TrendingUp, Users, Music, Zap } from "lucide-react";
import { StatsGridData } from "@/src/types/stats";

interface DashboardSummaryProps {
  data: StatsGridData;
}

export function DashboardSummary({ data }: DashboardSummaryProps) {
  const adminBeatsUploaded = data.totalBeatsUploaded.subCount.admin || 0;
  const creatorBeatsUploaded = data.totalBeatsUploaded.subCount.other || 0;
  const adminBeatsSold = data.beatsSoldThisMonth.subCount.admin || 0;
  const creatorBeatsSold = data.beatsSoldThisMonth.subCount.other || 0;
  const adminEarnings = data.totalBeatsEarnings.subCount.admin || 0;
  const creatorEarnings = data.totalBeatsEarnings.subCount.other || 0;

  const summaryCards = [
    {
      label: "Admin Beats Uploaded",
      value: adminBeatsUploaded,
      icon: Music,
      color: "#ff7675",
      bgColor: "#ff7675" + "20",
    },
    {
      label: "Creator Beats Uploaded",
      value: creatorBeatsUploaded,
      icon: Users,
      color: "#a29bfe",
      bgColor: "#a29bfe" + "20",
    },
    {
      label: "Admin Beats Sold (This Month)",
      value: adminBeatsSold,
      icon: TrendingUp,
      color: "#6c5ce7",
      bgColor: "#6c5ce7" + "20",
    },
    {
      label: "Creator Beats Sold (This Month)",
      value: creatorBeatsSold,
      icon: Zap,
      color: "#74b9ff",
      bgColor: "#74b9ff" + "20",
    },
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Main Summary Header */}
      <Card className="bg-gradient-to-r from-[#1a1a2e] to-[#16213e] border-[#2d2d44]">
        <CardHeader>
          <CardTitle className="text-white text-lg">
            Platform Overview
          </CardTitle>
          <p className="text-gray-400 text-sm mt-1">
            Real-time breakdown of beats and drips across admin and creator content
          </p>
        </CardHeader>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <Card
              key={index}
              className="bg-[#1a1a2e] border-[#2d2d44] hover:border-[#3a4a5a] transition-colors"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-medium">
                      {card.label}
                    </p>
                    <p className="text-2xl font-bold text-white mt-2">
                      {card.value}
                    </p>
                  </div>
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: card.bgColor }}
                  >
                    <Icon
                      size={20}
                      style={{ color: card.color }}
                      strokeWidth={2}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Beats Breakdown */}
        <Card className="bg-[#1a1a2e] border-[#2d2d44]">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Music size={18} style={{ color: "#ff7675" }} />
              Beats Earnings This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded bg-[#252540]">
              <span className="text-sm text-gray-300">Admin Earnings</span>
              <span className="text-sm font-semibold text-green-400">
                ${adminEarnings.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#252540]">
              <span className="text-sm text-gray-300">Creator Earnings</span>
              <span className="text-sm font-semibold text-green-400">
                ${creatorEarnings.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
            <div className="border-t border-[#3a3a52] pt-2">
              <div className="flex items-center justify-between p-2 rounded bg-[#1a1a2e] border border-[#3a3a52]">
                <span className="text-sm font-semibold text-gray-300">
                  Total Beats
                </span>
                <span className="text-sm font-bold text-green-400">
                  ${(adminEarnings + creatorEarnings).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Drips Summary */}
        <Card className="bg-[#1a1a2e] border-[#2d2d44]">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Zap size={18} style={{ color: "#6c5ce7" }} />
              Drips Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 rounded bg-[#252540]">
              <span className="text-sm text-gray-300">Total Drips Added</span>
              <span className="text-sm font-semibold text-blue-400">
                {data.totalDripsAdded}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#252540]">
              <span className="text-sm text-gray-300">Sold This Month</span>
              <span className="text-sm font-semibold text-blue-400">
                {data.dripsSoldThisMonth}
              </span>
            </div>
            <div className="border-t border-[#3a3a52] pt-2">
              <div className="flex items-center justify-between p-2 rounded bg-[#1a1a2e] border border-[#3a3a52]">
                <span className="text-sm font-semibold text-gray-300">
                  Total Earnings
                </span>
                <span className="text-sm font-bold text-green-400">
                  ${data.totalDripsEarnings.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
