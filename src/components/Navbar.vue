<template>
  <nav class="navbar fixed-top">
    <div class="container">
      <!-- Logo and Site Name -->
      <div class="navbar-brand" id="fullLogo">
        <img :src="logoUrl" alt="ParentPay Logo" class="logo" />
        <h1 class="site-name">
          {{ siteName }}
        </h1>
      </div>

      <!-- Mobile toggle button -->
      <button class="nav-toggler" type="button" @click="toggleMobileMenu">
        <span class="toggler-icon"></span>
      </button>

      <!-- Combined navigation elements -->
      <div class="nav-content" :class="{ show: mobileMenuOpen }">
        <!-- Search Bar -->
        <form class="search-form" role="search" @submit.prevent="search">
          <input
            v-model="searchQuery"
            class="search-input"
            id="search"
            type="search"
            placeholder="Search lessons"
            aria-label="Search"
          />
          <i class="fa-solid fa-search search-icon"></i>
        </form>

        <!-- Navbar links -->
        <ul class="nav-links">
          <li class="nav-item">
            <a class="nav-link" aria-current="page" href="#carousel">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#classes">Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact Us</a>
          </li>

          <li class="nav-item dropdown">
            <button class="dropdown-toggle" @click="toggleDropdown">
              24/7 Help
            </button>
            <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
              <li class="dropdown-item">Office line: 07855 464 55 755</li>
              <li>
                <a class="dropdown-item" href="https://mail.google.com"
                  >Email:parentpay@gmail.com</a
                >
              </li>
            </ul>
          </li>
        </ul>

        <!-- Cart button -->
        <button type="button" class="cart-button" @click="toggleCart">
          <i class="fa-solid fa-cart-shopping orange"></i> Cart
          {{ cartCount }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import logoImage from "@/assets/logo.jpg";

export default {
  name: "MainNavbar",
  props: {
    siteName: {
      type: String,
      default: "ParentPay",
    },
    cartCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      logoUrl: logoImage,
      searchQuery: "",
      mobileMenuOpen: false,
      dropdownOpen: false,
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchQuery);
    },
    toggleCart() {
      this.$emit("toggle-cart");
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery.trim() === "") {
        this.$emit("clear-search");
      }
    },
  },
};
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  background-color: #0d6efd;
  padding: 0.5rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.site-name {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0;
  font-family: "Luckiest Guy", cursive;
}

.logo {
  width: 45px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  animation: spin 4s linear infinite;
  margin-right: 10px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Navigation Content */
.nav-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

/* Search Form */
.search-form {
  position: relative;
  display: flex;
  margin: 0 1rem;
}

.search-input {
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 200px;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff8800;
  cursor: pointer;
}

/* Navigation Links */
.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  margin: 0 10px;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0;
  display: block;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-menu {
  display: none;
  position: absolute;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  min-width: 200px;
  z-index: 1001;
  list-style: none;
  padding: 0.5rem 0;
}

.dropdown-menu.show {
  display: block;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  color: #333;
}

a.dropdown-item {
  display: block;
  text-decoration: none;
}

a.dropdown-item:hover {
  background-color: #f8f9fa;
}

/* Cart Button */
.cart-button {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
}

.cart-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.orange {
  color: #ff8800;
  font-size: 1.25rem;
}

/* Toggle Button for Mobile */
.nav-toggler {
  display: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Mobile Styles */
@media (max-width: 991px) {
  .nav-toggler {
    display: block;
    z-index: 100;
  }

  .toggler-icon {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px;
    background-color: white;
    position: relative;
  }

  .toggler-icon::before,
  .toggler-icon::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: white;
    left: 0;
  }

  .toggler-icon::before {
    top: -8px;
  }

  .toggler-icon::after {
    bottom: -8px;
  }

  .nav-content {
    display: none;
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    background-color: #0d6efd;
    padding: 1rem;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  .nav-content.show {
    display: flex;
  }

  .search-form {
    width: 100%;
    margin: 1rem 0;
  }

  .search-input {
    width: 100%;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
  }

  .nav-item {
    margin: 0.5rem 0;
  }

  .cart-button {
    margin: 1rem 0 0 0;
    width: 100%;
  }
}

/* Small screens */
@media (max-width: 576px) {
  .navbar-brand h1 {
    font-size: 1.2rem !important;
  }

  .logo {
    width: 35px;
  }

  .navbar {
    padding: 0.4rem 0.75rem;
  }
}

/* Larger screens */
@media (min-width: 992px) {
  .search-input {
    width: 200px;
  }
}
</style>
