<template>
  <div id="carouselExampleIndicators" class="carousel slide">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          :src="carouselImages[0]"
          class="d-block w-100"
          alt="carousel image 1"
        />
      </div>
      <div class="carousel-item">
        <img
          :src="carouselImages[1]"
          class="d-block w-100"
          alt="carousel image 2"
        />
      </div>
      <div class="carousel-item">
        <img
          :src="carouselImages[2]"
          class="d-block w-100"
          alt="carousel image 3"
        />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "CarouselHero",
  props: {
    carouselImages: {
      type: Array,
      default: () => [
        "asset/carousel-1.jpg",
        "asset/carousel-2.jpg",
        "asset/carousel-3.jpg",
      ],
    },
  },
};
</script>

<style scoped>
.carousel-item img {
  height: 50vh;
  width: 100%;
  object-fit: cover;
}

#carouselExampleIndicators {
  height: 50vh;
  margin-top: 4rem;
}

#carouselExampleIndicators .carousel-inner {
  height: 100%;
}

#carouselExampleIndicators .carousel-item img {
  height: 100%;
  object-fit: cover;
}

/* Enhanced carousel controls for better touch experience */
.carousel-control-prev,
.carousel-control-next {
  width: 10%;
  opacity: 0.8;
}

.carousel-control-prev-icon,
.carousel-control-next-icon {
  width: 2rem;
  height: 2rem;
  background-size: 100%;
}

/* Improved carousel indicators for touch */
.carousel-indicators {
  margin-bottom: 1rem;
}

.carousel-indicators [data-bs-target] {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 5px;
}

/* Better responsive sizing */
@media (max-width: 991px) {
  #carouselExampleIndicators {
    height: 45vh;
  }
}

@media (max-width: 768px) {
  #carouselExampleIndicators {
    height: 40vh;
    margin-top: 4rem;
  }

  .carousel-item img {
    height: 40vh;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 1.5rem;
    height: 1.5rem;
  }

  .carousel-indicators [data-bs-target] {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 576px) {
  #carouselExampleIndicators {
    height: 30vh;
    margin-top: 3.5rem;
  }

  .carousel-item img {
    height: 30vh;
  }

  .carousel-control-prev,
  .carousel-control-next {
    width: 12%;
  }
}

@media (max-width: 480px) {
  #carouselExampleIndicators {
    height: 25vh;
    margin-top: 3rem;
  }

  .carousel-control-prev-icon,
  .carousel-control-next-icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  .carousel-indicators [data-bs-target] {
    width: 8px;
    height: 8px;
    margin: 0 3px;
  }
}

@media (max-height: 500px) and (orientation: landscape) {
  #carouselExampleIndicators {
    height: 70vh;
  }
}

/* Fix for iOS Safari 100vh issue */
@supports (-webkit-touch-callout: none) {
  #carouselExampleIndicators {
    height: 50vh;
    height: -webkit-fill-available;
  }
}

/* Make sure carousel adapts to very small screens */
@media (max-width: 320px) {
  #carouselExampleIndicators {
    height: 22vh;
  }
}
</style>
