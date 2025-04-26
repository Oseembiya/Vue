<template>
  <footer class="bg-dark text-white py-4 mt-5">
    <div class="container">
      <div class="row">
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="mb-3 footer-heading">{{ siteName }}</h5>
          <p>
            Connecting parents with the best school activities for their
            children. Pay with confidence, learn with joy.
          </p>
          <div class="d-flex mt-3">
            <a href="#" class="me-3 social-icon"
              ><i class="fa-brands fa-facebook-f"></i
            ></a>
            <a href="#" class="me-3 social-icon"
              ><i class="fa-brands fa-twitter"></i
            ></a>
            <a href="#" class="me-3 social-icon"
              ><i class="fa-brands fa-instagram"></i
            ></a>
            <a href="#" class="social-icon"
              ><i class="fa-brands fa-linkedin-in"></i
            ></a>
          </div>
        </div>
        <div class="col-md-4 mb-4 mb-md-0">
          <h5 class="mb-3 footer-heading">Quick Links</h5>
          <ul class="list-unstyled">
            <li class="mb-2"><a href="#" class="footer-link">About Us</a></li>
            <li class="mb-2">
              <a href="#" class="footer-link">Terms of Service</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">Privacy Policy</a>
            </li>
            <li class="mb-2">
              <a href="#" class="footer-link">Contact Support</a>
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5 class="mb-3 footer-heading">Contact Us</h5>
          <ul class="list-unstyled">
            <li class="mb-2">
              <i class="fa-solid fa-location-dot me-2"></i> 123 Education St,
              London, UK
            </li>
            <li class="mb-2">
              <i class="fa-solid fa-phone me-2"></i> +44 7855 464 55 755
            </li>
            <li class="mb-2">
              <i class="fa-solid fa-envelope me-2"></i> support@parentpay.com
            </li>
          </ul>
        </div>
      </div>
      <hr class="my-4" />
      <div class="row">
        <div class="col-md-6 text-center text-md-start">
          <p class="mb-0">
            &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
          </p>
        </div>
        <div class="col-md-6 text-center text-md-end">
          <p class="mb-0">
            Designed with <i class="fa-solid fa-heart text-danger"></i> for
            education
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterSection",
  props: {
    siteName: {
      type: String,
      default: "ParentPay",
    },
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
footer {
  margin-top: 4rem;
}

.footer-heading {
  font-weight: 600;
  color: #fff;
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

.social-icon {
  color: #ffffff;
  font-size: 1.2rem;
  transition: color 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.social-icon:hover {
  color: #ff8800;
}

/* Improved spacing for footer on different devices */
@media (max-width: 992px) {
  footer .col-md-4 {
    padding-bottom: 1.5rem;
  }
}

/* Better touch targets on mobile */
@media (max-width: 768px) {
  footer {
    text-align: center;
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

  footer ul.list-unstyled li {
    margin-bottom: 0.5rem;
  }

  .d-flex.mt-3 {
    justify-content: center;
  }
}

/* Small mobile devices */
@media (max-width: 480px) {
  footer {
    margin-top: 3rem;
    padding-top: 2rem !important;
    padding-bottom: 2rem !important;
  }

  .footer-heading {
    font-size: 1.1rem;
  }

  footer .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .my-4 {
    margin-top: 1.5rem !important;
    margin-bottom: 1.5rem !important;
  }
}

/* Extra small devices */
@media (max-width: 320px) {
  .social-icon {
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
  }

  footer {
    font-size: 0.9rem;
  }
}
</style>
