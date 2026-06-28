<script setup lang="ts">
import AppPageLayout from '@/components/AppPageLayout.vue'
import AccountsBoard from '@/components/AccountsBoard.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { privateAppNav, ensureAuthOrRedirect } from '@/data/auth'
import { TARGETS_URL } from '@/data/links'

useSystemTheme()
ensureAuthOrRedirect(window.location.pathname)
</script>

<template>
  <AppPageLayout
    title="Targets"
    subtitle="Search, filter, and rank which account needs attention next."
    :nav="privateAppNav"
    :current-path="TARGETS_URL"
  >
    <AccountsBoard />
  </AppPageLayout>
</template>
