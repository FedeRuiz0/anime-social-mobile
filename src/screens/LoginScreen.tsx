import { useEffect, useMemo, useState } from "react"
import {
  ActivityIndicator,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import * as AuthSession from "expo-auth-session"
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"

import { AUTH_CONFIG } from "../config/auth"
import { useAuth } from "../hooks/useAuth"

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  const { signInWithGoogleIdToken, isLoading } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: AUTH_CONFIG.googleAndroidClientId,
    webClientId: AUTH_CONFIG.googleWebClientId || undefined,
    responseType: AuthSession.ResponseType.IdToken,
    scopes: ["openid", "profile", "email"],
  })

  const isDisabled = useMemo(() => !request || isLoading, [isLoading, request])

  useEffect(() => {
    const completeLogin = async () => {
      if (response?.type !== "success") {
        if (response?.type === "error") {
          const providerMessage =
            response.error?.params?.error_description ?? response.error?.message ?? ""

          if (providerMessage.includes("custom scheme URIs are not allowed for 'web' client type")) {
            setErrorMessage(
              "Google OAuth config error: use an Android OAuth client ID in EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID (not a Web client ID).",
            )
          } else {
            setErrorMessage(providerMessage || "Google sign-in failed")
          }
        }
        return
      }

      const idToken = response.authentication?.idToken
      if (!idToken) {
        setErrorMessage("Google response did not include an ID token")
        return
      }

      try {
        setErrorMessage(null)
        await signInWithGoogleIdToken(idToken)
      } catch (error) {
        setErrorMessage(
          error instanceof Error ? error.message : "Unable to sign in right now",
        )
      }
    }

    void completeLogin()
  }, [response, signInWithGoogleIdToken])

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72",
      }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <SafeAreaView style={styles.content}>
        <View>
          <Text style={styles.eyebrow}>ANIME SOCIAL MOBILE</Text>
          <Text style={styles.title}>Join your anime universe</Text>
          <Text style={styles.subtitle}>
            Secure Google sign-in for your personalized feed, communities, and chats.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Authentication</Text>
          <Text style={styles.cardBody}>
            We verify your Google identity before creating your app session.
          </Text>

          <Pressable
            style={[styles.googleButton, isDisabled && styles.googleButtonDisabled]}
            disabled={isDisabled}
            onPress={() => {
              setErrorMessage(null)
              void promptAsync()
            }}
          >
            {isLoading ? (
              <ActivityIndicator color="#161a35" size="small" />
            ) : (
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            )}
          </Pressable>

          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
      </SafeAreaView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a1022",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(7, 12, 34, 0.75)",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 42,
    paddingBottom: 32,
  },
  eyebrow: {
    color: "#9ca8ff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.8,
    marginBottom: 16,
  },
  title: {
    color: "#ffffff",
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
    marginBottom: 14,
  },
  subtitle: {
    color: "#c8cdee",
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 320,
  },
  card: {
    backgroundColor: "rgba(15, 21, 47, 0.92)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#303a68",
    padding: 18,
  },
  cardTitle: {
    color: "#ffffff",
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardBody: {
    color: "#b4bcdf",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 14,
  },
  googleButton: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#7de1ff",
    borderRadius: 12,
    minHeight: 48,
  },
  googleButtonDisabled: {
    opacity: 0.6,
  },
  googleButtonText: {
    color: "#161a35",
    fontWeight: "800",
    fontSize: 15,
  },
  errorText: {
    marginTop: 10,
    color: "#ff9fb6",
    fontSize: 13,
  },
})
