<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="card p-4 shadow-sm" style="width: 350px;">
      <h3 class="text-center mb-3">{{ isLogin ? "Connexion" : "Créer un compte" }}</h3>

      <div class="mb-3">
        <input v-model="email" type="email" class="form-control" placeholder="Email">
      </div>
      <div class="mb-3">
        <input v-model="password" type="password" class="form-control" placeholder="Mot de passe">
      </div>

      <button class="btn btn-primary w-100 mb-2" @click="submit">
        {{ isLogin ? "Se connecter" : "S'inscrire" }}
      </button>

      <button class="btn btn-outline-danger w-100 mb-2" @click="loginGoogle">
        <i class="bi bi-google"></i> Connexion Google
      </button>

      <p class="text-center mt-2">
        <a href="#" @click.prevent="toggleMode">
          {{ isLogin ? "Créer un compte" : "Se connecter" }}
        </a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const isLogin = ref(true);
const email = ref("");
const password = ref("");

function toggleMode() { isLogin.value = !isLogin.value; }

async function submit() {
  try {
    if (isLogin.value) await authStore.login(email.value, password.value);
    else await authStore.register(email.value, password.value);
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}

async function loginGoogle() {
  try {
    await authStore.loginGoogle();
    router.push("/dashboard");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
}
</script>

