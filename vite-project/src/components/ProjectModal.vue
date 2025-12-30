<template>
  <div class="modal fade" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ editMode ? "Modifier Projet" : "Nouveau Projet" }}</h5>
          <button class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          <input v-model="form.name" class="form-control mb-2" placeholder="Nom du projet"/>
          <textarea v-model="form.description" class="form-control mb-2" placeholder="Description"></textarea>
          <input type="color" v-model="form.color" class="form-control form-control-color" />
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Annuler</button>
          <button class="btn btn-primary" @click="saveProject">
            {{ editMode ? "Modifier" : "Créer" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProjectStore } from "../stores/projectStore";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

const projectStore = useProjectStore();
const modalRef = ref(null);

const editMode = ref(false);
const projectToEdit = ref(null);

const form = ref({
  name: "",
  description: "",
  color: "#3498db"
});

let bsModal = null;

function openModal() {
  editMode.value = false;
  projectToEdit.value = null;
  form.value = { name: "", description: "", color: "#3498db" };
  bsModal.show();
}

function editProject(project) {
  editMode.value = true;
  projectToEdit.value = project;
  form.value = { ...project };
  bsModal.show();
}

async function saveProject() {
  if (!form.value.name.trim()) return alert("Nom obligatoire !");

  if (editMode.value && projectToEdit.value) {
    await projectStore.updateProject(projectToEdit.value.id, form.value);
  } else {
    await projectStore.createProject(form.value);
  }

  closeModal();
}

function closeModal() {
  bsModal.hide();
}

onMounted(() => {
  bsModal = new bootstrap.Modal(modalRef.value);
});

defineExpose({ openModal, editProject });
</script>






