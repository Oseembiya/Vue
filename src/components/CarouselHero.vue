<template>
  <div id="carousel" class="carousel" ref="carousel">
    <div class="carousel-indicators">
      <button
        v-for="(_, index) in carouselImages"
        :key="index"
        type="button"
        class="indicator"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
        :aria-label="`Slide ${index + 1}`"
      ></button>
    </div>
    <div class="carousel-inner">
      <div
        v-for="(image, index) in carouselImages"
        :key="index"
        class="carousel-item"
        :class="{ active: currentSlide === index }"
        :style="{ transform: `translateX(${(index - currentSlide) * 100}%)` }"
      >
        <img :src="image" class="carousel-image" :alt="`carousel image ${index + 1}`" />
      </div>
    </div>
    <button class="carousel-control prev" type="button" @click="prevSlide">
      <span class="control-icon prev-icon" aria-hidden="true">&#10094;</span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control next" type="button" @click="nextSlide">
      <span class="control-icon next-icon" aria-hidden="true">&#10095;</span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'CarouselHero',
  props: {
    carouselImages: {
      type: Array,
      default: () => ['asset/carousel-1.jpg', 'asset/carousel-2.jpg', 'asset/carousel-3.jpg'],
    },
  },
  data() {
    return {
      currentSlide: 0,
      intervalId: null,
    }
  },
  mounted() {
    this.startAutoSlide()

    // Add touch event listeners for mobile swipe
    const carousel = this.$refs.carousel
    let startX = 0

    carousel.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX
    })

    carousel.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX
      const diff = startX - endX

      if (Math.abs(diff) > 50) {
        // Minimum swipe distance
        if (diff > 0) {
          this.nextSlide()
        } else {
          this.prevSlide()
        }
      }
    })
  },
  beforeUnmount() {
    this.stopAutoSlide()
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length
      this.restartAutoSlide()
    },
    prevSlide() {
      this.currentSlide =
        (this.currentSlide - 1 + this.carouselImages.length) % this.carouselImages.length
      this.restartAutoSlide()
    },
    goToSlide(index) {
      this.currentSlide = index
      this.restartAutoSlide()
    },
    startAutoSlide() {
      this.intervalId = setInterval(() => {
        this.nextSlide()
      }, 5000) // Change slide every 5 seconds
    },
    stopAutoSlide() {
      if (this.intervalId) {
        clearInterval(this.intervalId)
      }
    },
    restartAutoSlide() {
      this.stopAutoSlide()
      this.startAutoSlide()
    },
  },
}
</script>

<style scoped>
.carousel {
  position: relative;
  height: 50vh;
  margin-top: 4rem;
  overflow: hidden;
}

.carousel-inner {
  height: 100%;
  position: relative;
  width: 100%;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease-in-out;
}

.carousel-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
}

/* Carousel Controls */
.carousel-control {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  opacity: 0.8;
  transition: opacity 0.15s ease;
  background: transparent;
  border: none;
  cursor: pointer;
}

.carousel-control:hover {
  opacity: 1;
}

.carousel-control.prev {
  left: 0;
}

.carousel-control.next {
  right: 0;
}

.control-icon {
  color: white;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Carousel Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 5px;
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.indicator.active {
  background-color: white;
}

/* Responsive styling */
@media (max-width: 991px) {
  .carousel {
    height: 45vh;
  }
}

@media (max-width: 768px) {
  .carousel {
    height: 40vh;
    margin-top: 4rem;
  }

  .control-icon {
    font-size: 1.5rem;
  }

  .indicator {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 576px) {
  .carousel {
    height: 30vh;
    margin-top: 3.5rem;
  }

  .carousel-control {
    width: 12%;
  }
}

@media (max-width: 480px) {
  .carousel {
    height: 25vh;
    margin-top: 3rem;
  }

  .control-icon {
    font-size: 1.2rem;
  }

  .indicator {
    width: 8px;
    height: 8px;
    margin: 0 3px;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  .carousel {
    height: 70vh;
  }
}

/* Fix for iOS Safari 100vh issue */
@supports (-webkit-touch-callout: none) {
  .carousel {
    height: 50vh;
    height: -webkit-fill-available;
  }
}

/* Make sure carousel adapts to very small screens */
@media (max-width: 320px) {
  .carousel {
    height: 22vh;
  }
}
</style>
