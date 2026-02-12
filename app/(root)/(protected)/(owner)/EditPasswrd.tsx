import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function ChangePassword() {
  const router = useRouter();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 px-4">
      {/* Header */}
      <View className="mt-10 mb-6">
        <Text className="text-2xl font-bold text-gray-800">
          Change Password
        </Text>
        <Text className="text-sm text-gray-500 mt-1">
          Please enter your password details
        </Text>
      </View>

      {/* Card */}
      <View className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Current Password */}
        <View className="mb-5">
          <Text className="text-sm text-gray-500 mb-1">Current Password</Text>

          <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
            <TextInput
              value={form.currentPassword}
              secureTextEntry={!showCurrent}
              onChangeText={(text) => handleChange("currentPassword", text)}
              placeholder="Enter current password"
              className="flex-1 py-3 text-base"
            />

            <TouchableOpacity onPress={() => setShowCurrent(!showCurrent)}>
              <Ionicons
                name={showCurrent ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* New Password */}
        <View className="mb-5">
          <Text className="text-sm text-gray-500 mb-1">New Password</Text>

          <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
            <TextInput
              value={form.newPassword}
              secureTextEntry={!showNew}
              onChangeText={(text) => handleChange("newPassword", text)}
              placeholder="Enter new password"
              className="flex-1 py-3 text-base"
            />

            <TouchableOpacity onPress={() => setShowNew(!showNew)}>
              <Ionicons
                name={showNew ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View>
          <Text className="text-sm text-gray-500 mb-1">
            Confirm New Password
          </Text>

          <View className="flex-row items-center border border-gray-300 rounded-lg px-3">
            <TextInput
              value={form.confirmPassword}
              secureTextEntry={!showConfirm}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              placeholder="Confirm new password"
              className="flex-1 py-3 text-base"
            />

            <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
              <Ionicons
                name={showConfirm ? "eye-off-outline" : "eye-outline"}
                size={22}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => router.push("/")}
          className="mt-4"
        >
          <Text className="text-orange-500 font-medium text-right">
            Forgot Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Update Button */}
      <TouchableOpacity className="mt-8 bg-orange-500 rounded-xl p-4 shadow-md active:opacity-80">
        <View className="flex-row justify-center items-center">
          <Ionicons name="lock-closed-outline" size={20} color="white" />
          <Text className="text-white text-base font-semibold ml-2">
            Update Password
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}
