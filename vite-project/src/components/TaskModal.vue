<template>
  <div
    class="modal fade"
    tabindex="-1"
    ref="modalRef"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ editMode ? "Modifier Tâche" : "Nouvelle Tâche" }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          <div class="mb-2">
            <input
              v-model="form.title"
              type="text"
              class="form-control"
              placeholder="Titre de la tâche"
            />
          </div>

          <div class="mb-2">
            <textarea
              v-model="form.description"
              class="form-control"
              placeholder="Description"
              rows="3"
            ></textarea>
          </div>

          <div class="mb-2">
            <label class="form-label">Date limite</label>
            <input v-model="form.deadline" type="date" class="form-control" />
          </div>
        </div>

        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">Annuler</button>
          <button class="btn btn-primary" @click="saveTask">
            {{ editMode ? "Modifier" : "Créer" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useProjectStore } from "../stores/projectStore";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle";

const projectStore = useProjectStore();
const modalRef = ref(null);

const editMode = ref(false);
const editTaskData = ref(null);

const form = ref({
  title: "",
  description: "",
  deadline: ""
});

let bsModal = null;

function openModal() {
  editMode.value = false;
  form.value = { title: "", description: "", deadline: "" };
  bsModal.show();
}

function editTask(task) {
  editMode.value = true;
  editTaskData.value = task;
  form.value = { ...task };
  bsModal.show();
}

function closeModal() {
  bsModal.hide();
}

async function saveTask() {
  if (!form.value.title.trim()) return alert("Le titre est requis !");

  const payload = { ...form.value };

  if (editMode.value) {
    await projectStore.updateTask(projectStore.currentProject.id, editTaskData.value.id, payload);
  } else {
    await projectStore.createTask(projectStore.currentProject.id, payload);
  }

  closeModal();
}

onMounted(() => {
  bsModal = new bootstrap.Modal(modalRef.value);

  modalRef.value.addEventListener("shown.bs.modal", () => {
    nextTick(() => {
      const firstInput = modalRef.value.querySelector("input, textarea");
      firstInput?.focus();
    });
  });
});

defineExpose({ openModal, editTask });
</script>

<style scoped>
.modal-content {
  border-radius: 12px;
}
.modal-header {
  border-bottom: 1px solid #dee2e6;
}
.modal-footer {
  border-top: 1px solid #dee2e6;
}
</style>
