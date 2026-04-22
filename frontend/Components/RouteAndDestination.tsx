import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { Feather, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";

interface RouteProps {
  originName: string;
  destinationName: string;
  onUpdate: (key: string, value: string) => void;
}

const RouteAndDestination = ({
  originName,
  destinationName,
  onUpdate,
}: RouteProps) => {
  // Track which field is focused for better UI feedback
  const [activeField, setActiveField] = useState<string | null>(null);

  return (
    <View className="bg-white rounded-[24px] p-5 mt-4 shadow-sm border border-gray-100">
      {/* SECTION HEADER */}
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-orange-100 p-2 rounded-xl">
          <FontAwesome5 name="route" size={18} color="#F78231" />
        </View>
        <Text className="text-lg font-black text-gray-800">Route Details</Text>
      </View>

      {/* FROM / ORIGIN */}
      <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">
        Pickup Location (Origin)
      </Text>
      <View
        className={`flex-row items-center rounded-2xl px-4 py-3 bg-gray-50 border ${
          activeField === "origin"
            ? "border-orange-500 bg-white"
            : "border-gray-100"
        }`}
      >
        <Feather
          name="map-pin"
          size={18}
          color="#F78231"
          style={{ marginRight: 12 }}
        />
        <TextInput
          value={originName}
          onChangeText={(text) => onUpdate("origin_name", text)}
          onFocus={() => setActiveField("origin")}
          onBlur={() => setActiveField(null)}
          placeholder="e.g. Mumbai Main Office"
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-gray-800 font-bold"
        />
      </View>

      {/* CONNECTING LINE UI (Visual improvement) */}
      <View className="ml-6 my-1 w-[2px] h-4 bg-orange-200" />

      {/* TO / DESTINATION */}
      <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">
        Drop-off Location (Destination)
      </Text>
      <View
        className={`flex-row items-center rounded-2xl px-4 py-3 bg-gray-50 border ${
          activeField === "destination"
            ? "border-orange-500 bg-white"
            : "border-gray-100"
        }`}
      >
        <FontAwesome6
          name="location-crosshairs"
          size={18}
          color="#F78231"
          style={{ marginRight: 12 }}
        />
        <TextInput
          value={destinationName}
          onChangeText={(text) => onUpdate("destination_name", text)}
          onFocus={() => setActiveField("destination")}
          onBlur={() => setActiveField(null)}
          placeholder="e.g. North Warehouse, Pune"
          placeholderTextColor="#9CA3AF"
          className="flex-1 text-gray-800 font-bold"
        />
      </View>
    </View>
  );
};

export default RouteAndDestination;
