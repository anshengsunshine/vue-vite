<template>
  <h5>这个是 home 页面</h5>
  <Count />
  ===================================
  <Todolist />
  <button @click="loading">点击更换icon</button>
  <h5 @click="toggle">切换全屏</h5>


</template>

<script setup>
import Todolist from "../components/Todolist.vue"
import Count from "../components/Count.vue"
import useFavicon from "../utils/useFavicon";
import { useFullscreen } from '@vueuse/core';
import { ref } from "@vue/reactivity";

const { isFullscreen,enter,exit,toggle } = useFullscreen() 

let { favicon } = useFavicon()
function loading(){
  favicon.value = '/geek.jpg'
}

</script>
<style scoped>
h5 {
  color: #f00;
}
</style>