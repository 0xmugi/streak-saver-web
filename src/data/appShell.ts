export type ShellNavItem = {
  label: string
  description: string
  href: string
}

export type SummaryStat = {
  label: string
  value: string
  detail: string
}

export type ChecklistItem = {
  title: string
  detail: string
}

export type AccountCard = {
  title: string
  status: string
  detail: string
  tone?: 'default' | 'good' | 'warn'
}

export type TimelineItem = {
  title: string
  time: string
  detail: string
  tone?: 'default' | 'good' | 'warn'
}

export type TargetRow = {
  account: string
  profile: string
  timezone: string
  localWindow: string
  safety: string
}

export const shellNav: ShellNavItem[] = [
  { label: 'Login', description: 'QR capture and fallback lane', href: '/login/' },
  { label: 'Connect', description: 'Device trust and backup state', href: '/connect/' },
  { label: 'Targets', description: 'Account roster and risk state', href: '/targets/' },
  { label: 'Schedule', description: 'Run windows and retry ladder', href: '/schedule/' },
  { label: 'Activity', description: 'Proof feed and alerts', href: '/activity/' }
]

export const shellStats: SummaryStat[] = [
  { label: 'Primary flow', value: 'QR login', detail: 'No cookie-first onboarding on main path.' },
  { label: 'Recovery lane', value: 'Fallback ready', detail: 'Operator can relink without replacing account.' },
  { label: 'Audit surface', value: 'Action proof', detail: 'Each automation move leaves timestamp and outcome.' }
]

export const loginChecklist: ChecklistItem[] = [
  {
    title: 'Step 1. Start secure login',
    detail: 'Operator opens QR handoff. Mobile device scans once. Session lands into protected browser lane.'
  },
  {
    title: 'Step 2. Verify capture health',
    detail: 'System checks freshness, challenge pass, and whether backup lane exists before account enters automation.'
  },
  {
    title: 'Step 3. Save fallback evidence',
    detail: 'If QR fails, guided fallback explains exact recovery option. No raw cookie dump shown on first screen.'
  }
]

export const connectCards: AccountCard[] = [
  {
    title: 'Primary device lane',
    status: 'Warm',
    detail: 'Main browser profile still trusted. Daily keepalive can run without relink.',
    tone: 'good'
  },
  {
    title: 'Backup recovery lane',
    status: 'Standby',
    detail: 'Cold session kept untouched until trust drops or challenge friction rises.'
  },
  {
    title: 'Operator intervention',
    status: 'When needed',
    detail: 'Manual relink only triggers after trust loss, hard challenge, or expired session.',
    tone: 'warn'
  }
]

export const targetRows: TargetRow[] = [
  {
    account: '@creator-main',
    profile: 'Primary streak account',
    timezone: 'WIB',
    localWindow: '22:30 to 23:50',
    safety: 'Primary lane healthy, backup armed'
  },
  {
    account: '@brand-backup',
    profile: 'Second publishing account',
    timezone: 'UTC+1',
    localWindow: '16:00 to 17:30',
    safety: 'Watch challenge rate, keep backup cold'
  },
  {
    account: '@client-eu',
    profile: 'Managed client seat',
    timezone: 'UTC+2',
    localWindow: '18:30 to 19:45',
    safety: 'Manual review needed after timezone drift'
  }
]

export const scheduleTimeline: TimelineItem[] = [
  {
    title: 'Warm check',
    time: 'T-90 min',
    detail: 'Small read-only touch confirms session still alive before real streak window opens.'
  },
  {
    title: 'Main keepalive',
    time: 'T-15 min to deadline',
    detail: 'Bot performs minimal human-looking action inside target window to preserve streak.',
    tone: 'good'
  },
  {
    title: 'Recovery retry',
    time: 'If friction appears',
    detail: 'Fallback lane runs only after challenge or expired session blocks primary path.',
    tone: 'warn'
  }
]

export const activityFeed: TimelineItem[] = [
  {
    title: 'Session refreshed',
    time: '2 min ago',
    detail: 'Primary lane revalidated after challenge-free check. Account stays in auto mode.',
    tone: 'good'
  },
  {
    title: 'Risk spike flagged',
    time: '19 min ago',
    detail: 'Challenge frequency rose on backup account. Automation held until next safe window.',
    tone: 'warn'
  },
  {
    title: 'Keepalive sent',
    time: '53 min ago',
    detail: 'Scheduled action landed inside local streak window and logged with proof timestamp.'
  }
]
