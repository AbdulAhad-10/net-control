import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { BandwidthUsage } from "@/components/dashboard/bandwidth-usage"
import { CurrentPolicies } from "@/components/dashboard/current-policies"
import { RecentAlerts } from "@/components/dashboard/recent-alerts"

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
       <div className="space-y-6">
        {/* Top Section - Bandwidth Usage */}
        <BandwidthUsage />

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Left Column - Policies and Alerts */}
          <div className="space-y-6 lg:col-span-2">
            <CurrentPolicies />
            <RecentAlerts />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}