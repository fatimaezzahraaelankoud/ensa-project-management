<template>
  <AppNavbar />

  <div class="container mt-4">
    <h3 class="fw-bold mb-3">{{ project?.name }}</h3>

    <button class="btn btn-success mb-3" @click="taskModal.openModal">+ Nouvelle tâche</button>

    <div class="row">
      <div class="col-md-4">
        <h5 class="text-center fw-bold">À faire</h5>
        <TaskCard
          v-for="t in tasks.todo"
          :key="t.id"
          :task="t"
          @move="moveTask"
          @delete="deleteTask"
          @edit="editTask"
        />
      </div>

      <div class="col-md-4">
        <h5 class="text-center fw-bold">En cours</h5>
        <TaskCard
          v-for="t in tasks.doing"
          :key="t.id"
          :task="t"
          @move="moveTask"
          @delete="deleteTask"
          @edit="editTask"
        />
      </div>

      <div class="col-md-4">
        <h5 class="text-center fw-bold">Terminé</h5>
        <TaskCard
          v-for="t in tasks.done"
          :key="t.id"
          :task="t"
          @move="moveTask"
          @delete="deleteTask"
          @edit="editTask"
        />
      </div>
    </div>

    <TaskModal ref="taskModal" @save="saveTask" />
  </div>
</template>

<script setup>
import AppNavbar from "../components/AppNavbar.vue";
import TaskCard from "../components/TaskCard.vue";
import TaskModal from "../components/TaskModal.vue";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProjectStore } from "../stores/projectStore";

const route = useRoute();
const projectStore = useProjectStore();
const taskModal = ref(null);
const projectId = route.params.id;

const project = computed(() => projectStore.currentProject);

const tasks = computed(() => ({
  todo: projectStore.tasks.filter(t => t.status === "todo"),
  doing: projectStore.tasks.filter(t => t.status === "doing"),
  done: projectStore.tasks.filter(t => t.status === "done")
}));

onMounted(() => {
  projectStore.fetchProject(projectId);
  projectStore.fetchProjectTasks(projectId);
});

async function saveTask(taskData) {
  if (taskData.id) {
    await projectStore.updateTask(projectId, taskData.id, taskData);
  } else {
    await projectStore.createTask(projectId, taskData);
  }
}

function editTask(task) {
  taskModal.value.editTask(task);
}

async function moveTask(task, newStatus) {
  await projectStore.updateTask(projectId, task.id, { status: newStatus });
}

async function deleteTask(task) {
  if (confirm("Supprimer cette tâche ?")) {
    await projectStore.deleteTask(projectId, task.id);
  }
}
</script>











