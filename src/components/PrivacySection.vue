<template>
  <section id="privacy" class="border-t border-slate-200/70 bg-white py-20 dark:border-slate-800/70 dark:bg-slate-950 md:py-28">
    <div class="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div>
        <span class="text-sm font-semibold uppercase tracking-wider text-brand-500">Privacy</span>
        <h2 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Cleaner trust story for normal users.</h2>
        <p class="mt-4 text-lg text-slate-600 dark:text-slate-300">
          Web product feels safer than random APK. Session handling still matters, but onboarding looks like real software now.
        </p>
      </div>

      <div class="grid gap-4 sm:grid-cols-2">
        <div class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <p class="text-sm font-semibold text-slate-950 dark:text-white">What users see</p>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li>Browser login surface</li>
            <li>QR-based sign in</li>
            <li>Dashboard and logs</li>
            <li>No sideload warning flow</li>
          </ul>
        </div>
        <div class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <p class="text-sm font-semibold text-slate-950 dark:text-white">What backend does</p>
          <ul class="mt-4 space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            <li>Session storage</li>
            <li>Automation scheduling</li>
            <li>Retries and health checks</li>
            <li>Delivery history tracking</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
