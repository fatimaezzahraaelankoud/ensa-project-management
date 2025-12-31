<template>
  <AppNavbar />

  <div class="container mt-4">

    <!-- Title + Add project button -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold">Mes Projets</h3>
      <button class="btn btn-success" @click="projectModal.openModal()">
        + Nouveau Projet
      </button>
    </div>

    <!-- Projects list -->
    <div class="row g-3">
      <div class="col-md-4" v-for="p in projectStore.projects" :key="p.id">
        <div 
          class="card project-card position-relative"
          :style="{ borderLeft: `6px solid ${p.color || '#0d6efd'}` }"
        >
          <h5 class="fw-bold">{{ p.name }}</h5>
          <p class="text-muted small mb-3">{{ p.description }}</p>

          <div class="d-flex justify-content-between gap-2 flex-wrap">
            <button class="btn btn-primary btn-sm flex-grow-1" @click="openProject(p)">
              Ouvrir →
            </button>
            <button class="btn btn-warning btn-sm flex-grow-1" @click="projectModal.editProject(p)">
              Modifier
            </button>
            <button class="btn btn-danger btn-sm flex-grow-1" @click="deleteProject(p.id)">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal component -->
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

<style scoped>
.container {
  max-width: 1200px;
}

/* Card projet */
.project-card {
  border-radius: 12px;
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  cursor: pointer;
  position: relative;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
}

/* Titres et texte */
.project-card h5 {
  margin-bottom: 8px;
  font-size: 1.25rem;
}

.project-card p {
  font-size: 0.9rem;
  color: #6c757d;
}

/* Bord gauche coloré dynamique */
.project-card {
  border-left-width: 6px;
  border-left-style: solid;
}

/* Boutons */
.project-card .btn {
  font-size: 0.85rem;
  padding: 6px 12px;
  flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .row > .col-md-4 {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>






















