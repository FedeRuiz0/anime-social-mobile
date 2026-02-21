import { View, TextInput, StyleSheet } from "react-native"

export default function HeaderHome() {
  return (
    <View style={styles.header}>
      <View style={styles.avatar} />

      <TextInput
        placeholder="Search communities"
        placeholderTextColor="#aaa"
        style={styles.search}
      />

      <View style={styles.plus} />
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6C3BFF",
    marginRight: 8,
  },
  search: {
    flex: 1,
    backgroundColor: "#1A1F47",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "white",
  },
  plus: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6C3BFF",
    marginLeft: 8,
  },
})