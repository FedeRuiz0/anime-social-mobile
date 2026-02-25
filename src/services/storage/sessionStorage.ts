import AsyncStorage from "@react-native-async-storage/async-storage"

import type { AuthSession } from "../../types/auth"

const SESSION_STORAGE_KEY = "anime-social-mobile/auth-session"

export const sessionStorage = {
  async getSession(): Promise<AuthSession | null> {
    const raw = await AsyncStorage.getItem(SESSION_STORAGE_KEY)
    if (!raw) {
      return null
    }

    try {
      return JSON.parse(raw) as AuthSession
    } catch {
      await AsyncStorage.removeItem(SESSION_STORAGE_KEY)
      return null
    }
  },

  async setSession(session: AuthSession): Promise<void> {
    await AsyncStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session))
  },

  async clearSession(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_STORAGE_KEY)
  },
}
