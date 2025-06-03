<template>
  <div>
    <!-- Sorting Controls -->
    <div id="classes" class="sort-controls">
      <h1 class="section-title">Stay Active with Our Class Activities</h1>

      <div class="sort-options">
        <div class="sort-group">
          <label for="sortCriteria" class="sort-label">Sort by:</label>
          <select id="sortCriteria" class="sort-select" v-model="sortCriteria">
            <option value="subject">Subject</option>
            <option value="location">Location</option>
            <option value="price">Price</option>
            <option value="slots">Spaces</option>
          </select>
        </div>

        <div class="sort-group">
          <label for="sortOrder" class="sort-label">Order:</label>
          <select id="sortOrder" class="sort-select" v-model="sortOrder">
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>

    <!-- List of lessons (limited to 3 rows) -->
    <div class="lesson-container" id="lessonCards">
      <lesson-card
        v-for="lesson in paginatedLessons"
        :key="lesson.id"
        :lesson="lesson"
        :api-base-url="apiBaseUrl"
        @add-to-cart="addToCart"
        @view-image="viewImage"
      />
    </div>

    <!-- Pagination Controls -->
    <div class="pagination-container" v-if="totalPages > 1">
      <div class="pagination">
        <button
          class="pagination-btn"
          @click="goToPage(1)"
          :disabled="currentPage === 1"
          title="First page"
        >
          <i class="fa-solid fa-angles-left"></i>
        </button>

        <button
          class="pagination-btn"
          @click="prevPage"
          :disabled="currentPage === 1"
          title="Previous page"
        >
          <i class="fa-solid fa-angle-left"></i>
        </button>

        <!-- Page numbers -->
        <template v-for="page in visiblePages" :key="page">
          <button
            v-if="page !== '...'"
            class="pagination-btn page-number"
            :class="{ active: page === currentPage }"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
          <span v-else class="pagination-dots">...</span>
        </template>

        <button
          class="pagination-btn"
          @click="nextPage"
          :disabled="currentPage === totalPages"
          title="Next page"
        >
          <i class="fa-solid fa-angle-right"></i>
        </button>

        <button
          class="pagination-btn"
          @click="goToPage(totalPages)"
          :disabled="currentPage === totalPages"
          title="Last page"
        >
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>

      <div class="pagination-info">
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <span class="items-info">({{ itemsStart }}-{{ itemsEnd }} of {{ totalItems }} items)</span>
      </div>
    </div>
  </div>
</template>

<script>
import LessonCard from './LessonCard.vue'

