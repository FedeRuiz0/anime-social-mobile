import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native"

import BottomNav from "../components/BottomNav"
import CommunityGrid from "../components/CommunityGrid"
import HeaderHome from "../components/HeaderHome"
import HeroBanner from "../components/HeroBanner"
import { useAuth } from "../hooks/useAuth"

const mock = [
  { id: "1", name: "Anime" },
  { id: "2", name: "JRPG" },
  { id: "3", name: "Genshin" },
  { id: "4", name: "Waifu Club" },
]

export default function HomeScreen() {
  const { logout, session, forceRefresh, isLoading } = useAuth()

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderHome />

        <View style={styles.sessionBanner}>
          <Text style={styles.sessionText} numberOfLines={1}>
            Signed in as {session?.user.email}
          </Text>
          <View style={styles.actionsRow}>
            <Pressable
              style={[styles.actionButton, isLoading && styles.actionButtonDisabled]}
              onPress={() => void forceRefresh()}
              disabled={isLoading}
            >
              <Text style={styles.actionButtonText}>Refresh token</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => void logout()}>
              <Text style={styles.secondaryButtonText}>Logout</Text>
            </Pressable>
          </View>
        </View>

        <HeroBanner />

        <View style={styles.dots}>
          <View style={styles.dotActive} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        <Text style={styles.section}>My Communities</Text>
        <CommunityGrid data={mock} />

        <Text style={styles.section}>Recommended Communities</Text>
        <CommunityGrid data={mock} />
      </ScrollView>

      <BottomNav />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0E1330",
    paddingHorizontal: 10,
    paddingTop: 6,
  },
  sessionBanner: {
    backgroundColor: "#1a2148",
    borderWidth: 1,
    borderColor: "#2b356c",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  sessionText: {
    color: "#d5dcff",
    fontSize: 12,
    marginBottom: 10,
  },
  actionsRow: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#89d9ff",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  actionButtonDisabled: {
    opacity: 0.7,
  },
  actionButtonText: {
    color: "#091030",
    fontWeight: "700",
    fontSize: 12,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "#28305f",
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#eff3ff",
    fontWeight: "700",
    fontSize: 12,
  },
  section: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 8,
    marginTop: 6,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#666",
    marginHorizontal: 3,
  },
  dotActive: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginHorizontal: 3,
  },
})
