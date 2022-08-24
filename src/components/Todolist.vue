<template>
  <div>
    <span class="dustbin"> ♨ </span>
    <div class="animate_wrap">
      <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
        <div class="animate" v-show="animate.show">☸</div>
      </transition>
    </div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <transition-group name="flip-list" tag="ul">
        <li v-for="todo in todos" :key="todo.title">
          <input type="checkbox" v-model="todo.done" />
          <span :class="{ done: todo.done }">{{ todo.title }}</span>
          <span class="remove_btn" @click="removeTodo($event, i)">×</span>
        </li>
      </transition-group>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>

    <transition name="showError">
      <div class="info_wrap" v-if="showError">
        <div class="info">你还没有输入啥内容呢~~</div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
import { useTodo } from "../utils/useTodo";

let {
  title,
  showError,
  animate,
  todos,
  addTodo,
  clear,
  active,
  all,
  allDone,
  removeTodo,
  beforeEnter,
  enter,
  afterEnter,
} = useTodo();
</script>
<style scoped>
.animate_wrap .animate {
  position: fixed;
  right: 10px;
  top: 10px;
  z-index: 100;
  transition: all 0.5s linear;
}
.dustbin {
  position: absolute;
  top: 20px;
  right: 10px;
}

.info_wrap {
  position: fixed;
  top: 20px;
  width: 200px;
}
.info {
  padding: 20px;
  color: #fff;
  background-color: green;
}
.remove_btn {
  font-size: 20px;
  color: #f00;
  cursor: pointer;
}

.showError-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.showError-enter-active {
  transition: all 0.3s ease;
}

.showError-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.showError-leave-active {
  transition: all 0.3s ease;
}

.flip-list-move {
  transition: transform 0.8s ease;
}
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 1s ease;
}

.flip-list-enter-from,
.flip-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
