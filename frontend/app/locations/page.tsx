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

export default function Locations() {
  const [searchLocation, setSearchLocation] = useState("")

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

              <Tabs defaultValue="hospitals">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="hospitals" className="flex items-center gap-1">
                    <FirstAid className="h-4 w-4" />
                    <span className="hidden sm:inline">Hospitals</span>
                  </TabsTrigger>
                  <TabsTrigger value="emergency" className="flex items-center gap-1">
                    <Ambulance className="h-4 w-4" />
                    <span className="hidden sm:inline">Emergency</span>
                  </TabsTrigger>
                  <TabsTrigger value="clinics" className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span className="hidden sm:inline">Clinics</span>
                  </TabsTrigger>
                  <TabsTrigger value="pharmacies" className="flex items-center gap-1">
                    <Pill className="h-4 w-4" />
                    <span className="hidden sm:inline">Pharmacies</span>
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6 aspect-video relative rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-slate-400 dark:text-slate-600" />
                    <span className="sr-only">Map showing nearby medical facilities</span>
                  </div>
                </div>

                <TabsContent value="hospitals" className="space-y-4 mt-4">
                  <MedicalFacility
                    name="City General Hospital"
                    type="Hospital"
                    distance="1.2 miles"
                    address="123 Main Street, Cityville"
                    phone="(555) 123-4567"
                    hours="Open 24/7"
                    rating={4.7}
                    isOpen={true}
                  />

                  <MedicalFacility
                    name="University Medical Center"
                    type="Hospital"
                    distance="2.8 miles"
                    address="456 College Avenue, Cityville"
                    phone="(555) 987-6543"
                    hours="Open 24/7"
                    rating={4.9}
                    isOpen={true}
                  />

                  <MedicalFacility
                    name="Memorial Hospital"
                    type="Hospital"
                    distance="3.5 miles"
                    address="789 Park Road, Cityville"
                    phone="(555) 456-7890"
                    hours="Open 24/7"
                    rating={4.5}
                    isOpen={true}
                  />
                </TabsContent>

                <TabsContent value="emergency" className="space-y-4 mt-4">
                  <MedicalFacility
                    name="City General Hospital ER"
                    type="Emergency Room"
                    distance="1.2 miles"
                    address="123 Main Street, Cityville"
                    phone="(555) 123-4567"
                    hours="Open 24/7"
                    rating={4.7}
                    isOpen={true}
                  />

                  <MedicalFacility
                    name="Urgent Care Center"
                    type="Urgent Care"
                    distance="0.8 miles"
                    address="321 Oak Street, Cityville"
                    phone="(555) 234-5678"
                    hours="8:00 AM - 10:00 PM"
                    rating={4.3}
                    isOpen={true}
                  />
                </TabsContent>

                <TabsContent value="clinics" className="space-y-4 mt-4">
                  <MedicalFacility
                    name="Family Health Clinic"
                    type="Clinic"
                    distance="0.5 miles"
                    address="567 Maple Avenue, Cityville"
                    phone="(555) 345-6789"
                    hours="9:00 AM - 5:00 PM"
                    rating={4.6}
                    isOpen={true}
                  />

                  <MedicalFacility
                    name="Community Medical Center"
                    type="Clinic"
                    distance="1.7 miles"
                    address="890 Pine Street, Cityville"
                    phone="(555) 456-7890"
                    hours="8:00 AM - 6:00 PM"
                    rating={4.2}
                    isOpen={false}
                  />
                </TabsContent>

                <TabsContent value="pharmacies" className="space-y-4 mt-4">
                  <MedicalFacility
                    name="City Pharmacy"
                    type="Pharmacy"
                    distance="0.3 miles"
                    address="432 Elm Street, Cityville"
                    phone="(555) 567-8901"
                    hours="8:00 AM - 9:00 PM"
                    rating={4.4}
                    isOpen={true}
                  />

                  <MedicalFacility
                    name="24-Hour Pharmacy"
                    type="Pharmacy"
                    distance="1.5 miles"
                    address="765 Cedar Road, Cityville"
                    phone="(555) 678-9012"
                    hours="Open 24/7"
                    rating={4.8}
                    isOpen={true}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Emergency Services Information</CardTitle>
              <CardDescription>Important contact information for emergency services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-100 dark:border-red-900/30">
                  <h3 className="font-medium text-lg mb-2 text-red-800 dark:text-red-300 flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency Numbers
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300">Emergency Services:</span>
                      <span className="font-medium text-slate-900 dark:text-white">911</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300">Poison Control:</span>
                      <span className="font-medium text-slate-900 dark:text-white">(800) 222-1222</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300">Non-Emergency Police:</span>
                      <span className="font-medium text-slate-900 dark:text-white">(555) 789-0123</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
                  <h3 className="font-medium text-lg mb-2 text-blue-800 dark:text-blue-300 flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Medical Helplines
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300">Nurse Advice Line:</span>
                      <span className="font-medium text-slate-900 dark:text-white">(555) 234-5678</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300">Mental Health Crisis:</span>
                      <span className="font-medium text-slate-900 dark:text-white">(800) 273-8255</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-700 dark:text-slate-300">Telemedicine:</span>
                      <span className="font-medium text-slate-900 dark:text-white">(555) 345-6789</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

interface MedicalFacilityProps {
  name: string
  type: string
  distance: string
  address: string
  phone: string
  hours: string
  rating: number
  isOpen: boolean
}

function MedicalFacility({ name, type, distance, address, phone, hours, rating, isOpen }: MedicalFacilityProps) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h3 className="font-medium text-lg text-slate-900 dark:text-white">{name}</h3>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{type}</Badge>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <MapPin className="mr-1 h-3 w-3" />
                    {distance}
                  </div>
                </div>
              </div>
              <Badge
                variant={isOpen ? "secondary" : "outline"}
                className={isOpen ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" : ""}
              >
                {isOpen ? "Open Now" : "Closed"}
              </Badge>
            </div>

            <p className="text-slate-600 dark:text-slate-400 mb-2">{address}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-3">
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Phone className="mr-1 h-3 w-3" />
                {phone}
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Clock className="mr-1 h-3 w-3" />
                {hours}
              </div>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Star className="mr-1 h-3 w-3 text-amber-500" />
                {rating} / 5
              </div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col gap-2">
            <Button className="flex-1 md:w-full">
              <Navigation className="mr-2 h-4 w-4" />
              Directions
            </Button>
            <Button variant="outline" className="flex-1 md:w-full">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

