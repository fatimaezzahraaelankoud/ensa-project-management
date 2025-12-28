import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/config";
import HomeView from "../views/HomeView.vue";
import AuthView from "../views/AuthView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProjectDetails from "../views/ProjectDetails.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/auth", component: AuthView },
  { path: "/dashboard", component: DashboardView, meta: { requiresAuth: true } },
  { path: "/project/:id", component: ProjectDetails, meta: { requiresAuth: true } }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const user = auth.currentUser;
  if (to.meta.requiresAuth && !user) next("/auth");
  else next();
});

export default router;



