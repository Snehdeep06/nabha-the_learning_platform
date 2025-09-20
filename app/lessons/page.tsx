"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BookOpen,
  Play,
  Download,
  Search,
  Clock,
  Star,
  CheckCircle,
  Globe,
  FileText,
  Video,
  Wifi,
  WifiOff,
} from "lucide-react"
import Link from "next/link"

// Mock lesson data
const lessonsData = {
  subjects: [
    {
      name: "Mathematics",
      icon: "🧮",
      totalLessons: 24,
      completedLessons: 18,
      progress: 75,
      lessons: [
        {
          id: 1,
          title: "Linear Equations",
          description: "Understanding and solving linear equations with one variable",
          duration: "25 min",
          difficulty: "Medium",
          language: "English",
          type: "video",
          completed: true,
          offline: true,
          rating: 4.8,
        },
        {
          id: 2,
          title: "Quadratic Equations",
          description: "Introduction to quadratic equations and their solutions",
          duration: "30 min",
          difficulty: "Hard",
          language: "Punjabi",
          type: "interactive",
          completed: false,
          offline: true,
          rating: 4.9,
        },
        {
          id: 3,
          title: "Geometry Basics",
          description: "Fundamental concepts of geometry and shapes",
          duration: "20 min",
          difficulty: "Easy",
          language: "Hindi",
          type: "text",
          completed: true,
          offline: false,
          rating: 4.6,
        },
      ],
    },
    {
      name: "Science",
      icon: "🔬",
      totalLessons: 20,
      completedLessons: 16,
      progress: 80,
      lessons: [
        {
          id: 4,
          title: "Chemical Reactions",
          description: "Types of chemical reactions and their properties",
          duration: "35 min",
          difficulty: "Medium",
          language: "English",
          type: "video",
          completed: false,
          offline: true,
          rating: 4.7,
        },
        {
          id: 5,
          title: "Physics Laws",
          description: "Newton's laws of motion explained with examples",
          duration: "28 min",
          difficulty: "Hard",
          language: "Punjabi",
          type: "interactive",
          completed: true,
          offline: true,
          rating: 4.9,
        },
      ],
    },
    {
      name: "English",
      icon: "📚",
      totalLessons: 18,
      completedLessons: 8,
      progress: 44,
      lessons: [
        {
          id: 6,
          title: "Grammar Basics",
          description: "Essential grammar rules and sentence structure",
          duration: "22 min",
          difficulty: "Easy",
          language: "English",
          type: "text",
          completed: false,
          offline: false,
          rating: 4.5,
        },
        {
          id: 7,
          title: "Essay Writing",
          description: "How to write effective essays and compositions",
          duration: "40 min",
          difficulty: "Medium",
          language: "Hindi",
          type: "interactive",
          completed: true,
          offline: true,
          rating: 4.8,
        },
      ],
    },
  ],
}

export default function LessonsPage() {
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isOffline, setIsOffline] = useState(false)

  // Filter lessons based on selected criteria
  const filteredLessons = lessonsData.subjects.flatMap((subject) =>
    subject.lessons
      .filter((lesson) => {
        const matchesSubject = selectedSubject === "all" || subject.name === selectedSubject
        const matchesLanguage = selectedLanguage === "all" || lesson.language === selectedLanguage
        const matchesDifficulty = selectedDifficulty === "all" || lesson.difficulty === selectedDifficulty
        const matchesSearch =
          lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
        return matchesSubject && matchesLanguage && matchesDifficulty && matchesSearch
      })
      .map((lesson) => ({ ...lesson, subject: subject.name, subjectIcon: subject.icon })),
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />
      case "interactive":
        return <Play className="h-4 w-4" />
      case "text":
        return <FileText className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800"
      case "Medium":
        return "bg-yellow-100 text-yellow-800"
      case "Hard":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/student" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-[family-name:var(--font-playfair)]">Lessons</span>
              </Link>
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
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Subject Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 font-[family-name:var(--font-playfair)]">Learning Content</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lessonsData.subjects.map((subject, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <CardTitle className="font-[family-name:var(--font-playfair)]">{subject.name}</CardTitle>
                      <CardDescription>
                        {subject.completedLessons}/{subject.totalLessons} lessons completed
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <Progress value={subject.progress} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-playfair)]">Find Lessons</CardTitle>
            <CardDescription>Filter and search through available content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search lessons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Punjabi">Punjabi</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <Card key={lesson.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{lesson.subjectIcon}</span>
                    <Badge variant="outline" className="text-xs">
                      {lesson.subject}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {lesson.completed && <CheckCircle className="h-4 w-4 text-green-600" />}
                    {lesson.offline ? (
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
                <CardTitle className="text-lg font-[family-name:var(--font-playfair)]">{lesson.title}</CardTitle>
                <CardDescription className="line-clamp-2">{lesson.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{lesson.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getTypeIcon(lesson.type)}
                      <span className="capitalize">{lesson.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span>{lesson.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={`text-xs ${getDifficultyColor(lesson.difficulty)}`}>{lesson.difficulty}</Badge>
                    <div className="flex items-center space-x-1">
                      <Globe className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{lesson.language}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Link href={`/lessons/${lesson.id}`} className="flex-1">
                    <Button className="w-full" variant={lesson.completed ? "outline" : "default"}>
                      <Play className="h-4 w-4 mr-2" />
                      {lesson.completed ? "Review" : "Start"}
                    </Button>
                  </Link>
                  {!lesson.offline && (
                    <Button variant="outline" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLessons.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No lessons found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
