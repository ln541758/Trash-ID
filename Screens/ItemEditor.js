import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAllDocs } from "../Firestore/firestoreHelper";

export default function ItemEditor({ navigation, route }) {
  const isEditMode = route.params?.isEditMode ?? true;
  const currentItem = route.params.itemObj;
  const [image, setImage] = useState(isEditMode ? "" : currentItem?.source);
  const [selectedCategory, setSelectedCategory] = useState(currentItem?.trashType);
  const [openCategoryPicker, setOpenCategoryPicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(currentItem?.trashDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(currentItem?.notification);

  useEffect(() => {
    const fetchData = async () => {
      const keyWordArr = await getAllDocs("trashKey", "Recycling");
      setCategories(keyWordArr);
    };

    fetchData();
  }, []);

  // Function to handle opening the camera
  const pickImage = async () => {
    if (!isEditMode) return;
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // Function to show date picker
  const showDatePicker = () => {
    if (isEditMode) {
      setDatePickerVisibility(true);
    }
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
    // Save the data to the database
    let updatedItem = {
      source: image,
      trashType: selectedCategory,
      trashDate: date,
      notification: isNotificationEnabled,
      trashCategory: route.params.category,};



    navigation.navigate("ItemList");
  };

  // Function to handle Cancel button click
  const handleCancel = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.container}>

      {/* Image */}
      <View
        style={styles.imageContainer}
        onTouchEnd={isEditMode ? pickImage : null}
      >
        {image ? (
          <Image source={image} style={styles.image} />
        ) : (
          isEditMode && (
            <View style={styles.placeholderImage}>
              <Entypo name="camera" size={50} color="gray" />
            </View>
          )
        )}
      </View>

      {/* Category */}
      {isEditMode ? (
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
      ) : (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{selectedCategory}</Text>
        </View>
      )}

      {/* Date */}
      {isEditMode ? (
        <View style={styles.datePickerButton} onTouchEnd={showDatePicker}>
          <Text style={styles.dateText}>Date: {date}</Text>
        </View>
      ) : (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
      )}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      {/* Notification */}
      {isEditMode ? (
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isNotificationEnabled}
            onValueChange={setIsNotificationEnabled}
            style={styles.checkbox}
          />
          <Text style={styles.checkboxLabel}>Enable Notification</Text>
        </View>
      ) : (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Enable Notification:</Text>
          <Checkbox value={isNotificationEnabled} disabled />
        </View>
      )}

      {/* Save and Cancel Buttons */}
      {isEditMode && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    fontSize: 16,
    color: "#000",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  editButton: {
    fontSize: 16,
    color: "#007BFF",
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
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
  },
  datePickerButton: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "flex-start",
    width: "100%",
    borderColor: "#000",
    borderWidth: 1,
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
    marginTop: 30,
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
