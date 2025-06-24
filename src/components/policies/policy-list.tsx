/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState } from "react"
import { Edit, Trash2, Clock, Shield, Search } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { EditPolicyDialog } from "./edit-policy-dialog"

interface Policy {
  id: string
  name: string
  target: string
  targetType: "device" | "application" | "ip"
  bandwidthLimit: number
  bandwidthUnit: "Mbps" | "Kbps"
  priorityLevel: "high" | "medium" | "low"
  isActive: boolean
  scheduleEnabled: boolean
  scheduleStart?: string
  scheduleEnd?: string
  scheduleDays?: string[]
  description?: string
  createdAt: string
  devicesAffected: number
}

const mockPolicies: Policy[] = [
  {
    id: "1",
    name: "Gaming Bandwidth Limit",
    target: "Gaming Console",
    targetType: "device",
    bandwidthLimit: 2,
    bandwidthUnit: "Mbps",
    priorityLevel: "medium",
    isActive: true,
    scheduleEnabled: true,
    scheduleStart: "18:00",
    scheduleEnd: "23:00",
    scheduleDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    description: "Limit gaming bandwidth during weekday evenings",
    createdAt: "2024-01-15",
    devicesAffected: 1,
  },
  {
    id: "2",
    name: "Work Apps Priority",
    target: "Zoom, Teams, Slack",
    targetType: "application",
    bandwidthLimit: 10,
    bandwidthUnit: "Mbps",
    priorityLevel: "high",
    isActive: true,
    scheduleEnabled: true,
    scheduleStart: "09:00",
    scheduleEnd: "17:00",
    scheduleDays: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    description: "Prioritize work applications during business hours",
    createdAt: "2024-01-10",
    devicesAffected: 5,
  },
  {
    id: "3",
    name: "Streaming Quality Control",
    target: "Netflix, YouTube",
    targetType: "application",
    bandwidthLimit: 5,
    bandwidthUnit: "Mbps",
    priorityLevel: "low",
    isActive: false,
    scheduleEnabled: false,
    description: "Limit streaming quality during peak hours",
    createdAt: "2024-01-08",
    devicesAffected: 8,
  },
  {
    id: "4",
    name: "Guest Network Limit",
    target: "192.168.2.0/24",
    targetType: "ip",
    bandwidthLimit: 1,
    bandwidthUnit: "Mbps",
    priorityLevel: "low",
    isActive: true,
    scheduleEnabled: false,
    description: "Bandwidth limit for guest network",
    createdAt: "2024-01-05",
    devicesAffected: 3,
  },
]

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

const targetTypeLabels = {
  device: "Device",
  application: "App",
  ip: "IP",
}

export function PolicyList() {
  const [policies, setPolicies] = useState<Policy[]>(mockPolicies)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all")
  const [filterPriority, setFilterPriority] = useState<"all" | "high" | "medium" | "low">("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null)

  const filteredPolicies = policies.filter((policy) => {
    const matchesSearch =
      policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      policy.target.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" && policy.isActive) ||
      (filterStatus === "inactive" && !policy.isActive)
    const matchesPriority = filterPriority === "all" || policy.priorityLevel === filterPriority

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleTogglePolicy = (policyId: string) => {
    setPolicies((prev) =>
      prev.map((policy) => (policy.id === policyId ? { ...policy, isActive: !policy.isActive } : policy)),
    )
  }

  const handleDeletePolicy = () => {
    if (selectedPolicy) {
      setPolicies((prev) => prev.filter((policy) => policy.id !== selectedPolicy.id))
      setDeleteDialogOpen(false)
      setSelectedPolicy(null)
    }
  }

  const handleEditPolicy = (updatedPolicy: Policy) => {
    setPolicies((prev) => prev.map((policy) => (policy.id === updatedPolicy.id ? updatedPolicy : policy)))
    setEditDialogOpen(false)
    setSelectedPolicy(null)
  }

  const openDeleteDialog = (policy: Policy) => {
    setSelectedPolicy(policy)
    setDeleteDialogOpen(true)
  }

  const openEditDialog = (policy: Policy) => {
    setSelectedPolicy(policy)
    setEditDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Policy Management
          </CardTitle>
          <CardDescription>
            Manage bandwidth policies, priorities, and schedules ({policies.length} total policies)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 mb-6 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
              <Input
                placeholder="Search policies by name or target..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={(value: any) => setFilterPriority(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Policies Table */}
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Policy</TableHead>
                  <TableHead>Target</TableHead>
                  <TableHead>Limit</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPolicies.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{policy.name}</div>
                        {policy.description && (
                          <div className="text-sm text-muted-foreground">{policy.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {targetTypeLabels[policy.targetType]}
                        </Badge>
                        <span className="text-sm">{policy.target}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {policy.bandwidthLimit} {policy.bandwidthUnit}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${priorityColors[policy.priorityLevel]} text-xs`}>
                        {policy.priorityLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {policy.scheduleEnabled ? (
                        <div className="flex items-center gap-1 text-sm">
                          <Clock className="w-3 h-3" />
                          <span>
                            {policy.scheduleStart} - {policy.scheduleEnd}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">Always</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={policy.isActive}
                          onCheckedChange={() => handleTogglePolicy(policy.id)}
                        />
                        <span className="text-sm">{policy.isActive ? "Active" : "Inactive"}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(policy)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteDialog(policy)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredPolicies.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">No policies found matching your criteria.</div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Policy</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{selectedPolicy?.name}&quot;? This action cannot be undone.
              {selectedPolicy?.isActive && (
                <div className="p-2 mt-2 text-yellow-800 border border-yellow-200 rounded bg-yellow-50">
                  ⚠️ This policy is currently active and will stop working immediately.
                </div>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeletePolicy} className="bg-destructive text-destructive-foreground">
              Delete Policy
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Policy Dialog */}
      {selectedPolicy && (
        <EditPolicyDialog
          policy={selectedPolicy}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
          onSave={handleEditPolicy}
        />
      )}
    </>
  )
}
