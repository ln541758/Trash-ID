import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import Notif from "../Components/Notif";

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null); // User's current location
  const [searchQuery, setSearchQuery] = useState(""); // Keyword entered in search bar
  const [searchResults, setSearchResults] = useState([]); // Google Places API results

  const GOOGLE_PLACES_API_KEY = process.env.EXPO_PUBLIC_mapsApiKey; // Replace with your API key

  // Request location permissions and get the user's current location
  useEffect(() => {
    requestUserLocation();
  }, []);

  const requestUserLocation = async () => {
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
  };

  // Search for places using Google Places API
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Error", "Please enter a search query.");
      return;
    }

    if (!location) {
      Alert.alert("Error", "Current location not available.");
      return;
    }

    const { latitude, longitude } = location;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&keyword=${searchQuery}&key=${GOOGLE_PLACES_API_KEY}`;

    try {
      const response = await axios.get(url);
      const places = response.data.results;

      if (places.length === 0) {
        Alert.alert("No Results", "No places found for your search.");
        return;
      }

      // Map the API response to markers
      const results = places.map((place) => ({
        id: place.place_id,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        title: place.name,
      }));

      setSearchResults(results);
    } catch (error) {
      console.error("Error fetching places:", error);
      Alert.alert("Error", "Failed to fetch places. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Search bar and notification button */}
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Enter location"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} // Trigger search when pressing Enter
        />
        <Notif navigation={navigation} />
      </View>

      {/* Map */}
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
        >
          {/* User's current location with a blue marker */}
          <Marker
            coordinate={location}
            title="You are here"
            pinColor="orange" // Custom color for "My Location" marker
          />

          {/* Display search results with red markers */}
          {searchResults.map((result) => (
            <Marker
              key={result.id}
              coordinate={{
                latitude: result.latitude,
                longitude: result.longitude,
              }}
              title={result.title}
              pinColor="red" // Custom color for search result markers
            />
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#f0f0f0",
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 10,
  },
  map: {
    flex: 1,
    width: "100%",
  },
});
