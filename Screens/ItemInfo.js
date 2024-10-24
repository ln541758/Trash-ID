import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useEffect } from "react";
import { Entypo } from "@expo/vector-icons";

export default function ItemInfo({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={handleEdit}>
          <Entypo name="pencil" size={24} color="black" />
        </Pressable>
      ),
    });
  }, [navigation]);

  function handleEdit() {
    navigation.navigate("ItemEditor");
  }

  return (
    <View>
      <Text>ItemInfo</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
