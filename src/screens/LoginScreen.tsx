import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ImageBackground 
} from "react-native"

import * as AuthSession from "expo-auth-session"
import * as Google from "expo-auth-session/providers/google"
import * as WebBrowser from "expo-web-browser"
import { useEffect } from "react"

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen({ navigation }: any) {

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  })

  console.log("Redirect URI:", redirectUri)

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "938209210499-di0g72jjh5hv56ucruldbksfq2iojn51.apps.googleusercontent.com",
    androidClientId: "938209210499-t6q4g610in6leagormp8vi0g7rf689uc.apps.googleusercontent.com",
    redirectUri,
  })

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response
      console.log("ACCESS TOKEN:", authentication?.accessToken)
      navigation.navigate("Home")
    }
  }, [response])

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72" }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <Text style={styles.logo}>Amino</Text>
      <Text style={styles.subtitle}>Your interests…times infinity</Text>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.appleBtn}>
          <Text style={styles.appleText}> Continue with Apple</Text>
        </TouchableOpacity>

        {/* Google */}
        <TouchableOpacity
          style={styles.signupBtn}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Text style={styles.signupText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,40,0.6)",
  },

  logo: {
    color: "white",
    fontSize: 48,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    color: "#ddd",
    textAlign: "center",
    marginBottom: 40,
    fontSize: 16,
  },

  buttons: {
    gap: 12,
  },

  appleBtn: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  appleText: {
    fontWeight: "bold",
    fontSize: 16,
  },

  signupBtn: {
    backgroundColor: "#30D8D8",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  signupText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#001",
  },

  loginBtn: {
    borderWidth: 2,
    borderColor: "#30D8D8",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
  },

  loginText: {
    color: "#30D8D8",
    fontWeight: "bold",
    fontSize: 16,
  },
})