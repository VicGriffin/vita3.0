"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MapPin,
  Phone,
  Clock,
  Star,
  Navigation,
  Search,
  Ambulance,
  Pill,
  AmbulanceIcon as FirstAid,
} from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

// MedicalFacility Component
function MedicalFacility({
  name,
  type,
  distance,
  address,
  phone,
  hours,
  rating,
  isOpen,
}: {
  name: string
  type: string
  distance: string
  address: string
  phone: string
  hours: string
  rating: number
  isOpen: boolean
}) {
  return (
    <Card className="border border-slate-200 dark:border-slate-800">
      <CardContent className="flex flex-col sm:flex-row justify-between gap-4 p-4">
        <div className="space-y-1">
          <h4 className="font-bold text-lg text-slate-900 dark:text-white">{name}</h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">{type} • {distance}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {address}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Phone className="h-4 w-4" /> {phone}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
            <Clock className="h-4 w-4" /> {hours}
          </p>
        </div>
        <div className="flex flex-col items-end justify-between">
          <Badge variant={isOpen ? "success" : "destructive"}>{isOpen ? "Open Now" : "Closed"}</Badge>
          <div className="flex items-center gap-1 text-yellow-500 mt-2">
            <Star className="h-4 w-4" />
            <span className="font-medium">{rating}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function Locations() {
  const [searchLocation, setSearchLocation] = useState("")

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

      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <DashboardNav />

        <main className="space-y-6">
          {/* Page Title */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Services</h2>
              <p className="text-slate-600 dark:text-slate-400">
                Find nearby medical facilities and emergency services
              </p>
            </div>

            <Button variant="destructive" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>Emergency Call</span>
            </Button>
          </div>

          {/* Search and Map */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Find Medical Facilities</CardTitle>
              <CardDescription>Search for hospitals, clinics, pharmacies, and emergency rooms near you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Enter location or use current location"
                    className="pl-9"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                </div>
                <Button className="flex items-center gap-2">
                  <Navigation className="h-4 w-4" />
                  <span>Use My Location</span>
                </Button>
              </div>

              {/* Map Display */}
              <div className="mt-6 aspect-video relative rounded-lg overflow-hidden">
                <MapContainer
                  center={[-1.2921, 36.8219]}
                  zoom={13}
                  scrollWheelZoom={false}
                  className="w-full h-full z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[-1.2921, 36.8219]}>
                    <Popup>Nairobi Hospital</Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Tabs with Facility Data */}
              <Tabs defaultValue="hospitals" className="mt-8">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="hospitals"><FirstAid className="h-4 w-4" /> Hospitals</TabsTrigger>
                  <TabsTrigger value="emergency"><Ambulance className="h-4 w-4" /> Emergency</TabsTrigger>
                  <TabsTrigger value="clinics"><Heart className="h-4 w-4" /> Clinics</TabsTrigger>
                  <TabsTrigger value="pharmacies"><Pill className="h-4 w-4" /> Pharmacies</TabsTrigger>
                </TabsList>

                {/* Hospitals */}
                <TabsContent value="hospitals" className="space-y-4 mt-4">
                  <MedicalFacility name="City General Hospital" type="Hospital" distance="1.2 miles" address="123 Main Street" phone="(555) 123-4567" hours="Open 24/7" rating={4.7} isOpen />
                  <MedicalFacility name="University Medical Center" type="Hospital" distance="2.8 miles" address="456 College Avenue" phone="(555) 987-6543" hours="Open 24/7" rating={4.9} isOpen />
                </TabsContent>

                {/* Emergency */}
                <TabsContent value="emergency" className="space-y-4 mt-4">
                  <MedicalFacility name="Urgent Care Center" type="Urgent Care" distance="0.8 miles" address="321 Oak Street" phone="(555) 234-5678" hours="8 AM - 10 PM" rating={4.3} isOpen />
                </TabsContent>

                {/* Clinics */}
                <TabsContent value="clinics" className="space-y-4 mt-4">
                  <MedicalFacility name="Family Health Clinic" type="Clinic" distance="0.5 miles" address="567 Maple Ave" phone="(555) 345-6789" hours="9 AM - 5 PM" rating={4.6} isOpen />
                </TabsContent>

                {/* Pharmacies */}
                <TabsContent value="pharmacies" className="space-y-4 mt-4">
                  <MedicalFacility name="City Pharmacy" type="Pharmacy" distance="0.3 miles" address="432 Elm Street" phone="(555) 567-8901" hours="8 AM - 9 PM" rating={4.4} isOpen />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
