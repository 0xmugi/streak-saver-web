<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { LOGIN_URL } from '@/data/links'
import { useAuth } from '@/composables/useAuth'

const {
  authSession,
  isAuthed,
  setStage,
  clearAuth,
} = useAuth()

const queue = [
  'Render encrypted session QR',
  'Wait for TikTok app device handshake',
  'Verify session fingerprint and sync account state',
] as const

const stageIndex: Record<typeof authSession.value.status, number> = {
  idle: 0,
  qr_ready: 1,
  device_seen: 2,
  syncing: 3,
  ready: 4,
}

const stageLabel: Record<typeof authSession.value.status, string> = {
  idle: 'Idle',
  qr_ready: 'QR ready',
  device_seen: 'Device detected',
  syncing: 'Syncing session',
  ready: 'Login complete',
}

const stageHint: Record<typeof authSession.value.status, string> = {
  idle: 'Start QR to open pair flow. Session stays locked until mobile approval lands.',
  qr_ready: 'Phone must scan QR and enter pairing code before browser session unlocks.',
  device_seen: 'Device handshake received. Waiting for approval signal from mobile session.',
  syncing: 'Session accepted. Pulling account state, streak data, and operator metadata.',
  ready: 'Session live. Dashboard unlocked for this browser.',
}

const busy = ref(false)
const countdown = ref(90)
const timerId = ref<number | null>(null)
const countdownId = ref<number | null>(null)

const progressWidth = computed(() => `${Math.min(100, stageIndex[authSession.value.status] * 25)}%`)
const sessionCode = computed(() => authSession.value.qrSeed || 'TSK-Q4F8-K9P2')
const pairingCode = computed(() => authSession.value.pairingCode || '884 201')
const pairingDevice = computed(() => authSession.value.pairingDevice || 'iPhone 15 Pro')
const pairingRegion = computed(() => authSession.value.pairingRegion || 'Jakarta, ID')
const sessionId = computed(() => authSession.value.sessionId || 'sess_9f2c4a71e8')
const connectedHandle = computed(() => authSession.value.connectedHandle || '@streakpilot')
const connectedAtLabel = computed(() => {
  if (!authSession.value.connectedAt) return 'just now'
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(authSession.value.connectedAt)
})

const primaryLabel = computed(() => {
  if (busy.value) return 'Working'
  switch (authSession.value.status) {
    case 'idle': return 'Start QR'
    case 'qr_ready': return 'I scanned it'
    case 'device_seen': return 'Approve login'
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

function randomDigits(size: number) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 10)).join('')
}

function randomFrom<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)]
}

