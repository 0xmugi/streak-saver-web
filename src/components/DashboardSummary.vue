<script setup lang="ts">
import { computed } from 'vue'
import type { ManagedAccount, RuntimeEvent } from '@/data/runtime'

const props = defineProps<{
  accounts: ManagedAccount[]
  events: RuntimeEvent[]
}>()

const readyCount = computed(() => props.accounts.filter((account) => account.session === 'ready').length)
const reviewCount = computed(() => props.accounts.filter((account) => account.session === 'warning').length)
const nextAction = computed(() => props.accounts[0]?.nextAction ?? 'No pending action')
const lastProof = computed(() => props.events[0]?.relativeTime ?? 'No proof yet')

const cards = computed(() => [
  { label: 'Managed accounts', value: String(props.accounts.length), detail: 'Active seats in current roster.' },
  { label: 'Healthy sessions', value: String(readyCount.value), detail: 'Primary lanes ready for auto keepalive.' },
  { label: 'Needs review', value: String(reviewCount.value), detail: 'Accounts waiting for manual relink or trust check.' },
  { label: 'Next action', value: nextAction.value, detail: `Latest proof ${lastProof.value}.` }
])
</script>

<template>
  <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
    <article
      v-for="card in cards"
      :key="card.label"
      class="rounded-3xl border border-slate-200/70 bg-white p-5 dark:border-slate-800 dark:bg-slate-900/70"
    >
      <p class="text-sm text-slate-500 dark:text-slate-400">{{ card.label }}</p>
      <p class="mt-3 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">{{ card.value }}</p>
      <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{{ card.detail }}</p>
    </article>
  </section>
</template>
