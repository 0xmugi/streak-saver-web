<script setup lang="ts">
import AppPageLayout from '@/components/AppPageLayout.vue'
import ScheduleBoard from '@/components/ScheduleBoard.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { privateAppNav, ensureAuthOrRedirect } from '@/data/auth'
import { SCHEDULE_URL } from '@/data/links'

useSystemTheme()
ensureAuthOrRedirect(window.location.pathname)
</script>

<template>
  <AppPageLayout
    title="Schedule"
    subtitle="Automation cadence, retry depth, and safe-mode control for tonight run."
    :nav="privateAppNav"
    :current-path="SCHEDULE_URL"
  >
    <ScheduleBoard />
  </AppPageLayout>
</template>
