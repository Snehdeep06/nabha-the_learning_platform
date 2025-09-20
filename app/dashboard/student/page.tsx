"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Target,
  Star,
  Play,
  Download,
  Wifi,
  WifiOff,
  Award,
  TrendingUp,
  Book,
  FileText,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export default function StudentDashboard() {
  const [isOffline, setIsOffline] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { user, updateUser } = useAuth()
  const router = useRouter()

  const [studentData, setStudentData] = useState(() => {
    if (!user) return null

    const isFirstLogin = user.isFirstLogin

    return {
      name: user.name,
      class: user.class || "10th Grade",
      board: user.board || "Punjab Board",
      totalProgress: isFirstLogin ? 0 : 68,
      weeklyGoal: 5,
      completedThisWeek: isFirstLogin ? 0 : 3,
      streak: isFirstLogin ? 0 : 7,
      badges: [
        { id: 1, name: "Math Master", icon: "🧮", earned: !isFirstLogin },
        { id: 2, name: "Science Explorer", icon: "🔬", earned: !isFirstLogin },
        { id: 3, name: "Reading Champion", icon: "📚", earned: false },
        { id: 4, name: "Week Warrior", icon: "⚡", earned: !isFirstLogin },
      ],
      subjects: [
        {
          name: "Mathematics",
          progress: isFirstLogin ? 0 : 75,
          lessons: 24,
          completed: isFirstLogin ? 0 : 18,
          nextLesson: isFirstLogin ? "Introduction to Algebra" : "Quadratic Equations",
          offline: true,
        },
        {
          name: "Science",
          progress: isFirstLogin ? 0 : 82,
          lessons: 20,
          completed: isFirstLogin ? 0 : 16,
          nextLesson: isFirstLogin ? "Basic Chemistry" : "Chemical Reactions",
          offline: true,
        },
        {
          name: "English",
          progress: isFirstLogin ? 0 : 45,
          lessons: 18,
          completed: isFirstLogin ? 0 : 8,
          nextLesson: "Grammar Basics",
          offline: false,
        },
        {
          name: "Social Studies",
          progress: isFirstLogin ? 0 : 60,
          lessons: 16,
          completed: isFirstLogin ? 0 : 10,
          nextLesson: "Indian History",
          offline: true,
        },
      ],
      recentActivities: isFirstLogin
        ? [{ type: "welcome", title: "Welcome to Nabha Education! Start your first lesson.", time: "Just now" }]
        : [
            { type: "lesson", subject: "Mathematics", title: "Linear Equations", time: "2 hours ago" },
            { type: "quiz", subject: "Science", title: "Physics Quiz", score: "8/10", time: "1 day ago" },
            { type: "badge", title: "Earned Math Master badge", time: "2 days ago" },
            { type: "lesson", subject: "English", title: "Essay Writing", time: "3 days ago" },
          ],
      upcomingAssignments: isFirstLogin
        ? []
        : [
            { subject: "Mathematics", title: "Algebra Practice", due: "Tomorrow", priority: "high" },
            { subject: "Science", title: "Lab Report", due: "In 3 days", priority: "medium" },
            { subject: "English", title: "Book Review", due: "Next week", priority: "low" },
          ],
    }
  })

  useEffect(() => {
    console.log("[v0] Dashboard mounted, user:", user)

    // Give some time for auth context to initialize
    const timer = setTimeout(() => {
      if (!user) {
        console.log("[v0] No user found, redirecting to signup")
        router.push("/signup")
      } else {
        console.log("[v0] User found, setting loading to false")
        setIsLoading(false)
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [user, router])

  useEffect(() => {
    if (user && user.isFirstLogin) {
      updateUser({ isFirstLogin: false })
    }
  }, [user, updateUser])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white mb-4">Please sign up or log in to access your dashboard.</p>
          <Button onClick={() => router.push("/signup")}>Go to Signup</Button>
        </div>
      </div>
    )
  }

  if (!studentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white">Unable to load student data.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-[family-name:var(--font-playfair)]">Nabha Education</span>
              </Link>
              <div className="hidden md:block">
                <Badge variant="secondary">
                  {studentData.class} • {studentData.board}
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isOffline ? (
                  <WifiOff className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <Wifi className="h-5 w-5 text-accent" />
                )}
                <span className="text-sm text-muted-foreground">{isOffline ? "Offline Mode" : "Online"}</span>
              </div>
              <nav className="hidden md:flex items-center space-x-4">
                <Link href="/lessons" className="text-sm hover:text-primary">
                  Lessons
                </Link>
                <Link href="/community" className="text-sm hover:text-primary">
                  Community
                </Link>
                <Link href="/offline" className="text-sm hover:text-primary">
                  Offline
                </Link>
              </nav>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <span className="hidden md:block font-medium">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-playfair)]">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-muted-foreground">
            {user.isFirstLogin
              ? "Welcome to your learning journey! Let's start with your first lesson."
              : "You're doing great! Keep up the momentum and achieve your learning goals."}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link href="/lessons">
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <BookOpen className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium">Browse Lessons</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/community">
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Users className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium">Join Community</span>
              </CardContent>
            </Card>
          </Link>
          <Link href="/offline">
            <Card className="hover:shadow-md transition-shadow cursor-pointer bg-card/80 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Download className="h-8 w-8 text-primary mb-2" />
                <span className="text-sm font-medium">Offline Content</span>
              </CardContent>
            </Card>
          </Link>
          <Card className="hover:shadow-md transition-shadow cursor-pointer bg-card/80 backdrop-blur-sm">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Award className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium">Achievements</span>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.totalProgress}%</div>
              <Progress value={studentData.totalProgress} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Goal</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {studentData.completedThisWeek}/{studentData.weeklyGoal}
              </div>
              <p className="text-xs text-muted-foreground">lessons completed</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.streak}</div>
              <p className="text-xs text-muted-foreground">days in a row</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.badges.filter((b) => b.earned).length}</div>
              <p className="text-xs text-muted-foreground">out of {studentData.badges.length}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="subjects" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
          </TabsList>

          <TabsContent value="subjects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studentData.subjects.map((subject, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-[family-name:var(--font-playfair)]">{subject.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        {subject.offline ? (
                          <Badge variant="secondary" className="text-xs">
                            <Download className="h-3 w-3 mr-1" />
                            Offline
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            <Wifi className="h-3 w-3 mr-1" />
                            Online
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription>
                      {subject.completed}/{subject.lessons} lessons completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">Next Lesson:</p>
                        <p className="text-sm text-muted-foreground">{subject.nextLesson}</p>
                      </div>
                      <Button size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        {subject.progress === 0 ? "Start" : "Continue"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)]">Upcoming Assignments</CardTitle>
                <CardDescription>
                  {studentData.upcomingAssignments.length === 0
                    ? "No assignments yet. Complete some lessons to get started!"
                    : "Stay on top of your deadlines"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {studentData.upcomingAssignments.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Start learning to unlock assignments!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {studentData.upcomingAssignments.map((assignment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{assignment.title}</p>
                            <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              assignment.priority === "high"
                                ? "destructive"
                                : assignment.priority === "medium"
                                  ? "default"
                                  : "secondary"
                            }
                          >
                            {assignment.priority}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{assignment.due}</span>
                          <Button size="sm" variant="outline">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-playfair)]">Achievement Badges</CardTitle>
                  <CardDescription>Unlock badges by completing challenges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {studentData.badges.map((badge) => (
                      <div
                        key={badge.id}
                        className={`p-4 border border-border rounded-lg text-center ${
                          badge.earned ? "bg-primary/5 border-primary/20" : "opacity-50"
                        }`}
                      >
                        <div className="text-2xl mb-2">{badge.icon}</div>
                        <p className="text-sm font-medium">{badge.name}</p>
                        {badge.earned && (
                          <Badge variant="secondary" className="mt-2 text-xs">
                            Earned
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-playfair)]">Recent Activity</CardTitle>
                  <CardDescription>Your learning journey</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentData.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.type === "lesson" && `Completed lesson: ${activity.title}`}
                            {activity.type === "quiz" && `Took quiz: ${activity.title} (${activity.score})`}
                            {activity.type === "badge" && activity.title}
                            {activity.type === "welcome" && activity.title}
                          </p>
                          {activity.subject && <p className="text-xs text-muted-foreground">{activity.subject}</p>}
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)]">Community & Mentoring</CardTitle>
                <CardDescription>Connect with peers and get help from mentors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <Users className="h-6 w-6" />
                    <span>Study Groups</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2 bg-transparent"
                  >
                    <Book className="h-6 w-6" />
                    <span>Ask Questions</span>
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Join discussions, ask questions, and learn together with your classmates and teachers. This feature
                    will be available soon!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
