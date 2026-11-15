import { ref } from 'vue'

const isDark = ref(true)

function apply() {
    document.documentElement.classList.toggle('dark', isDark.value)
}

export function useTheme() {
    function init() {
        const saved = localStorage.getItem('theme')
        isDark.value = saved ? saved === 'dark' : true // default dark
        apply()
    }

    function toggle() {
        isDark.value = !isDark.value
        localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
        apply()
    }

    return { isDark, init, toggle }
}