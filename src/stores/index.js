import { defineStore } from 'pinia'

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
    async fetchLessons() {
      this.loading = true
      this.error = null

      try {
        console.log('Fetching lessons from:', `${this.apiBaseUrl}/lessons`)
        const response = await fetch(`${this.apiBaseUrl}/lessons`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('Fetched lessons:', data)
        this.lessons = data
      } catch (error) {
        console.error('Error fetching lessons:', error)
        this.error = 'Failed to fetch lessons from server'
        // Use sample data if API fails
        this.loadSampleData()
      } finally {
        this.loading = false
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
