import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
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
  const [selectedMarker, setSelectedMarker] = useState(null); // Selected marker for additional info

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
  const handleSearch = async (query) => {
    const finalQuery = query.trim(); // Use the passed query directly
    if (!finalQuery) {
      Alert.alert("Error", "Please enter a search query.");
      return;
    }

    if (!location) {
      Alert.alert("Error", "Current location not available.");
      return;
    }

    const { latitude, longitude } = location;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&keyword=${finalQuery}&key=${GOOGLE_PLACES_API_KEY}`;

    try {
      const response = await axios.get(url);
      const places = response.data.results;

      if (places.length === 0) {
        Alert.alert("No Results", "No places found for your search.");
        return;
      }

      const results = places.map((place) => ({
        id: place.place_id,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
        title: place.name,
        openNow: place.opening_hours?.open_now ? "Open" : "Closed",
        categories: "Recycling",
      }));

      setSearchResults(results); // Update the search results
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
          onChangeText={setSearchQuery} // Update the search query
        />
        <TouchableOpacity
          style={styles.searchButton}
          onPress={() => handleSearch(searchQuery)}
        >
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        <Notif navigation={navigation} />
      </View>

      {/* Map */}
      {location && (
        <MapView
          style={styles.map}
          initialRegion={location}
          showsUserLocation={true}
        >
          {/* User's current location */}
          <Marker coordinate={location} title="You are here" pinColor="blue" />

          {/* Display search results */}
          {searchResults.map((result) => (
            <Marker
              key={result.id}
              coordinate={{
                latitude: result.latitude,
                longitude: result.longitude,
              }}
              title={result.title}
              pinColor="red"
              onPress={() => {
                console.log("Selected Marker:", result);
                setSelectedMarker(result);
              }}
            />
          ))}
        </MapView>
      )}

      {/* Bottom Information Box */}
      {selectedMarker && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>{selectedMarker.title}</Text>
          <Text style={styles.infoText}>Open: {selectedMarker.openNow}</Text>
          <Text style={styles.infoText}>
            Categories of Waste Accepted: {selectedMarker.categories}
          </Text>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() =>
              navigation.navigate("ItemList", {
                category: selectedMarker.categories
              })
            }
          >
            <Text style={styles.linkButtonText}>Go to Item List</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setSelectedMarker(null)} // Close the info box
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
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
  infoBox: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 15,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
  },
  linkButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  linkButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 14,
    color: "#333",
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    marginRight: 20,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
