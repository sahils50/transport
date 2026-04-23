import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  StatusBar,
  ActivityIndicator,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getDriverProfile } from "@/src/api/driverService";
import { handleLogout } from "@/src/context/AuthContext";

export default function ProfileScreen() {
  const {
    data: driver,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["driverProfile"],
    queryFn: getDriverProfile,
  });

  const confirmLogout = () => {
    const logoutAction = () => handleLogout();
    if (Platform.OS === "web") {
      if (window.confirm("Are you sure?")) logoutAction();
    } else {
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: logoutAction },
      ]);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (isError || !driver) {
    return (
      <View className="flex-1 justify-center items-center p-5">
        <Text className="text-gray-500 text-center">
          Failed to load profile. Please try again later.
        </Text>
      </View>
    );
  }

  // Calculate License Expiry
  const expiryDate = new Date(driver.driver_license_expiry_date);
  const isExpired = expiryDate < new Date();
  const formattedExpiry = expiryDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} className="px-5">
        {/* PROFILE HEADER CARD */}
        <View className="bg-white rounded-[30px] p-6 mt-6 shadow-sm border border-gray-100 items-center">
          <View className="w-24 h-24 rounded-full bg-orange-100 justify-center items-center border-4 border-orange-50 overflow-hidden">
            {driver.driver_profile_picture_url ? (
              <Image
                source={{ uri: driver.driver_profile_picture_url }}
                className="w-full h-full"
              />
            ) : (
              <FontAwesome name="user" size={40} color="#f97316" />
            )}
          </View>

          <Text className="text-2xl font-black text-gray-800 mt-4">
            {driver.driver_name}
          </Text>
          <Text className="text-gray-400 font-bold text-[10px] uppercase tracking-widest">
            ID: {driver.admin.business_code}-{driver.driver_id}
          </Text>

          <View className="flex-row mt-6 border-t border-gray-50 pt-6 w-full">
            <View className="flex-1 items-center border-r border-gray-100">
              <Text className="text-[10px] font-bold text-gray-400 uppercase">
                Employer
              </Text>
              <Text className="text-sm font-black text-gray-800">
                {driver.admin.business_name}
              </Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-[10px] font-bold text-gray-400 uppercase">
                Status
              </Text>
              <View className="flex-row items-center">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${driver.is_active ? "bg-green-500" : "bg-red-500"}`}
                />
                <Text className="text-sm font-black text-gray-800">
                  {driver.is_active ? "Active" : "Inactive"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* INFO SECTION */}
        <View className="mt-8">
          <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">
            Personal Details
          </Text>
          <View className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
            <InfoRow
              icon="card-outline"
              label="License Number"
              value={driver.driver_license_no}
            />
            <Divider />
            <InfoRow
              icon="call-outline"
              label="Primary Phone"
              value={driver.driver_phone_no1}
            />
            {driver.driver_phone_no2 && (
              <>
                <Divider />
                <InfoRow
                  icon="phone-portrait-outline"
                  label="Secondary Phone"
                  value={driver.driver_phone_no2}
                />
              </>
            )}
          </View>
        </View>

        {/* COMPLIANCE & LICENSE */}
        <View className="mt-8">
          <Text className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 ml-2">
            Compliance
          </Text>

          <View
            className={`rounded-3xl p-5 border flex-row items-center ${isExpired ? "bg-red-50 border-red-100" : "bg-white border-gray-100 shadow-sm"}`}
          >
            <View
              className={`p-3 rounded-2xl ${isExpired ? "bg-red-100" : "bg-orange-100"}`}
            >
              <MaterialCommunityIcons
                name="card-account-details-outline"
                size={24}
                color={isExpired ? "#ef4444" : "#f97316"}
              />
            </View>
            <View className="ml-4 flex-1">
              <Text
                className={`font-black ${isExpired ? "text-red-700" : "text-gray-800"}`}
              >
                Driving License
              </Text>
              <Text
                className={`${isExpired ? "text-red-500" : "text-gray-400"} text-xs`}
              >
                Expires: {formattedExpiry}
              </Text>
            </View>
            <View
              className={`px-3 py-1 rounded-full ${isExpired ? "bg-red-200" : "bg-green-100"}`}
            >
              <Text
                className={`text-[10px] font-bold uppercase ${isExpired ? "text-red-700" : "text-green-600"}`}
              >
                {isExpired ? "Expired" : "Valid"}
              </Text>
            </View>
          </View>
        </View>

        {/* LOGOUT BUTTON */}
        <TouchableOpacity
          onPress={confirmLogout}
          className="mt-10 mb-12 bg-white border border-red-100 rounded-[24px] p-5 flex-row justify-center items-center shadow-sm"
        >
          <MaterialCommunityIcons name="logout" size={20} color="#ef4444" />
          <Text className="text-red-500 font-black text-lg ml-3">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center p-4">
      <View className="bg-gray-50 p-2 rounded-xl">
        <Ionicons name={icon} size={20} color="#6b7280" />
      </View>
      <View className="ml-4">
        <Text className="text-[10px] font-bold text-gray-400 uppercase">
          {label}
        </Text>
        <Text className="text-base font-bold text-gray-800">{value}</Text>
      </View>
    </View>
  );
}

function Divider() {
  return <View className="h-[1px] bg-gray-50 mx-4" />;
}
