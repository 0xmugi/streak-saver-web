export interface Feature {
  iconPath: string
  title: string
  description: string
}

export const features: Feature[] = [
  {
    iconPath:
      'M12 4a8 8 0 1 0 8 8M12 8v4l3 3',
    title: 'QR login, not APK install',
    description:
      'Open link, scan TikTok QR, done. No sideload warning, no unknown-source prompt, no cookie copy-paste.'
  },
  {
    iconPath:
      'M4 7h16M4 12h16M4 17h10M19 17l2 2-2 2',
    title: 'Web dashboard',
    description:
      'Manage streak targets, timing, delivery history, and session health from one browser panel.'
  },
  {
    iconPath:
      'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0Zm6 9a8 8 0 0 0-16 0',
    title: 'Friends and groups',
    description:
      'Keep personal streaks and group streaks in one place. Toggle, pause, and reorder without touching device settings.'
  },
  {
    iconPath:
      'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
    title: 'Worker-backed reliability',
    description:
      'Retries, queueing, and recovery run on backend workers so missed sends do not depend on one phone staying awake.'
  },
  {
    iconPath:
      'M4 5h16v14H4zM4 9h16M9 5v14',
    title: 'Run history',
    description:
      'Every send attempt gets a clear status. Success, retry, failure, next run, all visible without digging through logs.'
  },
  {
    iconPath:
      'M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Zm-1 13-3-3 1.4-1.4L11 12.2l4.6-4.6L17 9l-6 6Z',
    title: 'Server-side session vault',
    description:
      'User never handles raw cookies manually. Session stays stored and rotated inside backend workflow.'
  }
]
