<template>
  <!-- Spinner tant que Firebase vérifie la session -->
  <LoadingSpinner v-if="authStore.loading" />
  <router-view v-else />
</template>

<script setup>
import LoadingSpinner from "./components/LoadingSpinner.vue";
import { useAuthStore } from "./stores/authStore";
import { onMounted } from "vue";

const authStore = useAuthStore();

// au démarrage → on attend initAuth() pour savoir si user est connecté
onMounted(async () => {
  await authStore.initAuth();
});
</script>



