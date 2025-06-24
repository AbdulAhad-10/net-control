"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Network, Shield, Smartphone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const initialFormData = {
  name: "",
  type: "ip" as "ip" | "protocol" | "application",
  target: "",
  priority: "medium" as "high" | "medium" | "low",
  description: "",
}

const protocolOptions = [
  { value: "HTTP", label: "HTTP - Web Traffic" },
  { value: "HTTPS", label: "HTTPS - Secure Web" },
  { value: "FTP", label: "FTP - File Transfer" },
  { value: "SMTP", label: "SMTP - Email" },
  { value: "POP3", label: "POP3 - Email Retrieval" },
  { value: "IMAP", label: "IMAP - Email Access" },
  { value: "DNS", label: "DNS - Domain Resolution" },
  { value: "DHCP", label: "DHCP - IP Assignment" },
  { value: "SSH", label: "SSH - Secure Shell" },
  { value: "Telnet", label: "Telnet - Remote Access" },
  { value: "SNMP", label: "SNMP - Network Management" },
  { value: "RTP", label: "RTP - Real-time Protocol" },
  { value: "SIP", label: "SIP - VoIP Signaling" },
]

const applicationOptions = [
  { value: "Zoom", label: "Zoom - Video Conferencing" },
  { value: "Microsoft Teams", label: "Microsoft Teams" },
  { value: "Skype", label: "Skype - Voice/Video Calls" },
  { value: "Netflix", label: "Netflix - Video Streaming" },
  { value: "YouTube", label: "YouTube - Video Platform" },
  { value: "Spotify", label: "Spotify - Music Streaming" },
  { value: "Steam", label: "Steam - Gaming Platform" },
  { value: "Discord", label: "Discord - Gaming Chat" },
  { value: "Slack", label: "Slack - Team Communication" },
  { value: "Dropbox", label: "Dropbox - Cloud Storage" },
  { value: "Google Drive", label: "Google Drive - Cloud Storage" },
  { value: "OneDrive", label: "OneDrive - Cloud Storage" },
]

const priorityColors = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
  low: "bg-green-100 text-green-800 border-green-200",
}

export function CustomPriorityRules() {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Creating priority rule:", formData)

    // Reset form
    setFormData(initialFormData)
    setIsSubmitting(false)
  }

  const getTargetPlaceholder = () => {
    switch (formData.type) {
      case "ip":
        return "e.g., 192.168.1.10 or 192.168.1.0/24"
      case "protocol":
        return "Select a protocol from the dropdown"
      case "application":
        return "Select an application from the dropdown"
      default:
        return ""
    }
  }

  const getTargetDescription = () => {
    switch (formData.type) {
      case "ip":
        return "Enter specific IP addresses or network ranges (CIDR notation supported)"
      case "protocol":
        return "Choose the network protocol to prioritize"
      case "application":
        return "Select the application or service to prioritize"
      default:
        return ""
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create Custom Priority Rule
        </CardTitle>
        <CardDescription>
          Create specific rules to prioritize traffic based on IP addresses, protocols, or applications
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rule Name */}
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input
              id="rule-name"
              placeholder="e.g., Executive Office Priority"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />
          </div>

          {/* Rule Type Tabs */}
          <div className="space-y-4">
            <Label className="text-base font-medium">Rule Type</Label>
            <Tabs value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ip" className="flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  IP Address
                </TabsTrigger>
                <TabsTrigger value="protocol" className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Protocol
                </TabsTrigger>
                <TabsTrigger value="application" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Application
                </TabsTrigger>
              </TabsList>

              <TabsContent value="ip" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ip-target">IP Address or Range</Label>
                  <Input
                    id="ip-target"
                    placeholder={getTargetPlaceholder()}
                    value={formData.target}
                    onChange={(e) => handleInputChange("target", e.target.value)}
                    required
                  />
                  <p className="text-sm text-muted-foreground">{getTargetDescription()}</p>
                </div>
                <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                  <h4 className="mb-1 font-medium text-blue-900">Examples:</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>• Single device: 192.168.1.10</li>
                    <li>• Multiple devices: 192.168.1.10,192.168.1.11</li>
                    <li>• Network range: 192.168.1.0/24</li>
                    <li>• Executive subnet: 10.0.1.0/24</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="protocol" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="protocol-target">Network Protocol</Label>
                  <Select value={formData.target} onValueChange={(value) => handleInputChange("target", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a protocol" />
                    </SelectTrigger>
                    <SelectContent>
                      {protocolOptions.map((protocol) => (
                        <SelectItem key={protocol.value} value={protocol.value}>
                          {protocol.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">{getTargetDescription()}</p>
                </div>
                <div className="p-3 border border-green-200 rounded-lg bg-green-50">
                  <h4 className="mb-1 font-medium text-green-900">Common Use Cases:</h4>
                  <ul className="space-y-1 text-sm text-green-800">
                    <li>• Prioritize VoIP traffic (SIP, RTP)</li>
                    <li>• Ensure DNS resolution speed</li>
                    <li>• Prioritize secure web traffic (HTTPS)</li>
                    <li>• Manage email protocols (SMTP, IMAP)</li>
                  </ul>
                </div>
              </TabsContent>

              <TabsContent value="application" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="app-target">Application or Service</Label>
                  <Select value={formData.target} onValueChange={(value) => handleInputChange("target", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an application" />
                    </SelectTrigger>
                    <SelectContent>
                      {applicationOptions.map((app) => (
                        <SelectItem key={app.value} value={app.value}>
                          {app.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">{getTargetDescription()}</p>
                </div>
                <div className="p-3 border border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="mb-1 font-medium text-purple-900">Application Categories:</h4>
                  <ul className="space-y-1 text-sm text-purple-800">
                    <li>• Video Conferencing: Zoom, Teams, Google Meet</li>
                    <li>• Streaming: Netflix, YouTube, Spotify</li>
                    <li>• Gaming: Steam, Discord, Game Clients</li>
                    <li>• Productivity: Slack, Cloud Storage</li>
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Priority Level */}
          <div className="space-y-2">
            <Label htmlFor="priority">Priority Level</Label>
            <Select
              value={formData.priority}
              onValueChange={(value: "high" | "medium" | "low") => handleInputChange("priority", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors.high}>Critical</Badge>
                    <span>Highest priority - always gets bandwidth first</span>
                  </div>
                </SelectItem>
                <SelectItem value="medium">
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors.medium}>Normal</Badge>
                    <span>Standard priority - balanced bandwidth allocation</span>
                  </div>
                </SelectItem>
                <SelectItem value="low">
                  <div className="flex items-center gap-2">
                    <Badge className={priorityColors.low}>Background</Badge>
                    <span>Lower priority - uses remaining bandwidth</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add notes about this priority rule..."
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
              {isSubmitting ? "Creating..." : "Create Rule"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
