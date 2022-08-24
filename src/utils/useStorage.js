import { ref } from "@vue/reactivity";
import { watchEffect } from "@vue/runtime-core";
function useStorage(name,value) {
    let data = ref(JSON.parse(localStorage.getItem(name) || '[]'))
    watchEffect()(() => {
        localStorage.setItem(name, JSON.stringify(data.value))
    })
    return data
}

export default useStorage 