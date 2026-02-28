import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react"
import type { PropsWithChildren } from "react"

import { AUTH_CONFIG } from "../config/auth"
import { notifyBackendLogout } from "../services/auth/authApi"
import {
  createSessionFromGoogleIdToken,
  refreshSession,
} from "../services/auth/authSessionService"
import { sessionStorage } from "../services/storage/sessionStorage"
import type { AuthSession } from "../types/auth"

type AuthContextValue = {
  isBootstrapping: boolean
  isAuthenticated: boolean
  isLoading: boolean
  session: AuthSession | null
  signInWithGoogleIdToken: (idToken: string) => Promise<void>
  forceRefresh: () => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isBootstrapping, setIsBootstrapping] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const refreshTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const clearRefreshTimer = useCallback(() => {
    if (!refreshTimeoutRef.current) {
      return
    }

    clearTimeout(refreshTimeoutRef.current)
    refreshTimeoutRef.current = null
  }, [])

  const scheduleRefresh = useCallback(
    (activeSession: AuthSession) => {
      clearRefreshTimer()

      const msUntilRefresh = Math.max(
        activeSession.tokens.expiresAt - Date.now() - AUTH_CONFIG.tokenRefreshSkewMs,
        1_000,
      )

      refreshTimeoutRef.current = setTimeout(async () => {
        try {
          const updatedSession = await refreshSession(activeSession)
          setSession(updatedSession)
          await sessionStorage.setSession(updatedSession)
          scheduleRefresh(updatedSession)
        } catch {
          setSession(null)
          await sessionStorage.clearSession()
        }
      }, msUntilRefresh)
    },
    [clearRefreshTimer],
  )

  const hydrateSession = useCallback(async () => {
    setIsBootstrapping(true)

    const storedSession = await sessionStorage.getSession()
    if (!storedSession) {
      setSession(null)
      setIsBootstrapping(false)
      return
    }

    try {
      const isExpired = storedSession.tokens.expiresAt <= Date.now()
      const activeSession = isExpired
        ? await refreshSession(storedSession)
        : storedSession

      setSession(activeSession)
      await sessionStorage.setSession(activeSession)
      scheduleRefresh(activeSession)
    } catch {
      setSession(null)
      await sessionStorage.clearSession()
    } finally {
      setIsBootstrapping(false)
    }
  }, [scheduleRefresh])

  useEffect(() => {
    void hydrateSession()

    return () => {
      clearRefreshTimer()
    }
  }, [clearRefreshTimer, hydrateSession])

  const signInWithGoogleIdToken = useCallback(
    async (idToken: string) => {
      console.log("[AuthContext] signInWithGoogleIdToken called")
      setIsLoading(true)
      try {
        console.log("[AuthContext] Creating session from Google ID token...")
        const nextSession = await createSessionFromGoogleIdToken(idToken)
        console.log("[AuthContext] Session created:", nextSession)
        
        setSession(nextSession)
        console.log("[AuthContext] Session set in state")
        
        await sessionStorage.setSession(nextSession)
        console.log("[AuthContext] Session saved to storage")
        
        scheduleRefresh(nextSession)
        console.log("[AuthContext] Refresh scheduled")
      } catch (error) {
        console.log("[AuthContext] Error during sign in:", error)
        throw error
      } finally {
        setIsLoading(false)
        console.log("[AuthContext] isLoading set to false")
      }
    },
    [scheduleRefresh],
  )

  const forceRefresh = useCallback(async () => {
    if (!session) {
      return
    }

    setIsLoading(true)
    try {
      const updatedSession = await refreshSession(session)
      setSession(updatedSession)
      await sessionStorage.setSession(updatedSession)
      scheduleRefresh(updatedSession)
    } finally {
      setIsLoading(false)
    }
  }, [scheduleRefresh, session])

  const logout = useCallback(async () => {
    clearRefreshTimer()
    if (session?.tokens.refreshToken) {
      try {
        await notifyBackendLogout(session.tokens.refreshToken)
      } catch {
        // no-op: local logout still succeeds even when server is unreachable
      }
    }

    setSession(null)
    await sessionStorage.clearSession()
  }, [clearRefreshTimer, session])

  const value = useMemo<AuthContextValue>(
    () => ({
      isBootstrapping,
      isAuthenticated: Boolean(session),
      isLoading,
      session,
      signInWithGoogleIdToken,
      forceRefresh,
      logout,
    }),
    [forceRefresh, isBootstrapping, isLoading, logout, session, signInWithGoogleIdToken],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
