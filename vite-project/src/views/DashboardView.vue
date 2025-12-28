<template>
  <AppNavbar />

  <div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold">Mes Projets</h3>
      
      <!-- 🔥 On appelle openModal via .value + vérification ref -->
      <button
        class="btn btn-success"
        @click="projectModal?.value?.openModal()"
      >+ Nouveau Projet</button>
    </div>

    <!-- Liste des projets -->
    <div class="row">
      <div class="col-md-4 mb-3" v-for="p in projectStore.projects" :key="p.id">
        <div class="card shadow-sm p-3 border-0" :style="{borderLeft:`6px solid ${p.color}`}">
          <h5 class="fw-bold">{{ p.name }}</h5>
          <p class="text-muted small">{{ p.description }}</p>

          <div class="d-flex justify-content-between mt-3">
            <button class="btn btn-primary btn-sm" @click="openProject(p)">Ouvrir</button>
            <button class="btn btn-danger btn-sm" @click="deleteProject(p.id)">Supprimer</button>
            <button
              class="btn btn-warning btn-sm"
              @click="projectModal?.value?.editProject(p)"
            >Modifier</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal projet -->
    <ProjectModal ref="projectModal" />
  </div>
</template>

<script setup>
import AppNavbar from "../components/AppNavbar.vue";
import ProjectModal from "../components/ProjectModal.vue";
import { ref, onMounted } from "vue";
import { useProjectStore } from "../stores/projectStore";
import { useRouter } from "vue-router";

const projectStore = useProjectStore();
const router = useRouter();
const projectModal = ref(null);

onMounted(() => projectStore.fetchProjects());

function openProject(project) {
  projectStore.setCurrentProject(project);
  router.push(`/project/${project.id}`);
}

async function deleteProject(projectId) {
  if (confirm("Supprimer ce projet ?")) {
    await projectStore.deleteProject(projectId);
  }
}
</script>



















