import { defineStore } from "pinia";
import { auth, googleProvider } from "../firebase/config";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: null,
    loading: true
  }),

  actions: {
    /** 🔥 Garder utilisateur connecté après refresh */
    initAuth() {
      return new Promise(resolve => {
        onAuthStateChanged(auth, (u) => {
          this.user = u;
          this.loading = false;
          resolve(u);
        });
      });
    },

    /** Inscription */
    async register(email, password) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      this.user = res.user;
    },

    /** Connexion */
    async login(email, password) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      this.user = res.user;
    },

    /** Google */
    async loginGoogle() {
      const res = await signInWithPopup(auth, googleProvider);
      this.user = res.user;
    },

    /** Déconnexion */
    async logout() {
      await signOut(auth);
      this.user = null;
    }
  },

  /** 🧠 Stockage persistant */
  persist: {
    key: "auth_pinia",
    storage: localStorage,      // important pour éviter perte session
    paths: ["user"]             // ce qu'on garde après refresh
  }
});
