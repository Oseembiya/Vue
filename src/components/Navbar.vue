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
      <form class="search-form desktop-search" role="search" @submit.prevent="search">
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

      <!-- Mobile Search Icon (visible on small screens) -->
      <button class="mobile-search-btn" @click="toggleMobileSearch" type="button">
        <i class="fa-solid fa-search"></i>
      </button>

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
      <button
        class="nav-toggler"
        type="button"
        @click="toggleMobileMenu"
        :class="{ active: mobileMenuOpen }"
        :aria-label="mobileMenuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="mobileMenuOpen"
      >
        <span class="toggler-icon">
          <span class="line line-1"></span>
          <span class="line line-2"></span>
          <span class="line line-3"></span>
        </span>
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

    <!-- Mobile Search Overlay -->
    <div
      class="mobile-search-overlay"
      :class="{ active: mobileSearchOpen }"
      @click="closeMobileSearch"
    >
      <div class="mobile-search-container" @click.stop>
        <div class="mobile-search-header">
          <h3>Search Lessons</h3>
          <button class="close-search-btn" @click="closeMobileSearch">
            <i class="fa-solid fa-times"></i>
          </button>
        </div>
        <form class="mobile-search-form" @submit.prevent="handleMobileSearch">
          <div class="mobile-search-input-group">
            <input
              v-model="mobileSearchQuery"
              ref="mobileSearchInput"
              class="mobile-search-input"
              type="search"
              placeholder="Search for lessons..."
              aria-label="Search lessons"
              autocomplete="off"
            />
            <button type="submit" class="mobile-search-submit-btn">
              <i class="fa-solid fa-search"></i>
            </button>
          </div>
        </form>
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
      mobileSearchQuery: '',
      mobileMenuOpen: false,
      mobileSearchOpen: false,
      dropdownOpen: false,
    }
  },
  methods: {
    search() {
      this.$emit('search', this.searchQuery)
    },
    handleMobileSearch() {
      this.$emit('search', this.mobileSearchQuery)
      this.closeMobileSearch()
    },
    toggleCart() {
      this.$emit('toggle-cart')
      this.closeMobileMenu()
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
      // Close search if menu is opened
      if (this.mobileMenuOpen) {
        this.mobileSearchOpen = false
      }
    },
    toggleMobileSearch() {
      this.mobileSearchOpen = !this.mobileSearchOpen
      // Close menu if search is opened
      if (this.mobileSearchOpen) {
        this.mobileMenuOpen = false
        this.dropdownOpen = false
        // Focus on search input when opened
        this.$nextTick(() => {
          if (this.$refs.mobileSearchInput) {
            this.$refs.mobileSearchInput.focus()
          }
        })
      }
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
      this.dropdownOpen = false
    },
    closeMobileSearch() {
      this.mobileSearchOpen = false
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen
    },
    handleEscapeKey(event) {
      if (event.key === 'Escape') {
        if (this.mobileSearchOpen) {
          this.closeMobileSearch()
        } else if (this.mobileMenuOpen) {
          this.closeMobileMenu()
        }
      }
    },
  },
  mounted() {
    document.addEventListener('keydown', this.handleEscapeKey)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleEscapeKey)
  },
  watch: {
    searchQuery(newQuery) {
      if (newQuery.trim() === '') {
        this.$emit('clear-search')
      }
    },
    mobileSearchQuery(newQuery) {
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
  height: 65px;
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

/* Desktop Search Form */
.desktop-search {
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
  font-size: 1.1rem;
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

/* Mobile Search Button */
.mobile-search-btn {
  display: none;
  background: transparent;
  border: 1px solid white;
  color: #ff8800;
  padding: 0.3rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 1rem;
}

.mobile-search-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Mobile Search Overlay */
.mobile-search-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1050;
  display: none;
  align-items: flex-start;
  justify-content: center;
  padding-top: var(--navbar-height, 80px);
}

.mobile-search-overlay.active {
  display: flex;
}

.mobile-search-container {
  background: white;
  width: 90%;
  max-width: 500px;
  margin-top: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
}

.mobile-search-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.25rem;
}

.close-search-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: color 0.2s ease;
}

