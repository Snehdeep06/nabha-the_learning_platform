"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { BookOpen, ArrowLeft, ArrowRight, User, GraduationCap } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"

type UserRole = "student" | "teacher" | null
type SignupStep = "contact" | "role" | "details" | "complete"

export default function SignupPage() {
  const router = useRouter()
  const { login } = useAuth() // Added auth context
  const [currentStep, setCurrentStep] = useState<SignupStep>("contact")
  const [userRole, setUserRole] = useState<UserRole>(null)
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    name: "",
    age: "",
    gender: "",
    schoolName: "",
    location: "",
    board: "",
    class: "",
    subjects: "",
    experience: "",
  })

  const handleNext = () => {
    if (currentStep === "contact") setCurrentStep("role")
    else if (currentStep === "role") setCurrentStep("details")
    else if (currentStep === "details") setCurrentStep("complete")
  }

  const handleBack = () => {
    if (currentStep === "role") setCurrentStep("contact")
    else if (currentStep === "details") setCurrentStep("role")
    else if (currentStep === "complete") setCurrentStep("details")
  }

  const handleComplete = () => {
    const userData = {
      id: Date.now().toString(), // Simple ID generation
      name: formData.name,
      email: formData.email || formData.phone,
      role: userRole!,
      class: userRole === "student" ? `${formData.class}th Grade` : undefined,
      board: userRole === "student" ? (formData.board === "punjab" ? "Punjab Board" : "CBSE") : undefined,
      isFirstLogin: true, // Mark as first login for zero progress
    }

    login(userData)

    if (userRole === "student") {
      router.push("/dashboard/student")
    } else {
      router.push("/dashboard/teacher")
    }
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)]">Join Nabha Education</h1>
          </div>
          <div className="flex justify-center space-x-2">
            {["contact", "role", "details", "complete"].map((step, index) => (
              <div
                key={step}
                className={`h-2 w-8 rounded-full ${
                  ["contact", "role", "details", "complete"].indexOf(currentStep) >= index ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-playfair)]">
              {currentStep === "contact" && "Contact Information"}
              {currentStep === "role" && "Select Your Role"}
              {currentStep === "details" && "Additional Details"}
              {currentStep === "complete" && "Welcome!"}
            </CardTitle>
            <CardDescription>
              {currentStep === "contact" && "Enter your email or phone number to get started"}
              {currentStep === "role" && "Are you a student or teacher?"}
              {currentStep === "details" && "Tell us more about yourself"}
              {currentStep === "complete" && "Your account has been created successfully"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Step 1: Contact Information */}
            {currentStep === "contact" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                  />
                </div>
                <div className="text-center text-muted-foreground">or</div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Step 2: Role Selection */}
            {currentStep === "role" && (
              <RadioGroup value={userRole || ""} onValueChange={(value) => setUserRole(value as UserRole)}>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <User className="h-6 w-6 text-primary" />
                    <div>
                      <div className="font-medium">Student</div>
                      <div className="text-sm text-muted-foreground">Access lessons, quizzes, and track progress</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher" className="flex items-center space-x-3 cursor-pointer flex-1">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    <div>
                      <div className="font-medium">Teacher</div>
                      <div className="text-sm text-muted-foreground">
                        Manage students, assign work, track performance
                      </div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            )}

            {/* Step 3: Role-specific Details */}
            {currentStep === "details" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="school">School Name</Label>
                  <Input
                    id="school"
                    placeholder="Enter your school name"
                    value={formData.schoolName}
                    onChange={(e) => updateFormData("schoolName", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, District"
                    value={formData.location}
                    onChange={(e) => updateFormData("location", e.target.value)}
                  />
                </div>

                {userRole === "student" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          placeholder="Age"
                          value={formData.age}
                          onChange={(e) => updateFormData("age", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={formData.gender} onValueChange={(value) => updateFormData("gender", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="board">School Board</Label>
                      <Select value={formData.board} onValueChange={(value) => updateFormData("board", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select board" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="punjab">Punjab Board</SelectItem>
                          <SelectItem value="cbse">CBSE</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="class">Class</Label>
                      <Select value={formData.class} onValueChange={(value) => updateFormData("class", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem key={i + 1} value={`${i + 1}`}>
                              Class {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}

                {userRole === "teacher" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="subjects">Subjects Taught</Label>
                      <Input
                        id="subjects"
                        placeholder="e.g., Mathematics, Science, English"
                        value={formData.subjects}
                        onChange={(e) => updateFormData("subjects", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience">Teaching Experience (Years)</Label>
                      <Select
                        value={formData.experience}
                        onValueChange={(value) => updateFormData("experience", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-1">0-1 years</SelectItem>
                          <SelectItem value="2-5">2-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="11-15">11-15 years</SelectItem>
                          <SelectItem value="15+">15+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Step 4: Complete */}
            {currentStep === "complete" && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Account Created Successfully!</h3>
                  <p className="text-muted-foreground">
                    Welcome to Nabha Education Platform. Your personalized dashboard is ready.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              {currentStep !== "contact" && currentStep !== "complete" && (
                <Button variant="outline" onClick={handleBack}>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}

              {currentStep === "contact" && (
                <Button onClick={handleNext} disabled={!formData.email && !formData.phone} className="ml-auto">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}

              {currentStep === "role" && (
                <Button onClick={handleNext} disabled={!userRole} className="ml-auto">
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}

              {currentStep === "details" && (
                <Button onClick={handleNext} disabled={!formData.name || !formData.schoolName} className="ml-auto">
                  Complete
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}

              {currentStep === "complete" && (
                <Button onClick={handleComplete} className="w-full">
                  Go to Dashboard
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
