import { View, Text, StyleSheet, ScrollView } from "react-native"
import HeaderHome from "../components/HeaderHome"
import HeroBanner from "../components/HeroBanner"
import CommunityGrid from "../components/CommunityGrid"
import BottomNav from "../components/BottomNav"

const mock = [
  { id: "1", name: "Anime" },
  { id: "2", name: "JRPG" },
  { id: "3", name: "Genshin" },
  { id: "4", name: "Waifu Club" },
]

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderHome />

        <HeroBanner />

        {/* dots del banner */}
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