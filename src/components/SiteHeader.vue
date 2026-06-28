<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  DEMO_URL,
  HOME_URL,
  LOGIN_URL
} from '@/data/links'
import { marketingNav, resolveAppNav } from '@/data/auth'
import { useAuth } from '@/composables/useAuth'

const iconUrl = `${import.meta.env.BASE_URL}imgs/icon.png`
const mobileOpen = ref(false)
const { isAuthed, clearAuth } = useAuth()

const appNav = computed(() => resolveAppNav(isAuthed.value))

function toggleMenu() {
  mobileOpen.value = !mobileOpen.value
}

function closeMenu() {
  mobileOpen.value = false
}

function logout() {
  clearAuth()
  closeMenu()
  if (window.location.pathname !== LOGIN_URL) {
    window.location.href = LOGIN_URL
  }
}
</script>

<template>
  <header class="sticky top-0 z-40 bg-white/92 backdrop-blur dark:bg-slate-950/92">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
      <a :href="HOME_URL" class="flex items-center gap-3" @click="closeMenu">
        <img :src="iconUrl" alt="Streak Saver" class="h-8 w-8 rounded-xl" />
        <div>
          <p class="text-sm font-semibold tracking-tight text-slate-950 dark:text-white">Streak Saver</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">tiktok session rescue</p>
        </div>
      </a>

      <div class="hidden items-center gap-10 lg:flex">
        <nav class="flex items-center gap-7 text-sm text-slate-600 dark:text-slate-300">
          <a
            v-for="item in marketingNav"
            :key="item.href"
            :href="item.href"
            class="transition hover:text-slate-950 dark:hover:text-white"
          >
            {{ item.label }}
          </a>
        </nav>

        <div class="flex items-center gap-3">
          <template v-if="isAuthed">
            <a
              v-for="item in appNav"
              :key="item.href"
              :href="item.href"
              class="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              {{ item.label }}
            </a>
            <button
              type="button"
              class="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
              @click="logout"
            >
              Logout
            </button>
            <a
              :href="DEMO_URL"
              class="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Open app
            </a>
          </template>
          <template v-else>
            <a
              :href="LOGIN_URL"
              class="rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-400"
            >
              Open app
            </a>
          </template>
        </div>
      </div>

      <button
        type="button"
        class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900 lg:hidden"
        @click="toggleMenu"
      >
        <span class="sr-only">Open menu</span>
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
      </button>
    </div>

    <div v-if="mobileOpen" class="border-t border-slate-200 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
      <div class="mx-auto max-w-6xl space-y-6">
        <nav class="space-y-2">
          <a
            v-for="item in marketingNav"
            :key="item.href"
            :href="item.href"
            class="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            @click="closeMenu"
          >
            <div>{{ item.label }}</div>
            <div class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ item.subtitle }}</div>
          </a>
        </nav>

        <div class="space-y-2 border-t border-slate-200 pt-4 dark:border-slate-800">
          <a
            v-for="item in appNav"
            :key="item.href"
            :href="item.href"
            class="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            @click="closeMenu"
          >
            <div>{{ item.label }}</div>
            <div class="mt-1 text-xs text-slate-500 dark:text-slate-400">{{ item.subtitle }}</div>
          </a>
        </div>

        <div class="grid gap-2 pt-2">
          <button
            v-if="isAuthed"
            type="button"
            class="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
            @click="logout"
          >
            Logout
          </button>
          <a
            :href="DEMO_URL"
            class="rounded-2xl bg-brand-500 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-brand-400"
            @click="closeMenu"
          >
            Open app
          </a>
        </div>
      </div>
    </div>
  </header>
</template>
