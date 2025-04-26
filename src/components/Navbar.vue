<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container-fluid">
      <!-- Logo and Site Name -->
      <div class="navbar-brand d-flex align-items-center" id="fullLogo">
        <img src="/Vue/asset/logo.jpg" alt="ParentPay Logo" class="logo" />
        <h1 class="text-white fs-3 luckiest-guy-regular mb-0">
          {{ siteName }}
        </h1>
      </div>

      <!-- Mobile toggle button -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Combined navigation elements -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <!-- Search Bar -->
        <form
          class="position-relative d-flex mb-2 mb-lg-0 mt-2 mt-lg-0 mx-lg-3"
          role="search"
          @submit.prevent="search"
        >
          <input
            v-model="searchQuery"
            class="form-control search-input ps-3"
            id="search"
            type="search"
            placeholder="Search lessons"
            aria-label="Search"
          />
          <i class="fa-solid fa-search search-icon"></i>
        </form>

        <!-- Navbar links -->
        <ul class="navbar-nav ms-lg-4 mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link text-white"
              aria-current="page"
              href="#carouselExampleIndicators"
              >Home</a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#classes">Classes</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" href="#contact">Contact Us</a>
          </li>

          <li class="nav-item dropdown">
            <button
              class="btn btn-outline-light dropdown-toggle no-border"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              24/7 Help
            </button>
            <ul class="dropdown-menu dropdown-menu-secondary mt-3">
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
        <button
          type="button"
          class="btn btn-outline-light cart-button ms-lg-auto mt-2 mt-lg-0"
          @click="toggleCart"
          :disabled="cartIsEmpty"
        >
          <i class="fa-solid fa-cart-shopping orange fs-5"></i> Cart
          {{ cartCount }}
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  props: {
    siteName: {
      type: String,
      default: "ParentPay",
    },
    cartCount: {
      type: Number,
      default: 0,
    },
    cartIsEmpty: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    search() {
      this.$emit("search", this.searchQuery);
    },
    toggleCart() {
      this.$emit("toggle-cart");
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
.logo {
  width: 45px;
  height: auto;
  border-radius: 50%;
  object-fit: cover;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.orange {
  color: #ff8800;
}

.no-border {
  border: none;
}

.no-border:hover,
.no-border:active,
.no-border:focus {
  background-color: transparent !important;
  color: #ffffff;
}

.search-input {
  padding-right: 35px;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #ff8800;
  cursor: pointer;
}

/* Enhanced mobile navbar styles */
.navbar {
  padding: 0.5rem 1rem;
}

.navbar-toggler {
  z-index: 100;
  position: relative;
}

.navbar-toggler:focus {
  outline: none;
}

/* Improved mobile menu animation */
.navbar-collapse {
  transition: all 0.3s ease-in-out;
}

/* Prevent content shift when toggling mobile menu */
@media (max-width: 991.98px) {
  .navbar-collapse {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    background-color: #0d6efd;
    padding: 1rem;
    z-index: 99;
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
  }

  .navbar-nav {
    padding-top: 0.5rem;
  }

  .navbar-nav .nav-item {
    margin-bottom: 0.5rem;
  }

  .search-input {
    width: 100%;
  }

  .navbar-brand h1 {
    font-size: 1.2rem !important;
  }

  .cart-button {
    margin-top: 0.75rem !important;
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .navbar-brand h1 {
    font-size: 1.2rem !important;
  }

  .logo {
    width: 35px;
  }

  .search-input {
    width: 100%;
  }

  /* Make navbar more compact on very small screens */
  .navbar {
    padding: 0.4rem 0.75rem;
  }

  /* Adjust logo position */
  #fullLogo {
    margin-left: 0;
  }
}

/* Larger screens */
@media (min-width: 992px) {
  .search-input {
    width: 200px;
  }
}
</style>
