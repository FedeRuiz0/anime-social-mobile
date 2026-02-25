export const AUTH_CONFIG = {
  googleAndroidClientId:
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
    "1042107817359-voru7fg029lng9ra6426339vp2gpurmr.apps.googleusercontent.com",
  tokenRefreshSkewMs: 60_000,
} as const
