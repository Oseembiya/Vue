<template>
  <div>
    <navbar
      :site-name="siteName"
      :cart-count="cartCount"
      :cart-is-empty="cart.length <= 0"
      @search="performSearch"
      @toggle-cart="toggleCart"
      @clear-search="clearSearch"
    />

    <cart-canvas
      :cart-items="cartLessons"
      :api-base-url="apiBaseUrl"
      @remove-item="removeFromCart"
      @submit-order="submitOrder"
    />

    <carousel-hero :carousel-images="carouselImages" />

    <lesson-list
      :lessons="lessons"
      :search-results="searchResults"
      :search-active="searchQuery.trim() !== ''"
      :api-base-url="apiBaseUrl"
      @add-to-cart="addToCart"
      @view-image="viewImage"
    />
    <footer-section :site-name="siteName" />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import CartCanvas from "./components/CartCanvas.vue";
import CarouselHero from "./components/CarouselHero.vue";
import LessonList from "./components/LessonList.vue";
import FooterSection from "./components/FooterSection.vue";
import "./styles/style.css"; // Updated import path

export default {
  name: "App",
  components: {
    Navbar,
    CartCanvas,
    CarouselHero,
    LessonList,
    FooterSection,
  },
  data() {
    return {
      siteName: "ParentPay",
      apiBaseUrl:
        "https://vueappliaction-env.eba-qkd3evgp.eu-west-2.elasticbeanstalk.com",
      lessons: [],
      cart: [],
      searchQuery: "",
      searchResults: [],
      carouselImages: [
        "/Vue/asset/carousel-1.jpg",
        "/Vue/asset/carousel-2.jpg",
        "/Vue/asset/carousel-3.jpg",
      ],
    };
  },
  computed: {
    cartCount() {
      return this.cart.length;
    },
    cartLessons() {
      return this.lessons.filter((lesson) => this.cart.includes(lesson.id));
    },
  },
  created() {
    this.fetchLessons();
  },
  methods: {
    fetchLessons() {
      fetch(`${this.apiBaseUrl}/lessons`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          this.lessons = data;
        })
        .catch((error) => {
          console.error("Error fetching lessons:", error);
        });
    },
    addToCart(lesson) {
      if (lesson.slots > 0) {
        this.cart.push(lesson.id);
        // Find the lesson in the lessons array and decrement its slots
        const lessonIndex = this.lessons.findIndex(
          (item) => item.id === lesson.id
        );
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].slots--;
        }
      }
    },
    removeFromCart(lessonId) {
      // Find the lesson in the lessons array
      const lesson = this.lessons.find((item) => item.id === lessonId);
      if (lesson) {
        // Count how many of this item are in the cart
        const itemCount = this.cart.filter((id) => id === lessonId).length;
        // Restore the slots
        lesson.slots += itemCount;
      }
      // Remove all instances of this lesson ID from the cart
      this.cart = this.cart.filter((id) => id !== lessonId);
    },
    toggleCart() {
      const cartCanvas = new bootstrap.Offcanvas(
        document.getElementById("cartCanvas")
      );
      cartCanvas.toggle();
    },
    performSearch(query) {
      this.searchQuery = query;
      if (!query.trim()) {
        this.searchResults = [];
        return;
      }

      fetch(`${this.apiBaseUrl}/search?q=${encodeURIComponent(query)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("No lessons found");
          }
          return response.json();
        })
        .then((data) => {
          this.searchResults = data.filter(
            (lesson) =>
              lesson.subject.toLowerCase().includes(query.toLowerCase()) ||
              lesson.location.toLowerCase().includes(query.toLowerCase())
          );
        })
        .catch((error) => {
          console.error("Search error:", error);
          this.searchResults = [];
        });
    },
    clearSearch() {
      this.searchQuery = "";
      this.searchResults = [];
    },
    viewImage(image) {
      // Implementation would depend on how you want to display the image
      // For now, we'll just log it
      console.log("View image:", image);
    },
    submitOrder(orderData) {
      fetch(`${this.apiBaseUrl}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error || "Failed to submit order.");
            });
          }
          return response.json();
        })
        .then((result) => {
          alert("Order submitted successfully!");
          // Clear the cart and reset the form
          this.cart = [];
          this.toggleCart(); // Close the cart
        })
        .catch((error) => {
          console.error("Error submitting order:", error);
          alert(error.message || "Error submitting order.");
        });
    },
  },
};
</script>
