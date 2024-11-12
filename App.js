import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Categories from "./Screens/Categories";
import ItemList from "./Screens/ItemList";
import ItemInfo from "./Screens/ItemInfo";
import Notification from "./Screens/Notification";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./Screens/Home";
import ItemEditor from "./Screens/ItemEditor";

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Catalog" component={Categories} />
        <Stack.Screen name="ItemList" component={ItemList} />
        <Stack.Screen name="ItemInfo" component={ItemInfo} />
        <Stack.Screen name="ItemEditor" component={ItemEditor} />
        <Stack.Screen name="Notification" component={Notification} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
