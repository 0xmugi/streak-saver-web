import {
  ACTIVITY_URL,
  CONNECT_URL,
  DASHBOARD_URL,
  FEATURES_URL,
  FLOW_URL,
  LOGIN_URL,
  PRIVACY_URL,
  SCHEDULE_URL,
  TARGETS_URL
} from '@/data/links'

export type AppNavItem = {
  label: string
  href: string
  subtitle: string
}

export type AuthStage = 'idle' | 'qr_ready' | 'device_seen' | 'syncing' | 'ready'

export interface AuthSession {
  status: AuthStage
  qrSeed?: string
  pairingCode?: string
  pairingDevice?: string
  pairingRegion?: string
  sessionId?: string
  connectedHandle?: string
  startedAt?: number | null
  connectedAt?: number | null
  updatedAt?: number | null
}


const AUTH_STORAGE_KEY = 'streak-saver-auth'

const defaultSession: AuthSession = {
  status: 'idle',
  qrSeed: '',
  startedAt: null,
  updatedAt: null
}

export const marketingNav: AppNavItem[] = [
  { label: 'Features', href: FEATURES_URL, subtitle: 'What operator surface handles' },
  { label: 'Flow', href: FLOW_URL, subtitle: 'QR to recovery pipeline' },
  { label: 'Privacy', href: PRIVACY_URL, subtitle: 'Storage and session rules' }
]

export const publicAppNav: AppNavItem[] = [
  { label: 'Login', href: LOGIN_URL, subtitle: 'Pair device and open dashboard' },
  ...marketingNav
]

export const privateAppNav: AppNavItem[] = [
  { label: 'Dashboard', href: DASHBOARD_URL, subtitle: 'Live health and risk view' },
  { label: 'Targets', href: TARGETS_URL, subtitle: 'Accounts in current queue' },
  { label: 'Schedule', href: SCHEDULE_URL, subtitle: 'Task cadence and retries' },
  { label: 'Activity', href: ACTIVITY_URL, subtitle: 'Recent proofs and actions' },
  { label: 'Privacy', href: PRIVACY_URL, subtitle: 'Storage and session rules' }
]

const protectedPaths = new Set([DASHBOARD_URL, TARGETS_URL, SCHEDULE_URL, ACTIVITY_URL, CONNECT_URL])

function dispatchAuthChange() {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new Event('streak-auth-changed'))
}

function sanitizeSession(input: unknown): AuthSession {
  if (!input || typeof input !== 'object') return { ...defaultSession }

  const raw = input as Partial<AuthSession>
  const status: AuthStage = ['idle', 'qr_ready', 'device_seen', 'syncing', 'ready'].includes(String(raw.status))
    ? (raw.status as AuthStage)
    : 'idle'

  return {
    status,
    qrSeed: typeof raw.qrSeed === 'string' ? raw.qrSeed : '',
    startedAt: typeof raw.startedAt === 'number' ? raw.startedAt : null,
    updatedAt: typeof raw.updatedAt === 'number' ? raw.updatedAt : null
  }
}

export function readAuthSession(): AuthSession {
  if (typeof window === 'undefined') return { ...defaultSession }

  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return { ...defaultSession }
    return sanitizeSession(JSON.parse(raw))
  } catch {
    return { ...defaultSession }
  }
}

export function writeAuthSession(session: Partial<AuthSession>) {
  if (typeof window === 'undefined') return

  const next = sanitizeSession({
    ...readAuthSession(),
    ...session,
    updatedAt: Date.now()
  })

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next))
  dispatchAuthChange()
}

export function clearAuthSession() {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ...defaultSession, updatedAt: Date.now() }))
  dispatchAuthChange()
}

export function readAuthFlag() {
  return readAuthSession().status === 'ready'
}

export function writeAuthFlag(value: boolean) {
  if (value) {
    const current = readAuthSession()
    writeAuthSession({
      ...current,
      status: 'ready',
      startedAt: current.startedAt ?? Date.now()
    })
    return
  }

  clearAuthSession()
}

export function ensureAuthOrRedirect(pathname: string) {
  if (typeof window === 'undefined') return false
  if (!protectedPaths.has(pathname)) return readAuthFlag()

  const ok = readAuthFlag()
  if (!ok) window.location.replace(LOGIN_URL)
  return ok
}

export function resolveAppNav(isAuthed: boolean) {
  return isAuthed ? privateAppNav : publicAppNav
}
