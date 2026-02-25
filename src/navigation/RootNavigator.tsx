import { ActivityIndicator, StyleSheet, View } from "react-native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { useAuth } from "../hooks/useAuth"
import FeedScreen from "../screens/FeedScreen"
import HomeScreen from "../screens/HomeScreen"
import LoginScreen from "../screens/LoginScreen"
import type { AppStackParamList, AuthStackParamList } from "./types"

const AuthStack = createNativeStackNavigator<AuthStackParamList>()
const AppStack = createNativeStackNavigator<AppStackParamList>()

function SplashGate() {
  return (
    <View style={styles.splash}>
      <ActivityIndicator color="#6f7cff" size="large" />
    </View>
  )
}

function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  )
}

function AppNavigator() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={HomeScreen} />
      <AppStack.Screen name="Feed" component={FeedScreen} />
    </AppStack.Navigator>
  )
}

export default function RootNavigator() {
  const { isAuthenticated, isBootstrapping } = useAuth()

  if (isBootstrapping) {
    return <SplashGate />
  }

  return isAuthenticated ? <AppNavigator /> : <AuthNavigator />
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#090d1a",
  },
})
