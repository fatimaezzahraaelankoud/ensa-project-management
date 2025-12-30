import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/authStore";

import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProjectDetails from "../views/ProjectDetails.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/auth", component: AuthView, meta: { guestOnly: true } },
  { path: "/dashboard", component: DashboardView, meta: { requiresAuth: true } },
  { path: "/project/:id", component: ProjectDetails, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

/* -------------------------------
   🔐 Protection Global des Routes
-------------------------------- */
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // attendre initAuth si rechargement
  if (authStore.loading) {
    await authStore.initAuth(); 
  }

  const isLogged = !!authStore.user;

  if (to.meta.requiresAuth && !isLogged) {
    return next("/auth"); // accès interdit si pas connecté
  }

  if (to.meta.guestOnly && isLogged) {
    return next("/dashboard"); // empêche accès /auth si déjà connecté
  }

  next();
});

export default router;




