/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Clock, Shield, Target, Zap } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

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

interface EditPolicyDialogProps {
  policy: Policy
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (policy: Policy) => void
}

const daysOfWeek = [
  { value: "monday", label: "Mon" },
  { value: "tuesday", label: "Tue" },
  { value: "wednesday", label: "Wed" },
  { value: "thursday", label: "Thu" },
  { value: "friday", label: "Fri" },
  { value: "saturday", label: "Sat" },
  { value: "sunday", label: "Sun" },
]

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
}

export function EditPolicyDialog({ policy, open, onOpenChange, onSave }: EditPolicyDialogProps) {
  const [formData, setFormData] = useState<Policy>(policy)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setFormData(policy)
  }, [policy])

  const handleInputChange = (field: keyof Policy, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDayToggle = (day: string) => {
    const currentDays = formData.scheduleDays || []
    const updatedDays = currentDays.includes(day) ? currentDays.filter((d) => d !== day) : [...currentDays, day]
    handleInputChange("scheduleDays", updatedDays)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSave(formData)
    setIsSubmitting(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Policy</DialogTitle>
          <DialogDescription>Modify the bandwidth policy settings and parameters</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Policy Name */}
          <div className="space-y-2">
            <Label htmlFor="edit-name">Policy Name</Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          {/* Target Configuration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <Label className="text-base font-medium">Target Configuration</Label>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="edit-targetType">Target Type</Label>
                <Select
                  value={formData.targetType}
                  onValueChange={(value: "device" | "application" | "ip") => handleInputChange("targetType", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="device">Device</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                    <SelectItem value="ip">IP Address</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-target">
                  {formData.targetType === "device" && "Device Name/MAC"}
                  {formData.targetType === "application" && "Application Name"}
                  {formData.targetType === "ip" && "IP Address"}
                </Label>
                <Input
                  id="edit-target"
                  value={formData.target}
                  onChange={(e) => handleInputChange("target", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Bandwidth Limit */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <Label className="text-base font-medium">Bandwidth Limit</Label>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-bandwidthLimit">Speed Limit</Label>
                <Input
                  id="edit-bandwidthLimit"
                  type="number"
                  value={formData.bandwidthLimit}
                  onChange={(e) => handleInputChange("bandwidthLimit", Number.parseInt(e.target.value))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-bandwidthUnit">Unit</Label>
                <Select
                  value={formData.bandwidthUnit}
                  onValueChange={(value: "Mbps" | "Kbps") => handleInputChange("bandwidthUnit", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mbps">Mbps</SelectItem>
                    <SelectItem value="Kbps">Kbps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Priority Level */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <Label className="text-base font-medium">Priority Level</Label>
            </div>

            <Select
              value={formData.priorityLevel}
              onValueChange={(value: "high" | "medium" | "low") => handleInputChange("priorityLevel", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors.high}>High</Badge>
                    <span>Critical traffic priority</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors.medium}>Medium</Badge>
                    <span>Normal traffic priority</span>
                  </div>
                </SelectItem>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors.low}>Low</Badge>
                    <span>Background traffic priority</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Schedule Configuration */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <Label className="text-base font-medium">Schedule</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit-scheduleEnabled"
                checked={formData.scheduleEnabled}
                onCheckedChange={(checked) => handleInputChange("scheduleEnabled", checked)}
              />
              <Label htmlFor="edit-scheduleEnabled">Enable time-based scheduling</Label>
            </div>

            {formData.scheduleEnabled && (
              <div className="p-4 space-y-4 border rounded-lg bg-muted/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-scheduleStart">Start Time</Label>
                    <Input
                      id="edit-scheduleStart"
                      type="time"
                      value={formData.scheduleStart || "09:00"}
                      onChange={(e) => handleInputChange("scheduleStart", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="edit-scheduleEnd">End Time</Label>
                    <Input
                      id="edit-scheduleEnd"
                      type="time"
                      value={formData.scheduleEnd || "17:00"}
                      onChange={(e) => handleInputChange("scheduleEnd", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Active Days</Label>
                  <div className="flex flex-wrap gap-2">
                    {daysOfWeek.map((day) => (
                      <Button
                        key={day.value}
                        type="button"
                        variant={(formData.scheduleDays || []).includes(day.value) ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleDayToggle(day.value)}
                      >
                        {day.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
