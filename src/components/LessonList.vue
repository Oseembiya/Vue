<template>
  <div>
    <!-- Sorting Controls -->
    <div
      id="classes"
      class="sort-controls text-center mb-4 d-flex flex-column justify-content-center align-items-center"
    >
      <img
        src="/Vue/asset/logo.jpg"
        alt="ParentPay Logo"
        class="logo align-items-center fs-3 logoCenter"
      />

      <h1 class="text-center fw-bold mt-3">
        Stay Active with Our Class Activities
      </h1>

      <div class="d-flex align-items-center mt-3">
        <label for="sortCriteria" class="me-2 fw-bold">Sort by:</label>
        <select
          id="sortCriteria"
          class="form-select w-auto me-3 pe-5"
          v-model="sortCriteria"
        >
          <option value="subject">Subject</option>
          <option value="location">Location</option>
          <option value="price">Price</option>
          <option value="slots">Spaces</option>
        </select>

        <label for="sortOrder" class="me-2 fw-bold">Order:</label>
        <select
          id="sortOrder"
          class="form-select w-auto pe-5"
          v-model="sortOrder"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>

    <!-- List of lessons -->
    <div
      class="container d-flex flex-wrap justify-content-around align-items-start pt-3 mt-2"
      id="lessonCards"
    >
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

.logoCenter {
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
  padding: 0 1rem;
}

.sort-controls select {
  font-size: 1rem;
  padding: 0.375rem 1rem;
  border-radius: 0.25rem;
  min-height: 44px; /* Better for touch */
}

.sort-controls label {
  font-size: 1.1rem;
  color: #333;
}

#lessonCards {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

/* Responsive grid layout */
@media (min-width: 1200px) {
  #lessonCards {
    max-width: 1200px;
    margin: 0 auto;
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  #lessonCards {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #lessonCards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  #lessonCards {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .d-flex.align-items-center.mt-3 {
    flex-direction: column;
    width: 100%;
  }

  .sort-controls select {
    margin-bottom: 0.75rem;
    width: 100% !important;
    padding: 0.5rem 0.75rem;
  }

  .sort-controls label {
    margin-bottom: 0.25rem;
    width: 100%;
    text-align: left;
  }

  .sort-controls h1 {
    font-size: 1.5rem !important;
    margin-bottom: 1.25rem;
  }

  .logoCenter {
    width: 80px;
    margin-bottom: 0.5rem;
  }
}

@media (max-width: 576px) {
  .sort-controls h1 {
    font-size: 1.3rem !important;
    margin-bottom: 1rem;
    padding: 0 0.5rem;
  }

  .logoCenter {
    width: 70px;
  }

  #lessonCards {
    padding: 0.5rem;
    gap: 1rem;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .sort-controls {
    padding: 0 0.5rem;
  }

  .sort-controls h1 {
    font-size: 1.2rem !important;
  }

  .sort-controls select {
    font-size: 0.9rem;
  }
}
</style>
