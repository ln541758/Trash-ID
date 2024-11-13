import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Camera from "./Camera";
import Categories from "./Categories";
import Map from "./Map";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Entypo } from "@expo/vector-icons";

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
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
