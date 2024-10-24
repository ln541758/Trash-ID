import { StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import React from "react";
import { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

export default function Catalog({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleNotification}>
          <Entypo name="notification" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  function handleNotification() {
    navigation.navigate("Notification");
  }

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ItemList")}
        >
          <Image
            source={require("../assets/Recyclable.webp")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ItemList")}
        >
          <Image
            source={require("../assets/Organic.webp")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ItemList")}
        >
          <Image
            source={require("../assets/Hazardous.webp")}
            style={styles.image}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ItemList")}
        >
          <Image
            source={require("../assets/Residual.webp")}
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "48%",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
});
