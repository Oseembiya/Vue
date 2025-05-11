<template>
  <div
    class="cart-canvas"
    tabindex="-1"
    id="cartCanvas"
    aria-labelledby="cartCanvasLabel"
  >
    <div class="canvas-header">
      <h5 class="canvas-title" id="cartCanvasLabel">Your Cart</h5>
      <button
        type="button"
        class="close-button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="canvas-body">
      <!-- Display Cart Items or "Cart is empty" message -->
      <ul class="cart-list" v-if="cartItems.length > 0">
        <li
          v-for="(lesson, index) in cartItems"
          :key="lesson.id + '-' + index"
          class="cart-item"
        >
          <!-- Delete button placed on the left -->
          <button class="delete-btn" @click="removeItem(lesson.id)">
            <i class="fa-solid fa-trash-can delete-icon"></i>
          </button>

          <div class="cart-item-content">
            <img
              :src="`${apiBaseUrl}/${lesson.image}`"
              alt="Lesson image"
              class="cart-image"
            />
            <div class="cart-item-details">
              <h6 class="item-title">{{ lesson.subject }}</h6>
              <p class="item-info">
                <small>Location: {{ lesson.location }}</small>
              </p>
              <p class="item-info">
                <small>Price: £{{ lesson.price }}</small>
              </p>
              <p class="item-info">
                <small>Quantity: {{ getItemCount(lesson.id) }}</small>
              </p>
            </div>
          </div>
        </li>
      </ul>
      <p v-else class="empty-cart-message">
        Your cart is empty. <br /><i
          class="fa-solid fa-cart-shopping orange cart-icon"
        ></i>
      </p>

      <!-- Checkout Form -->
      <div v-if="cartItems.length > 0" class="checkout-form">
        <h5 class="form-title">Order Information</h5>
        <form @submit.prevent="submitOrder">
          <!-- Gift Checkbox -->
          <div class="form-group">
            <div class="checkbox-field">
              <input
                type="checkbox"
                class="form-checkbox"
                id="gift"
                value="true"
                v-model="orderInfo.gift"
              />
              <label class="checkbox-label" for="gift">Ship As Gift?</label>
            </div>
          </div>

          <!-- Shipping Method Radio Buttons -->
          <div class="form-group">
            <label class="radio-group-label">Shipping Method:</label>
            <div class="radio-options">
              <div class="radio-field">
                <input
                  type="radio"
                  class="form-radio"
                  id="home"
                  name="shippingMethod"
                  value="Home"
                  v-model="orderInfo.method"
                />
                <label class="radio-label" for="home">Home</label>
              </div>
              <div class="radio-field">
                <input
                  type="radio"
                  class="form-radio"
                  id="business"
                  name="shippingMethod"
                  value="Business"
                  v-model="orderInfo.method"
                />
                <label class="radio-label" for="business">Business</label>
              </div>
            </div>
          </div>

          <!-- Personal Details Inputs -->
          <div class="form-group">
            <label for="fullName" class="form-label">Full Name</label>
            <input
              type="text"
              class="form-input"
              id="fullName"
              v-model="orderInfo.fullName"
              @input="validateFullName"
              required
            />
            <small
              v-if="!isFullNameValid && orderInfo.fullName"
              class="error-message"
            >
              Full Name must contain letters only.
            </small>
          </div>
          <div class="form-group">
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
          <div class="form-group">
            <label for="postCode" class="form-label">PostCode</label>
            <input
              type="text"
              class="form-input"
              id="postCode"
              v-model="orderInfo.postCode"
              required
            />
          </div>
          <div class="form-group">
            <label for="num" class="form-label">Phone Number</label>
            <input
              type="text"
              class="form-input"
              id="num"
              v-model="orderInfo.phoneNum"
              @input="validatePhone"
              required
            />
            <small
              v-if="!isPhoneValid && orderInfo.phoneNum"
              class="error-message"
            >
              Phone must be number only & 12 digits.
            </small>
          </div>
          <!-- Submit Button -->
          <div class="submit-container">
            <button
              type="submit"
              class="submit-button"
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
.cart-canvas {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 400px;
  max-width: 100%;
  background-color: white;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
  z-index: 1050;
  display: flex;
  flex-direction: column;
  visibility: hidden;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.cart-canvas.show {
  visibility: visible;
  transform: translateX(0);
}

.canvas-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.canvas-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: bold;
  color: #6c757d;
}

.close-button {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  position: relative;
}

.close-button::before,
.close-button::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 2px;
  background-color: #000;
  top: 14px;
  left: 5px;
}

.close-button::before {
  transform: rotate(45deg);
}

.close-button::after {
  transform: rotate(-45deg);
}

.canvas-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.cart-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.cart-item {
  position: relative;
  padding: 1rem;
  border-bottom: 1px solid #dee2e6;
}

.cart-item:last-child {
  border-bottom: none;
}

.delete-btn {
  position: absolute;
  right: 10px;
  bottom: 38%;
  transform: translateY(280%);
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.cart-item:hover .delete-btn {
  display: inline-block;
}

.delete-icon {
  color: #dc3545;
  font-size: 1.25rem;
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

.item-title {
  font-weight: bold;
  margin-top: 0;
  margin-bottom: 0.5rem;
}

.item-info {
  margin-bottom: 0.25rem;
}

.empty-cart-message {
  text-align: center;
}

.cart-icon {
  color: #ff8800;
  font-size: 2rem;
  margin-top: 1.5rem;
  display: block;
}

.orange {
  color: #ff8800;
}

.checkout-form {
  padding: 1rem 0;
}

.form-title {
  margin-bottom: 1rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-input,
.form-select {
  display: block;
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out;
}

.form-input:focus,
.form-select:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.checkbox-field,
.radio-field {
  display: flex;
  align-items: center;
}

.form-checkbox,
.form-radio {
  margin-right: 0.5rem;
}

.radio-group-label {
  display: block;
  margin-bottom: 0.5rem;
}

.radio-options {
  display: flex;
}

.radio-field {
  margin-right: 1rem;
}

.error-message {
  color: #dc3545;
  display: block;
  margin-top: 0.25rem;
}

.submit-container {
  text-align: center;
}

.submit-button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  min-height: 44px;
}

.submit-button:hover {
  background-color: #218838;
}

.submit-button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  opacity: 0.65;
}

@media (min-width: 576px) {
  .cart-canvas {
    width: 400px;
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

  .form-title {
    text-align: left;
  }
}

@media (max-width: 575px) {
  .cart-canvas {
    width: 100%;
  }

  .canvas-header {
    padding: 0.75rem 1rem;
  }

  .canvas-body {
    padding: 1rem;
  }

  .cart-item {
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

  .cart-item:hover .delete-btn {
    display: flex;
  }

  /* Make form controls easier to tap */
  .form-input,
  .form-select,
  .submit-button {
    min-height: 44px;
  }

  .form-checkbox,
  .form-radio {
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
.canvas-body {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  max-height: calc(100vh - 56px);
}

/* Make sure images scale properly */
.cart-item img {
  max-width: 100%;
  height: auto;
}

/* Ensure form controls are fully visible */
@media (max-height: 640px) {
  .canvas-body {
    padding-bottom: 4rem;
  }
}
</style>
