import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { clearAuthSession, readAuthFlag, readAuthSession, writeAuthSession, type AuthSession, type AuthStage } from '@/data/auth'

const authSession = ref<AuthSession>(readAuthSession())
let listenersBound = false
let listenerRefs: Array<[string, EventListener]> = []

function syncAuth() {
  authSession.value = readAuthSession()
}

function bindListeners() {
  if (typeof window === 'undefined' || listenersBound) return

  const onStorage: EventListener = (event) => {
    const storageEvent = event as StorageEvent
    if (!storageEvent.key || storageEvent.key === 'streak-saver-auth') syncAuth()
  }
  const onCustom: EventListener = () => syncAuth()

  window.addEventListener('storage', onStorage)
  window.addEventListener('streak-auth-changed', onCustom)
  listenerRefs = [
    ['storage', onStorage],
    ['streak-auth-changed', onCustom]
  ]
  listenersBound = true
}

function unbindListeners() {
  if (typeof window === 'undefined' || !listenersBound) return
  for (const [name, handler] of listenerRefs) window.removeEventListener(name, handler)
  listenerRefs = []
  listenersBound = false
}

function setStage(status: AuthStage, patch: Partial<AuthSession> = {}) {
  writeAuthSession({ ...patch, status })
  syncAuth()
}

export function useAuth() {
  onMounted(() => {
    syncAuth()
    bindListeners()
  })

  onBeforeUnmount(() => {
    unbindListeners()
  })

  return {
    isAuthed: computed(() => authSession.value.status === 'ready'),
    authSession: computed(() => authSession.value),
    markAuthed() {
      setStage('ready', {
        startedAt: authSession.value.startedAt ?? Date.now()
      })
    },
    clearAuth() {
      clearAuthSession()
      syncAuth()
    },
    setStage,
    syncAuth,
    readAuthFlag
  }
}
