<script setup lang="ts">
import AppPageLayout from '@/components/AppPageLayout.vue'
import OnboardingBoard from '@/components/OnboardingBoard.vue'
import { useSystemTheme } from '@/composables/useSystemTheme'
import { publicAppNav } from '@/data/auth'
import { LOGIN_URL } from '@/data/links'

useSystemTheme()
</script>

<template>
  <AppPageLayout
    title="Login"
    subtitle="Start QR, confirm login, then continue to dashboard."
    :nav="publicAppNav"
    :current-path="LOGIN_URL"
  >
    <OnboardingBoard />
  </AppPageLayout>
</template>
