"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { eraseCookie } from "@/lib/cookies"

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    // Remove the auth token
    eraseCookie("auth-token")

    // Redirect to home page
    router.push("/")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Logging out...</h1>
        <p className="text-slate-600 dark:text-slate-400">You are being redirected to the home page.</p>
      </div>
    </div>
  )
}

