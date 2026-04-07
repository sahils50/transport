import React, { useState } from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const ScheduleTrip: React.FC = () => {
  const [tripType, setTripType] = useState<"single" | "round">("single");

  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);

  const formatDate = (d: Date | null) =>
    d ? `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}` : "dd-mm-yyyy";

  const formatTime = (t: Date | null) =>
    t
      ? `${t.getHours().toString().padStart(2, "0")}:${t
          .getMinutes()
          .toString()
          .padStart(2, "0")}`
      : "--:--";

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-4">
      {/* Header */}
      <View className="flex-row items-center gap-3 mb-4">
        <Ionicons name="calendar-outline" size={24} color="orange" />
        <Text className="text-xl font-bold text-gray-800">Schedule</Text>
      </View>

      {/* Date Time Section */}
      <View className="border-b border-gray-300 pb-4">
        <View className="flex-row justify-between gap-4">
          {/* Start Date */}
          <View className="flex-1">
            <Text className="text-gray-700 font-semibold mb-2">Start Date</Text>

            <TouchableOpacity
              onPress={() => setShowDate(true)}
              className="border border-gray-300 rounded-lg p-3 flex-row justify-between items-center bg-white"
            >
              <Text className="text-gray-500">{formatDate(date)}</Text>
              <Ionicons name="calendar-outline" size={18} color="gray" />
            </TouchableOpacity>
          </View>

          {/* Start Time */}
          <View className="flex-1">
            <Text className="text-gray-700 font-semibold mb-2">Start Time</Text>

            <TouchableOpacity
              onPress={() => setShowTime(true)}
              className="border border-gray-300 rounded-lg p-3 flex-row justify-between items-center bg-white"
            >
              <Text className="text-gray-500">{formatTime(time)}</Text>
              <Ionicons name="time-outline" size={18} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <Text className="text-xs text-gray-500 mt-2">
          Driver cannot start before scheduled time
        </Text>
      </View>

      {/* Pickers */}
      {showDate && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={(e, selected) => {
            setShowDate(Platform.OS === "ios");
            if (selected) setDate(selected);
          }}
        />
      )}

      {showTime && (
        <DateTimePicker
          value={time || new Date()}
          mode="time"
          display="default"
          onChange={(e, selected) => {
            setShowTime(Platform.OS === "ios");
            if (selected) setTime(selected);
          }}
        />
      )}

      {/* Trip Type Section */}
      <View className="mt-6">
        <View className="flex-row items-center gap-2 mb-3">
          <Ionicons name="swap-horizontal-outline" size={22} color="orange" />
          <Text className="text-lg font-bold text-gray-800">Trip Type</Text>
        </View>

        <View className="flex-row justify-between">
          <TouchableOpacity
            onPress={() => setTripType("single")}
            className={`w-[48%] rounded-xl p-4 border ${
              tripType === "single"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <View className="items-center">
              <View className="bg-orange-100 p-3 rounded-xl mb-2">
                <Ionicons name="arrow-forward" size={20} color="orange" />
              </View>

              <Text className="font-semibold text-gray-800">Single Trip</Text>
              <Text className="text-xs text-gray-500">One-way journey</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setTripType("round")}
            className={`w-[48%] rounded-xl p-4 border ${
              tripType === "round"
                ? "border-orange-500 bg-orange-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <View className="items-center">
              <View className="bg-orange-100 p-3 rounded-xl mb-2">
                <Ionicons name="arrow-back" size={20} color="orange" />
              </View>

              <Text className="font-semibold text-gray-800">Return Trip</Text>
              <Text className="text-xs text-gray-500">Round trip journey</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ScheduleTrip;
