import { defineStore } from "pinia";
import { db, auth } from "../firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  onSnapshot,
  getDoc
} from "firebase/firestore";

export const useProjectStore = defineStore("projectStore", {
  state: () => ({
    projects: [],
    tasks: [],
    currentProject: null
  }),

  actions: {
    /** ---------------------
     * PROJETS
     * --------------------- */
    
    fetchProjects() {
      if (!auth.currentUser) return;
      const q = query(
        collection(db, "users", auth.currentUser.uid, "projects")
      );
      onSnapshot(q, snap => {
        this.projects = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      });
    },

    async createProject(data) {
      if (!auth.currentUser) return;
      await addDoc(
        collection(db, "users", auth.currentUser.uid, "projects"),
        data
      );
    },

    async updateProject(projectId, data) {
      const docRef = doc(db, "users", auth.currentUser.uid, "projects", projectId);
      await updateDoc(docRef, data);
    },

    async deleteProject(projectId) {
      const docRef = doc(db, "users", auth.currentUser.uid, "projects", projectId);
      await deleteDoc(docRef);
    },

    setCurrentProject(project) {
      this.currentProject = project;
    },

    async fetchProject(projectId) {
      const docRef = doc(db, "users", auth.currentUser.uid, "projects", projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.currentProject = { id: docSnap.id, ...docSnap.data() };
      }
    },

    /** ---------------------
     * TÂCHES
     * --------------------- */

    fetchProjectTasks(projectId) {
      if (!auth.currentUser) return;
      const tasksCol = collection(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        projectId,
        "tasks"
      );
      onSnapshot(tasksCol, snap => {
        this.tasks = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      });
    },

    async createTask(projectId, data) {
      if (!auth.currentUser) return;
      const tasksCol = collection(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        projectId,
        "tasks"
      );
      await addDoc(tasksCol, { ...data, status: "todo" });
    },

    async updateTask(projectId, taskId, data) {
      if (!auth.currentUser) return;
      if (!taskId) {
        console.error("updateTask: taskId manquant !");
        return;
      }
      const taskDoc = doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        projectId,
        "tasks",
        taskId
      );
      await updateDoc(taskDoc, data);
    },

    async deleteTask(projectId, taskId) {
      if (!auth.currentUser) return;
      const taskDoc = doc(
        db,
        "users",
        auth.currentUser.uid,
        "projects",
        projectId,
        "tasks",
        taskId
      );
      await deleteDoc(taskDoc);
    }
  }
});













