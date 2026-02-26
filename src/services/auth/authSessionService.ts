import type { AuthSession, BackendAuthResponse } from "../../types/auth"
import {
  exchangeGoogleIdToken,
  refreshBackendToken,
} from "./authApi"

function mapBackendSession(payload: BackendAuthResponse): AuthSession {
  return {
    user: payload.user,
    tokens: {
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      expiresAt: Date.now() + payload.expiresIn * 1000,
    },
  }
}

export async function createSessionFromGoogleIdToken(
  idToken: string,
): Promise<AuthSession> {
  // El backend se encarga de validar el token de Google
  const backendPayload = await exchangeGoogleIdToken(idToken)
  return mapBackendSession(backendPayload)
}

export async function refreshSession(session: AuthSession): Promise<AuthSession> {
  const refreshedTokens = await refreshBackendToken(session.tokens.refreshToken)

  return {
    ...session,
    tokens: refreshedTokens,
  }
}
