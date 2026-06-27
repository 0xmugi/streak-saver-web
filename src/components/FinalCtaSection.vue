<script setup lang="ts">
import { DEMO_URL, REPO_URL } from '@/data/links'
</script>

<template>
  <section id="final-cta" class="py-20 md:py-28">
    <div class="mx-auto max-w-4xl px-4 sm:px-6">
      <div class="relative overflow-hidden rounded-3xl bg-brand-500 px-8 py-14 text-center text-white shadow-2xl shadow-brand-500/30 sm:px-12 sm:py-20">
        <div aria-hidden="true" class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%),radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_55%)]" />
        <p class="text-sm font-semibold uppercase tracking-[0.25em] text-white/80">streak saver web</p>
        <h2 class="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Use streak saver from browser.</h2>
        <p class="mx-auto mt-4 max-w-2xl text-base text-white/90">
          Public repo. Same visual identity. Better onboarding path for people who do not trust APK installs.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a :href="DEMO_URL" class="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-slate-100">
            Open demo
          </a>
          <a :href="REPO_URL" target="_blank" rel="noopener" class="inline-flex items-center gap-2 rounded-xl border border-white/35 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/10">
            View repo
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