export default {
  name: 'LessonList',
  components: {
    LessonCard,
  },
  props: {
    lessons: {
      type: Array,
      required: true,
    },
    searchResults: {
      type: Array,
      default: () => [],
    },
    searchActive: {
      type: Boolean,
      default: false,
    },
    apiBaseUrl: {
      type: String,
      default: 'https://myserver-xy36.onrender.com',
    },
  },
  data() {
    return {
      sortCriteria: 'subject',
      sortOrder: 'asc',
      currentPage: 1,
      screenWidth: window.innerWidth,
    }
  },
  computed: {
    sortedLessons() {
      return [...this.lessons].sort((a, b) => {
        let comparison = 0

        // Sorting based on the selected criteria
        if (this.sortCriteria === 'subject') {
          comparison = a.subject.localeCompare(b.subject)
        } else if (this.sortCriteria === 'location') {
          comparison = a.location.localeCompare(b.location)
        } else if (this.sortCriteria === 'price') {
          comparison = a.price - b.price
        } else if (this.sortCriteria === 'slots') {
          comparison = a.slots - b.slots
        }

        // Return based on sort order
        return this.sortOrder === 'asc' ? comparison : -comparison
      })
    },
    displayedLessons() {
      return this.searchActive && this.searchResults.length > 0
        ? this.searchResults
        : this.sortedLessons
    },
    itemsPerPage() {
      // Calculate items per page based on grid layout (3 rows max)
      if (this.screenWidth >= 1200) {
        return 12 // 4 columns × 3 rows
      } else if (this.screenWidth >= 992) {
        return 9 // 3 columns × 3 rows
      } else if (this.screenWidth >= 768) {
        return 6 // 2 columns × 3 rows
      } else {
        return 3 // 1 column × 3 rows
      }
    },
    totalItems() {
      return this.displayedLessons.length
    },
    totalPages() {
      return Math.ceil(this.totalItems / this.itemsPerPage)
    },
    paginatedLessons() {
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.displayedLessons.slice(start, end)
    },
    visiblePages() {
      const pages = []
      const total = this.totalPages
      const current = this.currentPage

      if (total <= 7) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= total; i++) {
          pages.push(i)
        }
      } else {
        // Complex pagination with ellipsis
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) pages.push(i)
          pages.push('...')
          pages.push(total)
        } else if (current >= total - 3) {
          pages.push(1)
          pages.push('...')
          for (let i = total - 4; i <= total; i++) pages.push(i)
        } else {
          pages.push(1)
          pages.push('...')
          for (let i = current - 1; i <= current + 1; i++) pages.push(i)
          pages.push('...')
          pages.push(total)
        }
      }

      return pages
    },
    itemsStart() {
      return (this.currentPage - 1) * this.itemsPerPage + 1
    },
    itemsEnd() {
      return Math.min(this.currentPage * this.itemsPerPage, this.totalItems)
    },
  },
  methods: {
    addToCart(lesson) {
      this.$emit('add-to-cart', lesson)
    },
    viewImage(image) {
      this.$emit('view-image', image)
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.scrollToTop()
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.scrollToTop()
      }
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page
        this.scrollToTop()
      }
    },
    scrollToTop() {
      // Scroll to lesson container
      const element = document.getElementById('lessonCards')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    handleResize() {
      this.screenWidth = window.innerWidth
      // Reset to page 1 if current page would be out of bounds
      if (this.currentPage > this.totalPages) {
        this.currentPage = 1
      }
    },
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  watch: {
    sortCriteria() {
      this.currentPage = 1 // Reset to first page when sorting changes
    },
    sortOrder() {
      this.currentPage = 1 // Reset to first page when sorting changes
    },
    searchActive() {
      this.currentPage = 1 // Reset to first page when search changes
    },
  },
}
</script>

<style scoped>
.logo {
  width: 45px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Base sorting controls */
.sort-controls {
  margin: 3rem 0 2rem 0;
  padding: 0 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.section-title {
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2rem;
  color: var(--color-text);
}

/* Base sort options - always flex row */
.sort-options {
  display: flex !important;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  flex-direction: row !important; /* Force row layout always */
}

.sort-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.sort-select {
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  min-height: 44px;
  border: 1px solid #ced4da;
  background-color: white;
  min-width: 120px;
  transition: border-color 0.2s ease;
}

.sort-select:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.sort-label {
  font-size: 1rem;
  color: #333;
  font-weight: 600;
  white-space: nowrap;
}

.lesson-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem 1rem;
  min-height: 400px;
}

/* Pagination Styles */
.pagination-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: white;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.pagination-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid #dee2e6;
  background: white;
  color: #007bff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background: #007bff;
  color: white;
  transform: translateY(-1px);
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: #6c757d;
}

.pagination-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.pagination-dots {
  padding: 0 0.5rem;
  color: #6c757d;
  font-weight: bold;
}

.pagination-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.85rem;
  color: #6c757d;
  line-height: 1.2;
}

.items-info {
  font-size: 0.75rem;
  opacity: 0.8;
}

