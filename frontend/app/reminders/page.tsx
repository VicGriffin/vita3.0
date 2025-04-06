"use client"

import type React from "react"

import { useState } from "react"
import { useReminders } from "@/hooks/useReminders"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Calendar, Clock, Plus, Pill, Activity, Droplet, Moon, Trash2, Edit } from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Reminders() {
  const [selectedDay, setSelectedDay] = useState("today")
  const { reminders, loading, error, createReminder, updateReminder, deleteReminder } = useReminders()

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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Wellness Reminders</h2>
              <p className="text-slate-600 dark:text-slate-400">Track medications, appointments, and health goals</p>
            </div>

            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Reminder</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Medication Schedule</CardTitle>
                    <Select value={selectedDay} onValueChange={setSelectedDay}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="tomorrow">Tomorrow</SelectItem>
                        <SelectItem value="week">This Week</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <CardDescription>
                    Your medication reminders for{" "}
                    {selectedDay === "today" ? "today" : selectedDay === "tomorrow" ? "tomorrow" : "this week"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-4">
                      <p className="text-slate-600 dark:text-slate-400">Loading reminders...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center py-4">
                      <p className="text-red-500">{error}</p>
                    </div>
                  ) : reminders.length === 0 ? (
                    <div className="text-center py-4">
                      <p className="text-slate-600 dark:text-slate-400">No reminders found</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {reminders.map((reminder) => (
                        <MedicationReminder
                          key={reminder.id}
                          name={reminder.title}
                          dosage={reminder.description}
                          time={new Date(reminder.dueDate).toLocaleTimeString()}
                          instructions={reminder.description}
                          completed={reminder.completed}
                          onDelete={() => deleteReminder(reminder.id)}
                          onUpdate={(completed) => updateReminder(reminder.id, { completed })}
                        />
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Medication
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                  <CardDescription>Your scheduled medical appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <AppointmentReminder
                      doctor="Dr. Sarah Smith"
                      specialty="Cardiologist"
                      date="April 15, 2024"
                      time="2:30 PM"
                      location="Heart Care Center, 123 Medical Ave"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle>Daily Health Goals</CardTitle>
                  <CardDescription>Track your daily wellness targets</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <HealthGoal
                    icon={<Activity className="h-5 w-5 text-blue-500" />}
                    title="Steps"
                    description="Daily step count"
                    progress={6500}
                    total={10000}
                  />

                  <HealthGoal
                    icon={<Droplet className="h-5 w-5 text-blue-500" />}
                    title="Water Intake"
                    description="Glasses of water"
                    progress={6}
                    total={8}
                  />

                  <HealthGoal
                    icon={<Moon className="h-5 w-5 text-blue-500" />}
                    title="Sleep"
                    description="Hours of sleep"
                    progress={7}
                    total={8}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

interface MedicationReminderProps {
  name: string
  dosage: string
  time: string
  instructions: string
  completed: boolean
  onDelete: () => void
  onUpdate: (completed: boolean) => void
}

function MedicationReminder({ name, dosage, time, instructions, completed, onDelete, onUpdate }: MedicationReminderProps) {
  const [isCompleted, setIsCompleted] = useState(completed)

  const handleCheckboxChange = (checked: boolean) => {
    setIsCompleted(checked)
    onUpdate(checked)
  }

  return (
    <div
      className={`flex items-start gap-4 p-4 rounded-lg border ${
        isCompleted ? "bg-slate-50 dark:bg-slate-800/50" : "bg-white dark:bg-slate-800"
      }`}
    >
      <div className="flex-shrink-0 pt-1">
        <Checkbox checked={isCompleted} onCheckedChange={handleCheckboxChange} id={`med-${name}`} />
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
          <div className="flex items-center gap-2">
            <label
              htmlFor={`med-${name}`}
              className={`font-medium ${
                isCompleted ? "text-slate-500 dark:text-slate-400 line-through" : "text-slate-900 dark:text-white"
              }`}
            >
              {name} ({dosage})
            </label>
            <Pill className="h-4 w-4 text-blue-500" />
          </div>
          <Badge variant="outline" className="w-fit">
            <Clock className="mr-1 h-3 w-3" />
            {time}
          </Badge>
        </div>

        <p
          className={`text-sm ${
            isCompleted ? "text-slate-500 dark:text-slate-400" : "text-slate-600 dark:text-slate-300"
          }`}
        >
          {instructions}
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface AppointmentReminderProps {
  doctor: string
  specialty: string
  date: string
  time: string
  location: string
}

function AppointmentReminder({ doctor, specialty, date, time, location }: AppointmentReminderProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <div className="flex-shrink-0 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      </div>

      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
          <h3 className="font-medium text-slate-900 dark:text-white">{doctor}</h3>
          <Badge variant="outline">{specialty}</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{location}</p>
      </div>

      <div className="flex gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

interface HealthGoalProps {
  icon: React.ReactNode
  title: string
  description: string
  progress: number
  total: number
}

function HealthGoal({ icon, title, description, progress, total }: HealthGoalProps) {
  const percentage = (progress / total) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">{description}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {progress}/{total}
        </span>
      </div>

      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

