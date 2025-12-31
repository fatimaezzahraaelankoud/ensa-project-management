<template>
  <div class="home-container d-flex flex-column justify-content-center align-items-center text-center">
    <h1 class="fw-bold mb-3 home-title">Bienvenue sur FZ.KanbanApp</h1>
    <p class="mb-4 home-subtitle">Gérez vos projets et tâches facilement et efficacement !</p>

    <div class="d-flex flex-wrap justify-content-center gap-2">
      <router-link class="btn btn-primary btn-lg fw-semibold" to="/auth">
        Se connecter / S'inscrire
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<style scoped>
.home-container {
  min-height: 80vh;
  padding: 2rem;
}

.home-title {
  font-size: 3rem;
  color: #0d6efd;
}

.home-subtitle {
  font-size: 1.25rem;
  color: #6c757d;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  font-size: 1.05rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .home-title {
    font-size: 2rem;
  }
  .home-subtitle {
    font-size: 1rem;
  }
}
</style>

