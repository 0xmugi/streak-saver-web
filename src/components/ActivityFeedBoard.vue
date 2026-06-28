<script setup lang="ts">
import { computed, ref } from 'vue'
import { eventFilters, runtimeEvents, toneClass, type EventType } from '@/data/runtime'

const activeFilter = ref<(typeof eventFilters)[number]>('All')
const query = ref('')

const filteredEvents = computed(() => {
  return runtimeEvents.filter((event) => {
    const matchType = activeFilter.value === 'All' || event.type === activeFilter.value
    const matchQuery =
      !query.value ||
      event.title.toLowerCase().includes(query.value.toLowerCase()) ||
      event.detail.toLowerCase().includes(query.value.toLowerCase())
    return matchType && matchQuery
  })
})

function eventTone(type: EventType) {
  if (type === 'keepalive' || type === 'refresh') return 'ready'
  if (type === 'hold') return 'warm'
  return 'warning'
}
</script>

<template>
  <section class="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 sm:p-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Activity feed</p>
        <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Proof stream with real filters.</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Keepalive, refresh, hold, and alert events stay readable without dumping raw worker logs.</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-[180px,220px]">
        <label class="space-y-2">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Type</span>
          <select
            v-model="activeFilter"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-brand-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option v-for="option in eventFilters" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>

        <label class="space-y-2">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Search event</span>
          <input
            v-model="query"
            type="text"
            placeholder="Find proof event"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-brand-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </label>
      </div>
    </div>

    <div class="mt-6 space-y-3">
      <article
        v-for="event in filteredEvents"
        :key="event.id"
        :class="['rounded-2xl border px-4 py-4', toneClass(eventTone(event.type))]"
      >
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em]">{{ event.title }}</p>
            <p class="mt-1 text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{{ event.type }} · {{ event.accountId }}</p>
          </div>
          <span class="text-xs font-semibold uppercase tracking-[0.16em] opacity-70">{{ event.relativeTime }}</span>
        </div>
        <p class="mt-2 text-sm leading-6 opacity-90">{{ event.detail }}</p>
      </article>
    </div>
  </section>
</template>
