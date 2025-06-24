"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { RealTimeStats } from "@/components/usage/real-time-stats"
import { UsageCharts } from "@/components/usage/usage-charts"
import { TrafficPatterns } from "@/components/usage/traffic-patterns"
import { HistoricalData } from "@/components/usage/historical-data"

export default function UsagePage() {

  return (
    <DashboardLayout title="Usage Reports" >
      <div className="space-y-6">
        {/* Real-Time Statistics */}
        <RealTimeStats />

        {/* Usage Charts */}
        <UsageCharts />

        {/* Traffic Patterns Analysis */}
        <TrafficPatterns />

        {/* Historical Data */}
        <HistoricalData />
      </div>
    </DashboardLayout>
  )
}
