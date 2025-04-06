"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Phone, Mail, MapPin, Calendar, Edit, Save, AlertTriangle, Shield, Download, Upload } from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)

  const toggleEditing = () => {
    setIsEditing(!isEditing)
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Medical Profile</h2>
              <p className="text-slate-600 dark:text-slate-400">Manage your personal and medical information</p>
            </div>

            <Button
              variant={isEditing ? "default" : "outline"}
              className="flex items-center gap-2"
              onClick={toggleEditing}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              ) : (
                <>
                  <Edit className="h-4 w-4" />
                  <span>Edit Profile</span>
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6">
            <Card className="border-0 shadow-md">
              <CardContent className="pt-6 flex flex-col items-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User" />
                  <AvatarFallback className="text-4xl">JD</AvatarFallback>
                </Avatar>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">John Doe</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">Born: May 15, 1980 (45 years)</p>

                <div className="w-full space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                      <Phone className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Phone</p>
                      <p className="text-slate-900 dark:text-white">(555) 123-4567</p>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                      <Mail className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                      <p className="text-slate-900 dark:text-white">john.doe@example.com</p>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full">
                      <MapPin className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Address</p>
                      <p className="text-slate-900 dark:text-white">123 Main Street, Cityville</p>
                    </div>
                    {isEditing && (
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="w-full border-t border-slate-200 dark:border-slate-700 mt-6 pt-6">
                  <h4 className="font-medium text-slate-900 dark:text-white mb-3">Emergency Contact</h4>

                  <div className="space-y-2">
                    <p className="text-slate-900 dark:text-white font-medium">Sarah Doe (Spouse)</p>
                    <p className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      (555) 987-6543
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Tabs defaultValue="medical">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="medical">Medical Info</TabsTrigger>
                  <TabsTrigger value="history">Medical History</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="medical" className="space-y-6 mt-6">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Basic Medical Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Blood Type</label>
                          {isEditing ? (
                            <Select defaultValue="A+">
                              <SelectTrigger>
                                <SelectValue placeholder="Select blood type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="A+">A+</SelectItem>
                                <SelectItem value="A-">A-</SelectItem>
                                <SelectItem value="B+">B+</SelectItem>
                                <SelectItem value="B-">B-</SelectItem>
                                <SelectItem value="AB+">AB+</SelectItem>
                                <SelectItem value="AB-">AB-</SelectItem>
                                <SelectItem value="O+">O+</SelectItem>
                                <SelectItem value="O-">O-</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            <p className="text-slate-900 dark:text-white">A+</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Height</label>
                          {isEditing ? (
                            <Input defaultValue="175 cm" />
                          ) : (
                            <p className="text-slate-900 dark:text-white">175 cm</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Weight</label>
                          {isEditing ? (
                            <Input defaultValue="70 kg" />
                          ) : (
                            <p className="text-slate-900 dark:text-white">70 kg</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-500 dark:text-slate-400">BMI</label>
                          <p className="text-slate-900 dark:text-white">22.9 (Normal)</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Allergies & Conditions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">Allergies</label>
                        {isEditing ? (
                          <Textarea defaultValue="Penicillin, Peanuts" />
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800"
                            >
                              Penicillin
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800"
                            >
                              Peanuts
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Chronic Conditions
                        </label>
                        {isEditing ? (
                          <Textarea defaultValue="Hypertension, Type 2 Diabetes" />
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                            >
                              Hypertension
                            </Badge>
                            <Badge
                              variant="outline"
                              className="bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                            >
                              Type 2 Diabetes
                            </Badge>
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Current Medications
                        </label>
                        {isEditing ? (
                          <Textarea defaultValue="Lisinopril 10mg, Metformin 500mg, Atorvastatin 20mg" />
                        ) : (
                          <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1">
                            <li>Lisinopril 10mg (daily)</li>
                            <li>Metformin 500mg (twice daily)</li>
                            <li>Atorvastatin 20mg (nightly)</li>
                          </ul>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-6 mt-6">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Medical History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium text-lg text-slate-900 dark:text-white mb-3">Surgeries</h3>
                          <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">Appendectomy</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  June 2015 - City General Hospital
                                </p>
                                <p className="text-slate-700 dark:text-slate-300 mt-1">
                                  Laparoscopic appendix removal due to acute appendicitis.
                                </p>
                              </div>
                            </div>

                            <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                              <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">Knee Arthroscopy</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  March 2018 - Sports Medicine Center
                                </p>
                                <p className="text-slate-700 dark:text-slate-300 mt-1">
                                  Meniscus repair following sports injury.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-lg text-slate-900 dark:text-white mb-3">Hospitalizations</h3>
                          <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                              <div className="flex-shrink-0 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                                <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white">Pneumonia</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                  January 2020 - City General Hospital
                                </p>
                                <p className="text-slate-700 dark:text-slate-300 mt-1">
                                  5-day hospitalization for severe pneumonia treatment.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium text-lg text-slate-900 dark:text-white mb-3">Vaccinations</h3>
                          <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-2">
                            <li>
                              <span className="font-medium">COVID-19</span> - Last dose: March 2023
                            </li>
                            <li>
                              <span className="font-medium">Influenza</span> - Annual (Last: October 2024)
                            </li>
                            <li>
                              <span className="font-medium">Tetanus/Diphtheria</span> - Last dose: June 2019
                            </li>
                            <li>
                              <span className="font-medium">Pneumococcal</span> - September 2022
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Family Medical History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <h4 className="font-medium text-slate-900 dark:text-white">Cardiovascular Disease</h4>
                          <p className="text-slate-700 dark:text-slate-300 mt-1">
                            Father diagnosed with hypertension at age 45. Paternal grandfather had heart attack at age
                            62.
                          </p>
                        </div>

                        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <h4 className="font-medium text-slate-900 dark:text-white">Diabetes</h4>
                          <p className="text-slate-700 dark:text-slate-300 mt-1">
                            Mother diagnosed with Type 2 diabetes at age 50. Maternal grandmother also had diabetes.
                          </p>
                        </div>

                        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <h4 className="font-medium text-slate-900 dark:text-white">Cancer</h4>
                          <p className="text-slate-700 dark:text-slate-300 mt-1">
                            Paternal aunt diagnosed with breast cancer at age 55 (survivor).
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-6 mt-6">
                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle>Medical Documents</CardTitle>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Upload className="h-4 w-4" />
                          <span>Upload</span>
                        </Button>
                      </div>
                      <CardDescription>Access and manage your medical records and documents</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                              <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white">Annual Physical Results</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                PDF • 2.4 MB • Uploaded Jan 15, 2025
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                              <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white">Blood Test Results</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                PDF • 1.8 MB • Uploaded Feb 3, 2025
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                              <FileIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white">Vaccination Records</h4>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                PDF • 0.9 MB • Uploaded Mar 12, 2025
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-md">
                    <CardHeader>
                      <CardTitle>Privacy & Sharing</CardTitle>
                      <CardDescription>Manage how your medical information is shared</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900/30">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-amber-800 dark:text-amber-300">Data Privacy Notice</h4>
                              <p className="text-amber-700 dark:text-amber-400 text-sm">
                                Your medical information is protected by our privacy policy and is only shared with
                                healthcare providers you authorize.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                          <div className="flex items-start gap-3">
                            <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white">Healthcare Provider Access</h4>
                              <p className="text-slate-700 dark:text-slate-300 text-sm mb-3">
                                The following healthcare providers have access to your medical records:
                              </p>
                              <ul className="list-disc pl-5 text-slate-700 dark:text-slate-300 space-y-1 text-sm">
                                <li>Dr. Sarah Johnson (Primary Care)</li>
                                <li>Dr. Michael Chen (Cardiologist)</li>
                                <li>City General Hospital</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

