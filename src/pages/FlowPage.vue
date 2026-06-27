<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import HowItWorksSection from '@/components/HowItWorksSection.vue'
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
    eyebrow="Flow"
    title="QR login flow gets its own page."
    intro="This page explains browser pairing, target selection, worker schedule, and how the automation keeps sessions server-side."
  >
    <HowItWorksSection />
    <FinalCtaSection />
  </PageLayout>
</template>
