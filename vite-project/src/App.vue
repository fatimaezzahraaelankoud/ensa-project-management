<template>
  <LoadingSpinner v-if="loading" />
  <router-view v-else />
</template>

<script setup>
import { ref, onMounted } from "vue";
import LoadingSpinner from "./components/LoadingSpinner.vue";
import { useAuthStore } from "./stores/authStore";

const loading = ref(true);
const authStore = useAuthStore();

// Attendre Firebase auth avant mount
onMounted(() => {
  const unsubscribe = authStore.$state.user ? null : setTimeout(() => loading.value = false, 500);
  loading.value = false;
});
</script>



