export type SessionState = 'ready' | 'warm' | 'warning'
export type EventType = 'keepalive' | 'refresh' | 'hold' | 'alert'

export type ManagedAccount = {
  id: string
  handle: string
  profile: string
  timezone: string
  localWindow: string
  session: SessionState
  backup: 'armed' | 'cold' | 'review'
  risk: 'low' | 'medium' | 'high'
  nextAction: string
  lastProof: string
}

export type RuntimeEvent = {
  id: string
  type: EventType
  title: string
  detail: string
  relativeTime: string
  accountId: string
}

export type DeviceLane = {
  id: string
  title: string
  status: string
  detail: string
  tone: SessionState
}

export type ScheduleBlock = {
  id: string
  title: string
  window: string
  detail: string
  tone: SessionState
}

export const managedAccounts: ManagedAccount[] = [
  {
    id: 'creator-main',
    handle: '@creator-main',
    profile: 'Primary streak account',
    timezone: 'WIB',
    localWindow: '22:30 to 23:50',
    session: 'ready',
    backup: 'armed',
    risk: 'low',
    nextAction: 'Keepalive in 14 min',
    lastProof: '2 min ago'
  },
  {
    id: 'brand-backup',
    handle: '@brand-backup',
    profile: 'Second publishing account',
    timezone: 'UTC+1',
    localWindow: '16:00 to 17:30',
    session: 'warm',
    backup: 'cold',
    risk: 'medium',
    nextAction: 'Warm check in 46 min',
    lastProof: '18 min ago'
  },
  {
    id: 'client-eu',
    handle: '@client-eu',
    profile: 'Managed client seat',
    timezone: 'UTC+2',
    localWindow: '18:30 to 19:45',
    session: 'warning',
    backup: 'review',
    risk: 'high',
    nextAction: 'Manual review before next run',
    lastProof: '53 min ago'
  }
]

export const deviceLanes: DeviceLane[] = [
  {
    id: 'primary',
    title: 'Primary device lane',
    status: 'Warm',
    detail: 'Main browser identity still trusted. Daily keepalive can run without relink.',
    tone: 'ready'
  },
  {
    id: 'backup',
    title: 'Backup recovery lane',
    status: 'Cold standby',
    detail: 'Fallback session stays untouched until trust drops or hard challenge lands.',
    tone: 'warm'
  },
  {
    id: 'manual',
    title: 'Manual recovery lane',
    status: 'Human only',
    detail: 'Used after expiry, QR failure, or unexpected device trust reset.',
    tone: 'warning'
  }
]

export const runtimeEvents: RuntimeEvent[] = [
  {
    id: 'evt-1',
    type: 'refresh',
    title: 'Session refreshed',
    detail: 'Primary lane revalidated after challenge-free check. Account stays in auto mode.',
    relativeTime: '2 min ago',
    accountId: 'creator-main'
  },
  {
    id: 'evt-2',
    type: 'hold',
    title: 'Risk spike flagged',
    detail: 'Challenge frequency rose on backup account. Automation held until next safe window.',
    relativeTime: '19 min ago',
    accountId: 'brand-backup'
  },
  {
    id: 'evt-3',
    type: 'keepalive',
    title: 'Keepalive sent',
    detail: 'Scheduled action landed inside local streak window and logged with proof timestamp.',
    relativeTime: '53 min ago',
    accountId: 'client-eu'
  },
  {
    id: 'evt-4',
    type: 'alert',
    title: 'Relink required soon',
    detail: 'Backup lane stayed unused too long. Prompt operator before next midnight window.',
    relativeTime: '1 hr ago',
    accountId: 'client-eu'
  }
]

export const scheduleBlocks: ScheduleBlock[] = [
  {
    id: 'preflight',
    title: 'Warm check',
    window: 'T-90 min',
    detail: 'Read-only touch confirms session still alive before real streak window opens.',
    tone: 'warm'
  },
  {
    id: 'main',
    title: 'Main keepalive',
    window: 'T-15 min to deadline',
    detail: 'Bot performs one minimal human-looking action inside local streak window.',
    tone: 'ready'
  },
  {
    id: 'recovery',
    title: 'Recovery retry',
    window: 'If friction appears',
    detail: 'Fallback lane runs only after challenge or expired session blocks first path.',
    tone: 'warning'
  }
]

export const timezoneFilters = ['All', 'WIB', 'UTC+1', 'UTC+2'] as const
export const eventFilters = ['All', 'keepalive', 'refresh', 'hold', 'alert'] as const

export function sessionToneLabel(state: SessionState) {
  if (state === 'ready') return 'Ready'
  if (state === 'warm') return 'Watch'
  return 'Action needed'
}

export function toneClass(state: SessionState) {
  if (state === 'ready') return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300'
  if (state === 'warm') return 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300'
  return 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300'
}

export function riskClass(risk: ManagedAccount['risk']) {
  if (risk === 'low') return 'text-emerald-600 dark:text-emerald-300'
  if (risk === 'medium') return 'text-amber-600 dark:text-amber-300'
  return 'text-rose-600 dark:text-rose-300'
}
