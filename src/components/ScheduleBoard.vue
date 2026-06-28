<script setup lang="ts">
import { ref } from 'vue'
import { scheduleBlocks, toneClass } from '@/data/runtime'

const automationEnabled = ref(true)
const safeMode = ref(false)
const retryDepth = ref(2)
</script>

<template>
  <section class="rounded-[32px] border border-slate-200/70 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950/80 sm:p-8">
    <div class="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div>
        <p class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">Run windows</p>
        <h2 class="mt-2 text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Interactive schedule surface.</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">Operator can reason about timing, retry depth, and whether automation should stay live tonight.</p>
      </div>

      <div class="grid gap-3 sm:grid-cols-3">
        <label class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <span class="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Automation</span>
          <button type="button" class="mt-2 font-semibold" @click="automationEnabled = !automationEnabled">
            {{ automationEnabled ? 'Enabled' : 'Paused' }}
          </button>
        </label>

        <label class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <span class="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Safe mode</span>
          <button type="button" class="mt-2 font-semibold" @click="safeMode = !safeMode">
            {{ safeMode ? 'On' : 'Off' }}
          </button>
        </label>

        <label class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
          <span class="block text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Retry depth</span>
          <input v-model="retryDepth" type="range" min="0" max="4" class="mt-3 w-full accent-brand-500" />
          <span class="mt-2 block font-semibold">{{ retryDepth }}</span>
        </label>
      </div>
    </div>

    <div class="mt-6 grid gap-4 xl:grid-cols-3">
      <article
        v-for="block in scheduleBlocks"
        :key="block.id"
        :class="['rounded-3xl border p-5', toneClass(block.tone)]"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.16em]">{{ block.title }}</p>
            <p class="mt-2 text-2xl font-bold tracking-tight">{{ block.window }}</p>
          </div>
          <span class="rounded-full bg-black/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] dark:bg-white/10">
            {{ block.tone }}
          </span>
        </div>
        <p class="mt-4 text-sm leading-6 opacity-90">{{ block.detail }}</p>
      </article>
    </div>
  </section>
</template>