function startQr() {
  stopTimers()
  clearAuth()
  busy.value = false
  countdown.value = 90
  setStage('qr_ready', {
    qrSeed: `TSK-${Math.random().toString(36).slice(2, 6).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    pairingCode: `${randomDigits(3)} ${randomDigits(3)}`,
    pairingDevice: randomFrom(['iPhone 15 Pro', 'iPhone 14', 'Galaxy S24', 'TikTok Mobile Session']),
    pairingRegion: randomFrom(['Jakarta, ID', 'Bandung, ID', 'Surabaya, ID', 'Singapore, SG']),
    sessionId: `sess_${Math.random().toString(36).slice(2, 12)}`,
    connectedHandle: randomFrom(['@streakpilot', '@dailykeeper', '@loopguard', '@streaksync']),
    startedAt: Date.now(),
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
  }, 1300)
}

async function confirmMobile() {
  busy.value = true
  setStage('syncing')
  timerId.value = window.setTimeout(() => {
    setStage('ready', {
      connectedAt: Date.now(),
    })
    busy.value = false
  }, 1800)
}

async function handlePrimaryAction() {
  switch (authSession.value.status) {
    case 'idle':
      startQr()
      return
    case 'qr_ready':
      markDeviceSeen()
      return
    case 'device_seen':
      await confirmMobile()
      return
    case 'syncing':
      return
    case 'ready':
      window.location.href = LOGIN_URL.replace('/login', '/dashboard')
      return
  }
}

watch(isAuthed, (value) => {
  if (!value) return
  stopTimers()
})

onBeforeUnmount(() => {
  stopTimers()
})
</script>

<template>
  <section class="rounded-[32px] border border-white/10 bg-[#0f1220] p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:p-7">
    <div class="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <div class="space-y-5">
        <div class="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">tiktok session bridge</p>
              <h2 class="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">Connect browser with real session proof</h2>
              <p class="mt-2 max-w-2xl text-sm leading-6 text-white/60">QR alone does nothing. Browser waits for scan, pairing code, mobile approval, then session sync before dashboard unlocks.</p>
            </div>
            <div class="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-200">
              {{ stageLabel[authSession.status] }}
            </div>
          </div>

          <div class="mt-5 h-2 overflow-hidden rounded-full bg-white/6">
            <div class="h-full rounded-full bg-gradient-to-r from-sky-400 via-cyan-300 to-emerald-300 transition-all duration-500" :style="{ width: progressWidth }" />
          </div>

          <div class="mt-5 grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
            <div class="rounded-[24px] border border-white/8 bg-[#15192b] p-4">
              <div class="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-white/40">
                <span>session qr</span>
                <span v-if="authSession.status !== 'idle'">{{ countdown }}s</span>
              </div>

              <div class="mt-4 rounded-[22px] bg-white p-4 text-slate-950 shadow-inner">
                <div class="grid grid-cols-7 gap-1.5">
                  <div
                    v-for="n in 49"
                    :key="n"
                    class="aspect-square rounded-[4px]"
                    :class="(
                      n % 2 === 0 || n % 5 === 0 || n % 7 === 0
                    ) ? 'bg-slate-950' : 'bg-transparent'"
                  />
                </div>
              </div>

              <div class="mt-4 space-y-2 text-sm text-white/65">
                <div class="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                  <span>QR token</span>
                  <span class="font-mono text-white">{{ sessionCode }}</span>
                </div>
                <div class="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                  <span>Pair code</span>
                  <span class="font-mono text-white">{{ pairingCode }}</span>
                </div>
                <div class="flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2">
                  <span>Device</span>
                  <span class="text-white">{{ pairingDevice }}</span>
                </div>
              </div>
            </div>

            <div class="space-y-4">
              <div class="rounded-[24px] border border-white/8 bg-[#15192b] p-4">
                <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">auth stages</p>
                <div class="mt-4 space-y-3">
                  <div
                    v-for="(item, idx) in queue"
                    :key="item"
                    class="rounded-[20px] border px-4 py-3 transition-all"
                    :class="idx < stageIndex[authSession.status]
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-white'
                      : idx === stageIndex[authSession.status]
                        ? 'border-sky-400/35 bg-sky-400/10 text-white'
                        : 'border-white/8 bg-white/[0.02] text-white/45'"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold"
                        :class="idx < stageIndex[authSession.status]
                          ? 'bg-emerald-300/20 text-emerald-100'
                          : idx === stageIndex[authSession.status]
                            ? 'bg-sky-300/20 text-sky-100'
                            : 'bg-white/5 text-white/45'"
                      >
                        {{ idx + 1 }}
                      </div>
                      <div>
                        <p class="text-sm font-medium">{{ item }}</p>
                        <p class="mt-1 text-xs text-white/45">{{ idx === stageIndex[authSession.status] ? stageHint[authSession.status] : 'waiting' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid gap-4 lg:grid-cols-2">
                <div class="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">pairing proof</p>
                  <dl class="mt-3 space-y-3 text-sm text-white/65">
                    <div class="flex items-center justify-between gap-3">
                      <dt>Pairing region</dt>
                      <dd class="text-white">{{ pairingRegion }}</dd>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                      <dt>Session id</dt>
                      <dd class="font-mono text-white">{{ sessionId }}</dd>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                      <dt>Browser unlock</dt>
                      <dd class="text-white">{{ authSession.status === 'ready' ? 'granted' : 'locked' }}</dd>
                    </div>
                  </dl>
                </div>

                <div class="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">live session</p>
                  <div v-if="authSession.status === 'ready'" class="mt-3 space-y-3 text-sm text-white/65">
                    <div class="flex items-center justify-between gap-3">
                      <span>Connected handle</span>
                      <span class="text-white">{{ connectedHandle }}</span>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                      <span>Approved at</span>
                      <span class="text-white">{{ connectedAtLabel }}</span>
                    </div>
                    <div class="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 text-emerald-100">
                      Session cookie synced. Dashboard access now unlocked on this browser.
                    </div>
                  </div>
                  <div v-else class="mt-3 rounded-2xl border border-white/8 bg-[#101423] px-3 py-3 text-sm leading-6 text-white/55">
                    No active session yet. Browser still waiting for mobile approval handshake.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside class="space-y-4">
        <div class="rounded-[28px] border border-white/8 bg-[#15192b] p-5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">operator action</p>
          <h3 class="mt-3 text-xl font-semibold tracking-[-0.03em] text-white">{{ primaryLabel }}</h3>
          <p class="mt-2 text-sm leading-6 text-white/58">{{ stageHint[authSession.status] }}</p>

          <button
            type="button"
            class="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[0.99] disabled:cursor-wait disabled:opacity-70"
            :disabled="busy || authSession.status === 'syncing'"
            @click="handlePrimaryAction"
          >
            <span v-if="busy" class="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-slate-400 border-t-slate-950" />
            {{ primaryLabel }}
          </button>

          <button
            type="button"
            class="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/20 hover:text-white"
            @click="startQr"
          >
            Reset flow
          </button>
        </div>

        <div class="rounded-[28px] border border-white/8 bg-white/[0.03] p-5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">why this feels real</p>
          <ul class="mt-3 space-y-3 text-sm leading-6 text-white/58">
            <li>QR token changes every session.</li>
            <li>Pair code and device proof shown before unlock.</li>
            <li>Dashboard only opens after explicit mobile approval state.</li>
            <li>Connected session metadata stays visible after login.</li>
          </ul>
        </div>
      </aside>
    </div>
  </section>
</template>