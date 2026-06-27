<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import AppShellPage from '@/components/AppShellPage.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { shellNav, scheduleTimeline } from '@/data/appShell'

useSystemTheme()
</script>

<template>
  <PageLayout>
    <AppShellPage
      eyebrow="App shell"
      title="Schedule page explains exact run timing."
      intro="Warm checks, main keepalive, rescue lane, and manual escalation. No black-box cron feeling."
      section-title="Execution window"
      section-intro="Operator should know what fires before midnight, what retries after friction, and when alerting kicks in."
      :nav="shellNav"
      :timeline="scheduleTimeline"
    />
  </PageLayout>
</template>
