<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { DASHBOARD_URL } from '@/data/links'

const { authSession, isAuthed, setStage, clearAuth } = useAuth()

const queue = [
  'Render encrypted session QR',
  'Wait for TikTok app device handshake',
  'Verify session fingerprint and sync account state'
] as const

const stageIndex: Record<typeof authSession.value.status, number> = {
  idle: 0,
  qr_ready: 1,
  device_seen: 2,
  syncing: 3,
  ready: 4
}

const stageLabel: Record<typeof authSession.value.status, string> = {
  idle: 'Idle',
  qr_ready: 'QR ready',
  device_seen: 'Device detected',
  syncing: 'Syncing session',
  ready: 'Login complete'
}

const stageHint: Record<typeof authSession.value.status, string> = {
  idle: 'Start QR to open pair flow. Session stays locked until device handshake finishes.',
  qr_ready: 'Scan QR from TikTok on mobile. This step only opens temporary pairing window.',
  device_seen: 'Device handshake received. Waiting for approval signal from mobile session.',
  syncing: 'Session accepted. Pulling account state, streak data, and operator metadata.',
  ready: 'Session live. Dashboard unlocked for this browser.'
}

const countdown = ref(90)
const busy = ref(false)
const timerId = ref<number | null>(null)
const countdownId = ref<number | null>(null)

const progressWidth = computed(() => `${Math.min(100, stageIndex[authSession.value.status] * 25)}%`)
const sessionCode = computed(() => authSession.value.qrSeed || 'TSK-Q4F8-K9P2')
const primaryLabel = computed(() => {
  if (busy.value) return 'Working'
  switch (authSession.value.status) {
    case 'idle': return 'Start QR'
    case 'qr_ready': return 'Mark device scanned'
    case 'device_seen': return 'Confirm on mobile'
    case 'syncing': return 'Syncing'
    case 'ready': return 'Open dashboard'
  }
})

function stopTimers() {
  if (timerId.value) window.clearTimeout(timerId.value)
  if (countdownId.value) window.clearInterval(countdownId.value)
  timerId.value = null
  countdownId.value = null
}

