import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function CameraScreen({ navigation }) {
  const [imageUri, setImageUri] = useState(null);

  // Function to handle taking a photo
  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaType.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // Function to handle navigating to notifications
  const handleNotification = () => {
    navigation.navigate("Notifications");
  };

  // Function to handle navigating to Item Editor
  const handleItemEditor = () => {
    navigation.navigate("ItemEditor", { isEditMode: true, imageUri });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Take a Photo</Text>
        <Pressable
          onPress={handleNotification}
          style={styles.notificationButton}
        >
          <Entypo name="notification" size={24} color="black" />
        </Pressable>
      </View>

      {/* Image Preview */}
      <View style={styles.imageContainer}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>No Image Taken</Text>
          </View>
        )}
      </View>

      {/* Take Photo Button */}
      <TouchableOpacity onPress={takePhoto} style={styles.takePhotoButton}>
        <Text style={styles.buttonText}>Take a Photo</Text>
      </TouchableOpacity>

      {/* Navigate to Item Editor Button */}
      {imageUri && (
        <TouchableOpacity onPress={handleItemEditor} style={styles.editButton}>
          <Text style={styles.buttonText}>Item Editor</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  notificationButton: {
    padding: 10,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
  },
  placeholder: {
    width: "100%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
  },
  image: {
    width: "100%",
    height: "80%",
    borderRadius: 15,
    resizeMode: "contain",
  },
  takePhotoButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
