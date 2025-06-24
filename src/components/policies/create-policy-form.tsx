"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Clock, Shield, Target, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"

interface PolicyFormData {
  name: string
  target: string
  targetType: "device" | "application" | "ip"
  bandwidthLimit: string
  bandwidthUnit: "Mbps" | "Kbps"
  priorityLevel: "high" | "medium" | "low"
  scheduleEnabled: boolean
  scheduleStart: string
  scheduleEnd: string
  scheduleDays: string[]
  description: string
}

const initialFormData: PolicyFormData = {
  name: "",
  target: "",
  targetType: "device",
  bandwidthLimit: "",
  bandwidthUnit: "Mbps",
  priorityLevel: "medium",
  scheduleEnabled: false,
  scheduleStart: "09:00",
  scheduleEnd: "17:00",
  scheduleDays: [],
  description: "",
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

export function CreatePolicyForm() {
  const [formData, setFormData] = useState<PolicyFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof PolicyFormData, value: string | boolean | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDayToggle = (day: string) => {
    const updatedDays = formData.scheduleDays.includes(day)
      ? formData.scheduleDays.filter((d) => d !== day)
      : [...formData.scheduleDays, day]
    handleInputChange("scheduleDays", updatedDays)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Creating policy:", formData)

    // Reset form after successful submission
    setFormData(initialFormData)
    setIsSubmitting(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Policy
        </CardTitle>
        <CardDescription>
          Set up bandwidth limits, priorities, and schedules for devices or applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Policy Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Policy Name</Label>
            <Input
              id="name"
              placeholder="e.g., Gaming Bandwidth Limit"
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
                <Label htmlFor="targetType">Target Type</Label>
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
                <Label htmlFor="target">
                  {formData.targetType === "device" && "Device Name/MAC"}
                  {formData.targetType === "application" && "Application Name"}
                  {formData.targetType === "ip" && "IP Address"}
                </Label>
                <Input
                  id="target"
                  placeholder={
                    formData.targetType === "device"
                      ? "e.g., Gaming Console or AA:BB:CC:DD:EE:FF"
                      : formData.targetType === "application"
                        ? "e.g., Netflix, YouTube"
                        : "e.g., 192.168.1.100"
                  }
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
                <Label htmlFor="bandwidthLimit">Speed Limit</Label>
                <Input
                  id="bandwidthLimit"
                  type="number"
                  placeholder="e.g., 5"
                  value={formData.bandwidthLimit}
                  onChange={(e) => handleInputChange("bandwidthLimit", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bandwidthUnit">Unit</Label>
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
              <Label className="text-base font-medium">Schedule (Optional)</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="scheduleEnabled"
                checked={formData.scheduleEnabled}
                onCheckedChange={(checked) => handleInputChange("scheduleEnabled", checked)}
              />
              <Label htmlFor="scheduleEnabled">Enable time-based scheduling</Label>
            </div>

            {formData.scheduleEnabled && (
              <div className="p-4 space-y-4 border rounded-lg bg-muted/30">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scheduleStart">Start Time</Label>
                    <Input
                      id="scheduleStart"
                      type="time"
                      value={formData.scheduleStart}
                      onChange={(e) => handleInputChange("scheduleStart", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="scheduleEnd">End Time</Label>
                    <Input
                      id="scheduleEnd"
                      type="time"
                      value={formData.scheduleEnd}
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
                        variant={formData.scheduleDays.includes(day.value) ? "default" : "outline"}
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
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add notes about this policy..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setFormData(initialFormData)}>
              Reset
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Policy"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
