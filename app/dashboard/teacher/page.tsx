"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BookOpen,
  Users,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Send,
  Eye,
  Edit,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
  Wifi,
  WifiOff,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"

// Mock data for demonstration
const teacherData = {
  name: "Dr. Rajesh Kumar",
  subjects: ["Mathematics", "Physics"],
  experience: "12 years",
  totalStudents: 156,
  activeClasses: 4,
  completionRate: 78,
  students: [
    {
      id: 1,
      name: "Priya Sharma",
      class: "10th A",
      progress: 85,
      lastActive: "2 hours ago",
      status: "active",
      subjects: { Mathematics: 90, Physics: 80 },
    },
    {
      id: 2,
      name: "Arjun Singh",
      class: "10th A",
      progress: 72,
      lastActive: "1 day ago",
      status: "active",
      subjects: { Mathematics: 75, Physics: 69 },
    },
    {
      id: 3,
      name: "Meera Patel",
      class: "10th B",
      progress: 45,
      lastActive: "3 days ago",
      status: "inactive",
      subjects: { Mathematics: 50, Physics: 40 },
    },
    {
      id: 4,
      name: "Rohit Gupta",
      class: "9th A",
      progress: 92,
      lastActive: "1 hour ago",
      status: "active",
      subjects: { Mathematics: 95, Physics: 89 },
    },
    {
      id: 5,
      name: "Anita Verma",
      class: "9th A",
      progress: 67,
      lastActive: "5 hours ago",
      status: "active",
      subjects: { Mathematics: 70, Physics: 64 },
    },
  ],
  classes: [
    { name: "9th A", students: 38, avgProgress: 76, subject: "Mathematics" },
    { name: "9th B", students: 35, avgProgress: 68, subject: "Mathematics" },
    { name: "10th A", students: 42, avgProgress: 82, subject: "Physics" },
    { name: "10th B", students: 41, avgProgress: 74, subject: "Physics" },
  ],
  recentActivities: [
    { type: "assignment", title: "Created Algebra Quiz", class: "10th A", time: "2 hours ago" },
    { type: "feedback", title: "Provided feedback to Priya Sharma", time: "4 hours ago" },
    { type: "lesson", title: "Uploaded Physics Lab Video", class: "10th A", time: "1 day ago" },
    { type: "announcement", title: "Posted exam schedule", time: "2 days ago" },
  ],
  pendingTasks: [
    { task: "Grade Math Quiz - 10th A", priority: "high", due: "Today" },
    { task: "Review Lab Reports", priority: "medium", due: "Tomorrow" },
    { task: "Prepare Physics Lesson Plan", priority: "low", due: "Next week" },
  ],
}

export default function TeacherDashboard() {
  const [isOffline, setIsOffline] = useState(false)
  const [selectedClass, setSelectedClass] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false)
  const { user } = useAuth()

  const filteredStudents = teacherData.students.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesClass = selectedClass === "all" || student.class === selectedClass
    return matchesSearch && matchesClass
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-[family-name:var(--font-playfair)]">Nabha Education</span>
              </Link>
              <div className="hidden md:block">
                <Badge variant="secondary">Teacher Dashboard</Badge>
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
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {user?.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "T"}
                </div>
                <span className="hidden md:block font-medium">{user?.name || "Teacher"}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-playfair)]">
            Welcome, {user?.name ? user.name.split(" ")[0] : "Teacher"}!
          </h1>
          <p className="text-muted-foreground">
            Manage your classes, track student progress, and create engaging learning experiences.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherData.totalStudents}</div>
              <p className="text-xs text-muted-foreground">across {teacherData.activeClasses} classes</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherData.completionRate}%</div>
              <Progress value={teacherData.completionRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherData.activeClasses}</div>
              <p className="text-xs text-muted-foreground">{teacherData.subjects.join(", ")}</p>
            </CardContent>
          </Card>

          <Card className="bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Experience</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teacherData.experience}</div>
              <p className="text-xs text-muted-foreground">teaching experience</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-card/80 backdrop-blur-sm">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="assignments">Assignments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-[family-name:var(--font-playfair)]">Student Management</CardTitle>
                    <CardDescription>Monitor and support your students' learning journey</CardDescription>
                  </div>
                  <Dialog open={isAssignmentDialogOpen} onOpenChange={setIsAssignmentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        New Assignment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Create New Assignment</DialogTitle>
                        <DialogDescription>Create and assign work to your students</DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Assignment Title</Label>
                          <Input id="title" placeholder="Enter assignment title" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="physics">Physics</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="class">Class</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select class" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="9a">9th A</SelectItem>
                              <SelectItem value="9b">9th B</SelectItem>
                              <SelectItem value="10a">10th A</SelectItem>
                              <SelectItem value="10b">10th B</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Assignment instructions..." />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="due">Due Date</Label>
                          <Input id="due" type="date" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={() => setIsAssignmentDialogOpen(false)}>
                          <Send className="h-4 w-4 mr-2" />
                          Assign
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="9th A">9th A</SelectItem>
                      <SelectItem value="9th B">9th B</SelectItem>
                      <SelectItem value="10th A">10th A</SelectItem>
                      <SelectItem value="10th B">10th B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Students Table */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Active</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.class}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={student.progress} className="w-16" />
                              <span className="text-sm">{student.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={student.status === "active" ? "default" : "secondary"}>
                              {student.status === "active" ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">{student.lastActive}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Send className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teacherData.classes.map((classInfo, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-[family-name:var(--font-playfair)]">{classInfo.name}</CardTitle>
                      <Badge variant="outline">{classInfo.subject}</Badge>
                    </div>
                    <CardDescription>{classInfo.students} students enrolled</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Progress</span>
                        <span>{classInfo.avgProgress}%</span>
                      </div>
                      <Progress value={classInfo.avgProgress} />
                    </div>
                    <div className="flex justify-between">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)]">Assignment Management</CardTitle>
                <CardDescription>Create, distribute, and grade assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">No assignments created yet</p>
                  <Button onClick={() => setIsAssignmentDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Assignment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-playfair)]">Class Performance</CardTitle>
                  <CardDescription>Overview of student progress across classes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacherData.classes.map((classInfo, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{classInfo.name}</p>
                          <p className="text-sm text-muted-foreground">{classInfo.students} students</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={classInfo.avgProgress} className="w-20" />
                          <span className="text-sm font-medium">{classInfo.avgProgress}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-playfair)]">Recent Activity</CardTitle>
                  <CardDescription>Your recent teaching activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {teacherData.recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          {activity.class && <p className="text-xs text-muted-foreground">{activity.class}</p>}
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <Card className="bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="font-[family-name:var(--font-playfair)]">Pending Tasks</CardTitle>
                <CardDescription>Keep track of your teaching responsibilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherData.pendingTasks.map((task, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{task.task}</p>
                          <p className="text-sm text-muted-foreground">Due: {task.due}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge
                          variant={
                            task.priority === "high"
                              ? "destructive"
                              : task.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {task.priority}
                        </Badge>
                        <Button size="sm" variant="outline">
                          Complete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
