<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="cartCanvas"
    aria-labelledby="cartCanvasLabel"
  >
    <div class="offcanvas-header">
      <h5 class="text-secondary fs-4 fw-bold" id="cartCanvasLabel">
        Your Cart
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <!-- Display Cart Items or "Cart is empty" message -->
      <ul class="list-group mb-4" v-if="cartItems.length > 0">
        <li
          v-for="(lesson, index) in cartItems"
          :key="lesson.id + '-' + index"
          class="list-group-item"
        >
          <!-- Delete button placed on the left -->
          <button class="btn delete-btn" @click="removeItem(lesson.id)">
            <i class="fa-solid fa-trash-can text-danger fs-4"></i>
          </button>

          <div class="cart-item-content">
            <img
              :src="`${apiBaseUrl}/${lesson.image}`"
              alt="Lesson image"
              class="cart-image"
            />
            <div class="cart-item-details">
              <h6 class="fw-bold mb-1">{{ lesson.subject }}</h6>
              <p class="mb-1">
                <small>Location: {{ lesson.location }}</small>
              </p>
              <p class="mb-1">
                <small>Price: £{{ lesson.price }}</small>
              </p>
              <p class="mb-0">
                <small>Quantity: {{ getItemCount(lesson.id) }}</small>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="text-center">
        Your cart is empty. <br /><i
          class="fa-solid fa-cart-shopping orange fs-1 mt-lg-5"
        ></i>
      </p>

      <!-- Checkout Form -->
      <div v-if="cartItems.length > 0" class="checkout-form">
        <h5 class="mb-3 text-center text-md-start">Order Information</h5>
        <form @submit.prevent="submitOrder">
          <!-- Gift Checkbox -->
          <div class="mb-3">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="gift"
                value="true"
                v-model="orderInfo.gift"
              />
              <label class="form-check-label" for="gift">Ship As Gift?</label>
            </div>
          </div>

          <!-- Shipping Method Radio Buttons -->
          <div class="mb-3">
            <label class="d-block mb-2">Shipping Method:</label>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                id="home"
                name="shippingMethod"
                value="Home"
                v-model="orderInfo.method"
              />
              <label class="form-check-label" for="home">Home</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                type="radio"
                class="form-check-input"
                id="business"
                name="shippingMethod"
                value="Business"
                v-model="orderInfo.method"
              />
              <label class="form-check-label" for="business">Business</label>
            </div>
          </div>

          <!-- Personal Details Inputs -->
          <div class="mb-3">
            <label for="fullName" class="form-label">Full Name</label>
            <input
              type="text"
              class="form-control"
              id="fullName"
              v-model="orderInfo.fullName"
              @input="validateFullName"
              required
            />
            <small
              v-if="!isFullNameValid && orderInfo.fullName"
              class="text-danger"
            >
              Full Name must contain letters only.
            </small>
          </div>
          <div class="mb-3">
            <label for="city" class="form-label">City</label>
            <select
              v-model="orderInfo.city"
              id="city"
              class="form-select"
              required
            >
              <option disabled value="">Select a city</option>
              <option v-for="city in cities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="postCode" class="form-label">PostCode</label>
            <input
              type="text"
              class="form-control"
              id="postCode"
              v-model="orderInfo.postCode"
              required
            />
          </div>
          <div class="mb-3">
            <label for="num" class="form-label">Phone Number</label>
            <input
              type="text"
              class="form-control"
              id="num"
              v-model="orderInfo.phoneNum"
              @input="validatePhone"
              required
            />
            <small
              v-if="!isPhoneValid && orderInfo.phoneNum"
              class="text-danger"
            >
              Phone must be number only & 12 digits.
            </small>
          </div>
          <!-- Submit Button -->
          <div class="text-center">
            <button
              type="submit"
              class="btn btn-success"
              :disabled="!isSubmitEnabled"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartCanvas",
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    apiBaseUrl: {
      type: String,
      default:
        "https://vueappliaction-env.eba-qkd3evgp.eu-west-2.elasticbeanstalk.com",
    },
  },
  data() {
    return {
      cities: ["London", "Manchester", "Birmingham", "Edinburgh", "Liverpool"],
      orderInfo: {
        gift: false,
        method: "Home",
        fullName: "",
        city: "",
        postCode: "",
        phoneNum: "",
      },
      isFullNameValid: false,
      isPhoneValid: false,
    };
  },
  computed: {
    isSubmitEnabled() {
      return this.isFullNameValid && this.isPhoneValid;
    },
  },
  methods: {
    removeItem(lessonId) {
      this.$emit("remove-item", lessonId);
    },
    getItemCount(lessonId) {
      return this.cartItems.filter((item) => item.id === lessonId).length;
    },
    validateFullName() {
      this.isFullNameValid = /^[A-Za-z\s]+$/.test(this.orderInfo.fullName);
    },
    validatePhone() {
      this.isPhoneValid = /^\d{12}$/.test(this.orderInfo.phoneNum);
    },
    submitOrder() {
      if (!this.isSubmitEnabled) {
        alert("Please ensure all fields are valid.");
        return;
      }

      const orderData = {
        orderInfo: this.orderInfo,
        lessonId: this.cartItems.map((item) => item.id),
      };

      this.$emit("submit-order", orderData);
    },
  },
};
</script>

<style scoped>
.orange {
  color: #ff8800;
}

.checkout-form {
  padding: 1rem 0;
}

.delete-btn {
  position: absolute;
  right: 10px;
  bottom: 38%;
  transform: translateY(280%);
  display: none;
}

.list-group-item:hover .delete-btn {
  display: inline-block;
}

.cart-item-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-image {
  width: 100%;
  max-width: 320px;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 0.75rem;
}

.cart-item-details {
  width: 100%;
  text-align: center;
}

/* Responsive offcanvas sizing */
@media (min-width: 576px) {
  .offcanvas {
    width: 400px !important;
  }

  .cart-item-content {
    flex-direction: row;
    align-items: flex-start;
  }

  .cart-image {
    width: 150px;
    max-width: 150px;
    margin-right: 1rem;
    margin-bottom: 0;
  }

  .cart-item-details {
    text-align: left;
    flex: 1;
  }
}

/* Improved mobile cart experience */
@media (max-width: 575px) {
  .offcanvas {
    width: 100% !important;
  }

  .offcanvas-header {
    padding: 0.75rem 1rem;
  }

  .offcanvas-body {
    padding: 1rem;
  }

  .list-group-item {
    padding: 2rem 0.75rem 1rem;
    position: relative;
  }
}

@media (max-width: 480px) {
  .delete-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    transform: none;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    z-index: 5;
  }

  .list-group-item:hover .delete-btn {
    display: flex;
  }

  /* Make form controls easier to tap */
  .form-control,
  .form-select,
  .btn {
    min-height: 44px;
  }

  .form-check-input {
    width: 1.2em;
    height: 1.2em;
    margin-top: 0.25em;
  }

  /* Always show delete button on mobile for better UX */
  .delete-btn {
    display: flex;
  }
}

/* Better scrolling in the cart area */
.offcanvas-body {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  max-height: calc(100vh - 56px);
}

/* Make sure images scale properly */
.list-group-item img {
  max-width: 100%;
  height: auto;
}

/* Ensure form controls are fully visible */
@media (max-height: 640px) {
  .offcanvas-body {
    padding-bottom: 4rem;
  }
}
</style>
