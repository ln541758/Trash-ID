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
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { database, auth, storage } from "../Firestore/firestoreSetup";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { deleteDB } from "../Firestore/firestoreHelper";
import { ref, getDownloadURL } from "firebase/storage";


function ItemList({ navigation, route }) {
  const [originalItems, setOriginalItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const categoryImage = {
    Recycling: require("../assets/Recyclable.webp"),
    Organic: require("../assets/Organic.webp"),
    Hazardous: require("../assets/Hazardous.webp"),
    Garbage: require("../assets/Residual.webp"),
  };

  const searchQuery = route.params?.searchQuery || "";
  const isAscending = route.params?.isAscending ?? true;

  // Deletes an item from Firestore
  function handleDelete(id) {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteDB(auth.currentUser.uid, "trash", id);
        },
      },
    ]);
  }

  // Fetches data from Firestore and sets up a listener
  useEffect(() => {
    const docRef = doc(database, "trashData", auth.currentUser.uid);
    const unsubscribe = onSnapshot(
      collection(docRef, "trash"),
      async (subCollectionSnapshot) => {
        try {
          const newArr = await Promise.all(
            subCollectionSnapshot.docs.map(async (subDoc) => {
              const subDocData = subDoc.data();
              if (subDocData.trashCategory === route.params.category) {
                const newEntry = {
                  ...subDocData,
                  id: subDoc.id,
                };
                if (newEntry.source) {
                  const imageRef = ref(storage, newEntry.source);
                  const httpImage = await getDownloadURL(imageRef);
                  newEntry.imageURI = {uri: httpImage};
                } else {
                  newEntry.imageURI = categoryImage[route.params.category];
                }
                return newEntry;
              }
              return null; // Return null if it doesn't match the category
            })
          );

          // Filter out null values
          const filteredArr = newArr.filter((entry) => entry !== null);
          setOriginalItems(filteredArr);
          setFilteredItems(filteredArr);
        } catch (error) {
          console.error("Error processing subcollection snapshot:", error);
        }
      },
      (error) => {
        console.error("Error listening to trashData subcollection:", error);
      }
    );
    console.log("data:", originalItems);
    return () => {
      unsubscribe();
    };
  }, []);


  // Updates filtered items based on search and sort
  useEffect(() => {
    let itemsToFilter = [...originalItems];

    if (searchQuery) {
      itemsToFilter = itemsToFilter.filter((item) =>
        item.trashType.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    itemsToFilter.sort((a, b) =>
      isAscending
        ? a.trashType.localeCompare(b.trashType)
        : b.trashType.localeCompare(a.trashType)
    );

    setFilteredItems(itemsToFilter);
  }, [searchQuery, isAscending, originalItems]);

  // Renders a single item in the list
  function renderItem({ item }) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ItemEditor", {
            itemObj: item,
            isEditMode: false,
            category: route.params.category,
          })
        }
        style={styles.itemContainer}
      >
        <Image
          source={item.imageURI}
          style={styles.itemImage}
          alt="No Image"
          onError={(e) => {console.log(e);
            item.imageURI = categoryImage[route.params.category];
          }}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.trashType}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ItemEditor", {
                itemObj: item,
                isEditMode: true,
                category: route.params.category,
              })
            }
            style={styles.addButton}
          >
            <FontAwesome6 name="edit" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => handleDelete(item.id)}
          >
            <AntDesign name="delete" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  // Navigates to the notifications screen
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
        <Pressable onPress={handleNotification} style={styles.notificationButton}>
          <Entypo name="notification" size={24} color="black" />
        </Pressable>
      </View>

      <FlatList
        data={filteredItems} // Use filtered data
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
