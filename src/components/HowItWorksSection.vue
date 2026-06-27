<template>
  <section id="how" class="border-y border-slate-200/70 bg-white py-20 dark:border-slate-800/70 dark:bg-slate-900/40 md:py-28">
    <div class="mx-auto max-w-6xl px-4 sm:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-semibold uppercase tracking-wider text-brand-500">Flow</span>
        <h2 class="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Browser login. Worker handles rest.</h2>
      </div>

      <ol class="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <li class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-sm font-bold text-white">01</div>
          <h3 class="mt-5 text-xl font-bold text-slate-950 dark:text-white">Open web app</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">User lands on site. No APK. No install friction. No suspicious sideload step.</p>
        </li>
        <li class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-sm font-bold text-white">02</div>
          <h3 class="mt-5 text-xl font-bold text-slate-950 dark:text-white">Scan TikTok QR</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Session established through familiar QR flow. User does not manually dig cookies out of browser storage.</p>
        </li>
        <li class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-sm font-bold text-white">03</div>
          <h3 class="mt-5 text-xl font-bold text-slate-950 dark:text-white">Choose streak targets</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Friends, groups, schedule windows, and safety buffers set from dashboard UI.</p>
        </li>
        <li class="rounded-3xl border border-slate-200/70 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/60">
          <div class="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-500 text-sm font-bold text-white">04</div>
          <h3 class="mt-5 text-xl font-bold text-slate-950 dark:text-white">Worker runs quietly</h3>
          <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">Backend queue keeps sends alive, records history, retries failures, and exposes clear status back to user.</p>
        </li>
      </ol>
    </div>
  </section>
</template>
