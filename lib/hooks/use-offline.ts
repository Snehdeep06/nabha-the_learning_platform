"use client"

// React hook for offline functionality
import { useState, useEffect } from "react"
import { syncManager } from "../sync-manager"
import { offlineStorage } from "../offline-storage"

interface OfflineState {
  isOnline: boolean
  isSyncing: boolean
  storageInfo: {
    used: number
    available: number
    lessons: number
  }
  offlineLessons: any[]
}

export function useOffline() {
  const [state, setState] = useState<OfflineState>({
    isOnline: true,
    isSyncing: false,
    storageInfo: { used: 0, available: 0, lessons: 0 },
    offlineLessons: [],
  })

  useEffect(() => {
    // Initialize state
    setState((prev) => ({
      ...prev,
      isOnline: syncManager.online,
      isSyncing: syncManager.syncing,
    }))

    // Load storage info
    loadStorageInfo()
    loadOfflineLessons()

    // Set up sync status listener
    const handleSyncStatus = (status: "syncing" | "synced" | "error") => {
      setState((prev) => ({
        ...prev,
        isSyncing: status === "syncing",
      }))

      if (status === "synced") {
        loadStorageInfo()
        loadOfflineLessons()
      }
    }

    syncManager.onSyncStatusChange(handleSyncStatus)

    // Set up network listeners
    const handleOnline = () => setState((prev) => ({ ...prev, isOnline: true }))
    const handleOffline = () => setState((prev) => ({ ...prev, isOnline: false }))

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const loadStorageInfo = async () => {
    try {
      const info = await syncManager.getStorageInfo()
      setState((prev) => ({ ...prev, storageInfo: info }))
    } catch (error) {
      console.error("Failed to load storage info:", error)
    }
  }

  const loadOfflineLessons = async () => {
    try {
      const lessons = await syncManager.getOfflineLessons()
      setState((prev) => ({ ...prev, offlineLessons: lessons }))
    } catch (error) {
      console.error("Failed to load offline lessons:", error)
    }
  }

  const downloadLesson = async (lessonId: number) => {
    try {
      await syncManager.downloadLesson(lessonId)
      await loadOfflineLessons()
      await loadStorageInfo()
    } catch (error) {
      console.error("Failed to download lesson:", error)
      throw error
    }
  }

  const deleteOfflineLesson = async (lessonId: number) => {
    try {
      await offlineStorage.deleteLesson(lessonId)
      await loadOfflineLessons()
      await loadStorageInfo()
    } catch (error) {
      console.error("Failed to delete lesson:", error)
      throw error
    }
  }

  const cleanupStorage = async () => {
    try {
      await syncManager.cleanupStorage()
      await loadOfflineLessons()
      await loadStorageInfo()
    } catch (error) {
      console.error("Failed to cleanup storage:", error)
      throw error
    }
  }

  const saveProgress = async (userId: string, lessonId: number, progress: number, completed: boolean) => {
    try {
      await offlineStorage.storeProgress({
        userId,
        lessonId,
        progress,
        completed,
        lastUpdated: Date.now(),
      })
    } catch (error) {
      console.error("Failed to save progress:", error)
      throw error
    }
  }

  const getProgress = async (userId: string, lessonId: number) => {
    try {
      return await offlineStorage.getProgress(userId, lessonId)
    } catch (error) {
      console.error("Failed to get progress:", error)
      return null
    }
  }

  const triggerSync = async () => {
    try {
      await syncManager.triggerSync()
    } catch (error) {
      console.error("Failed to trigger sync:", error)
      throw error
    }
  }

  return {
    ...state,
    downloadLesson,
    deleteOfflineLesson,
    cleanupStorage,
    saveProgress,
    getProgress,
    triggerSync,
    refreshStorageInfo: loadStorageInfo,
    refreshOfflineLessons: loadOfflineLessons,
  }
}
