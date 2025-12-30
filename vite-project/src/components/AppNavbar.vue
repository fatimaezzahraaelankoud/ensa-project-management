<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">KanbanApp</router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">

          <!-- Si user pas connecté -->
          <li class="nav-item me-3" v-if="!authStore.user">
            <router-link class="btn btn-outline-primary btn-sm" to="/auth">
              Connexion / Inscription
            </router-link>
          </li>

          <!-- Si user connecté -->
          <li class="nav-item dropdown" v-else>
            <a class="nav-link dropdown-toggle fw-bold" href="#" role="button" data-bs-toggle="dropdown">
              {{ authStore.user.email }}
            </a>

            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <router-link class="dropdown-item" to="/dashboard">Tableau de bord</router-link>
              </li>

              <li><hr class="dropdown-divider"></li>

              <li>
                <button class="dropdown-item text-danger" @click="logout">Déconnexion</button>
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
    router.push("/auth");      // 🔥 Redirection immédiate après logout
  }
}
</script>

<style scoped>
.navbar {
  border-radius: 10px;
}
</style>





