<script setup lang="ts">
import type { SummaryStat, TimelineItem, AccountCard, TargetRow, ShellNavItem } from '@/data/appShell'

withDefaults(
  defineProps<{
    eyebrow: string
    title: string
    intro: string
    sectionTitle: string
    sectionIntro: string
    nav: ShellNavItem[]
    stats?: SummaryStat[]
    notes?: string[]
    cards?: AccountCard[]
    timeline?: TimelineItem[]
    rows?: TargetRow[]
  }>(),
  {
    stats: () => [],
    notes: () => [],
    cards: () => [],
    timeline: () => [],
    rows: () => []
  }
)

function toneClasses(tone: 'default' | 'good' | 'warn' = 'default') {
  if (tone === 'good') return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300'
  if (tone === 'warn') return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300'
  return 'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200'
}
</script>

<template>
  <section class="border-b border-slate-200/70 bg-white dark:border-slate-800/70 dark:bg-slate-950">
    <div class="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[220px,1fr] lg:py-20">
      <aside class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[0.22em] text-brand-500">{{ eyebrow }}</p>
        <h1 class="text-4xl font-bold tracking-tight text-slate-950 dark:text-white">{{ title }}</h1>
        <p class="text-base leading-7 text-slate-600 dark:text-slate-300">{{ intro }}</p>

        <nav class="scroll-rail flex gap-2 overflow-x-auto pt-2 lg:block lg:space-y-2 lg:overflow-visible">
          <a
            v-for="item in nav"
            :key="item.href"
            :href="item.href"
            class="block min-w-max rounded-2xl border border-slate-200/70 px-4 py-3 text-sm transition hover:border-brand-500 hover:bg-brand-50 dark:border-slate-800 dark:hover:border-brand-400 dark:hover:bg-slate-900"
          >
            <div class="font-semibold text-slate-950 dark:text-white">{{ item.label }}</div>
            <div class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ item.description }}</div>
          </a>
        </nav>
      </aside>

      <div class="space-y-8">
        <div v-if="stats.length" class="grid gap-4 md:grid-cols-3">
          <article
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/70"
          >
            <p class="text-sm text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
            <p class="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{{ stat.value }}</p>
            <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">{{ stat.detail }}</p>
          </article>
        </div>

        <section class="rounded-[32px] border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/70 sm:p-8">
          <div class="max-w-3xl">
            <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">{{ sectionTitle }}</p>
            <p class="mt-3 text-lg leading-8 text-slate-700 dark:text-slate-300">{{ sectionIntro }}</p>
          </div>

          <div v-if="notes.length" class="mt-6 grid gap-3">
            <div
              v-for="note in notes"
              :key="note"
              class="rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm leading-6 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            >
              {{ note }}
            </div>
          </div>

          <div v-if="cards.length" class="mt-6 grid gap-4 md:grid-cols-3">
            <article
              v-for="card in cards"
              :key="card.title"
              :class="['rounded-3xl border p-5', toneClasses(card.tone)]"
            >
              <div class="flex items-center justify-between gap-3">
                <h3 class="text-base font-semibold">{{ card.title }}</h3>
                <span class="rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] dark:bg-white/10">{{ card.status }}</span>
              </div>
              <p class="mt-3 text-sm leading-6 opacity-90">{{ card.detail }}</p>
            </article>
          </div>

          <div v-if="timeline.length" class="mt-6 space-y-3">
            <article
              v-for="item in timeline"
              :key="`${item.time}-${item.title}`"
              :class="['rounded-2xl border px-4 py-4', toneClasses(item.tone)]"
            >
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="text-sm font-semibold uppercase tracking-[0.16em]">{{ item.title }}</h3>
                <span class="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{{ item.time }}</span>
              </div>
              <p class="mt-2 text-sm leading-6 opacity-90">{{ item.detail }}</p>
            </article>
          </div>

          <div v-if="rows.length" class="scroll-rail mt-6 overflow-x-auto">
            <table class="min-w-full border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr>
                  <th class="border-b border-slate-200/70 px-4 py-3 font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">Account</th>
                  <th class="border-b border-slate-200/70 px-4 py-3 font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">Profile</th>
                  <th class="border-b border-slate-200/70 px-4 py-3 font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">Timezone</th>
                  <th class="border-b border-slate-200/70 px-4 py-3 font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">Local window</th>
                  <th class="border-b border-slate-200/70 px-4 py-3 font-semibold text-slate-500 dark:border-slate-800 dark:text-slate-400">Safety</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in rows" :key="row.account" class="bg-white dark:bg-slate-950">
                  <td class="border-b border-slate-200/70 px-4 py-4 font-semibold text-slate-950 dark:border-slate-800 dark:text-white">{{ row.account }}</td>
                  <td class="border-b border-slate-200/70 px-4 py-4 text-slate-600 dark:border-slate-800 dark:text-slate-300">{{ row.profile }}</td>
                  <td class="border-b border-slate-200/70 px-4 py-4 text-slate-600 dark:border-slate-800 dark:text-slate-300">{{ row.timezone }}</td>
                  <td class="border-b border-slate-200/70 px-4 py-4 text-slate-600 dark:border-slate-800 dark:text-slate-300">{{ row.localWindow }}</td>
                  <td class="border-b border-slate-200/70 px-4 py-4 text-slate-600 dark:border-slate-800 dark:text-slate-300">{{ row.safety }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
