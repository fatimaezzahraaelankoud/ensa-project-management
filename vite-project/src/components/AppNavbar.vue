<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3 rounded-navbar">
    <div class="container">
      <router-link class="navbar-brand fw-bold fs-4" to="/">FZ.KanbanApp</router-link>

      <button 
        class="navbar-toggler border-0" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center gap-2">

          <li class="nav-item" v-if="!authStore.user">
            <router-link class="btn btn-outline-primary btn-sm fw-semibold" to="/auth">
              Connexion / Inscription
            </router-link>
          </li>

          <li class="nav-item dropdown" v-else>
            <a 
              class="nav-link dropdown-toggle fw-semibold text-dark" 
              href="#" 
              role="button" 
              data-bs-toggle="dropdown"
            >
              {{ authStore.user.email }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <router-link class="dropdown-item" to="/dashboard">Tableau de bord</router-link>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <button class="dropdown-item text-danger fw-semibold" @click="logout">Déconnexion</button>
              </li>
            </ul>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

async function logout() {
  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
    await authStore.logout();
    router.push("/auth");
  }
}
</script>

<style scoped>
.rounded-navbar {
  border-radius: 12px;
}

.navbar .nav-link {
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.navbar .nav-link:hover {
  color: #0d6efd;
}

.navbar .btn {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.navbar .btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 3px 10px rgba(0,0,0,0.1);
}

.dropdown-menu {
  border-radius: 10px;
  padding: 0.25rem 0;
}

@media (max-width: 768px) {
  .navbar-nav {
    text-align: center;
  }
}
</style>