/* Responsive grid layout */
@media (min-width: 1200px) {
  .lesson-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .lesson-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .lesson-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large screens (1200px+) - Full layout */
@media (min-width: 1200px) {
  .sort-options {
    gap: 2rem !important;
  }

  .sort-select {
    min-width: 140px;
  }
}

/* Desktop/Large Tablet (992px - 1199px) */
@media (min-width: 992px) and (max-width: 1199px) {
  .sort-options {
    gap: 1.5rem !important;
  }

  .sort-select {
    min-width: 120px;
    font-size: 0.95rem;
  }

  .sort-label {
    font-size: 0.95rem;
  }
}

/* Medium Tablet (768px - 991px) */
@media (min-width: 768px) and (max-width: 991px) {
  .sort-options {
    gap: 1rem !important;
    flex-direction: row !important;
  }

  .sort-group {
    flex-direction: row !important;
    gap: 0.5rem !important;
  }

  .sort-select {
    min-width: 100px;
    font-size: 0.9rem;
    padding: 0.45rem 0.8rem;
  }

  .sort-label {
    font-size: 0.9rem;
  }

  .pagination-container {
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pagination-info {
    align-items: center;
    text-align: center;
  }
}

/* Small Tablet/Large Mobile (576px - 767px) */
@media (min-width: 576px) and (max-width: 767px) {
  .lesson-container {
    grid-template-columns: 1fr;
    gap: 1rem;
    padding: 1rem;
  }

  .sort-options {
    gap: 1rem !important;
    flex-direction: row !important;
    justify-content: center;
    flex-wrap: wrap;
  }

  .sort-group {
    flex-direction: column !important;
    gap: 0.25rem !important;
    text-align: center;
    min-width: 100px;
  }

  .sort-select {
    min-width: 100px !important;
    font-size: 0.85rem;
    padding: 0.4rem 0.6rem;
    width: 100%;
  }

  .sort-label {
    font-size: 0.85rem;
    margin-bottom: 0;
    font-weight: 600;
  }

  .section-title {
    font-size: 1.75rem;
    margin-bottom: 1rem;
  }

  .sort-controls {
    margin: 2rem 0 1.5rem 0;
  }

  .pagination-btn {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }

  .pagination {
    gap: 0.125rem;
    padding: 0.375rem;
  }

  .pagination-container {
    justify-content: center;
    flex-direction: column;
    gap: 0.5rem;
  }

  .pagination-info {
    align-items: center;
    text-align: center;
  }
}

/* Mobile (400px - 575px) */
@media (min-width: 400px) and (max-width: 575px) {
  .section-title {
    font-size: 1.5rem;
    padding: 0 0.5rem;
  }

  .lesson-container {
    padding: 1rem 0.5rem;
  }

  .sort-options {
    gap: 0.75rem !important;
    flex-direction: row !important;
  }

  .sort-group {
    flex-direction: column !important;
    gap: 0.25rem !important;
    text-align: center;
    min-width: 90px;
  }

  .sort-select {
    min-width: 90px !important;
    font-size: 0.8rem;
    padding: 0.35rem 0.5rem;
    width: 100%;
  }

  .sort-label {
    font-size: 0.8rem;
    font-weight: 600;
  }

  .pagination-btn {
    width: 28px;
    height: 28px;
    font-size: 0.75rem;
  }

  .pagination-info {
    font-size: 0.75rem;
  }

  .items-info {
    font-size: 0.7rem;
  }
}

/* Very small screens (below 400px) */
@media (max-width: 399px) {
  .sort-controls {
    padding: 0 0.5rem;
  }

  .section-title {
    font-size: 1.3rem;
  }

  .sort-options {
    gap: 0.5rem !important;
    flex-direction: row !important;
    justify-content: space-around;
  }

  .sort-group {
    flex-direction: column !important;
    gap: 0.2rem !important;
    text-align: center;
    min-width: 80px;
  }

  .sort-select {
    min-width: 80px !important;
    font-size: 0.75rem;
    padding: 0.3rem 0.4rem;
    width: 100%;
  }

  .sort-label {
    font-size: 0.75rem;
    font-weight: 600;
  }

  .pagination-container {
    padding: 0.5rem;
  }
}
</style>
