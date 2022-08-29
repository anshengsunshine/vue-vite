<template>
  <div>
    {{ count }}
    <button @click="add">add</button>
  </div>
</template>

<script setup>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";

let store = useStore();
console.log(store)
let count = computed(() => store.state.count);
function add (){
    store.commit('add')
}
</script>

<style></style>
