import { NavigationContainer, DarkTheme } from "@react-navigation/native"

import { AuthProvider } from "./src/context/AuthContext"
import RootNavigator from "./src/navigation/RootNavigator"

const appTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#090d1a",
    card: "#111842",
    primary: "#7de1ff",
    text: "#f5f7ff",
    border: "#222d63",
  },
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer theme={appTheme}>
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}
