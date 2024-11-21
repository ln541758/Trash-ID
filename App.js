import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Categories from "./Screens/Categories";
import Notifications from "./Screens/Notifications";
import Home from "./Screens/Home";
import ItemEditor from "./Screens/ItemEditor";
import ItemList from "./Screens/ItemList";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

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
        <Stack.Screen name="Categories" component={Categories}/>
        <Stack.Screen
          name="ItemList"
          component={ItemList}
          options={({ route, navigation }) => ({
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>
                  {route.params?.category || "Recycling"}
                </Text>
              </View>
            ),
            headerRight: () => (
              <View style={styles.headerRightContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ItemEditor", { isEditMode: true })}
                  style={styles.addButton}
                >
                  <FontAwesome6 name="add" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    const isAscending = route.params?.isAscending ?? true;
                    navigation.setParams({ isAscending: !isAscending });
                  }}
                  style={styles.addButton}
                >
                  <MaterialIcons name="sort" size={24} color="black" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ItemEditor"
          component={ItemEditor}
          options={({ route, navigation }) => ({
            headerTitle: "Edit Item",
            headerRight: () =>
              !route.params?.isEditMode ? ( // If not in edit mode, show the Edit button
                <TouchableOpacity
                  onPress={() => {
                    navigation.setParams({ isEditMode: true });
                  }}
                  style={styles.headerButton}
                >
                  <Text style={styles.headerButtonText}>Edit</Text>
                </TouchableOpacity>
              ) : null,
          })}
        />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  headerRightContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  addButton: {
    padding: 10,
  },
  headerButton: {
    marginRight: 10,
  },
  headerButtonText: {
    fontSize: 16,
    color: "#007BFF",
  },
  notificationButton: {
    padding: 10,
  },
});

export default App;
