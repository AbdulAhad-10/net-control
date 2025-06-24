/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Settings, Bell, Shield, Activity, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

interface AlertSettings {
  bandwidthThreshold: number
  bandwidthEnabled: boolean
  policyViolationEnabled: boolean
  criticalEventsEnabled: boolean
  emailNotifications: boolean
  pushNotifications: boolean
  notificationFrequency: "immediate" | "hourly" | "daily"
}

export function AlertSettings() {
  const [settings, setSettings] = useState<AlertSettings>({
    bandwidthThreshold: 80,
    bandwidthEnabled: true,
    policyViolationEnabled: true,
    criticalEventsEnabled: true,
    emailNotifications: true,
    pushNotifications: false,
    notificationFrequency: "immediate",
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleSettingChange = (key: keyof AlertSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving alert settings:", settings)
    setIsSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Alert Settings
        </CardTitle>
        <CardDescription>Configure when and how you receive notifications about network events</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bandwidth Alerts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4" />
            <Label className="text-base font-medium">Bandwidth Usage Alerts</Label>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable bandwidth usage alerts</Label>
              <p className="text-sm text-muted-foreground">Get notified when bandwidth usage exceeds threshold</p>
            </div>
            <Switch
              checked={settings.bandwidthEnabled}
              onCheckedChange={(checked) => handleSettingChange("bandwidthEnabled", checked)}
            />
          </div>

          {settings.bandwidthEnabled && (
            <div className="pl-6 space-y-2">
              <Label htmlFor="threshold">Alert Threshold (%)</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="threshold"
                  type="number"
                  min="50"
                  max="95"
                  value={settings.bandwidthThreshold}
                  onChange={(e) => handleSettingChange("bandwidthThreshold", Number(e.target.value))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">
                  Alert when usage exceeds {settings.bandwidthThreshold}%
                </span>
              </div>
            </div>
          )}
        </div>

        <Separator />

        {/* Policy Violation Alerts */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <Label className="text-base font-medium">Policy Violation Alerts</Label>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable policy violation alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when devices or apps violate bandwidth policies
              </p>
            </div>
            <Switch
              checked={settings.policyViolationEnabled}
              onCheckedChange={(checked) => handleSettingChange("policyViolationEnabled", checked)}
            />
          </div>
        </div>

        <Separator />

        {/* Critical Events */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <Label className="text-base font-medium">Critical Network Events</Label>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Enable critical event alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified about network overloads, outages, and security issues
              </p>
            </div>
            <Switch
              checked={settings.criticalEventsEnabled}
              onCheckedChange={(checked) => handleSettingChange("criticalEventsEnabled", checked)}
            />
          </div>
        </div>

        <Separator />

        {/* Notification Methods */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Notification Methods</Label>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Email notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts via email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Push notifications</Label>
                <p className="text-sm text-muted-foreground">Receive alerts as browser notifications</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Notification Frequency */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Notification Frequency</Label>

          <div className="space-y-2">
            <Label htmlFor="frequency">How often to receive notifications</Label>
            <Select
              value={settings.notificationFrequency}
              onValueChange={(value: any) => handleSettingChange("notificationFrequency", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediate - As they occur</SelectItem>
                <SelectItem value="hourly">Hourly - Digest every hour</SelectItem>
                <SelectItem value="daily">Daily - Daily summary</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4">
          <Button onClick={saveSettings} disabled={isSaving}>
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Settings"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
