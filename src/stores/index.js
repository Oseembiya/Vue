import { defineStore } from 'pinia'

// Cache configuration
const CACHE_KEYS = {
  LESSONS: 'parentpay_lessons',
  LESSONS_TIMESTAMP: 'parentpay_lessons_timestamp',
  CART_ITEMS: 'parentpay_cart_items',
}

const CACHE_DURATION = 30 * 60 * 1000 // 30 minutes in milliseconds

export const useAppStore = defineStore('app', {
  state: () => ({
    siteName: 'ParentPay',
    apiBaseUrl: import.meta.env.PROD
      ? 'https://myserver-xy36.onrender.com'
      : 'https://myserver-xy36.onrender.com', // Use deployed server for both dev and prod
    cartItems: [],
    lessons: [],
    searchResults: [],
    searchActive: false,
    selectedImage: null,
    showImageModal: false,
    showCart: false,
    loading: false,
    error: null,
    cacheStatus: 'unknown', // 'fresh', 'stale', 'empty'
  }),

  getters: {
    cartCount: (state) => state.cartItems.length,
    cartIsEmpty: (state) => state.cartItems.length === 0,
    filteredLessons: (state) => (state.searchActive ? state.searchResults : state.lessons),
    totalCartValue: (state) => state.cartItems.reduce((total, item) => total + item.price, 0),
    uniqueCartItems: (state) => {
      const grouped = {}
      state.cartItems.forEach((item) => {
        if (!grouped[item.id]) {
          grouped[item.id] = { lesson: item, quantity: 1 }
        } else {
          grouped[item.id].quantity++
        }
      })
      return Object.values(grouped).length
    },
  },

  actions: {
    // Cache Helper Methods
    getCachedLessons() {
      try {
        const cachedData = localStorage.getItem(CACHE_KEYS.LESSONS)
        const cachedTimestamp = localStorage.getItem(CACHE_KEYS.LESSONS_TIMESTAMP)

        if (!cachedData || !cachedTimestamp) {
          this.cacheStatus = 'empty'
          return null
        }

        const timestamp = parseInt(cachedTimestamp, 10)
        const now = Date.now()
        const isExpired = now - timestamp > CACHE_DURATION

        if (isExpired) {
          this.cacheStatus = 'stale'
          return null
        }

        this.cacheStatus = 'fresh'
        return JSON.parse(cachedData)
      } catch (error) {
        console.error('Error reading cached lessons:', error)
        this.clearLessonsCache()
        return null
      }
    },

    setCachedLessons(lessons) {
      try {
        localStorage.setItem(CACHE_KEYS.LESSONS, JSON.stringify(lessons))
        localStorage.setItem(CACHE_KEYS.LESSONS_TIMESTAMP, Date.now().toString())
        this.cacheStatus = 'fresh'
      } catch (error) {
        console.error('Error caching lessons:', error)
      }
    },

    clearLessonsCache() {
      try {
        localStorage.removeItem(CACHE_KEYS.LESSONS)
        localStorage.removeItem(CACHE_KEYS.LESSONS_TIMESTAMP)
        this.cacheStatus = 'empty'
        console.log('Lessons cache cleared')
      } catch (error) {
        console.error('Error clearing lessons cache:', error)
      }
    },

    loadCartFromStorage() {
      try {
        const cachedCart = localStorage.getItem(CACHE_KEYS.CART_ITEMS)
        if (cachedCart) {
          this.cartItems = JSON.parse(cachedCart)
          console.log('Cart restored from localStorage:', this.cartItems.length, 'items')
        }
      } catch (error) {
        console.error('Error loading cart from storage:', error)
        this.cartItems = []
      }
    },

    saveCartToStorage() {
      try {
        localStorage.setItem(CACHE_KEYS.CART_ITEMS, JSON.stringify(this.cartItems))
      } catch (error) {
        console.error('Error saving cart to storage:', error)
      }
    },

    clearCartFromStorage() {
      try {
        localStorage.removeItem(CACHE_KEYS.CART_ITEMS)
      } catch (error) {
        console.error('Error clearing cart from storage:', error)
      }
    },

    async fetchLessons(forceRefresh = false) {
      this.loading = true
      this.error = null

      // Check cache first unless forced refresh
      if (!forceRefresh) {
        const cachedLessons = this.getCachedLessons()
        if (cachedLessons) {
          console.log('Using cached lessons data ✅')
          this.lessons = cachedLessons
          this.loading = false
          return
        }
      }

      // Fetch from API
      try {
        const response = await fetch(`${this.apiBaseUrl}/lessons`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        // Update state and cache
        this.lessons = data
        this.setCachedLessons(data)
      } catch (error) {
        console.error('Error fetching lessons:', error)
        this.error = 'Failed to fetch lessons from server'

        // Try to use stale cache as fallback
        const staleCache = localStorage.getItem(CACHE_KEYS.LESSONS)
        if (staleCache) {
          console.log('Using stale cached data as fallback')
          this.lessons = JSON.parse(staleCache)
          this.error = 'Using cached data (connection issues)'
        } else {
          // Use sample data as last resort
          this.loadSampleData()
        }
      } finally {
        this.loading = false
      }
    },

    // Force refresh from API (bypass cache)
    async refreshLessons() {
      console.log('Force refreshing lessons data...')
      await this.fetchLessons(true)
    },

    // Initialize store - call this when app starts
    async initializeStore() {
      console.log('Initializing ParentPay store...')

      // Load cart from localStorage first
      this.loadCartFromStorage()

      // Then fetch lessons (will use cache if available)
      await this.fetchLessons()

      console.log('Store initialized successfully')
    },

    // Get cache information for debugging
    getCacheInfo() {
      const hasCache = localStorage.getItem(CACHE_KEYS.LESSONS) !== null
      const timestamp = localStorage.getItem(CACHE_KEYS.LESSONS_TIMESTAMP)
      const cacheAge = timestamp ? Date.now() - parseInt(timestamp, 10) : 0
      const cacheValid = cacheAge < CACHE_DURATION

      return {
        hasCache,
        cacheAge: Math.round(cacheAge / 1000 / 60), // minutes
        cacheValid,
        status: this.cacheStatus,
        expiresIn: cacheValid ? Math.round((CACHE_DURATION - cacheAge) / 1000 / 60) : 0,
      }
    },

    loadSampleData() {
      console.log('Loading sample data as fallback')
      this.lessons = [
        {
          id: 1,
          subject: 'Mathematics',
          location: 'Room 101',
          slots: 10,
          price: 25,
          rating: 4,
          image:
            'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 2,
          subject: 'Science',
          location: 'Lab 201',
          slots: 8,
          price: 30,
          rating: 5,
          image:
            'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 3,
          subject: 'English',
          location: 'Library',
          slots: 15,
          price: 20,
          rating: 3,
          image:
            'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
        {
          id: 4,
          subject: 'Art',
          location: 'Studio 302',
          slots: 2,
          price: 35,
          rating: 4,
          image:
            'https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
        },
      ]
    },

    handleSearch(query) {
      if (!query.trim()) {
        this.clearSearch()
        return
      }

      const searchTerm = query.toLowerCase()
      this.searchResults = this.lessons.filter(
        (lesson) =>
          lesson.subject.toLowerCase().includes(searchTerm) ||
          lesson.location.toLowerCase().includes(searchTerm),
      )
      this.searchActive = true
    },

    clearSearch() {
      this.searchResults = []
      this.searchActive = false
    },

    addToCart(lesson) {
      const lessonCopy = { ...lesson }
      const lessonIndex = this.lessons.findIndex((l) => l.id === lesson.id)

      if (lessonIndex !== -1 && this.lessons[lessonIndex].slots > 0) {
        this.lessons[lessonIndex].slots--
        this.cartItems.push(lessonCopy)
        this.saveCartToStorage() // Save cart to localStorage
      }
    },

    removeFromCart(lessonId) {
      const cartIndex = this.cartItems.findIndex((item) => item.id === lessonId)
      if (cartIndex !== -1) {
        const lessonIndex = this.lessons.findIndex((l) => l.id === lessonId)
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].slots++
        }
        this.cartItems.splice(cartIndex, 1)
        this.saveCartToStorage() // Save cart to localStorage
      }
    },

    increaseQuantity(lessonId) {
      // Find the lesson to add
      const lesson = this.lessons.find((l) => l.id === lessonId)
      if (lesson && lesson.slots > 0) {
        // Decrease available slots
        lesson.slots--
        // Add another instance to cart
        this.cartItems.push({ ...lesson })
        this.saveCartToStorage() // Save cart to localStorage
      }
    },

    decreaseQuantity(lessonId) {
      // Find and remove one instance from cart
      const cartIndex = this.cartItems.findIndex((item) => item.id === lessonId)
      if (cartIndex !== -1) {
        const lessonIndex = this.lessons.findIndex((l) => l.id === lessonId)
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].slots++
        }
        this.cartItems.splice(cartIndex, 1)
        this.saveCartToStorage() // Save cart to localStorage
      }
    },

    toggleCart() {
      this.showCart = !this.showCart

      if (this.showCart) {
        document.body.classList.add('overflow-hidden')
      } else {
        document.body.classList.remove('overflow-hidden')
      }
    },

    closeCart() {
      this.showCart = false
      document.body.classList.remove('overflow-hidden')
    },

    viewImage(image) {
      this.selectedImage = image
      this.showImageModal = true
    },

    closeImageModal() {
      this.showImageModal = false
    },

    async processOrder(orderData) {
      try {
        this.loading = true
        console.log('Submitting order:', orderData)

        const response = await fetch(`${this.apiBaseUrl}/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        console.log('Order submitted successfully:', result)

        // Clear cart after successful order
        this.cartItems = []
        this.clearCartFromStorage() // Clear cart from localStorage
        this.closeCart()

        return { success: true, data: result }
      } catch (error) {
        console.error('Error submitting order:', error)
        this.error = 'Failed to submit order'
        return { success: false, error: error.message }
      } finally {
        this.loading = false
      }
    },
  },
})
