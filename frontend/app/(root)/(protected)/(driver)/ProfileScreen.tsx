import { FontAwesome } from "@expo/vector-icons"; // For icons like user, check, lock
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
} from "react-native";
import { handleLogout } from "@/src/context/AuthContext";

export default function ProfileScreen() {
  const confirmLogout = () => {
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure you want to log out?")) {
        handleLogout();
      }
    } else {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: handleLogout },
      ]);
    }
  };

  return (
    <ScrollView className="flex-1 px-4">
      {/* Header */}
      <View className="flex-row items-center mt-8">
        <View className="w-16 h-16 rounded-full bg-orange-500 justify-center items-center shadow-md">
          <FontAwesome name="user" size={32} color="white" />
        </View>
        <View className="ml-4">
          <Text className="text-xl font-bold text-gray-800">Ramesh Kumar</Text>
          <Text className="text-sm text-gray-500">Driver ID: DRV-789012</Text>
        </View>
      </View>

      {/* Personal Information Section */}
      <Text className="text-lg font-semibold text-gray-800 mt-8">
        Personal Information
      </Text>
      <View className="mt-2">
        <Text className="text-sm text-gray-500">Full Name</Text>
        <View className="border-b border-gray-300 py-2">
          <Text className="text-base text-gray-800">Ramesh Kumar</Text>
        </View>
        <Text className="text-xs text-gray-400 mt-1">As per government ID</Text>
      </View>
      <View className="mt-4">
        <Text className="text-sm text-gray-500">Phone Number</Text>
        <View className="border-b border-gray-300 py-2">
          <Text className="text-base text-gray-800">+91 92764 73833</Text>
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-sm text-gray-500">Alternate Phone Number</Text>
        <View className="border-b border-gray-300 py-2">
          <Text className="text-base text-gray-800">+91 82764 73833</Text>
        </View>
      </View>

      {/* License Status Section */}
      <Text className="text-lg font-semibold text-gray-800 mt-8">
        License Status
      </Text>
      <View className="mt-2 bg-orange-100 rounded-lg p-3 flex-row items-center">
        <FontAwesome name="id-card" size={24} color="orange" />
        {/* Approximation for driving license icon */}
        <Text className="ml-2 text-base text-gray-800">Driving License</Text>
        <View className="ml-auto flex-row items-center">
          <FontAwesome name="check-circle" size={20} color="green" />
          <Text className="ml-1 text-green-600 font-medium">Valid</Text>
        </View>
      </View>
      <View className="mt-4 bg-red-100 border border-red-300 rounded-lg p-3">
        <Text className="text-red-600 font-bold text-base">
          ! License Expired
        </Text>
        <Text className="text-red-600 text-sm mt-1">
          Your license has expired. You cannot start trips until renewed.
        </Text>
      </View>
      <View className="mt-4 bg-yellow-100 border border-yellow-300 rounded-lg p-3 flex-row items-start">
        <FontAwesome name="lock" size={20} color="orange" />
        <Text className="ml-2 text-sm text-gray-700 flex-1">
          This is a read-only work profile. All information is employer managed.
          Contact employer for any changes or corrections.
        </Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={confirmLogout}
        className="mt-auto mb-8 bg-red-500 rounded-lg p-4 shadow-md"
      >
        <View className="flex-row justify-center items-center">
          <FontAwesome name="sign-out" size={20} color="white" />
          <Text className="text-white text-base font-bold ml-2">Logout</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
