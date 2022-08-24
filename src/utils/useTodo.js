import { ref, reactive } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import useStorage from "./useStorage";

export function useTodo() {
    let title = ref("");
    let showError = ref(false)
    // let todos = ref([
    //     {
    //         title: "学习vue",
    //         done: false,
    //     },
    // ]);
    let todos = useStorage('todos', [])

    // 添加 todo待办
    function addTodo() {
        if (!title.value) {
            showError.value = true
            setTimeout(() => {
                showError.value = false
            }, 1500)
            return;
        }
        todos.value.push({
            title: title.value,
            done: false,
        });
        title.value = "";

    }

    // 清除所有待办
    function clear() {
        todos.value = todos.value.filter((v) => !v.done);
    }

    // 选中的待办的有几个
    let active = computed(() => {
        return todos.value.filter((v) => !v.done).length;
    });

    // 所有的待办有几个
    let all = computed(() => {
        return todos.value.length;
    });

    let allDone = computed({
        get: function () {
            return active.value === 0;
        },
        set: function (value) {
            todos.value.forEach((todo) => {
                todo.done = value;
            });
        },
    });

    function removeTodo(e, i) {
        animate.el = e.target;
        animate.show = true;
        todos.value.splice(i, 1)
    }

    // 以下是删除-todo动画
    let animate = reactive({
        show: false,
        el: null,
    });

    function beforeEnter(el) {
        let dom = animate.el;
        let rect = dom.getBoundingClientRect();
        let x = window.innerWidth - rect.left - 60;
        let y = rect.top - 10;
        el.style.transform = `translate(-${x}px,${y}px)`;
    }

    function enter(el, done) {
        document.body.offsetHeight;
        el.style.transform = `translate(0,0)`;
        el.addEventListener("transitionend", done);
    }

    function afterEnter(el) {
        animate.show = false;
        el.style.display = "none";
    }

    return { title, showError, animate, todos, addTodo, clear, active, all, allDone, removeTodo, beforeEnter, enter, afterEnter }
}