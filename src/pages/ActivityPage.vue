<script setup lang="ts">
import AppPageLayout from '@/components/AppPageLayout.vue'
import ActivityFeedBoard from '@/components/ActivityFeedBoard.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { privateAppNav, ensureAuthOrRedirect } from '@/data/auth'
import { ACTIVITY_URL } from '@/data/links'

useSystemTheme()
ensureAuthOrRedirect(window.location.pathname)
</script>

<template>
  <AppPageLayout
    title="Activity"
    subtitle="Recent proofs, alerts, refreshes, and operator actions without raw log noise."
    :nav="privateAppNav"
    :current-path="ACTIVITY_URL"
  >
    <ActivityFeedBoard />
  </AppPageLayout>
</template>
