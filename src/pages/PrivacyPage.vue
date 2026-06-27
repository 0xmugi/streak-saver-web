<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import PrivacySection from '@/components/PrivacySection.vue'
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
    eyebrow="Privacy"
    title="Trust page. Plain language."
    intro="This page isolates login, session handling, worker boundaries, and storage promises so users do not need to scan whole landing page for trust signals."
  >
    <PrivacySection />
    <FinalCtaSection />
  </PageLayout>
</template>
