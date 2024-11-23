import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";

export default function Notif({ navigation }) {
  // Function to handle navigating to notifications
  const handleNotification = () => {
    navigation.navigate("Notifications");
  };

  return (
    <Pressable onPress={handleNotification} style={styles.notificationButton}>
      <Entypo name="notification" size={24} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
