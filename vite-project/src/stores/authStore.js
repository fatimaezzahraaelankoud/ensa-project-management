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
    user: null,      // Utilisateur connecté
    loading: true    // Pour gérer le spinner global si besoin
  }),

  actions: {
    // 🔥 Initialisation : écoute Firebase pour récupérer user connecté
    initAuth() {
      return new Promise((resolve) => {
        onAuthStateChanged(auth, (u) => {
          this.user = u;
          this.loading = false;
          resolve(u);
        });
      });
    },

    // Inscription email/password
    async register(email, password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        this.user = auth.currentUser;
      } catch (error) {
        console.error("Erreur inscription:", error);
        throw error;
      }
    },

    // Connexion email/password
    async login(email, password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        this.user = auth.currentUser;
      } catch (error) {
        console.error("Erreur login:", error);
        throw error;
      }
    },

    // Connexion Google
    async loginGoogle() {
      try {
        await signInWithPopup(auth, googleProvider);
        this.user = auth.currentUser;
      } catch (error) {
        console.error("Erreur login Google:", error);
        throw error;
      }
    },

    // Déconnexion
    async logout() {
      try {
        await signOut(auth);
        this.user = null;
      } catch (error) {
        console.error("Erreur logout:", error);
        throw error;
      }
    }
  },


  persist: {
    paths: ["user"]  // seul user sera gardé
  }
});





