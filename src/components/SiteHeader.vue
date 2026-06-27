<script setup lang="ts">
import { REPO_URL, DEMO_URL } from '@/data/links'

const iconUrl = `${import.meta.env.BASE_URL}imgs/icon.png`
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <a href="#top" class="flex items-center gap-2">
        <img :src="iconUrl" alt="Streak Saver" class="h-8 w-8 rounded-lg" width="32" height="32" />
        <span class="text-base font-bold tracking-tight">Streak Saver</span>
      </a>

      <nav class="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
        <a href="#features" class="transition hover:text-brand-500">Features</a>
        <a href="#dashboard" class="transition hover:text-brand-500">Dashboard</a>
        <a href="#how" class="transition hover:text-brand-500">Flow</a>
        <a href="#privacy" class="transition hover:text-brand-500">Privacy</a>
      </nav>

      <div class="flex items-center gap-2">
        <a :href="REPO_URL" target="_blank" rel="noopener" class="hidden rounded-xl border border-slate-200/70 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600 dark:border-slate-800 dark:text-slate-200 dark:hover:border-brand-800 md:inline-flex">
          GitHub
        </a>
        <a :href="DEMO_URL" class="inline-flex rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600">
          Open dashboard
        </a>
      </div>
    </div>
  </header>
</template>
