<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import PageLayout from '@/components/PageLayout.vue'
import HeroSection from '@/components/HeroSection.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import ScreenshotsSection from '@/components/ScreenshotsSection.vue'
import HowItWorksSection from '@/components/HowItWorksSection.vue'
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
  <PageLayout>
    <HeroSection />
    <FeaturesSection />
    <ScreenshotsSection />
    <HowItWorksSection />
    <PrivacySection />
    <FinalCtaSection />
  </PageLayout>
</template>
