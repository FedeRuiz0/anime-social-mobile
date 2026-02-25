import axios from "axios"

import { API_URL, AUTH_ENDPOINTS } from "../../config/api"
import type {
  BackendAuthResponse,
  GoogleTokenInfo,
  SessionTokens,
} from "../../types/auth"

const authClient = axios.create({
  baseURL: API_URL,
  timeout: 15_000,
})

const GOOGLE_TOKEN_INFO_URL = "https://oauth2.googleapis.com/tokeninfo"

export async function validateGoogleIdToken(
  idToken: string,
  expectedAudience: string,
): Promise<GoogleTokenInfo> {
  const response = await axios.get<GoogleTokenInfo>(GOOGLE_TOKEN_INFO_URL, {
    params: { id_token: idToken },
    timeout: 10_000,
  })

  if (response.data.aud !== expectedAudience) {
    throw new Error("Google token audience mismatch")
  }

  if (response.data.email_verified !== "true") {
    throw new Error("Google account email is not verified")
  }

  return response.data
}

export async function exchangeGoogleIdToken(
  idToken: string,
): Promise<BackendAuthResponse> {
  const response = await authClient.post<BackendAuthResponse>(
    AUTH_ENDPOINTS.googleVerify,
    { idToken },
  )

  return response.data
}

export async function refreshBackendToken(
  refreshToken: string,
): Promise<SessionTokens> {
  const response = await authClient.post<{ accessToken: string; expiresIn: number }>(
    AUTH_ENDPOINTS.refresh,
    { refreshToken },
  )

  return {
    accessToken: response.data.accessToken,
    refreshToken,
    expiresAt: Date.now() + response.data.expiresIn * 1000,
  }
}

export async function notifyBackendLogout(
  refreshToken: string,
): Promise<void> {
  await authClient.post(AUTH_ENDPOINTS.logout, { refreshToken })
}
