import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { items as importedItems } from "../Components/Items";
import { Entypo } from "@expo/vector-icons";


const ItemList = ({ navigation, route }) => {
  const [items, setItems] = useState(importedItems);

  const searchQuery = route.params?.searchQuery || "";
  const isAscending = route.params?.isAscending ?? true;

  useEffect(() => {
    let filteredItems = importedItems;

    if (searchQuery) {
      filteredItems = filteredItems.filter((item) =>
        item.trash[0].trashType
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    }

    filteredItems = filteredItems.sort((a, b) =>
      isAscending
        ? a.trash[0].trashType.localeCompare(b.trash[0].trashType)
        : b.trash[0].trashType.localeCompare(a.trash[0].trashType)
    );

    setItems(filteredItems);
  }, [searchQuery, isAscending]);

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("ItemInfo")}
        style={styles.itemContainer}
      >
        <Image source={item.source} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.trash[0].trashType}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  function handleNotification() {
    navigation.navigate("Notifications");
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={(text) => navigation.setParams({ searchQuery: text })}
        />
        <Pressable
          onPress={handleNotification}
          style={styles.notificationButton}
        >
          <Entypo name="notification" size={24} color="black" />
        </Pressable>
      </View>

      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  searchBar: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 9,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginRight: 10,
    marginLeft: 10,
  },
  notificationButton: {
    padding: 8,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    marginLeft: 20,
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 40,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
});

export default ItemList;
