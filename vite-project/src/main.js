import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";

import { useAuthStore } from "./stores/authStore";   // <-- IMPORTANT

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

// --------------------- PINIA ---------------------
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// --------------------- APP -----------------------
const app = createApp(App);
app.use(pinia);
app.use(router);

// --------------------- FIX Refresh déconnexion ---
const authStore = useAuthStore();

// ⏳ On attend Firebase avant d'afficher l'app (sinon refresh déconnecte)
authStore.initAuth().then(() => {
    app.mount("#app");
});






