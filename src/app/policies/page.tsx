"use client"

import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { CreatePolicyForm } from "@/components/policies/create-policy-form"
import { PolicyList } from "@/components/policies/policy-list"

export default function PoliciesPage() {

  return (
    <DashboardLayout title="My Policies">
      <div className="space-y-6">
        {/* Create New Policy Form */}
        <CreatePolicyForm />

        {/* Existing Policies List */}
        <PolicyList />
      </div>
    </DashboardLayout>
  )
}
