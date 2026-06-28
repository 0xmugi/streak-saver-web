<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import type { AppNavItem } from '@/data/auth'

defineProps<{
  title: string
  subtitle: string
  nav: AppNavItem[]
  currentPath?: string
}>()
</script>

<template>
  <SiteHeader />
  <main>
    <section class="bg-white py-8 dark:bg-slate-950 lg:py-10">
      <div class="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[280px,1fr] lg:gap-10">
        <AppSidebar :title="title" :subtitle="subtitle" :nav="nav" :current-path="currentPath" />
        <section class="min-w-0">
          <slot />
        </section>
      </div>
    </section>
  </main>
  <SiteFooter />
</template>
