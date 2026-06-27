<script setup lang="ts">
import PageLayout from '@/components/PageLayout.vue'
import AppShellPage from '@/components/AppShellPage.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { shellNav, shellStats, loginChecklist } from '@/data/appShell'

useSystemTheme()
</script>

<template>
  <PageLayout>
    <AppShellPage
      eyebrow="App shell"
      title="Login starts with recovery-safe session capture."
      intro="No raw cookie copy UX. QR first, fallback second, operator proof always visible."
      section-title="Session intake"
      section-intro="This page should guide first login, show capture health, and tell operator exactly why an account can or cannot enter automation."
      :nav="shellNav"
      :stats="shellStats"
      :notes="loginChecklist"
    />
  </PageLayout>
</template>
