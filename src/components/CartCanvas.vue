<template>
  <div class="cart-overlay" @click="closeCart" @keydown.esc="closeCart">
    <div
      class="cart-canvas"
      @click.stop
      @touchmove.stop
      tabindex="-1"
      id="cartCanvas"
      aria-labelledby="cartCanvasLabel"
      role="dialog"
      aria-modal="true"
    >
      <div class="canvas-body">
        <!-- Display Cart Items or "Cart is empty" message -->
        <div v-if="cartItems.length > 0" class="cart-content">
          <div class="cart-items-section">
            <h6 class="section-title">Your Basket</h6>
            <div class="cart-items-container">
              <div class="cart-grid">
                <div v-for="item in groupedCartItems" :key="item.lesson.id" class="cart-item">
                  <div class="cart-item-image">
                    <img
                      :src="`${apiBaseUrl}/${item.lesson.image}`"
                      alt="Lesson image"
                      class="cart-image"
                    />
                    <button
                      class="delete-btn"
                      @click="removeItem(item.lesson.id)"
                      title="Remove item"
                    >
                      <i class="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  <div class="cart-item-details">
                    <h6 class="item-title">{{ item.lesson.subject }}</h6>
                    <p class="item-location">
                      <i class="fa-solid fa-map-marker-alt"></i>
                      {{ item.lesson.location }}
                    </p>
                    <p class="item-price">
                      <i class="fa-solid fa-pound-sign"></i>
                      £{{ item.lesson.price }} each
                    </p>
                    <div class="quantity-controls">
                      <button
                        class="quantity-btn"
                        @click="decreaseQuantity(item.lesson.id)"
                        :disabled="item.quantity <= 1"
                      >
                        <i class="fa-solid fa-minus"></i>
                      </button>
                      <span class="item-quantity">{{ item.quantity }}</span>
                      <button class="quantity-btn" @click="increaseQuantity(item.lesson.id)">
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Checkout Form -->
          <div class="checkout-section">
            <h6 class="section-title">
              <i class="fa-solid fa-user-edit"></i>
              Order Information
            </h6>
            <form @submit.prevent="submitOrder" class="checkout-form">
              <!-- Gift Checkbox -->
              <div class="form-row">
                <div class="form-group checkbox-group">
                  <label class="checkbox-container">
                    <input
                      type="checkbox"
                      class="form-checkbox"
                      id="gift"
                      value="true"
                      v-model="orderInfo.gift"
                    />
                    <span class="checkmark"></span>
                    <span class="checkbox-text">
                      <i class="fa-solid fa-gift"></i>
                      Ship As Gift
                    </span>
                  </label>
                </div>
              </div>

              <!-- Shipping Method Radio Buttons -->
              <div class="form-group">
                <label class="form-label">
                  <i class="fa-solid fa-truck"></i>
                  Shipping Method
                </label>
                <div class="radio-group">
                  <label class="radio-container">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Home"
                      v-model="orderInfo.method"
                    />
                    <span class="radio-mark"></span>
                    <span class="radio-text">
                      <i class="fa-solid fa-home"></i>
                      Home Delivery
                    </span>
                  </label>
                  <label class="radio-container">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Business"
                      v-model="orderInfo.method"
                    />
                    <span class="radio-mark"></span>
                    <span class="radio-text">
                      <i class="fa-solid fa-building"></i>
                      Business Address
                    </span>
                  </label>
                </div>
              </div>

              <!-- Personal Details Inputs -->
              <div class="form-row">
                <div class="form-group">
                  <label for="fullName" class="form-label">
                    <i class="fa-solid fa-user"></i>
                    Full Name
                  </label>
                  <input
                    type="text"
                    class="form-input"
                    id="fullName"
                    v-model="orderInfo.fullName"
                    @input="validateFullName"
                    placeholder="Full name"
                    required
                  />
                  <small v-if="!isFullNameValid && orderInfo.fullName" class="error-message">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                    Full Name must contain letters only.
                  </small>
                </div>

                <div class="form-group">
                  <label for="city" class="form-label">
                    <i class="fa-solid fa-city"></i>
                    City
                  </label>
                  <select v-model="orderInfo.city" id="city" class="form-select" required>
                    <option disabled value="">Select a city</option>
                    <option v-for="city in cities" :key="city" :value="city">
                      {{ city }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="postCode" class="form-label">
                    <i class="fa-solid fa-mail-bulk"></i>
                    Post Code
                  </label>
                  <input
                    type="text"
                    class="form-input"
                    id="postCode"
                    v-model="orderInfo.postCode"
                    placeholder="Enter postcode"
                    required
                  />
                </div>

                <div class="form-group">
                  <label for="num" class="form-label">
                    <i class="fa-solid fa-phone"></i>
                    Phone
                  </label>
                  <input
                    type="text"
                    class="form-input"
                    id="num"
                    v-model="orderInfo.phoneNum"
                    @input="validatePhone"
                    placeholder="Phone number"
                    required
                  />
                  <small v-if="!isPhoneValid && orderInfo.phoneNum" class="error-message">
                    <i class="fa-solid fa-exclamation-triangle"></i>
                    Phone must be number only & 12 digits.
                  </small>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="submit-container">
                <button type="submit" class="submit-button" :disabled="!isSubmitEnabled">
                  <i class="fa-solid fa-credit-card"></i>
                  Place Order - £{{ totalAmount }}
                </button>
              </div>
            </form>
          </div>
        </div>

        <!-- Empty Cart Message -->
        <div v-else class="empty-cart">
          <div class="empty-cart-content">
            <i class="fa-solid fa-shopping-cart empty-cart-icon"></i>
            <h3>Your cart is empty</h3>
            <p>Add some lessons to get started!</p>
            <button @click="closeCart" class="continue-shopping-btn">
              <i class="fa-solid fa-arrow-left"></i>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CartCanvas',
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
    apiBaseUrl: {
      type: String,
      default: 'https://myserver-xy36.onrender.com',
    },
  },
  data() {
    return {
      cities: ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Liverpool'],
      orderInfo: {
        gift: false,
        method: 'Home',
        fullName: '',
        city: '',
        postCode: '',
        phoneNum: '',
      },
      isFullNameValid: false,
      isPhoneValid: false,
    }
  },
  mounted() {
    // Prevent background scrolling when cart is open
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = this.getScrollbarWidth() + 'px'

    // Focus the cart for accessibility
    this.$nextTick(() => {
      this.$el.querySelector('#cartCanvas').focus()
    })
  },
  beforeUnmount() {
    // Restore background scrolling when cart is closed
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  },
  computed: {
    isSubmitEnabled() {
      return (
        this.isFullNameValid &&
        this.isPhoneValid &&
        this.orderInfo.fullName &&
        this.orderInfo.city &&
        this.orderInfo.postCode
      )
    },
    totalAmount() {
      return this.cartItems.reduce((total, item) => total + item.price, 0)
    },
    groupedCartItems() {
      const grouped = {}
      this.cartItems.forEach((item) => {
        if (!grouped[item.id]) {
          grouped[item.id] = { lesson: item, quantity: 1 }
        } else {
          grouped[item.id].quantity++
        }
      })
      return Object.values(grouped)
    },
  },
  methods: {
    closeCart() {
      this.$emit('close-cart')
    },
    removeItem(lessonId) {
      this.$emit('remove-item', lessonId)
    },
    decreaseQuantity(lessonId) {
      this.$emit('decrease-quantity', lessonId)
    },
    increaseQuantity(lessonId) {
      this.$emit('increase-quantity', lessonId)
    },
    validateFullName() {
      this.isFullNameValid = /^[A-Za-z\s]+$/.test(this.orderInfo.fullName)
    },
    validatePhone() {
      this.isPhoneValid = /^\d{12}$/.test(this.orderInfo.phoneNum)
    },
    submitOrder() {
      if (!this.isSubmitEnabled) {
        alert('Please ensure all fields are valid.')
        return
      }

      const orderData = {
        orderInfo: this.orderInfo,
        lessonId: this.cartItems.map((item) => item.id),
      }

      this.$emit('submit-order', orderData)
    },
    getScrollbarWidth() {
      // Create a temporary div to measure scrollbar width
      const outer = document.createElement('div')
      outer.style.visibility = 'hidden'
      outer.style.overflow = 'scroll'
      outer.style.msOverflowStyle = 'scrollbar'
      document.body.appendChild(outer)

      const inner = document.createElement('div')
      outer.appendChild(inner)

      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
      outer.parentNode.removeChild(outer)

      return scrollbarWidth
    },
  },
}
</script>

