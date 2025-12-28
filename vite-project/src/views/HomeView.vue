<template>
  <div class="text-center mt-5">
    <h1 class="fw-bold mb-3">Bienvenue sur KanbanApp</h1>
    <p class="mb-4">Gérez vos projets et tâches efficacement, en temps réel.</p>

    <div>
      <router-link v-if="user" class="btn btn-primary me-2" to="/auth">Se connecter / S'inscrire</router-link>
  
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
h1 { font-size: 2.5rem; }
</style>

