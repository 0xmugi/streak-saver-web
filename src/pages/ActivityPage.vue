<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import AppShellPage from '@/components/AppShellPage.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { shellNav, activityFeed } from '@/data/appShell'

useSystemTheme()
</script>

<template>
  <PageLayout>
    <AppShellPage
      eyebrow="App shell"
      title="Activity page proves bot did real work."
      intro="Recent keepalives, session refresh, risk spikes, and fallback moves. Enough proof without noisy raw logs."
      section-title="Recent actions"
      section-intro="This should become proof surface for operators and customers. Show action, time, outcome, and why intervention matters."
      :nav="shellNav"
      :timeline="activityFeed"
    />
  </PageLayout>
</template>
