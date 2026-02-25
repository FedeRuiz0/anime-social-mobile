export const API_URL =
  process.env.EXPO_PUBLIC_API_URL ?? "http://app-social-xp05.onrender.com"

export const AUTH_ENDPOINTS = {
  googleVerify: "/auth/google/mobile",
  refresh: "/auth/refresh",
  logout: "/auth/logout",
} as const
