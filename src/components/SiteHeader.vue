<script setup lang="ts">
import {
  REPO_URL,
  DEMO_URL,
  HOME_URL,
  FEATURES_URL,
  DASHBOARD_URL,
  FLOW_URL,
  PRIVACY_URL,
  LOGIN_URL,
  CONNECT_URL,
  TARGETS_URL,
  SCHEDULE_URL,
  ACTIVITY_URL
} from '@/data/links'

const iconUrl = `${import.meta.env.BASE_URL}imgs/icon.png`

const primaryNav = [
  { label: 'Features', href: FEATURES_URL },
  { label: 'Dashboard', href: DASHBOARD_URL },
  { label: 'Flow', href: FLOW_URL },
  { label: 'Privacy', href: PRIVACY_URL }
]

const appNav = [
  { label: 'Login', href: LOGIN_URL },
  { label: 'Connect', href: CONNECT_URL },
  { label: 'Targets', href: TARGETS_URL },
  { label: 'Schedule', href: SCHEDULE_URL },
  { label: 'Activity', href: ACTIVITY_URL }
]
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <a :href="HOME_URL" class="flex items-center gap-2">
        <img :src="iconUrl" alt="Streak Saver" class="h-8 w-8 rounded-lg" width="32" height="32" />
        <span class="text-base font-bold tracking-tight text-slate-950 dark:text-white">Streak Saver</span>
      </a>

      <nav class="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
        <a v-for="item in primaryNav" :key="item.href" :href="item.href" class="transition hover:text-brand-500">{{ item.label }}</a>
      </nav>

      <div class="flex items-center gap-2">
        <a
          :href="REPO_URL"
          target="_blank"
          rel="noopener"
          class="hidden rounded-xl border border-slate-200/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-800 dark:text-slate-200 dark:hover:border-brand-400 dark:hover:text-brand-300 sm:inline-flex"
        >
          GitHub
        </a>
        <a
          :href="DEMO_URL"
          class="inline-flex rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500 dark:bg-white dark:text-slate-950 dark:hover:bg-brand-300"
        >
          Open app
        </a>
      </div>
    </div>

    <div class="border-t border-slate-200/70 bg-white/90 dark:border-slate-800/70 dark:bg-slate-950/90">
      <div class="scroll-rail mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 py-2 sm:px-6">
        <a
          v-for="item in appNav"
          :key="item.href"
          :href="item.href"
          class="whitespace-nowrap rounded-full border border-slate-200/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 transition hover:border-brand-500 hover:text-brand-500 dark:border-slate-800 dark:text-slate-300 dark:hover:border-brand-400 dark:hover:text-brand-300"
        >
          {{ item.label }}
        </a>
      </div>
    </div>
  </header>
</template>
