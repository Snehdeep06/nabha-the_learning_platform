"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  Subtitles,
  ArrowLeft,
  CheckCircle,
  Clock,
  Star,
  Globe,
  Download,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"

// Mock lesson content data
const lessonContent = {
  1: {
    id: 1,
    title: "Linear Equations",
    subject: "Mathematics",
    description: "Understanding and solving linear equations with one variable",
    duration: "25 min",
    difficulty: "Medium",
    language: "English",
    type: "video",
    rating: 4.8,
    instructor: "Prof. Sharma",
    content: {
      video: {
        url: "/mathematics-lesson-video.jpg",
        duration: 1500, // 25 minutes in seconds
        subtitles: ["English", "Hindi", "Punjabi"],
      },
      transcript: `
        Welcome to our lesson on Linear Equations. In this lesson, we'll learn how to solve equations with one variable.
        
        A linear equation is an equation that makes a straight line when it is graphed. The general form is ax + b = c, where a, b, and c are constants.
        
        Let's start with a simple example: 2x + 3 = 7
        
        To solve this equation, we need to isolate x:
        1. Subtract 3 from both sides: 2x = 4
        2. Divide both sides by 2: x = 2
        
        Let's verify our answer by substituting x = 2 back into the original equation:
        2(2) + 3 = 4 + 3 = 7 ✓
      `,
      quiz: {
        questions: [
          {
            id: 1,
            question: "What is the solution to the equation 3x + 5 = 14?",
            options: ["x = 3", "x = 4", "x = 5", "x = 6"],
            correct: 0,
            explanation:
              "To solve 3x + 5 = 14, subtract 5 from both sides to get 3x = 9, then divide by 3 to get x = 3.",
          },
          {
            id: 2,
            question: "Which of the following is a linear equation?",
            options: ["x² + 2x = 5", "2x + 3 = 7", "x³ - 1 = 0", "√x = 4"],
            correct: 1,
            explanation: "A linear equation has variables raised only to the first power. 2x + 3 = 7 is linear.",
          },
          {
            id: 3,
            question: "If 4x - 6 = 10, what is the value of x?",
            options: ["x = 2", "x = 3", "x = 4", "x = 5"],
            correct: 2,
            explanation: "Add 6 to both sides: 4x = 16, then divide by 4: x = 4.",
          },
        ],
      },
    },
  },
}

export default function LessonDetailPage() {
  const params = useParams()
  const lessonId = Number.parseInt(params.id as string)
  const lesson = lessonContent[lessonId as keyof typeof lessonContent]

  const [currentTab, setCurrentTab] = useState("content")
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: number }>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedSubtitle, setSelectedSubtitle] = useState("English")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= lesson?.content.video.duration) {
            setIsPlaying(false)
            return lesson?.content.video.duration || 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, lesson?.content.video.duration])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleQuizSubmit = () => {
    setShowResults(true)
  }

  const calculateScore = () => {
    if (!lesson) return 0
    const correct = lesson.content.quiz.questions.filter((q) => quizAnswers[q.id] === q.correct).length
    return Math.round((correct / lesson.content.quiz.questions.length) * 100)
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Lesson not found</h2>
            <p className="text-muted-foreground mb-4">The requested lesson could not be found.</p>
            <Link href="/lessons">
              <Button>Back to Lessons</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/lessons" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Lessons</span>
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">{lesson.subject}</Badge>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-playfair)]">{lesson.title}</h1>
              <p className="text-muted-foreground mb-4">{lesson.description}</p>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{lesson.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{lesson.language}</span>
                </div>
                <Badge
                  className={`text-xs ${
                    lesson.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : lesson.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {lesson.difficulty}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Lesson Content</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
            <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
          </TabsList>

          {/* Video Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                {/* Video Player */}
                <div className="relative bg-black rounded-t-lg overflow-hidden">
                  <img
                    src={lesson.content.video.url || "/placeholder.svg"}
                    alt="Lesson video"
                    className="w-full h-64 md:h-96 object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="rounded-full w-16 h-16"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                    </Button>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="p-4 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(lesson.content.video.duration)}</span>
                    </div>
                    <Progress value={(currentTime / lesson.content.video.duration) * 100} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <SkipBack className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button variant="outline" size="sm">
                        <SkipForward className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Subtitles className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm">Subtitles:</span>
                    {lesson.content.video.subtitles.map((lang) => (
                      <Button
                        key={lang}
                        variant={selectedSubtitle === lang ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedSubtitle(lang)}
                      >
                        {lang}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transcript Tab */}
          <TabsContent value="transcript" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)]">Lesson Transcript</CardTitle>
                <CardDescription>Full text content of the lesson for reference</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm leading-relaxed">{lesson.content.transcript}</pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)]">Practice Quiz</CardTitle>
                <CardDescription>Test your understanding of the lesson content</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {lesson.content.quiz.questions.map((question, index) => (
                  <div key={question.id} className="space-y-4">
                    <h3 className="font-medium">
                      {index + 1}. {question.question}
                    </h3>
                    <RadioGroup
                      value={quizAnswers[question.id]?.toString()}
                      onValueChange={(value) =>
                        setQuizAnswers((prev) => ({ ...prev, [question.id]: Number.parseInt(value) }))
                      }
                    >
                      {question.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center space-x-2">
                          <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-${optionIndex}`} />
                          <Label htmlFor={`q${question.id}-${optionIndex}`} className="flex-1">
                            {option}
                          </Label>
                          {showResults && (
                            <div className="flex items-center">
                              {optionIndex === question.correct ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : quizAnswers[question.id] === optionIndex ? (
                                <div className="h-4 w-4 rounded-full bg-red-600" />
                              ) : null}
                            </div>
                          )}
                        </div>
                      ))}
                    </RadioGroup>
                    {showResults && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">{question.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}

                {!showResults ? (
                  <Button
                    onClick={handleQuizSubmit}
                    disabled={Object.keys(quizAnswers).length !== lesson.content.quiz.questions.length}
                    className="w-full"
                  >
                    Submit Quiz
                  </Button>
                ) : (
                  <Card>
                    <CardContent className="text-center py-6">
                      <div className="text-3xl font-bold text-primary mb-2">{calculateScore()}%</div>
                      <p className="text-muted-foreground mb-4">
                        You got {lesson.content.quiz.questions.filter((q) => quizAnswers[q.id] === q.correct).length}{" "}
                        out of {lesson.content.quiz.questions.length} questions correct!
                      </p>
                      <div className="flex space-x-2 justify-center">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setQuizAnswers({})
                            setShowResults(false)
                          }}
                        >
                          Retake Quiz
                        </Button>
                        <Link href="/lessons">
                          <Button>Continue Learning</Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
