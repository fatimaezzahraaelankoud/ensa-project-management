<template>
  <div 
    class="task-card"
    :style="{ borderLeft:`6px solid ${colorByStatus[task.status]}` }"
  >
    <h6 class="fw-bold">{{ task.title }}</h6>
    <p class="text-muted small mb-1">{{ task.description }}</p>

    <p v-if="task.status === 'todo' && task.dateStart" class="small text-primary">
       À faire avant : <b>{{ formatDate(task.dateStart) }}</b>
    </p>

    <p v-if="task.status === 'doing' && task.dateStart" class="small text-warning">
       Début : <b>{{ formatDate(task.dateStart) }}</b>
    </p>

    <p v-if="task.status === 'done' && task.dateEnd" class="small text-success">
       Terminé le : <b>{{ formatDate(task.dateEnd) }}</b>
    </p>

    <select class="form-select form-select-sm my-2"
      v-model="localStatus"
      @change="changeStatus"
    >
      <option value="todo">À faire</option>
      <option value="doing">En cours</option>
      <option value="done">Terminé</option>
    </select>

    <div class="d-flex justify-content-between mt-2">
      <button class="btn btn-warning btn-sm" @click="$emit('edit', task)">Modifier</button>
      <button class="btn btn-danger btn-sm" @click="$emit('delete', task)">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  task: { type: Object, required: true }
});

const emits = defineEmits(["move", "delete", "edit"]);

const colorByStatus = {
  todo: "#0d6efd",
  doing: "#ffc107",
  done: "#198754"
};

const localStatus = computed({
  get: () => props.task.status,
  set: (v) => emits("move", props.task, v)
});

const changeStatus = () => {
  emits("move", props.task, localStatus.value);
};

function formatDate(date) {
  return new Date(date).toLocaleDateString("fr-FR");
}
</script>

<style scoped>
.task-card {
  border-radius: 10px;
  background: #fff;
  padding: 12px;
  margin-bottom: 10px;
  cursor: grab;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}
.task-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.task-card select {
  font-size: 13px;
  margin-top: 5px;
}
.task-card button {
  font-size: 12px;
  padding: 4px 8px;
}
</style>

