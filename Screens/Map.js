import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function Map() {
  const [location, setLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);

  // Function to request location permission and get current location
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Location permission is required to use this feature."
      );
      return;
    }

    const userLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: userLocation.coords.latitude,
      longitude: userLocation.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setMapVisible(true); // Show the map after getting location
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>Show My Location</Text>
      </TouchableOpacity>

      {mapVisible && location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          <Marker coordinate={location} title="You are here" />
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
  },
});
