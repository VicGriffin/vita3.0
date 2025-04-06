"use client"

import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import {
  Heart,
  Phone,
  Droplet,
  Activity,
  Moon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"

const hospitalIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/167/167707.png",
  iconSize: [30, 30],
})

export default function Dashboard() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)

  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude])
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
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

      {/* Main Layout */}
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <DashboardNav />

        <main className="space-y-6">
          {/* Emergency Services and Health Tips */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Emergency Services */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Emergency Services</CardTitle>
                <CardDescription>Find nearby medical facilities or call for help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 rounded-lg overflow-hidden">
                  {userLocation ? (
                    <MapContainer
                      center={userLocation}
                      zoom={13}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={userLocation} icon={hospitalIcon}>
                        <Popup>Your Location</Popup>
                      </Marker>
                    </MapContainer>
                  ) : (
                    <p className="text-center text-slate-500 dark:text-slate-400">Getting your location...</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={() => alert("Hospitals will be listed here soon!")}>
                    🏥 Find Hospitals
                  </Button>
                  <a href="tel:999" className="w-full">
                    <Button variant="destructive" className="w-full">
                      <Phone className="mr-2 h-4 w-4" />
                      Emergency Call
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>

            {/* Daily Health Tips */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Daily Health Tips</CardTitle>
                <CardDescription>Personalized wellness recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <HealthTip
                  icon={<Droplet className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                  title="Stay Hydrated"
                  description="Drink at least 8 glasses of water today for optimal health."
                  color="blue"
                />
                <HealthTip
                  icon={<Activity className="h-4 w-4 text-green-600 dark:text-green-400" />}
                  title="Exercise Reminder"
                  description="Take a 15-minute walk today to improve circulation and reduce stress."
                  color="green"
                />
                <HealthTip
                  icon={<Moon className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                  title="Sleep Well"
                  description="Aim for 7-8 hours of quality sleep tonight for better recovery."
                  color="purple"
                />
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}

type TipProps = {
  icon: React.ReactNode
  title: string
  description: string
  color: "blue" | "green" | "purple"
}

function HealthTip({ icon, title, description, color }: TipProps) {
  const bgMap = {
    blue: "bg-blue-50 dark:bg-blue-900/20",
    green: "bg-green-50 dark:bg-green-900/20",
    purple: "bg-purple-50 dark:bg-purple-900/20",
  }
  const iconBgMap = {
    blue: "bg-blue-100 dark:bg-blue-800",
    green: "bg-green-100 dark:bg-green-800",
    purple: "bg-purple-100 dark:bg-purple-800",
  }

  return (
    <div className={`flex items-start gap-3 p-3 rounded-lg ${bgMap[color]}`}>
      <div className={`p-2 rounded-full ${iconBgMap[color]}`}>{icon}</div>
      <div>
        <h4 className="font-medium text-slate-900 dark:text-white">{title}</h4>
        <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
      </div>
    </div>
  )
}
