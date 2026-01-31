import { View, Text, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
const ExpensesAnalysis = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (_: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  return (
    <View className="flex-row items-center justify-between pr-3 py-3 ">
      {/* Left: Icon + Title */}
      <View className="flex-row items-center gap-2">
        <View className="w-8 h-8 rounded-full  items-center justify-center">
          <Ionicons name="pie-chart" size={30} color="orange" />
        </View>
        <Text className="text-xl font-semibold">Expenses Analysis</Text>
      </View>

      {/* Right: Date + Calendar */}
      <View className="flex-row items-center gap-2">
        <Text className="text-base font-medium">{formattedDate}</Text>

        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="calendar-outline" size={22} />
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onChange}
          {...(Platform.OS === "android" && {
            accentColor: "#FB923C",
          })}
          {...(Platform.OS === "ios" && {
            textColor: "#FB923C",
          })}
        />
      )}
    </View>
  );
};

export default ExpensesAnalysis;
