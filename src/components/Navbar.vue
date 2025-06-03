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

      <!-- Search Bar (visible on 768px+) -->
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

      <!-- Navigation links (desktop only - 992px+) -->
      <ul class="nav-links desktop-nav">
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
          <button class="dropdown-toggle" @click="toggleDropdown">24/7 Help</button>
          <ul class="dropdown-menu" :class="{ show: dropdownOpen }">
            <li class="dropdown-item">Office line: 07855 464 55 755</li>
            <li>
              <a class="dropdown-item" href="https://mail.google.com">Email:parentpay@gmail.com</a>
            </li>
          </ul>
        </li>
      </ul>

      <!-- Cart button (tablet and up - 768px+) -->
      <button type="button" class="cart-button" @click="toggleCart">
        <i class="fa-solid fa-cart-shopping orange"></i> Cart
        {{ cartCount }}
      </button>

      <!-- Mobile/Tablet toggle button (below 992px) -->
      <button class="nav-toggler" type="button" @click="toggleMobileMenu">
        <span class="toggler-icon"></span>
      </button>

      <!-- Mobile/Tablet menu (below 992px) -->
      <div class="mobile-nav" :class="{ show: mobileMenuOpen }">
        <ul class="mobile-nav-links">
          <li class="mobile-nav-item">
            <a class="mobile-nav-link" aria-current="page" href="#carousel" @click="closeMobileMenu"
              >Home</a
            >
          </li>
          <li class="mobile-nav-item">
            <a class="mobile-nav-link" href="#classes" @click="closeMobileMenu">Classes</a>
          </li>
          <li class="mobile-nav-item">
            <a class="mobile-nav-link" href="#contact" @click="closeMobileMenu">Contact Us</a>
          </li>
          <li class="mobile-nav-item">
            <button class="mobile-dropdown-toggle" @click="toggleDropdown">24/7 Help</button>
            <ul class="mobile-dropdown-menu" :class="{ show: dropdownOpen }">
              <li class="mobile-dropdown-item">Office line: 07855 464 55 755</li>
              <li>
                <a class="mobile-dropdown-item" href="https://mail.google.com"
                  >Email:parentpay@gmail.com</a
                >
              </li>
            </ul>
          </li>

          <!-- Cart in mobile menu (only show on small devices where cart button is hidden) -->
          <li class="mobile-nav-item mobile-cart-item">
            <button type="button" class="mobile-cart-button" @click="toggleCart">
              <i class="fa-solid fa-cart-shopping orange"></i> Cart ({{ cartCount }})
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import logoImage from '@/assets/logo.png'

export default {
  name: 'MainNavbar',
  props: {
    siteName: {
      type: String,
      default: 'ParentPay',
    },
    cartCount: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      logoUrl: logoImage,
      searchQuery: '',
      mobileMenuOpen: false,
      dropdownOpen: false,
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery)
    },
    toggleCart() {
      this.$emit('toggle-cart')
      this.closeMobileMenu()
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
      this.dropdownOpen = false
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery.trim() === '') {
        this.$emit('clear-search')
      }
    },
  },
}
</script>

<style scoped>
/* Navbar Styling */
.navbar {
  background-color: #0d6efd;
  padding: 0.75rem 1rem;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--navbar-height, 80px);
  display: flex;
  align-items: center;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  height: 100%;
  position: relative;
}

.navbar-brand {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.site-name {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0;
  font-family: 'Luckiest Guy', cursive;
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

/* Search Form */
.search-form {
  position: relative;
  display: flex;
  flex-grow: 1;
  max-width: 300px;
}

.search-input {
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border-radius: 4px;
  border: 1px solid #ddd;
  width: 100%;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: #ff8800;
  box-shadow: 0 0 0 2px rgba(255, 136, 0, 0.2);
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff8800;
  cursor: pointer;
}

/* Desktop Navigation Links (992px+) */
.desktop-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  display: block;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-link:hover {
  text-decoration: underline;
  color: #f8f9fa;
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
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.dropdown-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
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
  font-weight: 600;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
}

.cart-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.cart-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.orange {
  color: #ff8800;
  font-size: 1.25rem;
}

/* Toggle Button */
.nav-toggler {
  display: none;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  margin-left: 0.5rem;
}

.toggler-icon {
  display: block;
  width: 25px;
  height: 3px;
  background-color: white;
  position: relative;
  transition: all 0.3s ease;
}

.toggler-icon::before,
.toggler-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: white;
  left: 0;
  transition: all 0.3s ease;
}

.toggler-icon::before {
  top: -8px;
}

.toggler-icon::after {
  bottom: -8px;
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #0d6efd;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  z-index: 999;
}

.mobile-nav.show {
  display: block;
}

.mobile-nav-links {
  list-style: none;
  margin: 0;
  padding: 1rem;
}

.mobile-nav-item {
  margin: 0.5rem 0;
}

.mobile-nav-link {
  color: white;
  text-decoration: none;
  padding: 0.75rem 0;
  display: block;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.mobile-nav-link:hover {
  color: #f8f9fa;
  text-decoration: underline;
}

.mobile-dropdown-toggle {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
}

.mobile-dropdown-menu {
  display: none;
  list-style: none;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.mobile-dropdown-menu.show {
  display: block;
}

.mobile-dropdown-item {
  padding: 0.5rem 1rem;
  color: white;
  font-size: 0.9rem;
}

a.mobile-dropdown-item {
  display: block;
  text-decoration: none;
}

a.mobile-dropdown-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-cart-button {
  background: transparent;
  color: white;
  border: 1px solid white;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  text-align: left;
  font-size: 1.1rem;
}

.mobile-cart-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Desktop (992px and up) - Show everything, hide toggle */
@media (min-width: 992px) {
  .search-form {
    max-width: 250px;
    margin: 0 1rem;
  }

  .nav-toggler {
    display: none;
  }
}

/* Tablet (768px to 991px) - Hide desktop nav, show toggle, searchbar and cart */
@media (min-width: 768px) and (max-width: 991px) {
  .desktop-nav {
    display: none;
  }

  .nav-toggler {
    display: block;
  }

  .search-form {
    max-width: 200px;
  }

  .cart-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  /* Hide mobile cart in menu since cart button is visible */
  .mobile-cart-item {
    display: none;
  }
}

/* Small devices (below 768px) - Hide desktop nav and cart, show toggle and searchbar only */
@media (max-width: 767px) {
  .desktop-nav {
    display: none;
  }

  .cart-button {
    display: none;
  }

  .nav-toggler {
    display: block;
  }

  .search-form {
    max-width: none;
    flex-grow: 1;
  }

  .container {
    gap: 0.5rem;
  }

  /* Show mobile cart in menu since cart button is hidden */
  .mobile-cart-item {
    display: block;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding-top: 0.5rem;
    margin-top: 1rem;
  }
}

/* Very small screens (576px and below) */
@media (max-width: 576px) {
  .navbar-brand .site-name {
    font-size: 1.2rem;
  }

  .logo {
    width: 35px;
  }

  .navbar {
    padding: 0.5rem 0.75rem;
  }

  .search-input {
    font-size: 0.85rem;
    padding: 0.4rem 1.8rem 0.4rem 0.6rem;
  }

  .search-icon {
    right: 8px;
    font-size: 0.9rem;
  }
}

/* Extra small screens (400px and below) */
@media (max-width: 400px) {
  .navbar-brand .site-name {
    font-size: 1rem;
  }

  .logo {
    width: 30px;
  }

  .search-input {
    font-size: 0.8rem;
    padding: 0.35rem 1.6rem 0.35rem 0.5rem;
  }
}
</style>
