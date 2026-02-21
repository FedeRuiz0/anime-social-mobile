import { useEffect, useState } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native"
import axios from "axios"
import { API_URL } from "../config/api"

export default function CommunitiesScreen({ navigation }: any) {
  const [communities, setCommunities] = useState([])
  const [search, setSearch] = useState("")

  useEffect(() => {
  const fetchCommunities = async () => {
    try {
      const res = await axios.get(`${API_URL}/communities`)
      setCommunities(res.data)
    } catch (error) {
      console.log("Error fetching communities:", error)
    }
  }

  fetchCommunities()
}, [])

  const filtered = communities.filter((c: any) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar} />

        <TextInput
          placeholder="Search communities"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />
      </View>

      {communities.length > 0 && (
        <TouchableOpacity style={styles.banner}>
          <View style={styles.overlay} />
          <Text style={styles.bannerTitle}>
            ⭐ {communities[0].name}
          </Text>
          <Text style={styles.bannerSubtitle}>Comunidad destacada</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.section}>My Communities</Text>

      <FlatList
        data={filtered}
        keyExtractor={(item: any) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={styles.squareCard}
            onPress={() =>
              navigation.navigate("Feed", { communityId: item.id })
            }
          >
            <View style={styles.cardBg} />
            <View style={styles.overlay} />
            <Text style={styles.cardTitle}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111433",
    padding: 14,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6C3BFF",
    marginRight: 10,
  },

  search: {
    flex: 1,
    backgroundColor: "#1B1E45",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: "white",
  },

  banner: {
    height: 140,
    borderRadius: 18,
    backgroundColor: "#6C3BFF",
    justifyContent: "flex-end",
    padding: 14,
    marginBottom: 16,
    overflow: "hidden",
  },

  bannerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },

  bannerSubtitle: {
    color: "#ddd",
  },

  section: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  squareCard: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
    justifyContent: "flex-end",
    padding: 10,
  },

  cardBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#6C3BFF",
  },

  cardTitle: {
    color: "white",
    fontWeight: "bold",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
})