import { FlatList, TouchableOpacity, Text, View, StyleSheet } from "react-native"

export default function CommunityGrid({ data }: any) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item: any) => item.id}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }: any) => (
        <TouchableOpacity style={styles.square}>
          <View style={styles.bg} />
          <View style={styles.overlay} />
          <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
  )
}

const styles = StyleSheet.create({
  square: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    justifyContent: "flex-end",
    padding: 8,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#6C3BFF",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13,
  },
})