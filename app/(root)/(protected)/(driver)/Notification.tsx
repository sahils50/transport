import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  type: "warning" | "success";
  actionNeeded: boolean;
};

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Fuel Bill Missing",
    message:
      "Fuel bill for yesterday's Pune → Mumbai trip is missing.\nPlease upload by end of day.",
    time: "2hrs ago",
    type: "warning",
    actionNeeded: true,
  },
  {
    id: "2",
    title: "Expense Approved",
    message:
      "Your toll expense of ₹450 has been approved by owner.\nNo action needed.",
    time: "2hrs ago",
    type: "success",
    actionNeeded: false,
  },
];

export default function Notification() {
  const [notifications] = useState(mockNotifications);

  const getCardStyles = (type: "warning" | "success") => {
    if (type === "warning") {
      return {
        bg: "bg-red-50",
        border: "border-red-200",
        title: "text-red-800",
        text: "text-red-700",
        icon: "alert-circle",
        iconColor: "#dc2626",
      };
    }
    return {
      bg: "bg-green-50",
      border: "border-green-200",
      title: "text-green-800",
      text: "text-green-700",
      icon: "checkmark-circle",
      iconColor: "#16a34a",
    };
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-5">
        {/* Header */}
        <Text className="mb-6 text-2xl font-bold text-gray-800">
          Notifications
        </Text>

        {notifications.map((notif) => {
          const styles = getCardStyles(notif.type);

          return (
            <TouchableOpacity
              key={notif.id}
              activeOpacity={0.8}
              className={`mb-4 overflow-hidden rounded-2xl border ${styles.border} ${styles.bg} shadow-sm`}
              onPress={() => {
                // Optional: navigate to details / upload screen
                console.log(`Tapped ${notif.title}`);
              }}
            >
              <View className="flex-row items-start p-4">
                {/* Icon */}
                <View className="mr-3.5 mt-1">
                  <Ionicons
                    name={styles.icon}
                    size={28}
                    color={styles.iconColor}
                  />
                </View>

                {/* Content */}
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text
                      className={`flex-1 text-base font-semibold ${styles.title}`}
                    >
                      {notif.title}
                    </Text>
                    <Text className="text-xs text-gray-500">{notif.time}</Text>
                  </View>

                  <Text className={`mt-1.5 text-sm leading-5 ${styles.text}`}>
                    {notif.message}
                  </Text>

                  {/* Optional action hint */}
                  {notif.actionNeeded && (
                    <View className="mt-3 flex-row items-center">
                      <Ionicons
                        name="arrow-forward"
                        size={14}
                        color="#dc2626"
                      />
                      <Text className="ml-1.5 text-sm font-medium text-red-600">
                        Upload bill now
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          );
        })}

        {notifications.length === 0 && (
          <View className="flex-1 items-center justify-center py-20">
            <Ionicons name="notifications-off" size={60} color="#9ca3af" />
            <Text className="mt-4 text-lg font-medium text-gray-600">
              No notifications yet
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
