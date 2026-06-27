export type ShellNavItem = {
  label: string
  href: string
  description: string
}

export type SummaryStat = {
  label: string
  value: string
  detail: string
}

export type TimelineItem = {
  title: string
  detail: string
  time: string
  tone?: 'default' | 'good' | 'warn'
}

export type AccountCard = {
  title: string
  detail: string
  status: string
  tone?: 'default' | 'good' | 'warn'
}

export type TargetRow = {
  account: string
  profile: string
  timezone: string
  localWindow: string
  safety: string
}

export const shellNav = [
  { label: 'Login', href: '/login/', description: 'Session capture and recovery' },
  { label: 'Connect', href: '/connect/', description: 'Device and QR handoff' },
  { label: 'Targets', href: '/targets/', description: 'Accounts and streak health' },
  { label: 'Schedule', href: '/schedule/', description: 'Run windows and retry plan' },
  { label: 'Activity', href: '/activity/', description: 'Proof, logs, and alerts' }
] satisfies ShellNavItem[]

export const shellStats = [
  { label: 'Protected accounts', value: '24', detail: 'Ready for daily keepalive' },
  { label: 'Risk flags', value: '3', detail: 'Need fresh session or proxy swap' },
  { label: 'Last recovery run', value: '07:42', detail: 'Finished in 51 seconds' }
] satisfies SummaryStat[]

export const loginChecklist = [
  'Use QR login first. Fallback only if session expired.',
  'Store session token server-side. Never show raw cookies in UI.',
  'Mark capture source so recovery job knows whether device relink is needed.'
]

export const connectCards = [
  { title: 'Primary phone link', detail: 'QR scanned from iPhone 15 Pro. Healthy for 11 days.', status: 'stable', tone: 'good' },
  { title: 'Backup Android relay', detail: 'Warm spare. Kept signed out until challenge spike.', status: 'standby' },
  { title: 'Web recovery lane', detail: 'Allowed only for manual rescue. No daily automation.', status: 'restricted', tone: 'warn' }
] satisfies AccountCard[]

export const targetRows = [
  { account: '@mugi_main', profile: 'personal', timezone: 'WIB', localWindow: '22:45 - 23:30', safety: 'healthy' },
  { account: '@mugi_store', profile: 'brand', timezone: 'WIB', localWindow: '21:30 - 22:10', safety: 'challenge watch' },
  { account: '@zenlyn_backup', profile: 'silent reserve', timezone: 'UTC', localWindow: '16:00 - 17:00', safety: 'healthy' }
] satisfies TargetRow[]

export const scheduleTimeline = [
  { title: 'Warm check', detail: 'Ping session, sync device fingerprint, read local clock skew.', time: 'T-45 min' },
  { title: 'Primary keepalive', detail: 'Run small natural action inside account window.', time: 'T-10 min', tone: 'good' },
  { title: 'Rescue lane', detail: 'Retry once with different path if challenge score stays low.', time: 'T+12 min' },
  { title: 'Manual alert', detail: 'Send high-signal alert if both paths fail.', time: 'T+20 min', tone: 'warn' }
] satisfies TimelineItem[]

export const activityFeed = [
  { title: 'Keepalive sent', detail: '@mugi_main passed with no challenge and streak held.', time: '2 min ago', tone: 'good' },
  { title: 'Risk score raised', detail: '@mugi_store saw login friction from shared IP. Proxy rotation queued.', time: '11 min ago', tone: 'warn' },
  { title: 'Device handoff cached', detail: 'Backup Android fingerprint refreshed after successful QR link.', time: '29 min ago' }
] satisfies TimelineItem[]
