import React, { useState } from "react";
import { StyleSheet, Text, View, Button, Alert } from "react-native";
import * as Notifications from "expo-notifications";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function NotificationScreen() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  // Request notification permissions
  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Notification permission is required to enable this feature."
      );
      return false;
    }
    return true;
  };

  // Schedule notifications for Wednesday and Sunday
  const scheduleWeeklyNotifications = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    // Cancel all previous notifications to avoid duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule notification for Wednesday
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Waste Sorting Reminder",
        body: "Today is Wednesday, please manage your waste at 7:30 PM!",
      },
      trigger: {
        weekday: 4, // Wednesday (1 = Sunday, 2 = Monday, ...)
        hour: 19,
        minute: 30,
        repeats: true, // Repeat every week
      },
    });

    // Schedule notification for Sunday
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Waste Sorting Reminder",
        body: "Today is Sunday, please manage your waste at 7:30 PM!",
      },
      trigger: {
        weekday: 1, // Sunday
        hour: 19,
        minute: 30,
        repeats: true, // Repeat every week
      },
    });

    Alert.alert(
      "Notifications Set",
      "You will receive reminders every Wednesday and Sunday at 7:30 PM!"
    );
  };

  // Toggle notification state
  const toggleNotification = () => {
    if (isNotificationEnabled) {
      Notifications.cancelAllScheduledNotificationsAsync();
      setIsNotificationEnabled(false);
      Alert.alert("Notifications Disabled");
    } else {
      scheduleWeeklyNotifications();
      setIsNotificationEnabled(true);
    }
  };

  // Schedule a test notification
  const scheduleTestNotification = async () => {
    const hasPermission = await requestNotificationPermission();
    if (!hasPermission) return;

    // Cancel all previous notifications to avoid duplicates
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule a notification to fire after 10 seconds
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Notification",
        body: "This is a test notification triggered after 10 seconds.",
      },
      trigger: {
        seconds: 10, // Trigger after 10 seconds
      },
    });

    Alert.alert(
      "Test Notification Scheduled",
      "A notification will appear in 10 seconds."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isNotificationEnabled
          ? "Notifications are enabled. You will receive reminders every Wednesday and Sunday at 7:30 PM."
          : "Notifications are disabled."}
      </Text>
      <Button
        title={
          isNotificationEnabled
            ? "Disable Notifications"
            : "Enable Notifications"
        }
        onPress={toggleNotification}
      />
      <Button title="Test Notification" onPress={scheduleTestNotification} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
});
