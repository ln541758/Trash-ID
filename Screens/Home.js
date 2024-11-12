import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Camera from "./Camera";
import Categories from "./Categories";
import Map from "./Map";

export default function Home({ navigation }) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: route.name,
      })}
    >
      <Tab.Screen name="Catalog" component={Categories} />
      <Tab.Screen name="Camera" component={Camera} />
      <Tab.Screen name="Map" component={Map} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
