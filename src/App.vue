<template>
  <Navbar
    :siteName="store.siteName"
    :cartCount="store.cartCount"
    :cartIsEmpty="store.cartIsEmpty"
    @search="store.handleSearch"
    @clear-search="store.clearSearch"
    @toggle-cart="store.toggleCart"
  />

  <CarouselHero :carouselImages="carouselImages" />

  <!-- Loading State -->
  <div v-if="store.loading" class="loading-container">
    <div class="loading-spinner"></div>
    <p>Loading lessons...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="store.error" class="error-container">
    <div class="error-message">
      <h3>⚠️ {{ store.error }}</h3>
      <p>Using sample data for demonstration.</p>
    </div>
  </div>

  <LessonList
    :lessons="store.filteredLessons"
    :searchResults="store.searchResults"
    :searchActive="store.searchActive"
    :apiBaseUrl="store.apiBaseUrl"
    @add-to-cart="store.addToCart"
    @view-image="store.viewImage"
  />

  <CartCanvas
    v-if="store.showCart"
    :cartItems="store.cartItems"
    :apiBaseUrl="store.apiBaseUrl"
    @remove-item="store.removeFromCart"
    @increase-quantity="store.increaseQuantity"
    @decrease-quantity="store.decreaseQuantity"
    @close-cart="store.closeCart"
    @submit-order="handleOrderSubmission"
  />

  <FooterSection :siteName="store.siteName" />

  <!-- Image Modal -->
  <div v-if="store.showImageModal" class="image-modal" @click="store.closeImageModal">
    <span class="close-modal">&times;</span>
    <img
      :src="`${store.apiBaseUrl}/${store.selectedImage}`"
      class="modal-content"
      alt="Enlarged view"
    />
  </div>
</template>

<script>
import { useAppStore } from './stores/index.js'
import Navbar from './components/Navbar.vue'
import CarouselHero from './components/CarouselHero.vue'
import LessonList from './components/LessonList.vue'
import CartCanvas from './components/CartCanvas.vue'
import FooterSection from './components/FooterSection.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    CarouselHero,
    LessonList,
    CartCanvas,
    FooterSection,
  },
  setup() {
    const store = useAppStore()
    return { store }
  },
  data() {
    return {
      carouselImages: [
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80',
      ],
    }
  },
  async mounted() {
    // Fetch lessons from API
    await this.store.fetchLessons()

    // Add event listener for ESC key to close modals
    document.addEventListener('keydown', this.handleEscKey)
  },
  beforeUnmount() {
    // Remove event listeners
    document.removeEventListener('keydown', this.handleEscKey)
  },
  methods: {
    handleEscKey(event) {
      if (event.key === 'Escape') {
        if (this.store.showCart) {
          this.store.closeCart()
        }
        if (this.store.showImageModal) {
          this.store.closeImageModal()
        }
      }
    },
    async handleOrderSubmission(orderData) {
      const result = await this.store.processOrder(orderData)

      if (result.success) {
        alert('🎉 Your order has been placed successfully!')
      } else {
        alert(`❌ Order failed: ${result.error}`)
      }
    },
  },
}
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.error-container {
  margin: 2rem;
  padding: 1rem;
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 8px;
  text-align: center;
}

.error-message h3 {
  color: #856404;
  margin: 0 0 0.5rem 0;
}

.error-message p {
  color: #856404;
  margin: 0;
}

.image-modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.close-modal {
  position: absolute;
  top: 20px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
  z-index: 1001;
}

.close-modal:hover {
  color: #bbb;
}

.modal-content {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
  border-radius: 8px;
}
</style>
