import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AuthState = {
  userId: number | null
  userName: string | null
  accessToken: string | null
  refreshToken: string | null

  login: (username: string, password: string) => Promise<void>
  register: (username: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      userId: null,
      userName: null,
      accessToken: null,
      refreshToken: null,

      login: async (username, password) => {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
        if (!res.ok) throw new Error('Неверный логин или пароль')
        const data = await res.json()
        set({
          userId: data.userId,
          userName: data.userName,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        })
      },

      register: async (username, password) => {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        })
        if (!res.ok) {
          const text = await res.text()
          throw new Error(text || 'Ошибка регистрации')
        }
      },

      logout: () =>
        set({
          userId: null,
          userName: null,
          accessToken: null,
          refreshToken: null
        })
    }),
    { name: 'auth-storage' }
  )
)
