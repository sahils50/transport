import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const OWNER_PHONE = "+919876543210"; // 👈 replace with real number (with country code)

const SelectContactMethod: React.FC = () => {
  // Open phone dialer
  const handleCall = () => {
    Linking.openURL(`tel:${OWNER_PHONE}`);
  };

  // Open WhatsApp chat
  const handleWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${OWNER_PHONE.replace("+", "")}`;
    Linking.openURL(whatsappUrl);
  };

  return (
    <View className="flex-1 bg-white px-6 pt-16">
      {/* Title */}
      <Text className="text-lg font-semibold text-gray-800 text-center mb-6">
        Select Contact Method
      </Text>

      {/* Call Owner */}
      <TouchableOpacity
        onPress={handleCall}
        className="flex-row items-center bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-sm"
      >
        <View className="w-12 h-12 bg-orange-500 rounded-lg items-center justify-center mr-4">
          <Ionicons name="call" size={22} color="white" />
        </View>

        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800">
            Call Owner
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            Use for urgent clarification, breakdowns, or immediate decisions
          </Text>
        </View>
      </TouchableOpacity>

      {/* WhatsApp Owner */}
      <TouchableOpacity
        onPress={handleWhatsApp}
        className="flex-row items-center bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
      >
        <View className="w-12 h-12 bg-orange-500 rounded-lg items-center justify-center mr-4">
          <Ionicons name="logo-whatsapp" size={22} color="white" />
        </View>

        <View className="flex-1">
          <Text className="text-base font-semibold text-gray-800">
            WhatsApp Owner
          </Text>
          <Text className="text-xs text-gray-500 mt-1">
            Use for urgent clarification, breakdowns, or immediate decisions
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectContactMethod;
