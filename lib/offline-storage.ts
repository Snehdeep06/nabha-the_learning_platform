// Offline-first data storage using IndexedDB
interface StoredLesson {
  id: number
  title: string
  subject: string
  content: any
  downloadedAt: number
  lastAccessed: number
}

interface StoredProgress {
  userId: string
  lessonId: number
  progress: number
  completed: boolean
  lastUpdated: number
}

interface StoredUser {
  id: string
  name: string
  role: "student" | "teacher"
  data: any
  lastSynced: number
}

class OfflineStorage {
  private dbName = "nabha-education-db"
  private version = 1
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        // Create lessons store
        if (!db.objectStoreNames.contains("lessons")) {
          const lessonsStore = db.createObjectStore("lessons", { keyPath: "id" })
          lessonsStore.createIndex("subject", "subject", { unique: false })
          lessonsStore.createIndex("downloadedAt", "downloadedAt", { unique: false })
        }

        // Create progress store
        if (!db.objectStoreNames.contains("progress")) {
          const progressStore = db.createObjectStore("progress", { keyPath: ["userId", "lessonId"] })
          progressStore.createIndex("userId", "userId", { unique: false })
          progressStore.createIndex("lessonId", "lessonId", { unique: false })
        }

        // Create users store
        if (!db.objectStoreNames.contains("users")) {
          const usersStore = db.createObjectStore("users", { keyPath: "id" })
          usersStore.createIndex("role", "role", { unique: false })
        }

        // Create sync queue store
        if (!db.objectStoreNames.contains("syncQueue")) {
          const syncStore = db.createObjectStore("syncQueue", { keyPath: "id", autoIncrement: true })
          syncStore.createIndex("timestamp", "timestamp", { unique: false })
          syncStore.createIndex("type", "type", { unique: false })
        }
      }
    })
  }

  // Lesson storage methods
  async storeLesson(lesson: StoredLesson): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["lessons"], "readwrite")
    const store = transaction.objectStore("lessons")

    const lessonWithTimestamp = {
      ...lesson,
      downloadedAt: Date.now(),
      lastAccessed: Date.now(),
    }

    return new Promise((resolve, reject) => {
      const request = store.put(lessonWithTimestamp)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getLesson(id: number): Promise<StoredLesson | null> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["lessons"], "readonly")
    const store = transaction.objectStore("lessons")

    return new Promise((resolve, reject) => {
      const request = store.get(id)
      request.onsuccess = () => {
        const lesson = request.result
        if (lesson) {
          // Update last accessed time
          this.updateLessonAccess(id)
          resolve(lesson)
        } else {
          resolve(null)
        }
      }
      request.onerror = () => reject(request.error)
    })
  }

  async getOfflineLessons(): Promise<StoredLesson[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["lessons"], "readonly")
    const store = transaction.objectStore("lessons")

    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async deleteLesson(id: number): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["lessons"], "readwrite")
    const store = transaction.objectStore("lessons")

    return new Promise((resolve, reject) => {
      const request = store.delete(id)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  private async updateLessonAccess(id: number): Promise<void> {
    if (!this.db) return

    const transaction = this.db.transaction(["lessons"], "readwrite")
    const store = transaction.objectStore("lessons")

    const getRequest = store.get(id)
    getRequest.onsuccess = () => {
      const lesson = getRequest.result
      if (lesson) {
        lesson.lastAccessed = Date.now()
        store.put(lesson)
      }
    }
  }

  // Progress storage methods
  async storeProgress(progress: StoredProgress): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["progress"], "readwrite")
    const store = transaction.objectStore("progress")

    const progressWithTimestamp = {
      ...progress,
      lastUpdated: Date.now(),
    }

    return new Promise((resolve, reject) => {
      const request = store.put(progressWithTimestamp)
      request.onsuccess = () => {
        // Add to sync queue
        this.addToSyncQueue("progress", progressWithTimestamp)
        resolve()
      }
      request.onerror = () => reject(request.error)
    })
  }

  async getProgress(userId: string, lessonId: number): Promise<StoredProgress | null> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["progress"], "readonly")
    const store = transaction.objectStore("progress")

    return new Promise((resolve, reject) => {
      const request = store.get([userId, lessonId])
      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  async getUserProgress(userId: string): Promise<StoredProgress[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["progress"], "readonly")
    const store = transaction.objectStore("progress")
    const index = store.index("userId")

    return new Promise((resolve, reject) => {
      const request = index.getAll(userId)
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  // User data storage methods
  async storeUser(user: StoredUser): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["users"], "readwrite")
    const store = transaction.objectStore("users")

    const userWithTimestamp = {
      ...user,
      lastSynced: Date.now(),
    }

    return new Promise((resolve, reject) => {
      const request = store.put(userWithTimestamp)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getUser(id: string): Promise<StoredUser | null> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["users"], "readonly")
    const store = transaction.objectStore("users")

    return new Promise((resolve, reject) => {
      const request = store.get(id)
      request.onsuccess = () => resolve(request.result || null)
      request.onerror = () => reject(request.error)
    })
  }

  // Sync queue methods
  async addToSyncQueue(type: string, data: any): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["syncQueue"], "readwrite")
    const store = transaction.objectStore("syncQueue")

    const syncItem = {
      type,
      data,
      timestamp: Date.now(),
      retries: 0,
    }

    return new Promise((resolve, reject) => {
      const request = store.add(syncItem)
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  async getSyncQueue(): Promise<any[]> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["syncQueue"], "readonly")
    const store = transaction.objectStore("syncQueue")

    return new Promise((resolve, reject) => {
      const request = store.getAll()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })
  }

  async clearSyncQueue(): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["syncQueue"], "readwrite")
    const store = transaction.objectStore("syncQueue")

    return new Promise((resolve, reject) => {
      const request = store.clear()
      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)
    })
  }

  // Storage management
  async getStorageUsage(): Promise<{ used: number; available: number }> {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      const estimate = await navigator.storage.estimate()
      return {
        used: estimate.usage || 0,
        available: estimate.quota || 0,
      }
    }
    return { used: 0, available: 0 }
  }

  async cleanupOldLessons(maxAge: number = 30 * 24 * 60 * 60 * 1000): Promise<void> {
    if (!this.db) await this.init()

    const transaction = this.db!.transaction(["lessons"], "readwrite")
    const store = transaction.objectStore("lessons")
    const index = store.index("lastAccessed")

    const cutoffTime = Date.now() - maxAge

    return new Promise((resolve, reject) => {
      const request = index.openCursor(IDBKeyRange.upperBound(cutoffTime))

      request.onsuccess = (event) => {
        const cursor = (event.target as IDBRequest).result
        if (cursor) {
          cursor.delete()
          cursor.continue()
        } else {
          resolve()
        }
      }

      request.onerror = () => reject(request.error)
    })
  }
}

export const offlineStorage = new OfflineStorage()
