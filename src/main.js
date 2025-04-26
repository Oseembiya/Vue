import Vue from "vue";
import App from "./App.vue";

// You can also import any required CSS files here
// import './assets/styles/main.css';

Vue.config.productionTip = false;

// Create a new Vue instance
new Vue({
  render: (h) => h(App),
}).$mount("#app");
