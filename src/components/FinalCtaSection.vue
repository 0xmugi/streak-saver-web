<script setup lang="ts">
import { DEMO_URL } from '@/data/links'
</script>

<template>
  <section class="bg-brand-600 py-20 text-white dark:bg-brand-500">
    <div class="mx-auto max-w-5xl px-4 text-center sm:px-6">
      <p class="text-sm font-semibold uppercase tracking-[0.22em] text-white/75">Start clean</p>
      <h2 class="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">One onboarding flow. Then app opens.</h2>
      <p class="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/82">
        No split between connect and login. Finish one clear flow, then move into dashboard, targets, activity, and schedule.
      </p>
      <div class="mt-8 flex items-center justify-center">
        <a :href="DEMO_URL" class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-slate-100">
          Open app
        </a>
      </div>
    </div>
  </section>
</template>
