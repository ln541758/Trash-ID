import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
} from "react-native";
import { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Categories from "./Screens/Categories";
import ItemInfo from "./Screens/ItemInfo";
import Notifications from "./Screens/Notifications";
import Home from "./Screens/Home";
import ItemEditor from "./Screens/ItemEditor";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Catalog" component={Categories} />
        <Stack.Screen 
          name="ItemList" 
          component={ItemList} 
          options={({ route, navigation }) => ({
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>{route.params?.trashKeyWords || "Recycling"}</Text>
                <TextInput
                  style={styles.searchBar}
                  placeholder="Search"
                  onChangeText={(text) => navigation.setParams({ searchQuery: text })}
                />
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("ItemEditor")} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Add Item</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  const isAscending = route.params?.isAscending || true;
                  const sortedItems = [...items].sort((a, b) => isAscending ? a.trash[0].trashType.localeCompare(b.trash[0].trashType) : b.trash[0].trashType.localeCompare(a.trash[0].trashType));
                  setItems(sortedItems);
                  navigation.setParams({ isAscending: !isAscending });
                }} style={styles.headerButton}>
                  <Text style={styles.headerButtonText}>Sort</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={styles.headerButton}>
                  <Text style={styles.headerButtonText}>Notifications</Text>
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen name="ItemInfo" component={ItemInfo} />
        <Stack.Screen name="ItemEditor" component={ItemEditor} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const ItemList = ({ navigation, route }) => {
  const [items, setItems] = useState([
    {
      email: "user1@example.com",
      username: "user1",
      phone: "1234567890",
      id: "1",
      address: { city: "City1", street: "Street1", zip: "12345" },
      geo: { lat: "40.7128N", long: "74.0060W" },
      trash: [
        {
          trashID: "t1",
          trashType: "recyclable",
          trashDate: "2024-11-10",
        },
      ],
    },
    {
      email: "user2@example.com",
      username: "user2",
      phone: "0987654321",
      id: "2",
      address: { city: "City2", street: "Street2", zip: "54321" },
      geo: { lat: "34.0522N", long: "118.2437W" },
      trash: [
        {
          trashID: "t2",
          trashType: "recyclable",
          trashDate: "2024-11-11",
        },
      ],
    },
    {
      email: "user3@example.com",
      username: "user3",
      phone: "1122334455",
      id: "3",
      address: { city: "City3", street: "Street3", zip: "67890" },
      geo: { lat: "51.5074N", long: "0.1278W" },
      trash: [
        {
          trashID: "t3",
          trashType: "recyclable",
          trashDate: "2024-11-12",
        },
      ],
    },
  ]);
  const searchQuery = route.params?.searchQuery || "";

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

  return (
    <View style={styles.container}>
      {/* Item List */}
      <FlatList
        data={items.filter((item) =>
          item.trash[0].trashType.toLowerCase().includes(searchQuery.toLowerCase())
        )}
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
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitleContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  searchBar: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    width: 200,
  },
  headerButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    marginLeft: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: "#000",
  },
  addButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
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

export default App;
