import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Pressable } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Categories from "./Screens/Categories";
import NotificationScreen from "./Screens/Notifications";
import Home from "./Screens/Home";
import ItemEditor from "./Screens/ItemEditor";
import ItemList from "./Screens/ItemList";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Login from "./Screens/Login";
import Signup from "./Screens/Signup";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./Firestore/firestoreSetup";
import Profile from "./Screens/Profile";



const Stack = createStackNavigator();
const AppStack = (<>
<Stack.Screen name="Profile" component={Profile} options={({route, navigation}) => ({
    headerRight: () => (
      <View style={styles.headerRightContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.notificationButton}>
          <FontAwesome6 name="house" size={24} color="black" />
        </TouchableOpacity>
      </View>),
      headerLeft: () => (
        <View style={styles.headerRightContainer}>
          <TouchableOpacity
            onPress={() => signOut(auth)}
            style={styles.notificationButton}>
            <FontAwesome6 name="right-from-bracket" size={24} color="black" />
          </TouchableOpacity>
        </View>)
  })}/>

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
  <Stack.Screen name="Notifications" component={NotificationScreen} />

</>);
const AuthStack = (<>
  <Stack.Screen name='Login' component={Login} />
  <Stack.Screen name='Signup' component={Signup} />
</>);


const App = () => {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    }
    )
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        initialRouteName: 'Signup',
        headerStyle: { backgroundColor: 'lightblue' },
        headerTintColor: 'black',
        backgroundColor: 'lightgrey',
      }}>
        {isLogged ? AppStack : AuthStack}

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
