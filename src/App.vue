<template>
  <Navbar
    :siteName="siteName"
    :cartCount="cartItems.length"
    :cartIsEmpty="cartItems.length === 0"
    @search="handleSearch"
    @clear-search="clearSearch"
    @toggle-cart="toggleCart"
  />

  <CarouselHero :carouselImages="carouselImages" />

  <LessonList
    :lessons="lessons"
    :searchResults="searchResults"
    :searchActive="searchActive"
    :apiBaseUrl="apiBaseUrl"
    @add-to-cart="addToCart"
    @view-image="viewImage"
  />

  <CartCanvas
    :cartItems="cartItems"
    :apiBaseUrl="apiBaseUrl"
    :class="{ show: showCart }"
    @remove-item="removeFromCart"
    @submit-order="processOrder"
  />

  <FooterSection :siteName="siteName" />

  <!-- Image Modal -->
  <div
    v-if="showImageModal"
    class="image-modal"
    @click="showImageModal = false"
  >
    <span class="close-modal">&times;</span>
    <img
      :src="`${apiBaseUrl}/${selectedImage}`"
      class="modal-content"
      alt="Enlarged view"
    />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import CarouselHero from "./components/CarouselHero.vue";
import LessonList from "./components/LessonList.vue";
import CartCanvas from "./components/CartCanvas.vue";
import FooterSection from "./components/FooterSection.vue";

export default {
  name: "App",
  components: {
    Navbar,
    CarouselHero,
    LessonList,
    CartCanvas,
    FooterSection,
  },
  data() {
    return {
      siteName: "ParentPay",
      apiBaseUrl: "https://myserver-xy36.onrender.com",
      cartItems: [],
      lessons: [],
      searchResults: [],
      searchActive: false,
      carouselImages: [
        "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1581078426770-6d336e5de7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
        "https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1050&q=80",
      ],
      selectedImage: null,
      showImageModal: false,
      showCart: false,
    };
  },
  mounted() {
    // Load sample data directly
    this.loadSampleData();
    console.log("Sample data loaded:", this.lessons);

    // Add event listener for ESC key to close cart
    document.addEventListener("keydown", this.handleEscKey);

    // Add event listener for close button in cart
    this.setupCartCloseButton();
  },
  beforeUnmount() {
    // Remove event listeners
    document.removeEventListener("keydown", this.handleEscKey);
  },
  methods: {
    async fetchLessons() {
      try {
        console.log("Fetching lessons from:", `${this.apiBaseUrl}/lessons`);
        const response = await fetch(`${this.apiBaseUrl}/lessons`);
        if (!response.ok) {
          throw new Error("Failed to fetch lessons");
        }
        const data = await response.json();
        console.log("Fetched lessons:", data);
        this.lessons = data;
      } catch (error) {
        console.error("Error fetching lessons:", error);
        // Use sample data if API fails
        this.loadSampleData();
      }
    },
    loadSampleData() {
      console.log("Loading sample data");
      // Sample data in case API is not available
      this.lessons = [
        {
          id: 1,
          subject: "Mathematics",
          location: "Room 101",
          slots: 10,
          price: 25,
          rating: 4,
          image:
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        },
        {
          id: 2,
          subject: "Science",
          location: "Lab 201",
          slots: 8,
          price: 30,
          rating: 5,
          image:
            "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        },
        {
          id: 3,
          subject: "English",
          location: "Library",
          slots: 15,
          price: 20,
          rating: 3,
          image:
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        },
        {
          id: 4,
          subject: "Art",
          location: "Studio 302",
          slots: 2,
          price: 35,
          rating: 4,
          image:
            "https://images.unsplash.com/photo-1513364776144-60967b0f800f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        },
      ];
      console.log("Sample data loaded successfully:", this.lessons);
    },
    handleSearch(query) {
      if (!query.trim()) {
        this.clearSearch();
        return;
      }

      const searchTerm = query.toLowerCase();
      this.searchResults = this.lessons.filter(
        (lesson) =>
          lesson.subject.toLowerCase().includes(searchTerm) ||
          lesson.location.toLowerCase().includes(searchTerm)
      );
      this.searchActive = true;
    },
    clearSearch() {
      this.searchResults = [];
      this.searchActive = false;
    },
    addToCart(lesson) {
      // Make a copy of the lesson to avoid reference issues
      const lessonCopy = { ...lesson };
      // Decrease available slots when adding to cart
      const lessonIndex = this.lessons.findIndex((l) => l.id === lesson.id);
      if (lessonIndex !== -1 && this.lessons[lessonIndex].slots > 0) {
        this.lessons[lessonIndex].slots--;
        this.cartItems.push(lessonCopy);
      }
    },
    removeFromCart(lessonId) {
      // Find index of the lesson in cart
      const cartIndex = this.cartItems.findIndex(
        (item) => item.id === lessonId
      );
      if (cartIndex !== -1) {
        // Increase available slots when removing from cart
        const lessonIndex = this.lessons.findIndex((l) => l.id === lessonId);
        if (lessonIndex !== -1) {
          this.lessons[lessonIndex].slots++;
        }
        // Remove from cart
        this.cartItems.splice(cartIndex, 1);
      }
    },
    toggleCart() {
      // Toggle cart visibility
      this.showCart = !this.showCart;

      // When showing cart, add class to body to prevent scrolling
      if (this.showCart) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    },
    handleEscKey(event) {
      // Close cart when ESC key is pressed
      if (event.key === "Escape" && this.showCart) {
        this.showCart = false;
        document.body.classList.remove("overflow-hidden");
      }

      // Close image modal when ESC key is pressed
      if (event.key === "Escape" && this.showImageModal) {
        this.showImageModal = false;
      }
    },
    setupCartCloseButton() {
      // Set up the close button in the cart to work with our custom implementation
      setTimeout(() => {
        const closeButton = document.querySelector(
          ".cart-canvas .close-button"
        );
        if (closeButton) {
          closeButton.addEventListener("click", () => {
            this.showCart = false;
            document.body.classList.remove("overflow-hidden");
          });
        }
      }, 500);
    },
    viewImage(image) {
      this.selectedImage = image;
      this.showImageModal = true;
    },
    processOrder(orderData) {
      // Handle order submission
      console.log("Order submitted:", orderData);
      // Clear cart after successful order
      this.cartItems = [];
      // Close cart
      this.showCart = false;
      document.body.classList.remove("overflow-hidden");
      // Show confirmation
      alert("Your order has been placed successfully!");
    },
  },
};
</script>
