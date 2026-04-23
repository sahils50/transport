import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";

interface TripTypeProps {
  value: string;
  onUpdate: (type: string) => void;
}

const Triptype = ({ value, onUpdate }: TripTypeProps) => {
  return (
    <View className="bg-white rounded-[24px] p-5 mt-4 shadow-sm border border-gray-100">
      <View className="flex-row gap-3 items-center mb-4">
        <View className="bg-orange-100 p-2 rounded-xl">
          <Fontisto name="arrow-swap" size={18} color="#F78231" />
        </View>
        <Text className="text-lg font-black text-gray-800">Trip Type</Text>
      </View>

      <View className="flex-row gap-4">
        {/* SINGLE TRIP */}
        <TouchableOpacity
          activeOpacity={0.7}
          className={`flex-1 flex-row justify-center gap-2 rounded-2xl px-4 py-4 items-center border
            ${value === "single" ? "bg-orange-50 border-orange-500" : "bg-gray-50 border-gray-100"}`}
          onPress={() => onUpdate("single")}
        >
          <Fontisto
            name="arrow-right-l"
            size={16}
            color={value === "single" ? "#F78231" : "#9ca3af"}
          />
          <Text
            className={`font-bold ${value === "single" ? "text-orange-600" : "text-gray-500"}`}
          >
            One Way
          </Text>
        </TouchableOpacity>

        {/* RETURN TRIP */}
        <TouchableOpacity
          activeOpacity={0.7}
          className={`flex-1 flex-row justify-center gap-2 rounded-2xl px-4 py-4 items-center border
            ${value === "return" ? "bg-orange-50 border-orange-500" : "bg-gray-50 border-gray-100"}`}
          onPress={() => onUpdate("return")}
        >
          <Fontisto
            name="arrow-h"
            size={16}
            color={value === "return" ? "#F78231" : "#9ca3af"}
          />
          <Text
            className={`font-bold ${value === "return" ? "text-orange-600" : "text-gray-500"}`}
          >
            Round Trip
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Triptype;
