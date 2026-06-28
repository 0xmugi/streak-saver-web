<script setup lang="ts">
import { computed } from 'vue'
import type { AppNavItem } from '@/data/auth'

const props = defineProps<{
  title: string
  subtitle: string
  nav: AppNavItem[]
  currentPath?: string
}>()

const activePath = computed(() => props.currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : ''))

function isActive(href: string) {
  return activePath.value === href
}
</script>

<template>
  <aside class="space-y-4">
    <div class="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-900/70 lg:p-6">
      <div>
        <h1 class="text-[28px] font-semibold tracking-tight text-slate-950 dark:text-white">{{ title }}</h1>
        <p class="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{{ subtitle }}</p>
      </div>

      <nav class="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        <a
          v-for="item in nav"
          :key="item.href"
          :href="item.href"
          :class="[
            'flex items-start gap-3 rounded-[20px] border px-4 py-3 transition',
            isActive(item.href)
              ? 'border-slate-300 bg-white text-slate-950 shadow-sm dark:border-white/15 dark:bg-slate-950 dark:text-white'
              : 'border-transparent text-slate-600 hover:border-slate-200 hover:bg-white/80 dark:text-slate-400 dark:hover:border-white/10 dark:hover:bg-slate-950/80 dark:hover:text-white'
          ]"
        >
          <span
            class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
            :class="isActive(item.href) ? 'bg-slate-950 dark:bg-white' : 'bg-slate-300 dark:bg-slate-700'"
          />
          <span>
            <span class="block text-sm font-semibold">{{ item.label }}</span>
            <span class="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{{ item.subtitle }}</span>
          </span>
        </a>
      </nav>
    </div>
  </aside>
</template>
