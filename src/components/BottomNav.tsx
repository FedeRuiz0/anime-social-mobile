import { View, Text, StyleSheet } from "react-native"

export default function BottomNav() {
  return (
    <View style={styles.nav}>
      <Text style={styles.item}>Home</Text>
      <Text style={styles.item}>Explore</Text>
      <View style={styles.fab} />
      <Text style={styles.item}>Chats</Text>
      <Text style={styles.item}>Profile</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  nav: {
    height: 60,
    backgroundColor: "#111433",
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 8,
  },
  item: {
    color: "#ccc",
    fontSize: 12,
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#3DE0C4",
    marginTop: -20,
  },
})