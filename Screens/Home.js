import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Camera from "./Camera";
import Categories from "./Categories";
import Map from "./Map";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Entypo } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";


export default function Home({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: route.name,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Categories") {
            iconName = "list";
            return <FontAwesome6 name={iconName} size={size} color={color} />;
          } else if (route.name === "Camera") {
            iconName = "camera";
            return <FontAwesome6 name={iconName} size={size} color={color} />;
          } else if (route.name === "Map") {
            iconName = "map";
            return <Entypo name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Categories" component={Categories} options={({ route, navigation }) => ({
        headerLeft: () => (
          <View style={styles.headerRightContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Profile")}
              style={styles.profileIcon}>
              <FontAwesome6 name="user" size={24} color="black" />
            </TouchableOpacity>
          </View>)
      })} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: "row",
    marginLeft: 10,
    padding: 10,
  },
  profileIcon: {
    marginRLeft: 10,
  },
});
