import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { handleLogout } from "@/src/context/AuthContext";
import { getAdminProfile } from "@/src/api/ownerService";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/src/store/useAuthStore";

const confirmLogout = () => {
  Alert.alert("Logout", "Are you sure you want to log out?", [
    { text: "Cancel", style: "cancel" },
    { text: "Logout", style: "destructive", onPress: handleLogout },
  ]);
};
export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);
  const token = useAuthStore((state) => state.token);
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: getAdminProfile,
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="mt-2 text-gray-500">Loading Profile...</Text>
      </View>
    );
  }

  if (error) {
    console.log(error);

    return (
      <View className="flex-1 justify-center items-center p-4">
        <Text className="text-red-500 text-center">
          Failed to load profile. Please try again.
        </Text>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          className="mt-4 bg-orange-500 p-2 rounded"
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4">
      {/* Profile Header Card */}
      <View className="bg-white rounded-2xl p-5 mt-8 shadow-sm flex-row items-center justify-between">
        {/* Left Side (Profile Info) */}
        <View className="flex-row items-center">
          <View className="w-20 h-20 rounded-full bg-orange-500 justify-center items-center shadow-md">
            <FontAwesome name="user" size={36} color="white" />
          </View>

          <View className="ml-4">
            <Text className="text-2xl font-bold text-gray-800">
              {profile?.admin_name}
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Business Code : {profile?.business_code}
            </Text>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity
          onPress={() => router.push("/(root)/(protected)/(owner)/EditProfile")}
          className="bg-orange-100 p-2 rounded-full"
        >
          <FontAwesome name="edit" size={18} color="#f97316" />
        </TouchableOpacity>
      </View>

      {/* Personal Information Card */}
      <View className="bg-white rounded-2xl p-5 mt-6 shadow-sm">
        <Text className="text-lg font-semibold text-gray-800 mb-4">
          Personal Information
        </Text>

        {[
          { label: "Full Name", value: profile?.admin_name },
          { label: "Phone Number", value: profile?.phone_no },
          { label: "Email", value: profile?.email_address },
          { label: "Business Name", value: profile?.business_name },
        ].map((item, index) => (
          <View key={index} className="py-3 border-b border-gray-200">
            <Text className="text-sm text-gray-500">{item.label}</Text>
            <Text className="text-base font-medium text-gray-800 mt-1">
              {isLoading ? "..." : item.value || "Not Provided"}
            </Text>
          </View>
        ))}

        {/* Password Row */}
        <View className="py-3 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-gray-500">Password</Text>
            <Text className="text-base font-medium text-gray-800 mt-1">
              {showPassword ? "MyPassword123" : "************"}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="p-2"
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6B7280"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={confirmLogout}
        className="mt-8 mb-10 bg-red-500 rounded-xl p-4 shadow-md active:opacity-80"
      >
        <View className="flex-row justify-center items-center">
          <FontAwesome name="sign-out" size={20} color="white" />
          <Text className="text-white text-base font-semibold ml-2">
            Logout
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
