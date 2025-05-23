<template>
  <div>
    <!-- Sorting Controls -->
    <div id="classes" class="sort-controls">
      <img :src="logoUrl" alt="ParentPay Logo" class="logo logo-center" />

      <h1 class="section-title">Stay Active with Our Class Activities</h1>

      <div class="sort-options">
        <label for="sortCriteria" class="sort-label">Sort by:</label>
        <select id="sortCriteria" class="sort-select" v-model="sortCriteria">
          <option value="subject">Subject</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
          <option value="slots">Spaces</option>
        </select>

        <label for="sortOrder" class="sort-label">Order:</label>
        <select id="sortOrder" class="sort-select" v-model="sortOrder">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <!-- List of lessons -->
    <div class="lesson-container" id="lessonCards">
      <lesson-card
        v-for="lesson in displayedLessons"
        :key="lesson.id"
        :lesson="lesson"
        :api-base-url="apiBaseUrl"
        @add-to-cart="addToCart"
        @view-image="viewImage"
      />
    </div>
  </div>
</template>

<script>
import LessonCard from "./LessonCard.vue";
import logoImage from "@/assets/logo.jpg";

export default {
  name: "LessonList",
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
      default:
        "https://vueappliaction-env.eba-qkd3evgp.eu-west-2.elasticbeanstalk.com",
    },
  },
  data() {
    return {
      logoUrl: logoImage,
      sortCriteria: "subject",
      sortOrder: "asc",
    };
  },
  computed: {
    sortedLessons() {
      return [...this.lessons].sort((a, b) => {
        let comparison = 0;

        // Sorting based on the selected criteria
        if (this.sortCriteria === "subject") {
          comparison = a.subject.localeCompare(b.subject);
        } else if (this.sortCriteria === "location") {
          comparison = a.location.localeCompare(b.location);
        } else if (this.sortCriteria === "price") {
          comparison = a.price - b.price;
        } else if (this.sortCriteria === "slots") {
          comparison = a.slots - b.slots;
        }

        // Return based on sort order
        return this.sortOrder === "asc" ? comparison : -comparison;
      });
    },
    displayedLessons() {
      return this.searchActive && this.searchResults.length > 0
        ? this.searchResults
        : this.sortedLessons;
    },
  },
  methods: {
    addToCart(lesson) {
      this.$emit("add-to-cart", lesson);
    },
    viewImage(image) {
      this.$emit("view-image", image);
    },
  },
};
</script>

<style scoped>
.logo {
  width: 45px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  animation: spin 4s linear infinite;
}

.logo-center {
  height: auto;
  width: 100px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* sorting controls */
.sort-controls {
  margin-top: 2rem;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.section-title {
  font-weight: bold;
  margin-top: 0.75rem;
  text-align: center;
}

.sort-options {
  display: flex;
  align-items: center;
  margin-top: 0.75rem;
}

.sort-select {
  font-size: 1rem;
  padding: 0.375rem 1rem;
  border-radius: 0.25rem;
  min-height: 44px;
  border: 1px solid #ced4da;
  margin-right: 1rem;
  padding-right: 2rem;
  width: auto;
  background-color: white;
}

.sort-label {
  font-size: 1.1rem;
  color: #333;
  font-weight: bold;
  margin-right: 0.5rem;
}

.lesson-container {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  padding-top: 0.75rem;
  margin-top: 0.5rem;
}

/* Responsive grid layout */
@media (min-width: 1200px) {
  .lesson-container {
    max-width: 1200px;
    margin: 0 auto;
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

@media (max-width: 767px) {
  .lesson-container {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .sort-options {
    flex-direction: column;
    width: 100%;
  }

  .sort-select {
    margin-bottom: 0.75rem;
    width: 100% !important;
    padding: 0.5rem 0.75rem;
  }

  .sort-label {
    margin-bottom: 0.25rem;
    width: 100%;
    text-align: left;
  }

  .section-title {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
  }

  .logo-center {
    width: 80px;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 576px) {
  .section-title {
    font-size: 1.3rem;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

  .logo-center {
    width: 70px;
  }

  .lesson-container {
    padding: 0.5rem;
    gap: 1rem;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .sort-controls {
    padding: 0 0.5rem;
  }

  .section-title {
    font-size: 1.2rem;
  }

  .sort-select {
    font-size: 0.9rem;
  }
}
</style>
