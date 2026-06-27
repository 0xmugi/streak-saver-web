<script setup lang="ts">
import { DEMO_URL, REPO_URL } from '@/data/links'

const iconUrl = `${import.meta.env.BASE_URL}imgs/icon.png`
const heroShotUrl = `${import.meta.env.BASE_URL}imgs/Main_Secondary.jpeg`
</script>

<template>
  <section id="top" class="relative overflow-hidden">
    <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-brand-50/70 via-transparent to-transparent dark:from-brand-900/30" />
    <div aria-hidden="true" class="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl dark:bg-brand-500/20" />

    <div class="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
      <div>
        <div class="mb-6 flex items-center gap-3">
          <img :src="iconUrl" alt="Streak Saver" class="h-14 w-14 rounded-2xl shadow-md" width="56" height="56" />
          <span class="inline-flex items-center gap-1.5 rounded-full border border-brand-200/70 bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700 dark:border-brand-900/70 dark:bg-brand-950/50 dark:text-brand-300">
            web access now
          </span>
        </div>

        <h1 class="max-w-xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl md:text-6xl dark:text-white">
          Same streak tool. Web app now.
        </h1>

        <p class="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          No APK trust problem. No manual cookies. Open site, scan QR, manage streak automation from clean dashboard.
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <a :href="DEMO_URL" class="inline-flex items-center justify-center rounded-2xl bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-xl shadow-brand-500/25 transition hover:bg-brand-600">
            Open dashboard
          </a>
          <a :href="REPO_URL" target="_blank" rel="noopener" class="inline-flex items-center justify-center rounded-2xl border border-slate-200/80 bg-white px-6 py-3 text-base font-semibold text-slate-700 transition hover:border-brand-200 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-brand-800">
            View public repo
          </a>
        </div>

        <dl class="mt-10 grid max-w-xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div class="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <dt class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">access</dt>
            <dd class="mt-2 text-lg font-bold text-slate-950 dark:text-white">QR login</dd>
          </div>
          <div class="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <dt class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">surface</dt>
            <dd class="mt-2 text-lg font-bold text-slate-950 dark:text-white">web dashboard</dd>
          </div>
          <div class="rounded-2xl border border-slate-200/70 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <dt class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">engine</dt>
            <dd class="mt-2 text-lg font-bold text-slate-950 dark:text-white">backend worker</dd>
          </div>
        </dl>
      </div>

      <div class="relative mx-auto w-full max-w-[300px] md:max-w-sm">
        <div class="absolute -inset-6 -z-10 rounded-[2.5rem] bg-brand-500/10 blur-2xl" />
        <div class="relative rounded-[2.25rem] border border-slate-200/70 bg-white p-2 shadow-2xl shadow-slate-900/20 dark:border-slate-800 dark:bg-slate-900">
          <img :src="heroShotUrl" alt="Streak Saver dashboard" class="aspect-[9/19.5] w-full rounded-[1.75rem] object-cover" />
        </div>
        <div class="absolute -right-6 top-10 hidden w-48 rounded-2xl border border-slate-200/70 bg-white/95 p-4 shadow-xl dark:border-slate-800 dark:bg-slate-950/95 md:block">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">session</p>
          <p class="mt-2 text-sm font-semibold text-slate-950 dark:text-white">TikTok QR connected</p>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Worker active. Next run in 14m.</p>
        </div>
        <div class="absolute -left-8 bottom-10 hidden w-52 rounded-2xl border border-slate-200/70 bg-white/95 p-4 shadow-xl dark:border-slate-800 dark:bg-slate-950/95 md:block">
          <p class="text-xs font-semibold uppercase tracking-[0.2em] text-brand-500">trust</p>
          <p class="mt-2 text-sm font-semibold text-slate-950 dark:text-white">No sideload install</p>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Browser-first onboarding for normal users.</p>
        </div>
      </div>
    </div>
  </section>
</template>
