// Sync manager for handling online/offline synchronization
import { offlineStorage } from "./offline-storage"

interface SyncConfig {
  apiBaseUrl: string
  retryAttempts: number
  retryDelay: number
}

class SyncManager {
  private config: SyncConfig = {
    apiBaseUrl: "/api",
    retryAttempts: 3,
    retryDelay: 1000,
  }

  private isOnline = true
  private syncInProgress = false
  private syncCallbacks: Array<(status: "syncing" | "synced" | "error") => void> = []

  constructor() {
    this.setupNetworkListeners()
    this.setupPeriodicSync()
  }

  private setupNetworkListeners(): void {
    if (typeof window !== "undefined") {
      this.isOnline = navigator.onLine

      window.addEventListener("online", () => {
        this.isOnline = true
        this.triggerSync()
      })

      window.addEventListener("offline", () => {
        this.isOnline = false
      })
    }
  }

  private setupPeriodicSync(): void {
    // Sync every 5 minutes when online
    setInterval(
      () => {
        if (this.isOnline && !this.syncInProgress) {
          this.triggerSync()
        }
      },
      5 * 60 * 1000,
    )
  }

  async triggerSync(): Promise<void> {
    if (this.syncInProgress || !this.isOnline) return

    this.syncInProgress = true
    this.notifyCallbacks("syncing")

    try {
      await this.syncPendingData()
      await this.syncUserData()
      this.notifyCallbacks("synced")
    } catch (error) {
      console.error("Sync failed:", error)
      this.notifyCallbacks("error")
    } finally {
      this.syncInProgress = false
    }
  }

  private async syncPendingData(): Promise<void> {
    const syncQueue = await offlineStorage.getSyncQueue()

    for (const item of syncQueue) {
      try {
        await this.syncItem(item)
      } catch (error) {
        console.error("Failed to sync item:", item, error)
        // Increment retry count or remove if max retries exceeded
        if (item.retries >= this.config.retryAttempts) {
          // Remove from queue after max retries
          continue
        }
      }
    }

    // Clear successfully synced items
    await offlineStorage.clearSyncQueue()
  }

  private async syncItem(item: any): Promise<void> {
    const { type, data } = item

    switch (type) {
      case "progress":
        await this.syncProgress(data)
        break
      case "user":
        await this.syncUser(data)
        break
      default:
        console.warn("Unknown sync item type:", type)
    }
  }

  private async syncProgress(progress: any): Promise<void> {
    const response = await fetch(`${this.config.apiBaseUrl}/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progress),
    })

    if (!response.ok) {
      throw new Error(`Failed to sync progress: ${response.statusText}`)
    }
  }

  private async syncUser(user: any): Promise<void> {
    const response = await fetch(`${this.config.apiBaseUrl}/users/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error(`Failed to sync user: ${response.statusText}`)
    }
  }

  private async syncUserData(): Promise<void> {
    // Fetch latest user data and lessons from server
    try {
      const response = await fetch(`${this.config.apiBaseUrl}/sync`)
      if (response.ok) {
        const data = await response.json()

        // Update local storage with server data
        if (data.lessons) {
          for (const lesson of data.lessons) {
            await offlineStorage.storeLesson(lesson)
          }
        }

        if (data.user) {
          await offlineStorage.storeUser(data.user)
        }
      }
    } catch (error) {
      console.error("Failed to fetch server data:", error)
    }
  }

  // Download lesson for offline use
  async downloadLesson(lessonId: number): Promise<void> {
    if (!this.isOnline) {
      throw new Error("Cannot download lesson while offline")
    }

    try {
      const response = await fetch(`${this.config.apiBaseUrl}/lessons/${lessonId}/download`)
      if (!response.ok) {
        throw new Error(`Failed to download lesson: ${response.statusText}`)
      }

      const lessonData = await response.json()
      await offlineStorage.storeLesson(lessonData)

      // Download associated media files
      if (lessonData.content?.video?.url) {
        await this.downloadMedia(lessonData.content.video.url, `lesson-${lessonId}-video`)
      }
    } catch (error) {
      console.error("Failed to download lesson:", error)
      throw error
    }
  }

  private async downloadMedia(url: string, filename: string): Promise<void> {
    try {
      const response = await fetch(url)
      if (!response.ok) return

      const blob = await response.blob()

      // Store in cache using Cache API
      if ("caches" in window) {
        const cache = await caches.open("nabha-education-media")
        await cache.put(url, new Response(blob))
      }
    } catch (error) {
      console.error("Failed to download media:", error)
    }
  }

  // Check if lesson is available offline
  async isLessonOffline(lessonId: number): Promise<boolean> {
    const lesson = await offlineStorage.getLesson(lessonId)
    return lesson !== null
  }

  // Get offline lessons
  async getOfflineLessons(): Promise<any[]> {
    return await offlineStorage.getOfflineLessons()
  }

  // Storage management
  async getStorageInfo(): Promise<{ used: number; available: number; lessons: number }> {
    const usage = await offlineStorage.getStorageUsage()
    const lessons = await offlineStorage.getOfflineLessons()

    return {
      used: usage.used,
      available: usage.available,
      lessons: lessons.length,
    }
  }

  async cleanupStorage(): Promise<void> {
    await offlineStorage.cleanupOldLessons()
  }

  // Callback management
  onSyncStatusChange(callback: (status: "syncing" | "synced" | "error") => void): void {
    this.syncCallbacks.push(callback)
  }

  private notifyCallbacks(status: "syncing" | "synced" | "error"): void {
    this.syncCallbacks.forEach((callback) => callback(status))
  }

  // Getters
  get online(): boolean {
    return this.isOnline
  }

  get syncing(): boolean {
    return this.syncInProgress
  }
}

export const syncManager = new SyncManager()
