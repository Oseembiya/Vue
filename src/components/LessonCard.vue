<template>
  <div class="card mb-4 mx-2 position-relative lesson-card">
    <img
      :src="`${apiBaseUrl}/${lesson.image}`"
      class="card-img-top"
      alt="lesson image"
      @click="viewImage"
      style="cursor: pointer"
    />

    <div class="card-body">
      <h6 class="card-title fw-bold">{{ lesson.subject }}</h6>
      <p class="cart-text mb-1">Location: {{ lesson.location }}</p>
      <p class="card-text mb-1">Space: {{ lesson.slots }}</p>
      <p class="card-text">Price: £{{ lesson.price }}</p>
      <div class="d-flex justify-content-between align-items-center mt-2">
        <button
          class="btn btn-primary"
          @click="addToCart"
          :disabled="lesson.slots <= 0"
        >
          Add to Cart
        </button>
        <span
          class="badge"
          :class="{
            'bg-danger': lesson.slots === 0,
            'bg-warning': lesson.slots < 5,
            'bg-success': lesson.slots >= 5,
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
      <div class="mt-2">
        <span
          v-for="(star, index) in lesson.rating"
          :key="`filled-${index}`"
          class="text-warning"
          >★</span
        >
        <span
          v-for="(star, index) in 5 - lesson.rating"
          :key="`empty-${index}`"
          class="text-muted"
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
}

.lesson-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-body .mt-2:last-child {
  margin-top: auto !important;
}

.card-img-top {
  width: 100%;
  height: 20vh;
  object-fit: cover;
  transition: transform 0.2s;
}

.card-img-top:hover {
  transform: scale(1.05);
}

/* Improved touch targets for mobile */
@media (max-width: 767px) {
  .btn-primary {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
    min-height: 44px; /* Better for touch */
  }

  .card-title {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .card-img-top {
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

/* Equal height cards in each row */
@media (min-width: 768px) {
  .lesson-card {
    margin-bottom: 2rem;
  }
}

/* Fix star rating display on small screens */
@media (max-width: 320px) {
  .text-warning,
  .text-muted {
    font-size: 0.9rem;
  }
}
</style>
