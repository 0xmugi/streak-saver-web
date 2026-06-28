<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'

defineProps<{
  title?: string
  intro?: string
  eyebrow?: string
}>()
</script>

<template>
  <SiteHeader />
  <main>
    <section v-if="title" class="border-b border-slate-200/70 bg-white py-16 dark:border-slate-800/70 dark:bg-slate-950 md:py-20">
      <div class="mx-auto max-w-6xl px-4 sm:px-6">
        <div class="max-w-3xl">
          <p v-if="eyebrow" class="text-sm font-semibold uppercase tracking-[0.2em] text-brand-500">{{ eyebrow }}</p>
          <h1 class="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-5xl">{{ title }}</h1>
          <p v-if="intro" class="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">{{ intro }}</p>
        </div>
      </div>
    </section>

    <slot />
  </main>
  <SiteFooter />
</template>
