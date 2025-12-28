<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <a class="navbar-brand fw-bold" href="/">KanbanApp</a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item me-3" v-if="!authStore.user">
            <router-link class="btn btn-outline-primary btn-sm" to="/auth">Connexion / Inscription</router-link>
          </li>

          <li class="nav-item dropdown" v-else>
            <a class="nav-link dropdown-toggle fw-bold" href="#" role="button" data-bs-toggle="dropdown">
              {{ authStore.user.email }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end">
              <li><a class="dropdown-item" @click="logout">Déconnexion</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

function logout() {
  if (confirm("Voulez-vous vraiment vous déconnecter ?")) {
    authStore.logout();
  }
}
</script>

<style scoped>
.navbar {
  border-radius: 10px;
}
</style>




