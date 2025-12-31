<template>
  <AppNavbar />

  <div class="container mt-4">

    <div class="d-flex justify-content-between align-items-center mb-4">
      <h3 class="fw-bold">{{ project?.name }}</h3>
      <button class="btn btn-success" @click="taskModal.openModal()">+ Nouvelle tâche</button>
    </div>

    <div class="kanban-board">

      <div class="kanban-column-wrapper">
        <h5 class="text-center fw-bold text-primary">À faire</h5>
        <draggable
          :list="todoTasks"
          group="tasks"
          animation="200"
          item-key="id"
          @end="dropped($event,'todo')"
          class="kanban-column"
        >
          <template #item="{ element }">
            <TaskCard :task="element" @delete="deleteTask" @edit="editTask" @move="moveTask"/>
          </template>
        </draggable>
      </div>

      <div class="kanban-column-wrapper">
        <h5 class="text-center fw-bold text-warning">En cours</h5>
        <draggable
          :list="doingTasks"
          group="tasks"
          animation="200"
          item-key="id"
          @end="dropped($event,'doing')"
          class="kanban-column"
        >
          <template #item="{ element }">
            <TaskCard :task="element" @delete="deleteTask" @edit="editTask" @move="moveTask"/>
          </template>
        </draggable>
      </div>

      <div class="kanban-column-wrapper">
        <h5 class="text-center fw-bold text-success">Terminé</h5>
        <draggable
          :list="doneTasks"
          group="tasks"
          animation="200"
          item-key="id"
          @end="dropped($event,'done')"
          class="kanban-column"
        >
          <template #item="{ element }">
            <TaskCard :task="element" @delete="deleteTask" @edit="editTask" @move="moveTask"/>
          </template>
        </draggable>
      </div>

    </div>

    <TaskModal ref="taskModal" @save="saveTask" />
  </div>
</template>

<script setup>
import AppNavbar from "../components/AppNavbar.vue";
import TaskCard from "../components/TaskCard.vue";
import TaskModal from "../components/TaskModal.vue";
import { ref, onMounted, watch } from "vue";
import draggable from "vuedraggable";
import { useRoute } from "vue-router";
import { useProjectStore } from "../stores/projectStore";

const projectStore = useProjectStore();
const route = useRoute();
const projectId = route.params.id;

const taskModal = ref(null);
const project = ref(null);

const todoTasks = ref([]);
const doingTasks = ref([]);
const doneTasks = ref([]);

function updateLocalLists() {
  todoTasks.value = projectStore.tasks.filter(t => t.status === "todo");
  doingTasks.value = projectStore.tasks.filter(t => t.status === "doing");
  doneTasks.value = projectStore.tasks.filter(t => t.status === "done");
}

onMounted(async () => {
  await projectStore.fetchProject(projectId);
  project.value = projectStore.currentProject;
  projectStore.fetchProjectTasks(projectId);

  watch(
    () => projectStore.tasks,
    () => updateLocalLists(),
    { immediate: true }
  );
});

async function dropped(event, newStatus) {
  const task = event.item.__draggable_context.element;
  if (task.status !== newStatus) await moveTask(task, newStatus);
}

async function moveTask(task, newStatus) {
  const now = new Date().toISOString();
  if (task.status === "todo" && newStatus === "doing") task.dateStart = now;
  if (newStatus === "done") task.dateEnd = now;
  task.status = newStatus;
  await projectStore.updateTask(projectId, task.id, {
    status: newStatus,
    dateStart: task.dateStart || null,
    dateEnd: task.dateEnd || null
  });
  updateLocalLists();
}

async function saveTask(data) {
  const now = new Date().toISOString();
  if (!data.id) data.dateStart = now;
  else if (data.status === "done") data.dateEnd = now;
  if (data.id) await projectStore.updateTask(projectId, data.id, data);
  else await projectStore.createTask(projectId, data);
  updateLocalLists();
}

function editTask(task) { taskModal.value.editTask(task); }

async function deleteTask(task) {
  if (!confirm("Supprimer cette tâche ?")) return;
  await projectStore.deleteTask(projectId, task.id);
  updateLocalLists();
}
</script>

<style scoped>
.kanban-board {
  display: flex;
  gap: 15px;
}

.kanban-column-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.kanban-column {
  min-height: 300px;
  background: #f8f9fa;
  border-radius: 10px;
  padding: 10px;
  transition: .2s;
  overflow-y: auto;
}

.kanban-column:hover {
  background: #eef2ff;
}
</style>











