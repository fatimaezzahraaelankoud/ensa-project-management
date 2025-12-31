<template>
  
  <LoadingSpinner v-if="authStore.loading" />
  <router-view v-else />
</template>

<script setup>
import LoadingSpinner from "./components/LoadingSpinner.vue";
import { useAuthStore } from "./stores/authStore";
import { onMounted } from "vue";

const authStore = useAuthStore();


onMounted(async () => {
  await authStore.initAuth();
});
</script>



