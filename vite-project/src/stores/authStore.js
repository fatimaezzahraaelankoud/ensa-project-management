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
    loading: true,       // 👌 Sert à bloquer l'app pendant récupération session
  }),

  actions: {
    /** ------------------------------------------------
     *  🔥 Garder utilisateur connecté même après refresh
     * ------------------------------------------------*/
    initAuth() {
      return new Promise(resolve => {
        onAuthStateChanged(auth, (u) => {
          this.user = u ? {
            uid: u.uid,
            email: u.email
          } : null;

          this.loading = false;
          resolve(u);
        });
      });
    },

    /** Inscription */
    async register(email, password) {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      this.user = { uid: res.user.uid, email: res.user.email };
    },

    /** Connexion */
    async login(email, password) {
      const res = await signInWithEmailAndPassword(auth, email, password);
      this.user = { uid: res.user.uid, email: res.user.email };
    },

    /** Google */
    async loginGoogle() {
      const res = await signInWithPopup(auth, googleProvider);
      this.user = { uid: res.user.uid, email: res.user.email };
    },

    /** Déconnexion */
    async logout() {
      await signOut(auth);
      this.user = null;
    },
  },

  /** -----------------------------------------
   🧠 Stockage persistant via Pinia-plugin-persist
  ------------------------------------------*/
  persist: {
    key: "auth_pinia",
    storage: localStorage,
    paths: ["user"]  // 👍 On garde seulement l'essentiel
  }
});

