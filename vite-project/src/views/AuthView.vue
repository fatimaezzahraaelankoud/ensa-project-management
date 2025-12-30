<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 360px;">
      
      <h3 class="text-center mb-3">
        {{ isLogin ? "Connexion" : "Créer un compte" }}
      </h3>

      <!-- Email -->
      <div class="mb-3">
        <input
          v-model.trim="email"
          type="email"
          class="form-control"
          placeholder="Email"
        >
      </div>

      <!-- Password -->
      <div class="mb-3">
        <input
          v-model.trim="password"
          type="password"
          class="form-control"
          placeholder="Mot de passe"
        >
      </div>

      <!-- Submit -->
      <button
        class="btn btn-primary w-100 mb-2"
        :disabled="loading"
        @click="submit"
      >
        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
        <span v-else>
          {{ isLogin ? "Se connecter" : "Créer un compte" }}
        </span>
      </button>

      <!-- Google -->
      <button
        class="btn btn-outline-danger w-100 mb-2"
        :disabled="loading"
        @click="loginGoogle"
      >
        <i class="bi bi-google"></i> Connexion Google
      </button>

      <!-- Switch -->
      <p class="text-center mt-2">
        <a href="#" @click.prevent="toggleMode">
          {{ isLogin ? "Créer un compte" : "Déjà inscrit ? Se connecter" }}
        </a>
      </p>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useAuthStore } from "../stores/authStore"
import { useRouter } from "vue-router"

const authStore = useAuthStore()
const router = useRouter()

const isLogin = ref(true)
const email = ref("")
const password = ref("")
const loading = ref(false)

function toggleMode() {
  isLogin.value = !isLogin.value
}

/* --- Login/Register --- */
async function submit() {
  if (!email.value || !password.value) return alert("Veuillez remplir tous les champs.")
  if (password.value.length < 6) return alert("Mot de passe min 6 caractères.")

  try {
    loading.value = true
    isLogin.value
      ? await authStore.login(email.value, password.value)
      : await authStore.register(email.value, password.value)

    router.push("/dashboard")
  } catch (err) {
    alert(err.message)
  } finally {
    loading.value = false
  }
}

/* --- Google Login --- */
async function loginGoogle() {
  try {
    loading.value = true
    await authStore.loginGoogle()
    router.push("/dashboard")
  } catch (err) {
    alert(err.message)
  } finally {
    loading.value = false
  }
}
</script>