function startQr() {
  stopTimers()
  clearAuth()
  busy.value = false
  countdown.value = 90
  setStage('qr_ready', {
    qrSeed: `TSK-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    startedAt: Date.now()
  })
  countdownId.value = window.setInterval(() => {
    countdown.value = Math.max(0, countdown.value - 1)
    if (countdown.value === 0) {
      stopTimers()
      clearAuth()
    }
  }, 1000)
}

function markDeviceSeen() {
  busy.value = true
  timerId.value = window.setTimeout(() => {
    setStage('device_seen')
    busy.value = false
  }, 900)
}

function confirmDevice() {
  busy.value = true
  setStage('syncing')
  timerId.value = window.setTimeout(() => {
    setStage('ready')
    busy.value = false
    if (countdownId.value) window.clearInterval(countdownId.value)
    countdownId.value = null
  }, 1800)
}

function handlePrimaryAction() {
  if (busy.value) return
  switch (authSession.value.status) {
    case 'idle':
      startQr()
      return
    case 'qr_ready':
      markDeviceSeen()
      return
    case 'device_seen':
      confirmDevice()
      return
    case 'syncing':
      return
    case 'ready':
      window.location.href = DASHBOARD_URL
  }
}

onBeforeUnmount(() => stopTimers())
</script>

<template>
  <section class="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
    <article class="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)] dark:border-white/10 dark:bg-slate-950">
      <div class="border-b border-slate-200 px-6 py-5 dark:border-white/10 sm:px-8">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Session login</p>
            <h2 class="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">Pair mobile session first</h2>
          </div>
          <div class="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300">
            {{ stageLabel[authSession.status] }}
          </div>
        </div>
      </div>

      <div class="grid gap-8 px-6 py-6 sm:px-8 lg:grid-cols-[340px,1fr]">
        <div class="space-y-4">
          <div class="relative overflow-hidden rounded-[32px] border border-slate-200 bg-[radial-gradient(circle_at_top,#f8fafc,white)] p-5 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),rgba(2,6,23,1))]">
            <div class="absolute inset-0 opacity-60">
              <div class="absolute left-4 top-4 h-16 w-16 rounded-2xl border border-slate-200 dark:border-white/10"></div>
              <div class="absolute right-5 top-10 h-10 w-10 rounded-xl border border-slate-200 dark:border-white/10"></div>
              <div class="absolute bottom-5 left-8 h-12 w-12 rounded-2xl border border-slate-200 dark:border-white/10"></div>
              <div class="absolute bottom-8 right-6 h-20 w-20 rounded-[20px] border border-slate-200 dark:border-white/10"></div>
            </div>

            <div class="relative mx-auto grid aspect-square max-w-[260px] grid-cols-6 gap-2 rounded-[28px] border border-slate-300 bg-white p-4 shadow-inner dark:border-white/10 dark:bg-slate-900">
              <div
                v-for="cell in 36"
                :key="cell"
                class="rounded-[8px] transition-all duration-500"
                :class="[
                  ((cell + sessionCode.length) % 5 === 0) || cell === 1 || cell === 6 || cell === 31
                    ? 'bg-slate-950 dark:bg-white'
                    : 'bg-slate-100 dark:bg-slate-800',
                  authSession.status === 'syncing' ? 'animate-pulse' : ''
                ]"
              />
            </div>
          </div>

          <div class="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-slate-900/80">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Pair code</p>
                <p class="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{{ sessionCode }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Window</p>
                <p class="mt-2 text-sm font-semibold text-slate-950 dark:text-white">{{ countdown }}s</p>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <div class="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
              <div class="h-full rounded-full bg-slate-950 transition-all duration-700 dark:bg-white" :style="{ width: progressWidth }" />
            </div>
            <p class="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{{ stageHint[authSession.status] }}</p>
          </div>

          <ol class="space-y-3">
            <li
              v-for="(item, index) in queue"
              :key="item"
              class="flex items-start gap-4 rounded-[22px] border px-4 py-4 transition-all duration-500"
              :class="index < stageIndex[authSession.status] ? 'border-slate-300 bg-slate-50 dark:border-white/15 dark:bg-slate-900/70' : 'border-slate-200 bg-white dark:border-white/10 dark:bg-slate-950'"
            >
              <div
                class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold"
                :class="index < stageIndex[authSession.status] ? 'border-slate-950 bg-slate-950 text-white dark:border-white dark:bg-white dark:text-slate-950' : 'border-slate-200 text-slate-400 dark:border-white/10 dark:text-slate-500'"
              >
                {{ index + 1 }}
              </div>
              <div>
                <p class="text-sm font-semibold text-slate-950 dark:text-white">{{ item }}</p>
                <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {{ index === 0 ? 'QR appears only after fresh session boot.' : index === 1 ? 'Mobile device must acknowledge scan before session opens.' : 'Dashboard stays locked until state sync finishes.' }}
                </p>
              </div>
            </li>
          </ol>

          <div class="flex flex-wrap gap-3">
            <button
              type="button"
              class="inline-flex min-w-[180px] items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
              :disabled="busy || authSession.status === 'syncing'"
              @click="handlePrimaryAction"
            >
              <span v-if="busy" class="mr-2 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white dark:border-slate-300 dark:border-t-slate-950"></span>
              {{ primaryLabel }}
            </button>

            <button
              type="button"
              class="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-300 hover:text-slate-950 dark:border-white/10 dark:text-slate-300 dark:hover:border-white/20 dark:hover:text-white"
              @click="clearAuth"
            >
              Reset flow
            </button>
          </div>
        </div>
      </div>
    </article>

    <article class="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-[0_18px_60px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-900/70 sm:p-7">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">Why flow looks real</p>
        <h3 class="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">No fake instant login</h3>
      </div>

      <div class="space-y-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <p>QR state appears first. Scan alone does not unlock anything.</p>
        <p>Device acknowledge step happens after short delay. Then session sync runs before dashboard opens.</p>
        <p>Primary button changes label per stage so user knows what happens next.</p>
      </div>

      <div class="rounded-[24px] border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-slate-950">
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Unlock rule</p>
        <p class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          Dashboard link opens only when session status reaches <span class="font-semibold text-slate-950 dark:text-white">ready</span>.
        </p>
        <a
          :href="isAuthed ? DASHBOARD_URL : undefined"
          class="mt-5 inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition"
          :class="isAuthed
            ? 'border-slate-950 bg-slate-950 text-white hover:bg-slate-800 dark:border-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200'
            : 'pointer-events-none border-slate-200 bg-slate-100 text-slate-400 dark:border-white/10 dark:bg-slate-950 dark:text-slate-500'"
          :aria-disabled="!isAuthed"
          @click.prevent="!isAuthed"
        >
          Open dashboard
        </a>
      </div>
    </article>
  </section>
</template>
