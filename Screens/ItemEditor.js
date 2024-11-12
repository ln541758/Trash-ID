import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Button,
  Platform,
  Pressable,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";

export default function ItemEditor({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Plastic");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  // Function to handle opening the camera
  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to handle date change
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  // Function to handle Save button click
  const handleSave = () => {
    // Here you could save the item details
    navigation.navigate("ItemList");
  };

  // Function to handle Cancel button click
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Plastic</Text>

      {/* Image Picker */}
      <TouchableOpacity onPress={pickImage} style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Entypo name="camera" size={50} color="gray" />
          </View>
        )}
      </TouchableOpacity>

      {/* Categories Picker */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Plastic" value="Plastic" />
        <Picker.Item label="Glass" value="Glass" />
        <Picker.Item label="Metal" value="Metal" />
        <Picker.Item label="Organic" value="Organic" />
        <Picker.Item label="Paper" value="Paper" />
      </Picker>

      {/* Date Picker */}
      <Pressable
        onPress={() => setShowDatePicker(true)}
        style={styles.datePickerButton}
      >
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}

      {/* Notification Checkbox */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isNotificationEnabled}
          onValueChange={setIsNotificationEnabled}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Enable Notification</Text>
      </View>

      {/* Save and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
