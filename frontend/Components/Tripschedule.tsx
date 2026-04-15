import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { useState } from "react";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const TripSchedule = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [activeField, setActiveField] = useState<
    "start" | "end" | null
  >(null);

  const [mode, setMode] = useState<"date" | "time">("date");

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const openPicker = (field: "start" | "end") => {
    setActiveField(field);
    setMode("date");
  };

  const onChange = (_: any, selected?: Date) => {
    if (!selected) {
      setActiveField(null);
      return;
    }

    if (mode === "date") {
      const base =
        activeField === "start" ? startDate : endDate;

      const newDate = base ? new Date(base) : new Date();

      newDate.setFullYear(
        selected.getFullYear(),
        selected.getMonth(),
        selected.getDate()
      );

      activeField === "start"
        ? setStartDate(newDate)
        : setEndDate(newDate);

      setMode("time");
    } else {
      const base =
        activeField === "start" ? startDate : endDate;

      if (!base) return;

      const newDate = new Date(base);
      newDate.setHours(
        selected.getHours(),
        selected.getMinutes()
      );

      activeField === "start"
        ? setStartDate(newDate)
        : setEndDate(newDate);

      setActiveField(null);
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 mt-4">
      {/* HEADER */}
      <View className="flex-row gap-2 items-center mb-2">
        <Fontisto name="date" size={22} color="#F78231" />
        <Text className="text-lg font-semibold text-gray-600">
          Trip Schedule
        </Text>
      </View>

      <View className="flex-row gap-4">
        {/* START DATE & TIME */}
        <View className="flex-1">
          <Text className="text-md font-medium mt-3 mb-2">
            Start Date & Time
          </Text>

          <TouchableOpacity
            className="flex-row items-center gap-2 bg-gray-100 rounded-lg px-4 py-3"
            onPress={() => openPicker("start")}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="calendar-alt"
              size={16}
              color="#F78231"
            />
            <Text className="text-gray-700 text-sm font-medium">
              {startDate
                ? formatDateTime(startDate)
                : "Select start date & time"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* END DATE & TIME */}
        <View className="flex-1">
          <Text className="text-md font-medium mt-3 mb-2">
            End Date & Time
          </Text>

          <TouchableOpacity
            className="flex-row items-center gap-2 bg-gray-100 rounded-lg px-4 py-3"
            onPress={() => openPicker("end")}
            activeOpacity={0.7}
          >
            <FontAwesome5
              name="calendar-alt"
              size={16}
              color="#F78231"
            />
            <Text className="text-gray-700 text-sm font-medium">
              {endDate
                ? formatDateTime(endDate)
                : "Select end date & time"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DATE TIME PICKER */}
      {activeField && (
        <DateTimePicker
          value={
            activeField === "start"
              ? startDate || new Date()
              : endDate || new Date()
          }
          mode={mode}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default TripSchedule;
