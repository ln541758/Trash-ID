import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ItemEditor({ navigation, route }) {
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [openCategoryPicker, setOpenCategoryPicker] = useState(false);
  const [categories, setCategories] = useState([
    { label: "Plastic", value: "Plastic" },
    { label: "Glass", value: "Glass" },
    { label: "Metal", value: "Metal" },
    { label: "Organic", value: "Organic" },
    { label: "Paper", value: "Paper" },
  ]);
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
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

  // Function to show date picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Function to hide date picker
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // Function to handle date change
  const handleConfirm = (selectedDate) => {
    setDate(selectedDate);
    hideDatePicker();
  };

  // Function to handle Save button click
  const handleSave = () => {
    navigation.navigate("ItemList");
  };

  // Function to handle Cancel button click
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Image Picker */}
      <View style={styles.imageContainer} onTouchEnd={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage}>
            <Entypo name="camera" size={50} color="gray" />
          </View>
        )}
      </View>

      {/* Categories Picker using DropDownPicker */}
      <DropDownPicker
        open={openCategoryPicker}
        value={selectedCategory}
        items={categories}
        setOpen={setOpenCategoryPicker}
        setValue={setSelectedCategory}
        setItems={setCategories}
        placeholder="Select a category"
        style={styles.dropdown}
        containerStyle={{ marginBottom: 20 }}
        dropDownContainerStyle={styles.dropdownContainer}
      />

      {/* Date Picker with DateTimePickerModal */}
      <View style={styles.datePickerButton} onTouchEnd={showDatePicker}>
        <Text style={styles.dateText}>Date: {date.toDateString()}</Text>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* Notification Checkbox */}
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={isNotificationEnabled}
          onValueChange={setIsNotificationEnabled}
          style={styles.checkbox}
        />
        <Text style={styles.checkboxLabel}>Enable Notification</Text>
      </View>

      {/* Save and Cancel Buttons */}
      <View style={styles.buttonContainer}>
        <View style={styles.cancelButton} onTouchEnd={handleCancel}>
          <Text style={styles.buttonText}>Cancel</Text>
        </View>
        <View style={styles.saveButton} onTouchEnd={handleSave}>
          <Text style={styles.buttonText}>Save</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignSelf: "center",
    marginBottom: 20,
  },
  placeholderImage: {
    width: 200,
    height: 200,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  dropdown: {
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  dropdownContainer: {
    backgroundColor: "#f0f0f0",
  },
  datePickerButton: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "flex-start",
    width: '100%', // Set width to 100% to match DropDownPicker width
    borderColor: "#000", // Set border color to black
    borderWidth: 1, // Set border width
  },
  dateText: {
    fontSize: 14,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 10,
    marginTop: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 100,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#d9534f",
    padding: 15,
    borderRadius: 5,
    marginRight: 10,
    alignItems: "center",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#5cb85c",
    padding: 15,
    borderRadius: 5,
    marginLeft: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
