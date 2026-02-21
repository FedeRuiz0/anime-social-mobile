import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function HeroBanner() {
  return (
    <TouchableOpacity style={styles.banner}>
      <View style={styles.overlay} />
      <Text style={styles.title}>Anime World</Text>
      <Text style={styles.sub}>Join us</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  banner: {
    height: 170,
    borderRadius: 12,
    backgroundColor: "#5A2DFF",
    justifyContent: "flex-end",
    padding: 12,
    marginBottom: 14,
    overflow: "hidden",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  sub: {
    color: "#ddd",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
})