export type AuthStackParamList = {
  Login: undefined
}

export type AppStackParamList = {
  Home: undefined
  Feed: { communityId?: string } | undefined
}
