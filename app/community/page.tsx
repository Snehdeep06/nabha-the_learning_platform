"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  MessageCircle,
  Users,
  Plus,
  Search,
  ThumbsUp,
  MessageSquare,
  Clock,
  Star,
  Filter,
  Send,
  Pin,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"

// Mock community data
const communityData = {
  studyGroups: [
    {
      id: 1,
      name: "Mathematics Class 10",
      description: "Study group for 10th grade mathematics students",
      members: 24,
      subject: "Mathematics",
      class: "10th",
      lastActivity: "2 hours ago",
      isJoined: true,
    },
    {
      id: 2,
      name: "Science Explorers",
      description: "Discuss science concepts and experiments",
      members: 18,
      subject: "Science",
      class: "9th-10th",
      lastActivity: "5 hours ago",
      isJoined: false,
    },
    {
      id: 3,
      name: "English Literature Circle",
      description: "Share and discuss English literature and writing",
      members: 15,
      subject: "English",
      class: "All",
      lastActivity: "1 day ago",
      isJoined: true,
    },
  ],
  discussions: [
    {
      id: 1,
      title: "How to solve quadratic equations easily?",
      content: "I'm struggling with quadratic equations. Can someone explain the easiest method?",
      author: "Priya Sharma",
      authorRole: "student",
      subject: "Mathematics",
      replies: 8,
      likes: 12,
      timeAgo: "3 hours ago",
      isPinned: false,
      isSolved: false,
    },
    {
      id: 2,
      title: "Best way to memorize periodic table",
      content: "What are some effective techniques to memorize the periodic table for chemistry?",
      author: "Arjun Singh",
      authorRole: "student",
      subject: "Science",
      replies: 15,
      likes: 23,
      timeAgo: "6 hours ago",
      isPinned: true,
      isSolved: true,
    },
    {
      id: 3,
      title: "Essay writing tips for board exams",
      content: "Looking for tips to improve essay writing skills for upcoming board examinations.",
      author: "Dr. Rajesh Kumar",
      authorRole: "teacher",
      subject: "English",
      replies: 6,
      likes: 18,
      timeAgo: "1 day ago",
      isPinned: false,
      isSolved: false,
    },
  ],
  mentors: [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      subject: "Mathematics & Physics",
      experience: "12 years",
      rating: 4.9,
      students: 156,
      availability: "Available",
      bio: "Experienced teacher specializing in making complex concepts simple and engaging.",
    },
    {
      id: 2,
      name: "Prof. Sunita Patel",
      subject: "Science & Chemistry",
      experience: "8 years",
      rating: 4.8,
      students: 98,
      availability: "Busy",
      bio: "Passionate about hands-on learning and practical applications of science.",
    },
    {
      id: 3,
      name: "Ms. Kavita Sharma",
      subject: "English & Literature",
      experience: "6 years",
      rating: 4.7,
      students: 72,
      availability: "Available",
      bio: "Helping students develop strong communication and writing skills.",
    },
  ],
}

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState("discussions")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("all")
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false)
  const [isJoinGroupDialogOpen, setIsJoinGroupDialogOpen] = useState(false)

  const filteredDiscussions = communityData.discussions.filter((discussion) => {
    const matchesSearch =
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || discussion.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  const filteredGroups = communityData.studyGroups.filter((group) => {
    const matchesSearch =
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSubject = selectedSubject === "all" || group.subject === selectedSubject
    return matchesSearch && matchesSubject
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/student" className="flex items-center space-x-2">
                <Users className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-[family-name:var(--font-playfair)]">Community</span>
              </Link>
            </div>
            <Dialog open={isNewPostDialogOpen} onOpenChange={setIsNewPostDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Discussion</DialogTitle>
                  <DialogDescription>Start a new discussion or ask a question</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input id="title" placeholder="What's your question or topic?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="science">Science</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="general">General</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="content" className="text-sm font-medium">
                      Description
                    </label>
                    <Textarea id="content" placeholder="Describe your question or topic in detail..." rows={4} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={() => setIsNewPostDialogOpen(false)}>
                    <Send className="h-4 w-4 mr-2" />
                    Post Discussion
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 font-[family-name:var(--font-playfair)]">Learning Community</h1>
          <p className="text-muted-foreground">
            Connect with peers, ask questions, and learn together in a safe and supportive environment.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search discussions, groups, or mentors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="discussions">Discussions</TabsTrigger>
            <TabsTrigger value="groups">Study Groups</TabsTrigger>
            <TabsTrigger value="mentors">Mentors</TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {discussion.isPinned && <Pin className="h-4 w-4 text-primary" />}
                          {discussion.isSolved && <CheckCircle className="h-4 w-4 text-green-600" />}
                          <Badge variant="outline">{discussion.subject}</Badge>
                          <Badge variant={discussion.authorRole === "teacher" ? "default" : "secondary"}>
                            {discussion.authorRole}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg font-[family-name:var(--font-playfair)]">
                          {discussion.title}
                        </CardTitle>
                        <CardDescription className="mt-2">{discussion.content}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {discussion.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{discussion.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{discussion.timeAgo}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.replies}</span>
                        </div>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredDiscussions.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No discussions found</h3>
                  <p className="text-muted-foreground mb-4">
                    Be the first to start a discussion or try adjusting your search
                  </p>
                  <Button onClick={() => setIsNewPostDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Start Discussion
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Study Groups Tab */}
          <TabsContent value="groups" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-[family-name:var(--font-playfair)]">{group.name}</CardTitle>
                        <CardDescription className="mt-2">{group.description}</CardDescription>
                      </div>
                      <Badge variant="outline">{group.subject}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{group.members} members</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{group.lastActivity}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{group.class}</Badge>
                      <Button size="sm" variant={group.isJoined ? "outline" : "default"}>
                        {group.isJoined ? "Joined" : "Join Group"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredGroups.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No study groups found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or create a new study group</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Study Group
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Mentors Tab */}
          <TabsContent value="mentors" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityData.mentors.map((mentor) => (
                <Card key={mentor.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="font-[family-name:var(--font-playfair)]">{mentor.name}</CardTitle>
                        <CardDescription>{mentor.subject}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{mentor.bio}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Experience:</span>
                        <p className="text-muted-foreground">{mentor.experience}</p>
                      </div>
                      <div>
                        <span className="font-medium">Students:</span>
                        <p className="text-muted-foreground">{mentor.students}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{mentor.rating}</span>
                      </div>
                      <Badge variant={mentor.availability === "Available" ? "default" : "secondary"}>
                        {mentor.availability}
                      </Badge>
                    </div>
                    <Button className="w-full" disabled={mentor.availability !== "Available"}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {mentor.availability === "Available" ? "Ask Question" : "Currently Busy"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
