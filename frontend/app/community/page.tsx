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
import { Heart, MessageSquare, ThumbsUp, Search, Filter, Send, Clock, CheckCircle } from "lucide-react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Community() {
  const [newQuestion, setNewQuestion] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Your question has been submitted to the community!")
    setNewQuestion("")
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
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Community Forum</h2>
              <p className="text-slate-600 dark:text-slate-400">Ask questions and share knowledge with the community</p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search questions..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>Ask a Question</CardTitle>
              <CardDescription>
                Get answers from medical professionals and experienced community members
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitQuestion}>
                <Textarea
                  placeholder="What's your health or first aid question?"
                  className="min-h-[120px] mb-4"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!newQuestion.trim()}>
                    <Send className="mr-2 h-4 w-4" />
                    Post Question
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Tabs defaultValue="recent">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recent">Recent</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="answered">Answered</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4 mt-4">
              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Sarah Johnson"
                role="Community Member"
                time="2 hours ago"
                question="What's the best way to treat a sprained ankle? I twisted it while hiking yesterday and it's swollen."
                replies={8}
                likes={15}
                isAnswered={true}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Michael Chen"
                role="Community Member"
                time="5 hours ago"
                question="My 3-year-old has a fever of 101°F. When should I be concerned enough to see a doctor?"
                replies={12}
                likes={23}
                isAnswered={true}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Emily Rodriguez"
                role="Community Member"
                time="Yesterday"
                question="I'm allergic to bee stings. What should I keep in my first aid kit specifically for this?"
                replies={6}
                likes={11}
                isAnswered={false}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="David Wilson"
                role="Community Member"
                time="2 days ago"
                question="What's the difference between heat exhaustion and heat stroke? How do I identify and treat each?"
                replies={15}
                likes={32}
                isAnswered={true}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Lisa Thompson"
                role="Community Member"
                time="3 days ago"
                question="I cut my finger while cooking and it's quite deep. How do I know if it needs stitches?"
                replies={10}
                likes={18}
                isAnswered={true}
              />
            </TabsContent>

            <TabsContent value="popular" className="space-y-4 mt-4">
              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="David Wilson"
                role="Community Member"
                time="2 days ago"
                question="What's the difference between heat exhaustion and heat stroke? How do I identify and treat each?"
                replies={15}
                likes={32}
                isAnswered={true}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Michael Chen"
                role="Community Member"
                time="5 hours ago"
                question="My 3-year-old has a fever of 101°F. When should I be concerned enough to see a doctor?"
                replies={12}
                likes={23}
                isAnswered={true}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Lisa Thompson"
                role="Community Member"
                time="3 days ago"
                question="I cut my finger while cooking and it's quite deep. How do I know if it needs stitches?"
                replies={10}
                likes={18}
                isAnswered={true}
              />
            </TabsContent>

            <TabsContent value="answered" className="space-y-4 mt-4">
              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="David Wilson"
                role="Community Member"
                time="2 days ago"
                question="What's the difference between heat exhaustion and heat stroke? How do I identify and treat each?"
                replies={15}
                likes={32}
                isAnswered={true}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Sarah Johnson"
                role="Community Member"
                time="2 hours ago"
                question="What's the best way to treat a sprained ankle? I twisted it while hiking yesterday and it's swollen."
                replies={8}
                likes={15}
                isAnswered={true}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Michael Chen"
                role="Community Member"
                time="5 hours ago"
                question="My 3-year-old has a fever of 101°F. When should I be concerned enough to see a doctor?"
                replies={12}
                likes={23}
                isAnswered={true}
              />

              <CommunityQuestion
                avatar="/placeholder.svg?height=40&width=40"
                name="Lisa Thompson"
                role="Community Member"
                time="3 days ago"
                question="I cut my finger while cooking and it's quite deep. How do I know if it needs stitches?"
                replies={10}
                likes={18}
                isAnswered={true}
              />
            </TabsContent>
          </Tabs>

          <div className="flex justify-center">
            <Button variant="outline">Load More Questions</Button>
          </div>
        </main>
      </div>
    </div>
  )
}

interface CommunityQuestionProps {
  avatar: string
  name: string
  role: string
  time: string
  question: string
  replies: number
  likes: number
  isAnswered: boolean
}

function CommunityQuestion({ avatar, name, role, time, question, replies, likes, isAnswered }: CommunityQuestionProps) {
  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
              <div className="font-medium text-slate-900 dark:text-white">{name}</div>
              <Badge variant="outline" className="w-fit">
                {role}
              </Badge>
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Clock className="mr-1 h-3 w-3" />
                {time}
              </div>
            </div>

            <p className="text-slate-700 dark:text-slate-300 mb-3">{question}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-600 dark:text-slate-400">
                  <MessageSquare className="h-4 w-4" />
                  <span>{replies} Replies</span>
                </Button>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-slate-600 dark:text-slate-400">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{likes}</span>
                </Button>
              </div>

              {isAnswered && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1"
                >
                  <CheckCircle className="h-3 w-3" />
                  <span>Answered</span>
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

