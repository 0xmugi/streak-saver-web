<script setup lang="ts">
import {
  REPO_URL,
  PRIVACY_URL,
  ISSUES_URL,
  LICENSE_URL,
  HOME_URL,
  FEATURES_URL,
  DASHBOARD_URL,
  FLOW_URL,
 LOGIN_URL,
 TARGETS_URL,
SCHEDULE_URL,
  ACTIVITY_URL
} from '@/data/links'

const year = new Date().getFullYear()
const iconUrl = `${import.meta.env.BASE_URL}imgs/icon.png`

const productLinks = [
  { label: 'Home', href: HOME_URL },
  { label: 'Features', href: FEATURES_URL },
  { label: 'Dashboard', href: DASHBOARD_URL },
  { label: 'Flow', href: FLOW_URL },
  { label: 'Privacy', href: PRIVACY_URL }
]

const appLinks = [
  { label: 'Onboarding', href: LOGIN_URL },
  { label: 'Targets', href: TARGETS_URL },
  { label: 'Schedule', href: SCHEDULE_URL },
  { label: 'Activity', href: ACTIVITY_URL }
]

const metaLinks = [
  { label: 'GitHub', href: REPO_URL },
  { label: 'Issues', href: ISSUES_URL },
  { label: 'License', href: LICENSE_URL }
]
</script>

<template>
  <footer class="border-t border-slate-200/70 bg-white py-10 dark:border-slate-800/70 dark:bg-slate-950">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.2fr,1fr,1fr,1fr]">
      <div class="space-y-4">
        <div class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <img :src="iconUrl" alt="" aria-hidden="true" class="h-6 w-6 rounded-md" width="24" height="24" />
          <span>&copy; {{ year }} Streak Saver Web.</span>
        </div>
        <p class="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-400">
          Public product shell for TikTok streak protection. Landing, control flow, and operator surfaces in one build.
        </p>
      </div>

      <div>
        <p class="text-sm font-semibold text-slate-950 dark:text-white">Product</p>
        <nav class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <a v-for="item in productLinks" :key="item.href" :href="item.href" class="block transition hover:text-brand-500">{{ item.label }}</a>
        </nav>
      </div>

      <div>
        <p class="text-sm font-semibold text-slate-950 dark:text-white">App shell</p>
        <nav class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <a v-for="item in appLinks" :key="item.href" :href="item.href" class="block transition hover:text-brand-500">{{ item.label }}</a>
        </nav>
      </div>

      <div>
        <p class="text-sm font-semibold text-slate-950 dark:text-white">Meta</p>
        <nav class="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <a
            v-for="item in metaLinks"
            :key="item.href"
            :href="item.href"
            target="_blank"
            rel="noopener"
            class="block transition hover:text-brand-500"
          >
            {{ item.label }}
          </a>
        </nav>
      </div>
    </div>
  </footer>
</template>
