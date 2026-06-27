<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
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
    eyebrow="Feature pages"
    title="Every core feature gets its own surface."
    intro="No more one long static page. This page focuses on product capabilities and where each part of the flow lives."
  >
    <FeaturesSection />
    <FinalCtaSection />
  </PageLayout>
</template>
