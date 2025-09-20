"use client"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Wifi, Play, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
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
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20"></div>
        <div className="absolute top-10 right-10 opacity-20">
          <Image
            src="/placeholder-mmttl.png"
            alt="Students learning"
            width={400}
            height={400}
            className="rounded-full"
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Image
                src="/education-logo-with-books-and-digital-elements.jpg"
                alt="Nabha Education Logo"
                width={120}
                height={120}
                className="rounded-2xl shadow-2xl border-4 border-primary/30"
              />
              <div className="absolute -top-2 -right-2 bg-accent text-accent-foreground rounded-full p-2">
                <Star className="h-4 w-4 fill-current" />
              </div>
            </div>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-foreground mb-6 font-[family-name:var(--font-playfair)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Learn Anywhere, Anytime
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            A lightweight learning platform designed for rural students and teachers in Nabha. Works offline, supports
            local languages, and adapts to low-end devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/signup">
              <Button
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-primary/50 hover:bg-primary/10 bg-transparent"
              >
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-border">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 bg-destructive rounded-full"></div>
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <div className="w-3 h-3 bg-primary rounded-full"></div>
              </div>
              <Image
                src="/modern-educational-dashboard-interface-with-studen.jpg"
                alt="Platform Preview"
                width={600}
                height={300}
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-card/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Built for Rural Learning
            </h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Empowering education with technology designed for low-resource environments
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Image
                    src="/offline-learning-icon-with-download-symbol.jpg"
                    alt="Offline Learning"
                    width={80}
                    height={80}
                    className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-primary">Offline First</CardTitle>
                <CardDescription>
                  Download lessons, quizzes, and videos for use without internet connection
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Image
                    src="/multilingual-education-with-punjabi-hindi-english-.jpg"
                    alt="Multi-Language Support"
                    width={80}
                    height={80}
                    className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-accent">Multi-Language</CardTitle>
                <CardDescription>
                  Content available in Punjabi, Hindi, and English for better inclusivity
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Image
                    src="/gamification-badges-and-achievements-for-learning.jpg"
                    alt="Gamified Learning"
                    width={80}
                    height={80}
                    className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-secondary">
                  Gamified Learning
                </CardTitle>
                <CardDescription>
                  Earn badges, track progress, and stay motivated with interactive challenges
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Image
                    src="/teacher-dashboard-with-student-progress-analytics.jpg"
                    alt="Teacher Tools"
                    width={80}
                    height={80}
                    className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-primary">Teacher Tools</CardTitle>
                <CardDescription>
                  Comprehensive dashboards for tracking student progress and assigning work
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Image
                    src="/curriculum-books-and-educational-content-aligned-w.jpg"
                    alt="Curriculum Aligned"
                    width={80}
                    height={80}
                    className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-accent">
                  Curriculum Aligned
                </CardTitle>
                <CardDescription>Content designed for Punjab Board and CBSE curricula, grades 1-12</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group">
              <CardHeader className="text-center">
                <div className="relative mx-auto mb-4">
                  <Image
                    src="/community-discussion-and-peer-learning-network.jpg"
                    alt="Community Support"
                    width={80}
                    height={80}
                    className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="font-[family-name:var(--font-playfair)] text-secondary">
                  Community Support
                </CardTitle>
                <CardDescription>Safe discussion spaces for students and teachers to connect and learn</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold mb-4 font-[family-name:var(--font-playfair)] bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Success Stories
            </h3>
            <p className="text-muted-foreground text-lg">Real impact in rural communities</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Image
                  src="/happy-rural-student-with-books-in-punjab-village-s.jpg"
                  alt="Student Success"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-primary/30"
                />
                <CardTitle className="text-lg">Priya, Grade 8</CardTitle>
                <CardDescription>
                  "I can now study even when there's no internet. My math scores improved by 40%!"
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Image
                  src="/dedicated-rural-teacher-with-students-in-classroom.jpg"
                  alt="Teacher Success"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-accent/30"
                />
                <CardTitle className="text-lg">Rajesh Sir, Teacher</CardTitle>
                <CardDescription>
                  "The platform helps me track all my students' progress easily. Teaching has become more effective."
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border bg-card/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <Image
                  src="/proud-parent-with-child-studying-on-tablet-in-rura.jpg"
                  alt="Parent Success"
                  width={100}
                  height={100}
                  className="rounded-full mx-auto mb-4 border-4 border-secondary/30"
                />
                <CardTitle className="text-lg">Sunita, Parent</CardTitle>
                <CardDescription>
                  "My daughter can learn in Punjabi and English. The platform made education accessible for us."
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/20 to-accent/20">
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
      <footer className="border-t border-border bg-card/50 backdrop-blur-sm py-12 px-4">
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
