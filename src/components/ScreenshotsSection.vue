<script setup lang="ts">
import { screenshots } from '@/data/screenshots'
</script>

<template>
  <section id="dashboard" class="py-20 md:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-semibold uppercase tracking-wider text-brand-500">Inside dashboard</span>
        <h2 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Same visual DNA. Better trust.</h2>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Familiar UI style from current site, reshaped into web control panel flow.
        </p>
      </div>

      <div class="mt-14 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="rounded-[2rem] border border-slate-200/70 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-950">
          <div class="flex items-center justify-between gap-3 border-b border-slate-200/70 pb-4 dark:border-slate-800">
            <div>
              <p class="text-sm font-semibold text-slate-950 dark:text-white">Live streak dashboard</p>
              <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Targets, next runs, recent results.</p>
            </div>
            <span class="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">worker healthy</span>
          </div>

          <div class="mt-5 grid gap-4 sm:grid-cols-3">
            <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <p class="text-sm text-slate-500 dark:text-slate-400">Active streaks</p>
              <p class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">12</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <p class="text-sm text-slate-500 dark:text-slate-400">Connected session</p>
              <p class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">1</p>
            </div>
            <div class="rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/70">
              <p class="text-sm text-slate-500 dark:text-slate-400">Last success</p>
              <p class="mt-2 text-2xl font-bold text-slate-950 dark:text-white">2m ago</p>
            </div>
          </div>

          <div class="mt-5 space-y-3">
            <div class="flex flex-col gap-2 rounded-2xl border border-slate-200/70 px-4 py-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div class="min-w-0">
                <p class="font-semibold text-slate-950 dark:text-white">@ryu.main</p>
                <p class="text-sm text-slate-600 dark:text-slate-300">DM streak • next run 00:14</p>
              </div>
              <span class="text-sm font-semibold text-emerald-600 dark:text-emerald-300">active</span>
            </div>
            <div class="flex flex-col gap-2 rounded-2xl border border-slate-200/70 px-4 py-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div class="min-w-0">
                <p class="font-semibold text-slate-950 dark:text-white">Study Group</p>
                <p class="text-sm text-slate-600 dark:text-slate-300">Group streak • retry buffer ready</p>
              </div>
              <span class="text-sm font-semibold text-brand-600 dark:text-brand-300">queued</span>
            </div>
            <div class="flex flex-col gap-2 rounded-2xl border border-slate-200/70 px-4 py-3 dark:border-slate-800 sm:flex-row sm:items-center sm:justify-between">
              <div class="min-w-0">
                <p class="font-semibold text-slate-950 dark:text-white">@ella.side</p>
                <p class="text-sm text-slate-600 dark:text-slate-300">Night window • delivery confirmed</p>
              </div>
              <span class="text-sm font-semibold text-slate-600 dark:text-slate-300">done</span>
            </div>
          </div>
        </div>

        <div class="scroll-rail flex snap-x snap-mandatory gap-6 overflow-x-auto px-2 pb-4 lg:block lg:space-y-6 lg:overflow-visible lg:px-0">
          <figure v-for="(shot, i) in screenshots" :key="i" class="snap-center">
            <div class="relative w-[220px] shrink-0 overflow-hidden rounded-[2rem] border border-slate-200/70 bg-white p-1.5 shadow-xl shadow-slate-900/10 transition hover:-translate-y-1 hover:shadow-2xl dark:border-slate-800 dark:bg-slate-900 sm:w-[260px] lg:w-full">
              <img :src="shot.src" :alt="shot.alt" class="aspect-[9/19.5] w-full rounded-[1.5rem] object-cover" loading="lazy" />
            </div>
            <figcaption class="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">{{ shot.alt }}</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </section>
</template>
