
import { ref, watch, onMounted } from 'vue'

const isDark = ref(false)

export function useDarkMode() {
    const toggleDarkMode = () => {
        isDark.value = !isDark.value
        updateTheme()
    }

    const updateTheme = () => {
        if (isDark.value) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
    }

    const initDarkMode = () => {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            isDark.value = savedTheme === 'dark'
        } else {
            isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
        }
        updateTheme()
    }

    onMounted(() => {
        initDarkMode()
    })

    return {
        isDark,
        toggleDarkMode
    }
}
