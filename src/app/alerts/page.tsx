"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AlertOverview } from "@/components/alerts/alert-overview"
import { AlertList } from "@/components/alerts/alert-list"
import { AlertSettings } from "@/components/alerts/alert-settings"

export default function AlertsPage() {

  return (
    <DashboardLayout title="Alerts & Notifications" >
      <div className="space-y-6">
        {/* Alert Overview */}
        <AlertOverview />

        {/* Alert List */}
        <AlertList />

        {/* Alert Settings */}
        <AlertSettings />
      </div>
    </DashboardLayout>
  )
}
