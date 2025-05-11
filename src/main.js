import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// Create a new Vue instance
new Vue({
  render: (h) => h(App),
}).$mount("#app");
