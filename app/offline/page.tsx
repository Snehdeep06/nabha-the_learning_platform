"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useOffline } from "@/lib/hooks/use-offline"
import {
  BookOpen,
  Download,
  Trash2,
  RefreshCw,
  HardDrive,
  Wifi,
  WifiOff,
  CheckCircle,
  AlertCircle,
  Play,
} from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  const {
    isOnline,
    isSyncing,
    storageInfo,
    offlineLessons,
    downloadLesson,
    deleteOfflineLesson,
    cleanupStorage,
    triggerSync,
    refreshStorageInfo,
    refreshOfflineLessons,
  } = useOffline()

  const [downloadingLessons, setDownloadingLessons] = useState<Set<number>>(new Set())

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleDownloadLesson = async (lessonId: number) => {
    setDownloadingLessons((prev) => new Set(prev).add(lessonId))
    try {
      await downloadLesson(lessonId)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setDownloadingLessons((prev) => {
        const newSet = new Set(prev)
        newSet.delete(lessonId)
        return newSet
      })
    }
  }

  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await deleteOfflineLesson(lessonId)
    } catch (error) {
      console.error("Delete failed:", error)
    }
  }

  const handleCleanup = async () => {
    try {
      await cleanupStorage()
    } catch (error) {
      console.error("Cleanup failed:", error)
    }
  }

  const handleSync = async () => {
    try {
      await triggerSync()
    } catch (error) {
      console.error("Sync failed:", error)
    }
  }

  const storageUsagePercent = storageInfo.available > 0 ? (storageInfo.used / storageInfo.available) * 100 : 0

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard/student" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold font-[family-name:var(--font-playfair)]">Offline Content</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {isOnline ? (
                  <Wifi className="h-5 w-5 text-accent" />
                ) : (
                  <WifiOff className="h-5 w-5 text-muted-foreground" />
                )}
                <span className="text-sm text-muted-foreground">{isOnline ? "Online" : "Offline Mode"}</span>
              </div>
              {isSyncing && (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Syncing...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Storage Overview */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6 font-[family-name:var(--font-playfair)]">
            Offline Content Management
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                <HardDrive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatBytes(storageInfo.used)}</div>
                <div className="mt-2">
                  <Progress value={storageUsagePercent} />
                  <p className="text-xs text-muted-foreground mt-1">{formatBytes(storageInfo.available)} available</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Downloaded Lessons</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{storageInfo.lessons}</div>
                <p className="text-xs text-muted-foreground">lessons available offline</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sync Status</CardTitle>
                {isOnline ? (
                  <CheckCircle className="h-4 w-4 text-green-600" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-600" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{isOnline ? "Connected" : "Offline"}</div>
                <p className="text-xs text-muted-foreground">{isSyncing ? "Syncing data..." : "Ready"}</p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button onClick={handleSync} disabled={!isOnline || isSyncing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
              Sync Now
            </Button>
            <Button variant="outline" onClick={handleCleanup}>
              <Trash2 className="h-4 w-4 mr-2" />
              Cleanup Old Content
            </Button>
            <Button variant="outline" onClick={refreshStorageInfo}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Info
            </Button>
          </div>
        </div>

        {/* Offline Lessons */}
        <Card>
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-playfair)]">Downloaded Lessons</CardTitle>
            <CardDescription>Lessons available for offline learning</CardDescription>
          </CardHeader>
          <CardContent>
            {offlineLessons.length === 0 ? (
              <div className="text-center py-8">
                <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No offline content</h3>
                <p className="text-muted-foreground mb-4">
                  Download lessons to access them without an internet connection
                </p>
                <Link href="/lessons">
                  <Button>Browse Lessons</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {offlineLessons.map((lesson) => (
                  <Card key={lesson.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg font-[family-name:var(--font-playfair)]">
                            {lesson.title}
                          </CardTitle>
                          <CardDescription>{lesson.subject}</CardDescription>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Offline
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-sm text-muted-foreground">
                        Downloaded: {new Date(lesson.downloadedAt).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Last accessed: {new Date(lesson.lastAccessed).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/lessons/${lesson.id}`} className="flex-1">
                          <Button className="w-full" size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Study
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteLesson(lesson.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Available for Download */}
        {isOnline && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-playfair)]">Available for Download</CardTitle>
              <CardDescription>Download lessons to access them offline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-muted-foreground mb-4">
                  Browse all available lessons and download them for offline access
                </p>
                <Link href="/lessons">
                  <Button>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Browse All Lessons
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
