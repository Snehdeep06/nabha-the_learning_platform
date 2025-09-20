"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, Globe, Wifi, Award, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-playfair)]">
                Nabha Education
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Wifi className="h-5 w-5 text-accent" />
              <span className="text-sm text-muted-foreground">Offline Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)]">
            Learn Anywhere, Anytime
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A lightweight learning platform designed for rural students and teachers in Nabha. Works offline, supports
            local languages, and adapts to low-end devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-transparent">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-playfair)]">
            Built for Rural Learning
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <Wifi className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-[family-name:var(--font-playfair)]">Offline First</CardTitle>
                <CardDescription>
                  Download lessons, quizzes, and videos for use without internet connection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-[family-name:var(--font-playfair)]">Multi-Language</CardTitle>
                <CardDescription>
                  Content available in Punjabi, Hindi, and English for better inclusivity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Award className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-[family-name:var(--font-playfair)]">Gamified Learning</CardTitle>
                <CardDescription>
                  Earn badges, track progress, and stay motivated with interactive challenges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-[family-name:var(--font-playfair)]">Teacher Tools</CardTitle>
                <CardDescription>
                  Comprehensive dashboards for tracking student progress and assigning work
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-[family-name:var(--font-playfair)]">Curriculum Aligned</CardTitle>
                <CardDescription>Content designed for Punjab Board and CBSE curricula, grades 1-12</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-[family-name:var(--font-playfair)]">Community Support</CardTitle>
                <CardDescription>Safe discussion spaces for students and teachers to connect and learn</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
            Ready to Transform Learning?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and teachers already using our platform to enhance education in rural areas.
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-3">
              Start Learning Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Nabha Education Platform</span>
          </div>
          <p className="text-muted-foreground">Empowering rural education through technology</p>
        </div>
      </footer>
    </div>
  )
}
