<template>
  <div class="lesson-card">
    <img
      :src="`${apiBaseUrl}/${lesson.image}`"
      class="card-image"
      alt="lesson image"
      @click="viewImage"
    />

    <div class="card-content">
      <h6 class="card-title">{{ lesson.subject }}</h6>
      <p class="card-text">Location: {{ lesson.location }}</p>
      <p class="card-text">Space: {{ lesson.slots }}</p>
      <p class="card-text">Price: £{{ lesson.price }}</p>
      <div class="card-actions">
        <button
          class="add-button"
          @click="addToCart"
          :disabled="lesson.slots <= 0"
        >
          Add to Cart
        </button>
        <span
          class="status-badge"
          :class="{
            'sold-out': lesson.slots === 0,
            'low-stock': lesson.slots < 5,
            'in-stock': lesson.slots >= 5,
          }"
        >
          <span v-if="lesson.slots === 0">All Out!</span>
          <span v-else-if="lesson.slots < 5"
            >Only {{ lesson.slots }} left!</span
          >
          <span v-else>Buy Now!</span>
        </span>
      </div>
      <!-- Display the rating as stars -->
      <div class="rating">
        <span
          v-for="(star, index) in lesson.rating"
          :key="`filled-${index}`"
          class="star filled"
          >★</span
        >
        <span
          v-for="(star, index) in 5 - lesson.rating"
          :key="`empty-${index}`"
          class="star empty"
          >☆</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LessonCard",
  props: {
    lesson: {
      type: Object,
      required: true,
    },
    apiBaseUrl: {
      type: String,
      default:
        "https://vueappliaction-env.eba-qkd3evgp.eu-west-2.elasticbeanstalk.com",
    },
  },
  methods: {
    addToCart() {
      if (this.lesson.slots > 0) {
        this.$emit("add-to-cart", this.lesson);
      }
    },
    viewImage() {
      this.$emit("view-image", this.lesson.image);
    },
  },
};
</script>

<style scoped>
.lesson-card {
  width: 18.5rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 1.5rem;
  margin-right: 0.5rem;
  margin-left: 0.5rem;
  background-color: white;
}

.lesson-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-image {
  width: 100%;
  height: 20vh;
  object-fit: cover;
  transition: transform 0.2s;
  cursor: pointer;
}

.card-image:hover {
  transform: scale(1.05);
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.card-title {
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.card-text {
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}

.add-button {
  background-color: #0d6efd;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
}

.add-button:hover {
  background-color: #0b5ed7;
}

.add-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.65;
}

.status-badge {
  padding: 0.35rem 0.65rem;
  font-size: 0.75rem;
  border-radius: 4px;
  color: white;
}

.status-badge.sold-out {
  background-color: #dc3545;
}

.status-badge.low-stock {
  background-color: #ffc107;
  color: #212529;
}

.status-badge.in-stock {
  background-color: #198754;
}

.rating {
  margin-top: 0.5rem;
  margin-top: auto;
}

.star {
  font-size: 1.2rem;
}

.star.filled {
  color: #ffc107;
}

.star.empty {
  color: #6c757d;
}

/* Improved touch targets for mobile */
@media (max-width: 767px) {
  .add-button {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    min-height: 44px; /* Better for touch */
  }
}

@media (max-width: 576px) {
  .card-image {
    height: 15vh;
  }

  /* Ensure full card is tappable on mobile */
  .lesson-card {
    margin-left: auto;
    margin-right: auto;
  }
}

/* Responsive grid sizing */
@media (min-width: 1200px) {
  .lesson-card {
    width: 22%;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .lesson-card {
    width: 30%;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .lesson-card {
    width: 45%;
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  .lesson-card {
    width: 100%;
    max-width: 350px;
    margin: 0 auto 1.5rem;
  }
}

@media (max-width: 575px) {
  .lesson-card {
    width: 100%;
  }
}

/* Fix star rating display on small screens */
@media (max-width: 320px) {
  .star {
    font-size: 0.9rem;
  }
}
</style>
