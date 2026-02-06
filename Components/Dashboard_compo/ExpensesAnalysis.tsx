import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
} from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type StatItem = {
  id: number;
  amount: number;
  label: string;
};

const stats: StatItem[] = [
  { id: 1, amount: 7500, label: "Fuel Cost" },
  { id: 2, amount: 4500, label: "Other Expenses" },
  { id: 3, amount: 4500, label: "Total Expenses" },
  { id: 4, amount: 4500, label: "Today's Income" },
];

const ExpensesAnalysis = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [activeTab, setActiveTab] = useState("Today");

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
    <ScrollView>
      <SafeAreaView>
        <View>
          <View className="p-2 bg-white rounded-2xl border border-gray-300 shadow-md shadow-black/30 ">
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

            <View className="flex-row justify-end mt-3 mb-3 px-4">
              <View className="flex-row gap-3">
                {["Today", "Week", "Month"].map((tab) => {
                  const isActive = activeTab === tab;

                  return (
                    <TouchableOpacity
                      key={tab}
                      onPress={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl  ${
                        isActive
                          ? "bg-orange-500 border-orange-500"
                          : "bg-white border-orange-300"
                      }`}
                    >
                      <Text
                        className={`font-semibold ${
                          isActive ? "text-white" : "text-orange-500"
                        }`}
                      >
                        {tab}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            <View className="p-4 ">
              <View className="flex-row flex-wrap justify-between">
                {stats.map((item) => (
                  <View
                    key={item.id}
                    className="bg-gray-100 rounded-xl p-4 shadow mb-3 w-[48%] border"
                  >
                    <Text className="text-2xl font-bold">₹ {item.amount}</Text>
                    <Text className="text-gray-600">{item.label}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>

          <View
            className="mt-4 bg-green-50 rounded-2xl overflow-hidden
             border border-green-500
             shadow-lg shadow-black/25 elevation-6"
          >
            {/* Top Section */}
            <View className="p-3 gap-3">
              {[
                { label: "Expected Expenses", value: "₹ 12,000" },
                { label: "Actual Expenses", value: "₹ 10,500" },
                { label: "Variance", value: "₹ 1,500" },
              ].map((item, index) => (
                <View key={index} className="flex-row justify-between">
                  <Text className="text-gray-700 font-medium">
                    {item.label}
                  </Text>
                  <Text className="text-green-900 font-bold">{item.value}</Text>
                </View>
              ))}
            </View>

            {/* Bottom Bar */}
            <View className="bg-green-200 p-4 flex-row justify-between border-t border-green-400">
              <View className="w-[48%]">
                <Text className="font-semibold text-green-900">
                  Today’s Profit
                </Text>
                <Text className="text-lg text-green-800 font-bold">
                  ₹ 3,000
                </Text>
              </View>

              <View className="w-[48%] items-end">
                <Text className="text-green-900 font-semibold">
                  Profit Margin
                </Text>
                <Text className="text-lg font-bold text-green-800">28%</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default ExpensesAnalysis;
