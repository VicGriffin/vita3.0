"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
  Heart,
  Search,
  Mic,
  Camera,
  MapPin,
  MessageSquare,
  Upload,
  Send,
  AlertTriangle,
  Info,
  Loader2,
} from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Dashboard() {
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResponse, setShowResponse] = useState(false)
  const [activeTab, setActiveTab] = useState("text")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowResponse(true)
    }, 1500)
  }

  const handleVoiceInput = () => {
    // Simulate voice recording
    alert("Voice recording feature would start here")
  }

  const handleImageUpload = () => {
    // Simulate image upload
    alert("Image upload feature would open here")
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
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">AI First Aid Assistant</h2>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>How can I help you today?</CardTitle>
                <CardDescription>
                  Describe your symptoms or upload an image for AI-powered first aid guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="text" className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      <span>Text</span>
                    </TabsTrigger>
                    <TabsTrigger value="voice" className="flex items-center gap-2">
                      <Mic className="h-4 w-4" />
                      <span>Voice</span>
                    </TabsTrigger>
                    <TabsTrigger value="image" className="flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      <span>Image</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Textarea
                        placeholder="Describe your symptoms or situation (e.g., 'I burned my hand with hot water')"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="min-h-[120px]"
                      />
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isProcessing || !query.trim()}>
                          {isProcessing ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Get Help
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </TabsContent>

                  <TabsContent value="voice">
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <div
                        className="w-24 h-24 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center cursor-pointer hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                        onClick={handleVoiceInput}
                      >
                        <Mic className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-center">
                        Tap the microphone and describe your situation
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="image">
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <div
                        className="w-full h-48 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
                        onClick={handleImageUpload}
                      >
                        <Upload className="h-12 w-12 text-slate-400 dark:text-slate-600 mb-2" />
                        <p className="text-slate-600 dark:text-slate-400 text-center">
                          Click to upload an image
                          <br />
                          <span className="text-sm text-slate-500 dark:text-slate-500">or drag and drop</span>
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {showResponse && (
              <Card className="mt-6 border-0 shadow-md">
                <CardHeader className="bg-green-50 dark:bg-green-900/20 border-b border-green-100 dark:border-green-900/30">
                  <div className="flex items-start gap-4">
                    <div className="bg-white dark:bg-slate-800 p-2 rounded-full">
                      <Heart className="h-6 w-6 text-red-500" />
                    </div>
                    <div>
                      <CardTitle>First Aid Guidance</CardTitle>
                      <CardDescription>Based on your description: "I burned my hand with hot water"</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-amber-800 dark:text-amber-400">Severity Assessment</h4>
                        <p className="text-amber-700 dark:text-amber-300">
                          This appears to be a minor to moderate burn. If the burn is severe (larger than 3 inches,
                          affects joints/face, or has white/charred appearance), seek immediate medical attention.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <Info className="h-5 w-5 text-blue-500" />
                      Immediate Steps
                    </h3>
                    <ol className="space-y-3 pl-6 list-decimal">
                      <li className="text-slate-700 dark:text-slate-300">
                        <span className="font-medium">Cool the burn:</span> Hold the burned area under cool (not cold)
                        running water for 10-15 minutes. Do not use ice as it can damage the tissue.
                      </li>
                      <li className="text-slate-700 dark:text-slate-300">
                        <span className="font-medium">Remove jewelry/tight items:</span> Remove any rings, watches, or
                        tight items from the burned area before it swells.
                      </li>
                      <li className="text-slate-700 dark:text-slate-300">
                        <span className="font-medium">Do not break blisters:</span> Leave any blisters intact to protect
                        against infection.
                      </li>
                      <li className="text-slate-700 dark:text-slate-300">
                        <span className="font-medium">Apply aloe vera:</span> Once cooled, apply pure aloe vera gel to
                        soothe the burn.
                      </li>
                      <li className="text-slate-700 dark:text-slate-300">
                        <span className="font-medium">Cover loosely:</span> Cover the burn with a sterile, non-stick
                        bandage and wrap it loosely.
                      </li>
                    </ol>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      When to Seek Medical Help
                    </h3>
                    <ul className="space-y-2 pl-6 list-disc">
                      <li className="text-slate-700 dark:text-slate-300">
                        The burn is larger than 3 inches in diameter
                      </li>
                      <li className="text-slate-700 dark:text-slate-300">
                        The burn is on your face, hands, feet, genitals, or over a joint
                      </li>
                      <li className="text-slate-700 dark:text-slate-300">
                        The burn appears white, charred, or leathery
                      </li>
                      <li className="text-slate-700 dark:text-slate-300">
                        You develop signs of infection (increased pain, redness, swelling, oozing)
                      </li>
                      <li className="text-slate-700 dark:text-slate-300">
                        You haven't had a tetanus shot in the last 5 years
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center border-t border-slate-200 dark:border-slate-800 pt-4">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      Nearby Medical Facilities
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Ask Follow-up
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>Was this helpful?</span>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      👍
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      👎
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Emergency Services</CardTitle>
                <CardDescription>Find nearby medical facilities or call for help</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-slate-400 dark:text-slate-600" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button>
                    <MapPin className="mr-2 h-4 w-4" />
                    Find Hospitals
                  </Button>
                  <Button variant="destructive">
                    <Phone className="mr-2 h-4 w-4" />
                    Emergency Call
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Daily Health Tips</CardTitle>
                <CardDescription>Personalized wellness recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                      <Droplet className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Stay Hydrated</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Remember to drink at least 8 glasses of water today for optimal health.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                      <Activity className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Exercise Reminder</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Take a 15-minute walk today to improve circulation and reduce stress.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-full">
                      <Moon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-white">Sleep Well</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Aim for 7-8 hours of quality sleep tonight for better recovery.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}

function Phone(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function Droplet(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  )
}

function Activity(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  )
}

function Moon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

