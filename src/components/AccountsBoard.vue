<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  managedAccounts,
  timezoneFilters,
  sessionToneLabel,
  toneClass,
  riskClass,
  type ManagedAccount
} from '@/data/runtime'

const search = ref('')
const timezone = ref<(typeof timezoneFilters)[number]>('All')
const onlyAttention = ref(false)

const filteredAccounts = computed(() => {
  return managedAccounts.filter((account) => {
    const matchSearch =
      !search.value ||
      account.handle.toLowerCase().includes(search.value.toLowerCase()) ||
      account.profile.toLowerCase().includes(search.value.toLowerCase())
    const matchTimezone = timezone.value === 'All' || account.timezone === timezone.value
    const matchAttention = !onlyAttention.value || account.session === 'warning' || account.risk === 'high'
    return matchSearch && matchTimezone && matchAttention
  })
})

function cycleSession(account: ManagedAccount) {
  if (account.session === 'ready') {
    account.session = 'warm'
    account.nextAction = 'Watch challenge rate before keepalive'
    account.risk = 'medium'
    return
  }
  if (account.session === 'warm') {
    account.session = 'warning'
    account.nextAction = 'Manual relink before next window'
    account.risk = 'high'
    return
  }
  account.session = 'ready'
  account.nextAction = 'Keepalive in 14 min'
  account.risk = 'low'
}
</script>

<template>
  <section class="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 sm:p-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Managed accounts</p>
        <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Real roster, filterable, action-focused.</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Search handles, narrow by timezone, and isolate accounts that need human review.</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-3 md:w-[520px]">
        <label class="space-y-2">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Search</span>
          <input
            v-model="search"
            type="text"
            placeholder="Find account or profile"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-brand-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />
        </label>

        <label class="space-y-2">
          <span class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Timezone</span>
          <select
            v-model="timezone"
            class="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-brand-500 focus:bg-white dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option v-for="option in timezoneFilters" :key="option" :value="option">{{ option }}</option>
          </select>
        </label>

        <label class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <input v-model="onlyAttention" type="checkbox" class="h-4 w-4 accent-brand-500" />
          <span>Only needs attention</span>
        </label>
      </div>
    </div>

    <div class="mt-6 grid gap-4 xl:grid-cols-3">
      <article
        v-for="account in filteredAccounts"
        :key="account.id"
        class="rounded-3xl border border-slate-200/70 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/70"
      >
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="text-lg font-semibold text-slate-950 dark:text-white">{{ account.handle }}</p>
            <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">{{ account.profile }}</p>
          </div>
          <span :class="['rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em]', toneClass(account.session)]">
            {{ sessionToneLabel(account.session) }}
          </span>
        </div>

        <dl class="mt-5 grid gap-3 text-sm">
          <div class="flex items-center justify-between gap-4">
            <dt class="text-slate-500 dark:text-slate-400">Timezone</dt>
            <dd class="font-medium text-slate-950 dark:text-white">{{ account.timezone }}</dd>
          </div>
          <div class="flex items-center justify-between gap-4">
            <dt class="text-slate-500 dark:text-slate-400">Window</dt>
            <dd class="font-medium text-slate-950 dark:text-white">{{ account.localWindow }}</dd>
          </div>
          <div class="flex items-center justify-between gap-4">
            <dt class="text-slate-500 dark:text-slate-400">Backup</dt>
            <dd class="font-medium uppercase tracking-[0.16em] text-slate-950 dark:text-white">{{ account.backup }}</dd>
          </div>
          <div class="flex items-center justify-between gap-4">
            <dt class="text-slate-500 dark:text-slate-400">Risk</dt>
            <dd :class="['font-semibold uppercase tracking-[0.16em]', riskClass(account.risk)]">{{ account.risk }}</dd>
          </div>
        </dl>

        <div class="mt-5 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
          <p class="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Next action</p>
          <p class="mt-2 text-sm font-medium text-slate-950 dark:text-white">{{ account.nextAction }}</p>
          <p class="mt-1 text-xs text-slate-500 dark:text-slate-400">Last proof {{ account.lastProof }}</p>
        </div>

        <button
          type="button"
          class="mt-5 w-full rounded-2xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
          @click="cycleSession(account)"
        >
          Cycle health state
        </button>
      </article>
    </div>
  </section>
</template>
