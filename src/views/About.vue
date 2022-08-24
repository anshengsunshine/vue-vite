<template>
  <h5>这个是 about 页面，评级是{{ score }}</h5>
  <rate v-model="score" theme="blue" @update-rate="update" />
  <rate :value="2" />
  <rate :value="1" theme="green" />
  <rate v-model="score">
    <img width="40" src="/geek.jpg" />
  </rate>
  <div class="box" :style="{ width: width + 'px' }"></div>
  <button @click="change">点击改变box宽度</button>

  <button @click="toggle">点击显示/隐藏下面这句话</button>
  <transition name="fade">
    <h5 v-if="showTitle">你好，vue 3</h5>
  </transition>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import Rate from "../components/Rate.vue";
let score = ref(4);
function update(num) {
  console.log(num);
  score.value = num;
}

let width = ref(100);
function change() {
  width.value += 100;
}

let showTitle = ref(true);
function toggle() {
  showTitle.value = !showTitle.value;
}
</script>

<style scoped>
.box {
  position: relative;
  width: 30px;
  height: 30px;
  background: #d88986;
  animation: move 2s linear infinite;
  /* transition: width 1s linear; */
}
@keyframes move {
  0% {
    left: 0px;
  }
  50% {
    left: 200px;
  }
  100% {
    left: 0px;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s linear;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
