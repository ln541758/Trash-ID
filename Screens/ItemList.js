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
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";

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
        onPress={() => navigation.navigate("ItemInfo", { itemId: item.id })}
        style={styles.itemContainer}
      >
        <Image source={item.source} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.trash[0].trashType}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ItemEditor", { itemId: item.id })
            }
            style={styles.addButton}
          >
            <FontAwesome6 name="edit" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setItems((prevItems) =>
                prevItems.filter((currentItem) => currentItem.id !== item.id)
              );
            }}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
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
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 8,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 5,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  addButton: {
    backgroundColor: "#fff",
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
});

export default ItemList;
