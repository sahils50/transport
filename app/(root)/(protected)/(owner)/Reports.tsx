import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ReportsScreen() {
  const [active, setActive] = useState("Today");

  const filters = ["Today", "This Week", "This Month"];

  const cards = [
    { title: "Total Income", value: "₹ 1.9 L", icon: "cash-outline" },
    { title: "Total Expenses", value: "₹ 85 K", icon: "card-outline" },
    { title: "Net Profit", value: "₹ 1.05 L", icon: "trending-up-outline" },
    { title: "Trips Completed", value: "128", icon: "car-outline" },
  ];

  return (
    <View className="flex-1 bg-orange-50 p-4">
      {/* Title */}
      <Text className="text-2xl font-bold text-gray-800 mb-4">Reports</Text>

      {/* Filter Buttons */}
      <View className="flex-row justify-between bg-white p-2 rounded-xl shadow-sm">
        {filters.map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setActive(item)}
            className={`flex-1 py-2 mx-1 rounded-lg ${
              active === item ? "bg-orange-500" : "bg-gray-100"
            }`}
          >
            <Text
              className={`text-center font-medium ${
                active === item ? "text-white" : "text-gray-600"
              }`}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content Area */}
      <View className="mt-6">
        <Text className="text-gray-600">Showing {active} reports.</Text>
        <View className="flex-row flex-wrap justify-between gap-y-4 p-4">
          {cards.map((item, index) => (
            <View
              key={index}
              className="flex-row items-center bg-white p-4 rounded-2xl shadow border border-orange-400 w-[48%]"
            >
              {/* Icon */}
              <View className="bg-orange-100 p-3 rounded-xl mr-3">
                <Ionicons name={item.icon as any} size={26} color="#f97316" />
              </View>

              {/* Text */}
              <View>
                <Text className="text-lg font-bold text-black">
                  {item.value}
                </Text>
                <Text className="text-gray-500">{item.title}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
