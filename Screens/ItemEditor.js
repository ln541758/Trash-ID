import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DropDownPicker from "react-native-dropdown-picker";
import Checkbox from "expo-checkbox";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getAllDocs, updateDB, writeToDB, fetchTrashKeyMap } from "../Firestore/firestoreHelper";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, auth } from "../Firestore/firestoreSetup";

export default function ItemEditor({ navigation, route }) {
  const [categoryKey, setCategoryKey] = useState(route.params.category);
  const isEditMode = route.params?.isEditMode ?? true;
  const currentItem = route.params.itemObj;
  const [response, requestPermission] = ImagePicker.useCameraPermissions();
  const [image, setImage] = useState(
    isEditMode ? route.params?.imageUri || "" : currentItem?.source
  );
  const [selectedCategory, setSelectedCategory] = useState(
    currentItem?.trashType
  );
  const [openCategoryPicker, setOpenCategoryPicker] = useState(false);
  const [openTypePicker, setOpenTypePicker] = useState(false);
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState(currentItem?.trashDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(
    currentItem ? currentItem.notification : false
  );
  const [imageChanged, setImageChanged] = useState(false);
  const [trashKey, setTrashKey] = useState([
    { label: "Recycling", value: "Recycling" },
    { label: "Organic", value: "Organic" },
    { label: "Hazardous", value: "Hazardous" },
    { label: "Garbage", value: "Garbage" },
  ]);
  const [labelToCategoryMap, setLabelToCategoryMap] = useState({});


  // Function to verify permission
  async function verifyPermission() {
    if (response.granted) {
      return true;
    }
    const permission = await requestPermission();
    return permission.granted;
  }

  // Fetch the categories for the selected type
  useEffect(() => {
    const fetchData = async () => {
      const keyWordArr = await getAllDocs("trashKey", categoryKey);
      setCategories(keyWordArr);
    };
    fetchData();
  }, [categoryKey]);

  // Function to handle opening the camera
  const pickImage = async () => {
    if (!isEditMode) return;
    const hasPermission = await verifyPermission();
    if (!hasPermission) {
      Alert.alert(
        "Permission required",
        "Please grant permission to access the camera",
        [{ text: "OK" }]
      );
      return;
    }
    try {
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
        setImageChanged(true);
      }
    } catch (e) {
      console.error("Error reading image: ", e);
    }
  };

  useEffect(() => {
    async function downloadImage() {
      try {
        if (currentItem?.source) {
          const imageRef = ref(storage, currentItem.source);
          const httpsImageURi = await getDownloadURL(imageRef);
          setImage(httpsImageURi);
        }
      } catch (err) {
        console.log("get image ", err);
      }
    }
    downloadImage();
  }, []);

  // Function to handle image upload
  async function uploadImage(uri) {
    try {
      const imageResponse = await fetch(uri);
      if (!imageResponse.ok) {
        throw new Error("Failed to fetch image");
      }
      const imageBlob = await imageResponse.blob();
      // upload image to firebase storage
      const imageName = uri.substring(uri.lastIndexOf("/") + 1);
      const imageRef = ref(storage, `images/${imageName}`);
      const uploadResult = await uploadBytesResumable(imageRef, imageBlob);
      return uploadResult.metadata.fullPath;
    } catch (err) {
      console.log("fetch and upload image ", err);
    }
  }

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
    // Use toISOString and slice to get only the date part (YYYY-MM-DD)
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    setDate(formattedDate);
    hideDatePicker();
  };

  // Function to handle Save button click
  const handleSave = async () => {
    let uri = currentItem?.source || "";
    console.log("imageeeee", image);
    console.log("imageChanged", imageChanged);

    // Upload image if it has changed
    // upload image if it is taken from camera tab
    if (imageChanged && image || route.params?.labels) {
      uri = await uploadImage(image);
    }


    const updatedItem = {
      source: uri,
      trashType: selectedCategory || route.params?.labels[0],
      trashDate: date,
      notification: isNotificationEnabled,
      trashCategory: categoryKey,
    };

    if (!updatedItem.trashDate) {
      Alert.alert("Invalid Date", "Please select a valid date", [{ text: "OK" }]);
      return;
    }

    if (currentItem) {
      await updateDB(
        auth.currentUser.uid,
        "trash",
        currentItem.id,
        updatedItem
      );
    } else {
      console.log("updatedItem", updatedItem);
      await writeToDB(auth.currentUser.uid, "trash", updatedItem);
    }
    setImageChanged(false);
    navigation.navigate("ItemList", { category: categoryKey });
  };

  // Function to handle Cancel button click
  const handleCancel = () => {
    Alert.alert("Cancel", "Are you sure you want to give up editing?", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  // Fetch the trash category map from the database
  useEffect( () => {
    const fetchTrashMap = async () => {
      const labelToCategoryMapTemp = await fetchTrashKeyMap();
      setLabelToCategoryMap(labelToCategoryMapTemp);
    };
    fetchTrashMap();

  }, []);

  useEffect(() => {
    if (route.params?.labels && labelToCategoryMap) {
      const detectedLabels = route.params.labels;

      let matchedCategory = "Uncategorized";
      let matchedType = detectedLabels[0];

      for (const category in labelToCategoryMap) {
        const matchedLabel = detectedLabels.find((label) =>
            labelToCategoryMap[category].includes(label)
          )
          if (matchedLabel) {
          matchedCategory = category;
          matchedType = matchedLabel;
          break;
        }
      }

      console.log("Matched Category:", matchedCategory);
      console.log("Matched Type:", matchedType);

      // when the detected label is not in the category map
      if (matchedCategory === "Uncategorized") {
        setCategoryKey("Garbage");
        setSelectedCategory("others");
      } else {
      setCategoryKey(matchedCategory);
      setSelectedCategory(matchedType);
      }
    }
  }, [route.params?.labels, labelToCategoryMap]);

  return (
    <View style={styles.container}>
      {/* Image */}
      <View
        style={styles.imageContainer}
        onTouchEnd={isEditMode ? pickImage : null}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          isEditMode && (
            <View style={styles.placeholderImage}>
              <Entypo name="camera" size={50} color="gray" />
            </View>
          )
        )}
      </View>

      {/* Trash Category*/}
      {isEditMode ? (
        <DropDownPicker
          open={openTypePicker}
          value={categoryKey}
          items={trashKey}
          setOpen={setOpenTypePicker}
          setValue={setCategoryKey}
          setItems={setTrashKey}
          placeholder="Select a type"
          style={styles.dropdown}
          containerStyle={{
            zIndex: openTypePicker ? 2000 : 1,
            marginBottom: 20,
          }}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      ) : (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Trash Category:</Text>
          <Text style={styles.value}>{categoryKey}</Text>
        </View>
      )}

      {/* Type Dropdown  */}
      {isEditMode ? (
        <DropDownPicker
          open={openCategoryPicker}
          value={selectedCategory}
          items={categories}
          setOpen={setOpenCategoryPicker}
          setValue={setSelectedCategory}
          setItems={setCategories}
          placeholder="Select a type:"
          style={styles.dropdown}
          containerStyle={{
            zIndex: openCategoryPicker ? 2000 : 1,
            marginBottom: 20,
          }}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      ) : (
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Type:</Text>
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
        textColor="black"
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
          {/* save the trash category map to database button */}
          {/* <TouchableOpacity style={styles.saveButton} onPress={() => {saveLabelToCategoryMap(labelToCategoryMap)}}>
            <Text style={styles.buttonText}>Saveeee</Text>
          </TouchableOpacity> */}
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