<style scoped>
.cart-overlay {
  position: fixed;
  top: var(--navbar-height); /* Position below navbar instead of top: 0 */
  left: 0;
  height: calc(100vh - var(--navbar-height)); /* Adjust height to account for navbar */
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
  overflow: hidden;
  touch-action: none;
}

.cart-canvas {
  background: white;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: #333;
  width: 100%;
  height: 100%; /* Optional: limit maximum width */
}

.canvas-body {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  touch-action: pan-y;
  -webkit-overflow-scrolling: touch;
}

.cart-content {
  display: grid;
  gap: 2rem;
  align-items: start;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

@media (min-width: 1024px) {
  .cart-content {
    grid-template-columns: 1fr 400px;
    align-items: start;
  }
}

.cart-items-section {
  height: 100%;
}

.section-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-grid {
  display: grid;
  gap: 1rem;
}

.cart-item {
  width: 100%;
  display: flex;
  border: none;
  border-bottom: 1px solid #e9ecef;
  transition: all 0.3s ease;
  box-shadow: none;
  gap: 1rem;

  /* Remove any height properties like height, min-height, max-height */
}

/* Small devices - Display cart-item children in columns */
@media (max-width: 767px) {
  .cart-item {
    flex-direction: column;
    align-items: center;
  }

  .cart-item-details {
    width: 100%;
    max-width: 350px;
    margin: auto 0;
  }
}

.cart-item-image {
  position: relative;
  margin-bottom: 0;
  flex-shrink: 0;
  width: 100%;
  max-width: 350px;
  min-width: 200px;
}

.cart-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(220, 53, 69, 0.9);
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.delete-btn:hover {
  background: rgba(220, 53, 69, 1);
  transform: scale(1.1);
}

.cart-item-details {
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
}

.item-title {
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: #333;
}

.item-location,
.item-price {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.item-quantity {
  background: #667eea;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  min-width: 30px;
  text-align: center;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
  align-self: flex-end;
  margin-bottom: 0;
}

.quantity-btn {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  color: #333;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.quantity-btn:hover:not(:disabled) {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: scale(1.05);
}

.quantity-btn:disabled {
  background: #f1f1f1;
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}

.total-amount {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: white;
}

.checkout-section {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid #e9ecef;
  height: fit-content;
  align-self: start;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-row {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .form-row {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 767px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  min-width: 0; /* Prevent overflow */
}

.form-label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.form-input,
.form-select {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  padding: 0.75rem;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-input::placeholder {
  color: #999;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.checkbox-container,
.radio-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.checkbox-container:hover,
.radio-container:hover {
  background: #f1f3f4;
}

.form-checkbox,
.radio-container input {
  opacity: 0;
  position: absolute;
}

.checkmark,
.radio-mark {
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.checkmark {
  border-radius: 4px;
}

.radio-mark {
  border-radius: 50%;
}

.form-checkbox:checked + .checkmark,
.radio-container input:checked + .radio-mark {
  background: #667eea;
  border-color: #667eea;
}

.form-checkbox:checked + .checkmark::after {
  content: '✓';
  color: white;
  font-weight: bold;
}

.radio-container input:checked + .radio-mark::after {
  content: '';
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
}

.radio-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.error-message {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.submit-container {
  margin-top: 1rem;
}

.submit-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 15px;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.submit-button:disabled {
  background: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}

.empty-cart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
}

.empty-cart-content {
  max-width: 400px;
}

.empty-cart-icon {
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 1rem;
}

.empty-cart h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #333;
}

.empty-cart p {
  color: #666;
  margin-bottom: 1.5rem;
}

.continue-shopping-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.continue-shopping-btn:hover {
  background: #5a6fd8;
  transform: translateY(-2px);
}

/* Scrollbar styling */
.canvas-body::-webkit-scrollbar {
  width: 8px;
}

.canvas-body::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.canvas-body::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 4px;
}

.canvas-body::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.cart-items-container {
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scroll-behavior: smooth;
}

.cart-items-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
@media (min-width: 768px) {
  .cart-items-container {
    max-height: 600px;
  }
}
</style>
