import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const [showPassword, setShowPassword] = useState(false);

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
              Ramesh Kumar
            </Text>
            <Text className="text-sm text-gray-500 mt-1">
              Business Code : RG-1234
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
          { label: "Full Name", value: "Ramesh Kumar" },
          { label: "Phone Number", value: "+91 92764 73833" },
          { label: "Alternate Phone Number", value: "+91 82764 73833" },
          { label: "Email", value: "ramesh@gmail.com" },
          { label: "Business Name", value: "Rahul Logistics" },
        ].map((item, index) => (
          <View key={index} className="py-3 border-b border-gray-200">
            <Text className="text-sm text-gray-500">{item.label}</Text>
            <Text className="text-base font-medium text-gray-800 mt-1">
              {item.value}
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
      <TouchableOpacity className="mt-8 mb-10 bg-red-500 rounded-xl p-4 shadow-md active:opacity-80">
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