.close-search-btn:hover {
  color: #333;
}

.mobile-search-form {
  padding: 1.5rem;
}

.mobile-search-input-group {
  display: flex;
  gap: 0.5rem;
}

.mobile-search-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
}

.mobile-search-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
}

.mobile-search-submit-btn {
  background: #007bff;
  color: white;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.mobile-search-submit-btn:hover {
  background: #0056b3;
}

/* Desktop Navigation Links (992px+) */
.desktop-nav {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem;
  display: block;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

/* Dropdown */
.dropdown {
  position: relative;
}

.dropdown:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.dropdown-toggle {
  background: transparent;
  color: white;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s ease;
  white-space: nowrap;
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
  border: 2px solid transparent;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  margin-left: 0.5rem;
  border-radius: 6px;
  transition: all 0.3s ease;
  position: relative;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-toggler:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
}

.nav-toggler:focus {
  outline: none;
  border-color: #ff8800;
  box-shadow: 0 0 0 2px rgba(255, 136, 0, 0.3);
}

.toggler-icon {
  display: block;
  width: 22px;
  height: 16px;
  position: relative;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
}

.line {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: white;
  border-radius: 2px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: 0.3s ease-in-out;
}

.line-1 {
  top: 0px;
  transform-origin: left center;
}

.line-2 {
  top: 7px;
  transform-origin: left center;
}

.line-3 {
  top: 14px;
  transform-origin: left center;
}

/* Animation when active (menu open) */
.nav-toggler.active .line-1 {
  transform: rotate(45deg);
  top: -1px;
  left: 4px;
}

.nav-toggler.active .line-2 {
  width: 0%;
  opacity: 0;
}

.nav-toggler.active .line-3 {
  transform: rotate(-45deg);
  top: 15px;
  left: 4px;
}

/* Mobile Navigation */
.mobile-nav {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(-10px);
  width: 100vw;
  background-color: #0d6efd;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  z-index: 999;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.mobile-nav.show {
  max-height: 400px;
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.mobile-nav-links {
  list-style: none;
  margin: 0 auto;
  padding: 1rem;
  max-width: 1200px;
  width: 100%;
}

.mobile-nav-item {
  margin: 0.5rem 0;
  max-width: 110px;
}

.mobile-nav-link {
  color: white;
  text-decoration: none;
  padding: 0.75rem 0;
  display: block;
  font-weight: 600;
  font-size: 1rem;
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
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  width: 100%;
  max-width: 200px;
  text-align: left;
  font-size: 1rem;
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
  max-width: 200px;
  text-align: left;
  font-size: 1.1rem;
}

.mobile-cart-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* Desktop (992px and up) - Show everything, hide toggle and mobile search */
@media (min-width: 992px) {
  .desktop-search {
    max-width: 250px;
    margin: 0 1rem;
  }

  .nav-toggler,
  .mobile-search-btn {
    display: none;
  }
}

/* Tablet (768px to 991px) - Hide desktop nav, show toggle, searchbar and cart */
@media (min-width: 768px) and (max-width: 991px) {
  .desktop-nav {
    display: none;
  }

  .nav-toggler {
    display: flex;
  }

  .desktop-search {
    max-width: 200px;
  }

  .cart-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }

  .mobile-search-btn {
    display: none;
  }

  /* Hide mobile cart in menu since cart button is visible */
  .mobile-cart-item {
    display: none;
  }
}

/* Small devices (below 768px) - Hide desktop nav and cart, show mobile search icon */
@media (max-width: 767px) {
  .desktop-nav,
  .cart-button,
  .desktop-search {
    display: none;
  }

  .mobile-search-btn {
    display: block;
  }

  .nav-toggler {
    display: flex;
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

  .mobile-search-container {
    width: 95%;
    margin-top: 1rem;
  }

  .mobile-search-header {
    padding: 0.75rem 1rem;
  }

  .mobile-search-form {
    padding: 1rem;
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

  .mobile-search-header h3 {
    font-size: 1.1rem;
  }

  .mobile-search-input,
  .mobile-search-submit-btn {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>
