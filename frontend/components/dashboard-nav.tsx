"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Heart, Home, MapPin, MessageSquare, Bell, Settings, User, LogOut } from "lucide-react"

export function DashboardNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/emergency",
      icon: Heart,
      label: "First Aid",
    },
    {
      href: "/locations",
      icon: MapPin,
      label: "Emergency Services",
    },
    {
      href: "/community",
      icon: MessageSquare,
      label: "Community",
    },
    {
      href: "/reminders",
      icon: Bell,
      label: "Reminders",
    },
    {
      href: "/profile",
      icon: User,
      label: "Profile",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ]

  return (
    <aside className="w-full md:w-[240px] h-fit md:h-[calc(100vh-73px)] bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
      <nav className="space-y-2">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === route.href
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}

        <Link
          href="/logout"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors mt-6"
        >
          <LogOut className="h-5 w-5" />
          Log Out
        </Link>
      </nav>
    </aside>
  )
}

