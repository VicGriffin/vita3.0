import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Shield, Heart, MapPin, MessageSquare, Bell, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-slate-900">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Heart className="h-8 w-8 text-red-500" />
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">VITA</h1>
        </div>
        <div className="flex gap-4">
          <Link href="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign up</Button>
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            AI-Powered First Aid Assistant
          </h1>
          <p className="text-xl text-slate-700 dark:text-slate-300 mb-8">
            Instant, accurate, and interactive medical guidance for emergencies and health concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
            </Link>
            <Link href="/emergency">
              <Button size="lg" variant="destructive" className="w-full sm:w-auto">
                Emergency Help
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon={<Shield className="h-10 w-10 text-blue-500" />}
            title="AI-Powered Guidance"
            description="Get step-by-step first aid instructions tailored to your situation through text, voice, or images."
          />
          <FeatureCard
            icon={<Heart className="h-10 w-10 text-red-500" />}
            title="Voice-Guided Assistance"
            description="Receive real-time voice guidance for hands-free first aid in critical situations."
          />
          <FeatureCard
            icon={<MapPin className="h-10 w-10 text-green-500" />}
            title="Emergency Services"
            description="Find nearby hospitals and emergency rooms with real-time location tracking."
          />
          <FeatureCard
            icon={<MessageSquare className="h-10 w-10 text-purple-500" />}
            title="Community Support"
            description="Ask health-related questions in a peer-to-peer forum with medical professionals."
          />
          <FeatureCard
            icon={<Bell className="h-10 w-10 text-amber-500" />}
            title="Wellness Reminders"
            description="Receive daily health tips and reminders for vaccinations, checkups, and medications."
          />
          <FeatureCard
            icon={<Globe className="h-10 w-10 text-indigo-500" />}
            title="Multi-Language Support"
            description="Access VITA in multiple languages with accessibility features for all users."
          />
        </section>

        <section className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">How VITA Works</h2>
              <ol className="space-y-4">
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 font-bold">
                    1
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Create an account</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Secure login to access all features and personalized recommendations.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 font-bold">
                    2
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Describe your situation</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Input symptoms via text, voice commands, or uploaded images.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 font-bold">
                    3
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Get instant guidance</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Receive step-by-step first aid instructions tailored to your situation.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 font-bold">
                    4
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">Access emergency services</h3>
                    <p className="text-slate-700 dark:text-slate-300">
                      Find nearby medical facilities or request emergency assistance if needed.
                    </p>
                  </div>
                </li>
              </ol>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="VITA app demonstration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Ready to have a personal first aid assistant?
          </h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 mb-8">
            Join thousands of users who trust VITA for emergency guidance and health support.
          </p>
          <Link href="/signup">
            <Button size="lg">Create Your Account</Button>
          </Link>
        </section>
      </main>

      <footer className="bg-slate-100 dark:bg-slate-800 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">VITA</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            AI-Powered First Aid Assistant © {new Date().getFullYear()}
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="/terms"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400">{description}</p>
      </CardContent>
    </Card>
  )
}

