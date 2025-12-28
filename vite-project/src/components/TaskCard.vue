<template>
  <div class="card shadow-sm p-3 mb-3 border-0" :style="{ borderLeft: `6px solid ${task.color || '#007bff'}` }">
    <h6 class="fw-bold">{{ task.title }}</h6>
    <p class="text-muted small">{{ task.description }}</p>

    <select class="form-select form-select-sm my-2"
      v-model="localStatus"
      @change="changeStatus">
      <option value="todo">À faire</option>
      <option value="doing">En cours</option>
      <option value="done">Terminé</option>
    </select>

    <div class="d-flex justify-content-between">
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

const localStatus = computed({
  get: () => props.task.status,
  set: (v) => emits("move", props.task, v)
});

function changeStatus() {
  emits("move", props.task, localStatus.value);
}
</script>

<style scoped>
.card {
  transition: 0.2s;
}

.card:hover {
  transform: scale(1.02);
}
</style>







