import { onBeforeUnmount, onMounted } from 'vue'

const darkMq = window.matchMedia('(prefers-color-scheme: dark)')

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}

function onMqChange(e: MediaQueryListEvent) {
  applyTheme(e.matches)
}

export function useSystemTheme() {
  onMounted(() => {
    applyTheme(darkMq.matches)
    darkMq.addEventListener('change', onMqChange)
  })

  onBeforeUnmount(() => {
    darkMq.removeEventListener('change', onMqChange)
  })
}
