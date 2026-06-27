<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import ScreenshotsSection from '@/components/ScreenshotsSection.vue'
import FinalCtaSection from '@/components/FinalCtaSection.vue'

const darkMq = window.matchMedia('(prefers-color-scheme: dark)')

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)
}

function onMqChange(e: MediaQueryListEvent) {
  applyTheme(e.matches)
}

onMounted(() => {
  applyTheme(darkMq.matches)
  darkMq.addEventListener('change', onMqChange)
})

onBeforeUnmount(() => {
  darkMq.removeEventListener('change', onMqChange)
})
</script>

<template>
  <PageLayout
    eyebrow="Dashboard"
    title="Control panel page. Not screenshot dump."
    intro="Dedicated page for dashboard story. Targets, run windows, recent actions, and proof surfaces live here."
  >
    <ScreenshotsSection />
    <FinalCtaSection />
  </PageLayout>
</template>
