<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import AppShellPage from '@/components/AppShellPage.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { shellNav, connectCards } from '@/data/appShell'

useSystemTheme()
</script>

<template>
  <PageLayout>
    <AppShellPage
      eyebrow="App shell"
      title="Connect page handles QR handoff and device trust."
      intro="Show active device lanes, backup readiness, and whether account can recover without manual cookie work."
      section-title="Device lanes"
      section-intro="Natural recovery comes from stable device identity. This surface should explain which lane is active, which one stays cold, and when operator should relink."
      :nav="shellNav"
      :cards="connectCards"
    />
  </PageLayout>
</template>
