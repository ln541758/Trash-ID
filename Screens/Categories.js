import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";


export default function Categories({ navigation }) {

  return (
    <View style={styles.container}>
      {/* styled in grid */}
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
          onPress={() => navigation.navigate("ItemList", { category: "Garbage" })}
        >
          <Image
            source={require("../assets/Residual.webp")}
            style={styles.image}
          />
          <Text style={styles.imageLabel}>Garbage</Text>
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
