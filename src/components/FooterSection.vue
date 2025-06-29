<template>
  <footer class="footer" id="contact">
    <div class="footer-container">
      <div class="footer-row">
        <div class="footer-column">
          <h5 class="footer-heading">{{ siteName }}</h5>
          <p>
            Connecting parents with the best school activities for their children. Pay with
            confidence, learn with joy.
          </p>
          <div class="social-icons">
            <a href="#" class="social-icon"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="#" class="social-icon"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="social-icon"><i class="fa-brands fa-instagram"></i></a>
            <a href="#" class="social-icon"><i class="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="footer-column">
          <h5 class="footer-heading">Quick Links</h5>
          <ul class="footer-links">
            <li><a href="#" class="footer-link">About Us</a></li>
            <li>
              <a href="#" class="footer-link">Terms of Service</a>
            </li>
            <li>
              <a href="#" class="footer-link">Privacy Policy</a>
            </li>
            <li>
              <a href="#" class="footer-link">Contact Support</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h5 class="footer-heading">Contact Us</h5>
          <ul class="footer-links">
            <li>
              <i class="fa-solid fa-location-dot icon-space"></i> 123 Education St, London, UK
            </li>
            <li><i class="fa-solid fa-phone icon-space"></i> +44 7855 464 55 755</li>
            <li>
              <i class="fa-solid fa-envelope icon-space"></i>
              support@parentpay.com
            </li>
          </ul>
        </div>
      </div>
      <hr class="footer-divider" />
      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; {{ currentYear }} {{ siteName }}. All rights reserved.</p>
        </div>
        <div class="credits">
          <p>Designed with <i class="fa-solid fa-heart heart-icon"></i> for education</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
  props: {
    siteName: {
      type: String,
      default: 'ParentPay',
    },
  },
  computed: {
    currentYear() {
      return new Date().getFullYear()
    },
  },
}
</script>

<style scoped>
.footer {
  background-color: #212529;
  color: #ffffff;
  padding: 2rem 0;
  margin-top: 5rem;
}

.footer-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.footer-column {
  flex: 1;
  padding: 0 1rem;
  margin-bottom: 2rem;
  min-width: 250px;
}

.footer-heading {
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-link {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ffffff;
  text-decoration: underline;
}

.social-icons {
  display: flex;
  margin-top: 1rem;
}

.social-icon {
  color: #ffffff;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  margin-right: 1rem;
}

.social-icon:hover {
  color: #ff8800;
}

.icon-space {
  margin-right: 0.5rem;
}

.footer-divider {
  border: 0;
  border-top: 1px solid #495057;
  margin: 1.5rem 0;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.copyright,
.credits {
  margin-bottom: 1rem;
}

.heart-icon {
  color: #dc3545;
}

@media (max-width: 992px) {
  .footer-column {
    flex: 1 0 calc(50% - 2rem);
  }
}

@media (max-width: 768px) {
  .footer {
    text-align: center;
  }

  .footer-column {
    flex: 1 0 100%;
  }

  .social-icons {
    justify-content: center;
  }

  .social-icon {
    width: 44px;
    height: 44px;
    font-size: 1.4rem;
  }

  .footer-link {
    display: inline-block;
    padding: 6px 0;
  }

  .footer-links li {
    margin-bottom: 0.5rem;
  }

  .footer-bottom {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .footer {
    margin-top: 3rem;
    padding: 2rem 0;
  }

  .footer-heading {
    font-size: 1.1rem;
  }

  .footer-divider {
    margin: 1rem 0;
  }
}

@media (max-width: 320px) {
  .social-icon {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
  }

  .footer {
    font-size: 0.9rem;
  }
}
</style>
