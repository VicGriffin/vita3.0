"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Heart, Moon, Sun, Shield, Lock, LogOut, Smartphone, Trash2, AlertTriangle, Download } from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Settings() {
  const [language, setLanguage] = useState("english")
  const [theme, setTheme] = useState("system")
  const [notifications, setNotifications] = useState({
    reminders: true,
    emergencies: true,
    tips: true,
    updates: false,
  })

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <header className="sticky top-0 z-10 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-500" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">VITA</h1>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <DashboardNav />

        <main className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h2>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your account preferences and application settings
            </p>
          </div>

          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 mt-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how VITA looks on your device</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">Theme</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Select your preferred color theme</p>
                    </div>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light" className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          <span>Light</span>
                        </SelectItem>
                        <SelectItem value="dark" className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          <span>Dark</span>
                        </SelectItem>
                        <SelectItem value="system" className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4" />
                          <span>System</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">Language</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Choose your preferred language</p>
                    </div>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Español</SelectItem>
                        <SelectItem value="french">Français</SelectItem>
                        <SelectItem value="german">Deutsch</SelectItem>
                        <SelectItem value="chinese">中文</SelectItem>
                        <SelectItem value="japanese">日本語</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">Text Size</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Adjust the size of text throughout the app
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        A-
                      </Button>
                      <Button variant="outline" size="sm">
                        A
                      </Button>
                      <Button variant="outline" size="sm">
                        A+
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                  <CardDescription>Configure accessibility settings for a better experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">
                        Screen Reader Support
                      </label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Optimize content for screen readers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">High Contrast Mode</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">Reduce Motion</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Minimize animations throughout the app
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 mt-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control which notifications you receive and how</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">
                        Medication Reminders
                      </label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Receive alerts for medication schedules
                      </p>
                    </div>
                    <Switch
                      checked={notifications.reminders}
                      onCheckedChange={() => handleNotificationChange("reminders")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">Emergency Alerts</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Receive critical emergency notifications
                      </p>
                    </div>
                    <Switch
                      checked={notifications.emergencies}
                      onCheckedChange={() => handleNotificationChange("emergencies")}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">Health Tips</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Receive daily wellness recommendations
                      </p>
                    </div>
                    <Switch checked={notifications.tips} onCheckedChange={() => handleNotificationChange("tips")} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">App Updates</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Receive notifications about new features and updates
                      </p>
                    </div>
                    <Switch
                      checked={notifications.updates}
                      onCheckedChange={() => handleNotificationChange("updates")}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Notification Delivery</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">Push Notifications</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Receive alerts on your device</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">
                        Email Notifications
                      </label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Receive alerts via email</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">SMS Notifications</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Receive alerts via text message</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6 mt-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control how your data is used and shared</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">
                        Data Sharing with Healthcare Providers
                      </label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Allow your medical data to be shared with your healthcare providers
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">
                        Anonymous Usage Data
                      </label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Share anonymous usage data to improve the app
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">Location Services</label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Allow access to your location for emergency services
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Shield className="mr-2 h-4 w-4" />
                    View Privacy Policy
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <label className="text-base font-medium text-slate-900 dark:text-white">
                        Two-Factor Authentication
                      </label>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div>
                    <label className="text-base font-medium text-slate-900 dark:text-white mb-2 block">
                      Change Password
                    </label>
                    <div className="space-y-3">
                      <Input type="password" placeholder="Current password" />
                      <Input type="password" placeholder="New password" />
                      <Input type="password" placeholder="Confirm new password" />
                      <Button className="w-full">
                        <Lock className="mr-2 h-4 w-4" />
                        Update Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-6 mt-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                      <AvatarFallback className="text-2xl">JD</AvatarFallback>
                    </Avatar>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">John Doe</h3>
                      <p className="text-slate-600 dark:text-slate-400">john.doe@example.com</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Change Photo
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Full Name</label>
                      <Input defaultValue="John Doe" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Email</label>
                      <Input defaultValue="john.doe@example.com" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Phone</label>
                      <Input defaultValue="(555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Date of Birth</label>
                      <Input defaultValue="May 15, 1980" />
                    </div>
                  </div>

                  <Button className="w-full">Save Changes</Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>Manage your account status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-300">Data Export</h4>
                        <p className="text-amber-700 dark:text-amber-400 text-sm">
                          You can download all your personal data and medical records at any time.
                        </p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <Download className="mr-2 h-4 w-4" />
                          Export My Data
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-100 dark:border-red-900/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800 dark:text-red-300">Danger Zone</h4>
                        <p className="text-red-700 dark:text-red-400 text-sm mb-2">
                          These actions are permanent and cannot be undone.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Account
                          </Button>
                          <Button variant="outline" size="sm">
                            <LogOut className="mr-2 h-4 w-4" />
                            Log Out of All Devices
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

