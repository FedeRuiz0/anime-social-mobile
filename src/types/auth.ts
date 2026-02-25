export type AuthUser = {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

export type SessionTokens = {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export type AuthSession = {
  user: AuthUser
  tokens: SessionTokens
}

export type BackendAuthResponse = {
  user: AuthUser
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export type GoogleTokenInfo = {
  aud: string
  exp: string
  email: string
  email_verified: string
  name?: string
  picture?: string
  sub: string
}
