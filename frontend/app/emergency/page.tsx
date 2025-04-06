"use client"

import { useState } from "react"
import { useEmergency } from "@/hooks/useEmergency"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { 
  Heart, Phone, AlertTriangle, Mic, Volume2, Search, 
  Camera, Send, Loader2, Upload, Info, MapPin, MessageSquare 
} from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Emergency() {
  const [isVoiceGuiding, setIsVoiceGuiding] = useState(false)
  const { requests, loading, error, createRequest } = useEmergency()
  const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [activeTab, setActiveTab] = useState("text")
  const [query, setQuery] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResponse, setShowResponse] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim() || isProcessing) return

    setIsProcessing(true)
    try {
      // TODO: Implement AI processing
      setShowResponse(true)
    } catch (err) {
      console.error('Failed to process query:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleVoiceInput = () => {
    // TODO: Implement voice input
  }

  const handleImageUpload = () => {
    // TODO: Implement image upload
  }

  const toggleVoiceGuide = () => {
    setIsVoiceGuiding(!isVoiceGuiding)
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
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Assistance</h2>
              {currentLocation && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Location: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                </p>
              )}
            </div>
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={async () => {
                if (!currentLocation) {
                  try {
                    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                      navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const loc = {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                    };
                    setCurrentLocation(loc);
                    await createRequest({
                      location: loc,
                      type: 'emergency_call',
                      description: 'Emergency assistance requested'
                    });
                  } catch (err) {
                    alert('Failed to get location. Please enable location services.');
                  }
                }
              }}
            >
              <Phone className="h-4 w-4" />
              <span>Emergency Call</span>
            </Button>
          </div>

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

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Assistance</h2>
              {currentLocation && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Location: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                </p>
              )}
            </div>
            <Button 
              variant="destructive" 
              className="flex items-center gap-2"
              onClick={async () => {
                if (!currentLocation) {
                  try {
                    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                      navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const loc = {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                    };
                    setCurrentLocation(loc);
                    await createRequest({
                      location: loc,
                      type: 'emergency_call',
                      description: 'Emergency assistance requested'
                    });
                  } catch (err) {
                    alert('Failed to get location. Please enable location services.');
                  }
                }
              }}
            >
              <Phone className="h-4 w-4" />
              <span>Emergency Call</span>
            </Button>
          </div>

          <Card className="border-0 shadow-md bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-slate-800 p-2 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <CardTitle>Emergency Situations</CardTitle>
                  <CardDescription>
                    For life-threatening emergencies, call emergency services immediately
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 pl-6 list-disc">
                <li className="text-slate-700 dark:text-slate-300">Severe bleeding that cannot be stopped</li>
                <li className="text-slate-700 dark:text-slate-300">Difficulty breathing or shortness of breath</li>
                <li className="text-slate-700 dark:text-slate-300">Chest pain or pressure</li>
                <li className="text-slate-700 dark:text-slate-300">Unconsciousness</li>
                <li className="text-slate-700 dark:text-slate-300">Severe burns or scalds</li>
                <li className="text-slate-700 dark:text-slate-300">
                  Suspected stroke (face drooping, arm weakness, speech difficulty)
                </li>
                <li className="text-slate-700 dark:text-slate-300">Severe allergic reaction</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant="destructive" 
                className="w-full sm:w-auto"
                onClick={async () => {
                  if (!currentLocation) {
                    try {
                      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                      });
                      const loc = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                      };
                      setCurrentLocation(loc);
                      await createRequest({
                        location: loc,
                        type: 'emergency_services',
                        description: 'Emergency services requested'
                      });
                    } catch (err) {
                      alert('Failed to get location. Please enable location services.');
                    }
                  }
                }}
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Emergency Services
              </Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="cpr">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="cpr">CPR Guide</TabsTrigger>
              <TabsTrigger value="choking">Choking</TabsTrigger>
              <TabsTrigger value="bleeding">Bleeding</TabsTrigger>
            </TabsList>

            <TabsContent value="cpr">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>CPR Voice-Guided Assistance</CardTitle>
                      <CardDescription>Follow these steps for adult CPR in an emergency</CardDescription>
                    </div>
                    <Button
                      variant={isVoiceGuiding ? "destructive" : "outline"}
                      size="sm"
                      onClick={toggleVoiceGuide}
                      className="flex items-center gap-2"
                    >
                      {isVoiceGuiding ? (
                        <>
                          <Volume2 className="h-4 w-4" />
                          <span>Stop Voice Guide</span>
                        </>
                      ) : (
                        <>
                          <Mic className="h-4 w-4" />
                          <span>Start Voice Guide</span>
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <span className="text-slate-500 dark:text-slate-400">CPR Demonstration Video</span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-2 text-slate-900 dark:text-white">Before Starting CPR</h3>
                        <ul className="space-y-2 pl-6 list-disc">
                          <li className="text-slate-700 dark:text-slate-300">Check the scene for safety</li>
                          <li className="text-slate-700 dark:text-slate-300">
                            Check for responsiveness by tapping and shouting
                          </li>
                          <li className="text-slate-700 dark:text-slate-300">
                            Call emergency services or ask someone to call
                          </li>
                        </ul>
                      </div>

                      {isVoiceGuiding && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800 animate-pulse">
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <p className="font-medium text-green-800 dark:text-green-300">
                              Voice guidance active - follow the spoken instructions
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg text-slate-900 dark:text-white">CPR Steps</h3>

                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Position the person</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Make sure the person is lying on their back on a firm, flat surface.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Hand position</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Place the heel of one hand on the center of the chest (over the lower half of the
                            breastbone). Place your other hand on top and interlock your fingers.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Chest compressions</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Push hard and fast at a rate of 100-120 compressions per minute. Allow the chest to
                            completely recoil between compressions. Aim for a depth of at least 2 inches (5 cm).
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Rescue breaths (if trained)</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            After 30 compressions, give 2 rescue breaths if trained. If not trained or uncomfortable,
                            continue with chest compressions only.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          5
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Continue CPR</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Continue cycles of 30 compressions and 2 breaths until emergency services arrive or the
                            person shows signs of life.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Switch to Child CPR
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Switch to Infant CPR
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="choking">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Choking Emergency Guide</CardTitle>
                  <CardDescription>Follow these steps to help someone who is choking</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <span className="text-slate-500 dark:text-slate-400">Heimlich Maneuver Demonstration</span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-2 text-slate-900 dark:text-white">Recognize Choking</h3>
                        <ul className="space-y-2 pl-6 list-disc">
                          <li className="text-slate-700 dark:text-slate-300">Person cannot speak, cough, or breathe</li>
                          <li className="text-slate-700 dark:text-slate-300">Person may grasp their throat</li>
                          <li className="text-slate-700 dark:text-slate-300">Face turns blue or gray</li>
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleVoiceGuide}
                        className="flex items-center gap-2"
                      >
                        <Mic className="h-4 w-4" />
                        <span>Start Voice Guide</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg text-slate-900 dark:text-white">Heimlich Maneuver Steps</h3>

                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Stand behind the person</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Stand behind the choking person and wrap your arms around their waist.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Position your hands</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Make a fist with one hand and place it slightly above the person's navel (belly button).
                            Grab your fist with your other hand.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Perform abdominal thrusts</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Pull inward and upward with quick, forceful thrusts. Repeat until the object is dislodged or
                            the person becomes unconscious.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">
                            If the person becomes unconscious
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Carefully lower them to the ground, call emergency services, and begin CPR if you're
                            trained.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4">
                  <Button variant="outline" className="w-full sm:w-auto">
                    Switch to Child Choking
                  </Button>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Switch to Infant Choking
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="bleeding">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Severe Bleeding Guide</CardTitle>
                  <CardDescription>Follow these steps to control severe bleeding</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="aspect-video bg-slate-200 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                      <span className="text-slate-500 dark:text-slate-400">Bleeding Control Demonstration</span>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                        <h3 className="font-medium text-lg mb-2 text-slate-900 dark:text-white">Important Warning</h3>
                        <ul className="space-y-2 pl-6 list-disc">
                          <li className="text-slate-700 dark:text-slate-300">
                            Wear gloves if available to protect from bloodborne pathogens
                          </li>
                          <li className="text-slate-700 dark:text-slate-300">
                            Call emergency services for severe bleeding
                          </li>
                          <li className="text-slate-700 dark:text-slate-300">
                            Apply pressure until professional help arrives
                          </li>
                        </ul>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={toggleVoiceGuide}
                        className="flex items-center gap-2"
                      >
                        <Mic className="h-4 w-4" />
                        <span>Start Voice Guide</span>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-lg text-slate-900 dark:text-white">Bleeding Control Steps</h3>

                    <div className="space-y-4">
                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          1
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Apply direct pressure</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Use a clean cloth, gauze pad, or your hand (if nothing else is available) to apply firm,
                            direct pressure to the wound.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          2
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Elevate the wound</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            If possible, elevate the wounded area above the level of the heart to help reduce blood
                            flow.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          3
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Apply a pressure bandage</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            Once bleeding slows, apply a pressure bandage by wrapping the wound firmly with a bandage or
                            clean cloth.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                          4
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-900 dark:text-white">Use a tourniquet (last resort)</h4>
                          <p className="text-slate-600 dark:text-slate-400">
                            For life-threatening bleeding from an arm or leg that cannot be controlled with direct
                            pressure, a tourniquet may be necessary. Only use as a last resort.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="destructive" className="w-full sm:w-auto">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Emergency Services
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
