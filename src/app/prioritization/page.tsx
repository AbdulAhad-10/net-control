"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { PriorityOverview } from "@/components/prioritization/priority-overview"
import { TrafficPriorityRanking } from "@/components/prioritization/traffic-priority-ranking"
import { CustomPriorityRules } from "@/components/prioritization/custom-priority-rules"
import { PriorityRulesList } from "@/components/prioritization/priority-rules-list"

export default function PrioritizationPage() {

  return (
    <DashboardLayout title="Traffic Prioritization" >
      <div className="space-y-6">
        {/* Overview Section */}
        <PriorityOverview />

        {/* Traffic Priority Ranking */}
        <TrafficPriorityRanking />

        {/* Custom Priority Rules */}
        <CustomPriorityRules />

        {/* Priority Rules Management */}
        <PriorityRulesList />
      </div>
    </DashboardLayout>
  )
}
