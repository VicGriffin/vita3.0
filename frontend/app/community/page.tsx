"use client"

import type React from "react"
import { useState } from "react"
import { useCommunity, type Post } from "@/hooks/useCommunity"
import { useComments } from "@/hooks/useComments"
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

interface CommunityQuestionProps {
  avatar: string
  name: string
  role: string
  time: string
  question: string
  replies: number
  likes: number
  isAnswered: boolean
  onDelete: () => void
  onClick: () => void
}

export default function Community() {
  const [newQuestion, setNewQuestion] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const { posts, loading, error, createPost, updatePost, deletePost } = useCommunity()
  const { comments, loading: commentsLoading, createComment } = selectedPost ? useComments(selectedPost) : { comments: [], loading: false, createComment: null }
  const [newComment, setNewComment] = useState("")

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newQuestion.trim()) return

    try {
      await createPost({
        title: newQuestion.split('\n')[0] || 'Question',
        content: newQuestion,
      })
      setNewQuestion("")
    } catch (err) {
      console.error('Failed to create post:', err)
    }
  }

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim() || !selectedPost || !createComment) return

    try {
      await createComment(newComment)
      setNewComment("")
    } catch (err) {
      console.error('Failed to create comment:', err)
    }
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
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="recent">Recent Questions</TabsTrigger>
              <TabsTrigger value="answered">Answered Questions</TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="space-y-4 mt-4">
              {loading ? (
                <div className="text-center py-4">
                  <p className="text-slate-600 dark:text-slate-400">Loading posts...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-slate-600 dark:text-slate-400">No posts found</p>
                </div>
              ) : (
                posts
                  .filter(post => 
                    searchQuery ? 
                      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.content.toLowerCase().includes(searchQuery.toLowerCase())
                    : true
                  )
                  .map(post => (
                    <div key={post.id} className="space-y-4">
                      <CommunityQuestion
                        key={post.id}
                        avatar={post.author.profilePicture || "/placeholder.svg?height=40&width=40"}
                        name={post.author.name}
                        role="Community Member"
                        time={new Date(post.createdAt).toLocaleString()}
                        question={post.content}
                        replies={post.comments?.length || 0}
                        likes={post.likes || 0}
                        isAnswered={post.isAnswered}
                        onDelete={() => deletePost(post.id)}
                        onClick={() => setSelectedPost(post.id === selectedPost ? null : post.id)}
                      />
                      
                      {selectedPost === post.id && (
                        <Card className="ml-12 border-l-4 border-blue-500">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              {commentsLoading ? (
                                <div className="text-center py-4">
                                  <p className="text-slate-600 dark:text-slate-400">Loading comments...</p>
                                </div>
                              ) : comments.length === 0 ? (
                                <div className="text-center py-4">
                                  <p className="text-slate-600 dark:text-slate-400">No comments yet</p>
                                </div>
                              ) : (
                                comments.map(comment => (
                                  <div key={comment.id} className="flex gap-4">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={comment.author.profilePicture || "/placeholder.svg?height=32&width=32"} alt={comment.author.name} />
                                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-sm text-slate-900 dark:text-white">{comment.author.name}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(comment.createdAt).toLocaleString()}</span>
                                      </div>
                                      <p className="text-sm text-slate-700 dark:text-slate-300">{comment.content}</p>
                                    </div>
                                  </div>
                                ))
                              )}

                              <form onSubmit={handleSubmitComment} className="mt-4">
                                <div className="flex gap-4">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                                    <AvatarFallback>Y</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <Textarea
                                      placeholder="Write a comment..."
                                      value={newComment}
                                      onChange={e => setNewComment(e.target.value)}
                                      className="min-h-[80px]"
                                    />
                                    <div className="mt-2 flex justify-end">
                                      <Button type="submit" disabled={!newComment.trim()}>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ))
                )}
              </TabsContent>

            <TabsContent value="answered" className="space-y-4 mt-4">
              {loading ? (
                <div className="text-center py-4">
                  <p className="text-slate-600 dark:text-slate-400">Loading posts...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-red-500">{error}</p>
                </div>
              ) : posts.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-slate-600 dark:text-slate-400">No posts found</p>
                </div>
              ) : (
                posts
                  .filter(post => post.isAnswered)
                  .filter(post => 
                    searchQuery ? 
                      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      post.content.toLowerCase().includes(searchQuery.toLowerCase())
                    : true
                  )
                  .map(post => (
                    <div key={post.id} className="space-y-4">
                      <CommunityQuestion
                        key={post.id}
                        avatar={post.author.profilePicture || "/placeholder.svg?height=40&width=40"}
                        name={post.author.name}
                        role="Community Member"
                        time={new Date(post.createdAt).toLocaleString()}
                        question={post.content}
                        replies={post.comments?.length || 0}
                        likes={post.likes || 0}
                        isAnswered={post.isAnswered}
                        onDelete={() => deletePost(post.id)}
                        onClick={() => setSelectedPost(post.id === selectedPost ? null : post.id)}
                      />
                      
                      {selectedPost === post.id && (
                        <Card className="ml-12 border-l-4 border-blue-500">
                          <CardContent className="p-6">
                            <div className="space-y-4">
                              {commentsLoading ? (
                                <div className="text-center py-4">
                                  <p className="text-slate-600 dark:text-slate-400">Loading comments...</p>
                                </div>
                              ) : comments.length === 0 ? (
                                <div className="text-center py-4">
                                  <p className="text-slate-600 dark:text-slate-400">No comments yet</p>
                                </div>
                              ) : (
                                comments.map(comment => (
                                  <div key={comment.id} className="flex gap-4">
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage src={comment.author.profilePicture || "/placeholder.svg?height=32&width=32"} alt={comment.author.name} />
                                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-sm text-slate-900 dark:text-white">{comment.author.name}</span>
                                        <span className="text-xs text-slate-500 dark:text-slate-400">{new Date(comment.createdAt).toLocaleString()}</span>
                                      </div>
                                      <p className="text-sm text-slate-700 dark:text-slate-300">{comment.content}</p>
                                    </div>
                                  </div>
                                ))
                              )}

                              <form onSubmit={handleSubmitComment} className="mt-4">
                                <div className="flex gap-4">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                                    <AvatarFallback>Y</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <Textarea
                                      placeholder="Write a comment..."
                                      value={newComment}
                                      onChange={e => setNewComment(e.target.value)}
                                      className="min-h-[80px]"
                                    />
                                    <div className="mt-2 flex justify-end">
                                      <Button type="submit" disabled={!newComment.trim()}>
                                        <Send className="w-4 h-4 mr-2" />
                                        Send
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  ))
              )}
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

function CommunityQuestion({
  avatar,
  name,
  role,
  time,
  question,
  replies,
  likes,
  isAnswered,
  onDelete,
  onClick
}: CommunityQuestionProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src={avatar} alt={name} />
              <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-slate-900 dark:text-white">{name}</h3>
                <Badge variant="outline">{role}</Badge>
                {isAnswered && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Answered
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {time}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <span className="sr-only">Delete question</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </Button>
        </div>
        <p className="mt-4 text-slate-900 dark:text-white">{question}</p>
        <div className="flex items-center gap-4 mt-4">
          <Button variant="ghost" size="sm" className="flex items-center gap-1" onClick={onClick}>
            <MessageSquare className="w-4 h-4" />
            {replies} Replies
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            {likes} Likes
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
