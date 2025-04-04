"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Phone, AlertTriangle, Mic, Volume2 } from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Emergency() {
  const [isVoiceGuiding, setIsVoiceGuiding] = useState(false)

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
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Emergency Assistance</h2>
            <Button variant="destructive" className="flex items-center gap-2">
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
              <Button variant="destructive" className="w-full sm:w-auto">
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

