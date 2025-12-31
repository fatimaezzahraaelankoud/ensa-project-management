import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import { useAuthStore } from "./stores/authStore";   

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;


const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);


const app = createApp(App);
app.use(pinia);
app.use(router);


const authStore = useAuthStore();


authStore.initAuth().then(() => {
    app.mount("#app");
});






