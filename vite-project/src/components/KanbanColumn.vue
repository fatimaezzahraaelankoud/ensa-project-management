<template>
  <div class="col-md-4">
    <div class="p-3 rounded shadow-sm" :class="'border-start border-4 border-'+color">
      <h5 class="fw-bold mb-3">{{ label }}</h5>

      <TaskCard 
        v-for="t in tasks"
        :key="t.id"
        :task="t"
        :status="status"
        @move="move"
        @delete="remove"
      />

    </div>
  </div>
</template>

<script setup>
import { useProjectStore } from "../stores/projectStore"
import TaskCard from "./TaskCard.vue"
import { useRoute } from "vue-router"

const props = defineProps({
  label:String,
  color:String,
  tasks:Array,
  status:String
})

const store = useProjectStore()
const route = useRoute()
const id = route.params.id

function move(task,newStatus){
  store.moveTask(id, task.id, newStatus)
}

function remove(task){
  store.deleteTask(id, task.id)
}
</script>
