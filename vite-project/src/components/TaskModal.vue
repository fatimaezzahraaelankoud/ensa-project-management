<template>
  <div class="modal fade" tabindex="-1" ref="modalRef">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ editMode ? "Modifier Tâche" : "Nouvelle Tâche" }}</h5>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <div class="modal-body">
          <input v-model="form.title" type="text" class="form-control mb-2" placeholder="Titre de la tâche" />
          <textarea v-model="form.description" class="form-control mb-2" placeholder="Description"></textarea>
          <input v-model="form.deadline" type="date" class="form-control" />
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
import { ref, onMounted } from "vue";
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
  if (!form.value.title) return alert("Titre requis !");

  if (editMode.value) {
    if (!editTaskData.value?.id) {
      console.error("saveTask: taskId manquant !");
      return;
    }
    
    await projectStore.updateTask(
      projectStore.currentProject.id,
      editTaskData.value.id,
      form.value
    );
  } else {
    await projectStore.createTask(projectStore.currentProject.id, form.value);
  }

  closeModal();
}


onMounted(() => {
  bsModal = new bootstrap.Modal(modalRef.value);
});


defineExpose({
  openModal,
  editTask
});
</script>




