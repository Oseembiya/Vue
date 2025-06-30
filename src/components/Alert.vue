<template>
  <div class="alert" v-if="visible">
    <span class="alert-message">{{ message }}</span>
    <button class="close-btn" @click="closeAlert">×</button>
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      required: true,
    },
    autoDismiss: {
      type: Boolean,
      default: true,
    },
    duration: {
      type: Number,
      default: 5000, // 5 seconds
    },
  },
  data() {
    return {
      visible: true,
    }
  },
  mounted() {
    if (this.autoDismiss) {
      setTimeout(() => {
        this.closeAlert()
      }, this.duration)
    }
  },
  methods: {
    closeAlert() {
      this.visible = false
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.alert {
  position: fixed;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #198754 0%, #20c997 100%); /* Success gradient */
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1050;
  min-width: 300px;
  max-width: 90vw;
  animation: slideDown 0.3s ease-out;
}

.alert-message {
  font-size: 1rem;
  font-weight: bold;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding-right: 0.7rem;
  transition: color 0.2s ease;
}

.close-btn:hover {
  color: #ff8800; /* Accent color */
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .alert {
    top: 70px;
    min-width: 280px;
    padding: 0.875rem 1.25rem;
  }

  .alert-message {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .alert {
    top: 70px;
    min-width: 260px;
    max-width: 95vw;
    padding: 0.75rem 1rem;
  }

  .alert-message {
    font-size: 0.85rem;
  }

  .close-btn {
    font-size: 1.3rem;
  }
}
</style>
