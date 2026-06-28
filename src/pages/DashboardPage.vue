<script setup lang="ts">
import AppPageLayout from '@/components/AppPageLayout.vue'
import DashboardSummary from '@/components/DashboardSummary.vue'
import AccountsBoard from '@/components/AccountsBoard.vue'
import ActivityFeedBoard from '@/components/ActivityFeedBoard.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { managedAccounts, runtimeEvents } from '@/data/runtime'
import { privateAppNav, ensureAuthOrRedirect } from '@/data/auth'
import { DASHBOARD_URL } from '@/data/links'

useSystemTheme()
ensureAuthOrRedirect(window.location.pathname)
</script>

<template>
  <AppPageLayout
    title="Dashboard"
    subtitle="Live account health, proof trail, and recovery risk in one surface."
    :nav="privateAppNav"
    :current-path="DASHBOARD_URL"
  >
    <div class="space-y-8">
      <DashboardSummary :accounts="managedAccounts" :events="runtimeEvents" />
      <AccountsBoard />
      <ActivityFeedBoard />
    </div>
  </AppPageLayout>
</template>
