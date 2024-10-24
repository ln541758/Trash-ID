import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React from "react";

export default function ItemList({ navigation }) {
  const data = [
    { id: "1", source: require("../assets/bottle.jpg") },
    { id: "2", source: require("../assets/bottle.jpg") },
    { id: "3", source: require("../assets/bottle.jpg") },
  ];

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ItemInfo")}
        style={styles.itemContainer}
      >
        <Image source={item.source} style={styles.image} />
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
});
