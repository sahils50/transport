import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

interface ScheduleProps {
  startDate: Date | null;
  endDate: Date | null;
  onUpdate: (
    key: "scheduled_start_at" | "scheduled_end_at",
    value: Date,
  ) => void;
}

const TripSchedule = ({ startDate, endDate, onUpdate }: ScheduleProps) => {
  const [activeField, setActiveField] = useState<"start" | "end" | null>(null);
  const [mode, setMode] = useState<"date" | "time">("date");

  const formatDateTime = (date: Date | null) => {
    if (!date) return "Select date & time";
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const onChange = (_: any, selected?: Date) => {
    if (!selected) {
      setActiveField(null);
      return;
    }

    if (mode === "date") {
      // Step 1: Set Date
      const current =
        (activeField === "start" ? startDate : endDate) || new Date();
      const newDate = new Date(current);
      newDate.setFullYear(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate(),
      );

      onUpdate(
        activeField === "start" ? "scheduled_start_at" : "scheduled_end_at",
        newDate,
      );

      // Step 2: Switch to Time
      if (Platform.OS === "android") {
        setMode("time"); // Android needs explicit state switch to show second picker
      } else {
        setMode("time");
      }
    } else {
      // Step 3: Set Time
      const current =
        (activeField === "start" ? startDate : endDate) || new Date();
      const newDate = new Date(current);
      newDate.setHours(selected.getHours(), selected.getMinutes());

      onUpdate(
        activeField === "start" ? "scheduled_start_at" : "scheduled_end_at",
        newDate,
      );
      setActiveField(null);
      setMode("date"); // Reset for next use
    }
  };

  return (
    <View className="bg-white rounded-[24px] p-5 mt-4 shadow-sm border border-gray-100">
      <View className="flex-row gap-3 items-center mb-6">
        <View className="bg-orange-100 p-2 rounded-xl">
          <Fontisto name="date" size={18} color="#F78231" />
        </View>
        <Text className="text-lg font-black text-gray-800">Trip Schedule</Text>
      </View>

      <View className="space-y-4">
        {/* START DATE */}
        <View>
          <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">
            Departure
          </Text>
          <TouchableOpacity
            className="flex-row items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4"
            onPress={() => {
              setActiveField("start");
              setMode("date");
            }}
          >
            <FontAwesome5 name="calendar-alt" size={16} color="#F78231" />
            <Text
              className={`font-bold ${startDate ? "text-gray-800" : "text-gray-400"}`}
            >
              {formatDateTime(startDate)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* END DATE */}
        <View className="mt-4">
          <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">
            Expected Arrival
          </Text>
          <TouchableOpacity
            className="flex-row items-center gap-3 bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4"
            onPress={() => {
              setActiveField("end");
              setMode("date");
            }}
          >
            <FontAwesome5 name="calendar-alt" size={16} color="#F78231" />
            <Text
              className={`font-bold ${endDate ? "text-gray-800" : "text-gray-400"}`}
            >
              {formatDateTime(endDate)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeField && (
        <DateTimePicker
          value={(activeField === "start" ? startDate : endDate) || new Date()}
          mode={mode}
          is24Hour={false}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default TripSchedule;
