export const AUTH_CONFIG = {
  googleAndroidClientId:
    process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID ??
    "938209210499-impjd0og5lqmffhucjsiu3uhd016grlo.apps.googleusercontent.com",
  googleWebClientId:
    process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? "",
  tokenRefreshSkewMs: 60_000,
} as const
