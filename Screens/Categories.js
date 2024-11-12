import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

export default function Categories({ navigation }) {
  function handleNotification() {
    navigation.navigate("Notifications");
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          placeholderTextColor="#aaa"
        />
        <Pressable onPress={handleNotification} style={styles.notificationButton}>
          <Entypo name="notification" size={24} color="black" />
        </Pressable>
      </View>

      {/* 分类网格 */}
      <View style={styles.grid}>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ItemList", { category: "Recycling" })}
        >
          <Image
            source={require("../assets/Recyclable.webp")}
            style={styles.image}
          />
          <Text style={styles.imageLabel}>Recycling</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ItemList", { category: "Organic" })}
        >
          <Image
            source={require("../assets/Organic.webp")}
            style={styles.image}
          />
          <Text style={styles.imageLabel}>Organic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ItemList", { category: "Hazardous" })}
        >
          <Image
            source={require("../assets/Hazardous.webp")}
            style={styles.image}
          />
          <Text style={styles.imageLabel}>Hazardous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.imageContainer}
          onPress={() => navigation.navigate("ItemList", { category: "Food" })}
        >
          <Image
            source={require("../assets/Residual.webp")}
            style={styles.image}
          />
          <Text style={styles.imageLabel}>Food</Text>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginRight: 10,
  },
  notificationButton: {
    padding: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageContainer: {
    width: "48%",
    marginBottom: 16,
    alignItems: "center",
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginBottom: 8,
    borderRadius: 15,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
