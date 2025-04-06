"use client"

import { SignIn } from "@clerk/nextjs"
import Link from "next/link"
import { Heart, ArrowLeft } from "lucide-react"

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900 p-4">
      <Link
        href="/"
        className="absolute top-4 left-4 flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="flex items-center gap-2 mb-8">
        <Heart className="h-8 w-8 text-red-500" />
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">VITA</h1>
      </div>

      <SignIn 
        appearance={{
          elements: {
            rootBox: "w-full max-w-md",
            card: "bg-white dark:bg-slate-800 shadow-lg",
          }
        }}
        redirectUrl="/dashboard"
        signUpUrl="/signup"
      />
    </div>
  )
}

