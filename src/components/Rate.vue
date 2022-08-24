<template>
  <div :style="fontStyle">
    <!-- {{ rate }} -->
    <slot></slot>
    <div class="rate" @mouseout="mousrOut">
      <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontwidth">
        <span @click="onRate(num)" @mouseover="mouseOver(num)" v-for="num in 5" :key="num"
          >★</span
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "@vue/compiler-sfc";
import { computed, ref } from "@vue/runtime-core";

let props = defineProps({
  ModelRate: Number,
  theme: { type: String, default: "orange" },
});

// let rate = computed(() => "★★★★★☆☆☆☆☆".slice(5 - props.value, 10 - props.value));

const themeObj = {
  black: "#000",
  white: "#fff",
  red: "#f5222d",
  orange: "#fa541c",
  yellow: "#fadb14",
  green: "#73d13d",
  blue: "#40a9ff",
};
const fontStyle = computed(() => {
  return `color:${themeObj[props.theme]}`;
});

// 评分宽度
let width = ref(props.ModelRate);
function mouseOver(i) {
  width.value = i;
}
function mouseOut() {
  width.value = props.ModelRate;
}
const fontwidth = computed(() => `width:${width.value}em`);

let emits = defineEmits(["updata:ModelRate"]);
function onRate(num) {
  console.log("111----");
  console.log("111----", num);
  emits("update-rate", num);
}
</script>
<style scoped>
.rate {
  position: relative;
  display: inline-block;
}
/* .rate > span {
  width: 0.5em;
} */
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
