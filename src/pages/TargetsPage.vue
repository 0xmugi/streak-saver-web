<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import AppShellPage from '@/components/AppShellPage.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { shellNav, targetRows } from '@/data/appShell'

useSystemTheme()
</script>

<template>
  <PageLayout>
    <AppShellPage
      eyebrow="App shell"
      title="Targets page tracks accounts, windows, and streak risk."
      intro="One grid for operator truth. Which account runs when, under which timezone, with what safety state."
      section-title="Protection roster"
      section-intro="This page should feel like control center, not spreadsheet dump. Fast scan, clear windows, clear risk, no guessing."
      :nav="shellNav"
      :rows="targetRows"
    />
  </PageLayout>
</template>
