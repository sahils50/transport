import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

type SummaryItem = {
  id: number;
  amount: string;
  label: string;
};

const summaryData: SummaryItem[] = [
  { id: 1, amount: "₹8.45L", label: "Total Income" },
  { id: 2, amount: "₹7.45L", label: "Total Expenses" },
  { id: 3, amount: "₹1.45L", label: "Net Profit" },
];

const Performance = () => {
  return (
    <View>
      <View className="flex-row items-center gap-4">
        <View className="w-8 h-8 rounded-full  items-center justify-center">
          <Ionicons name="stats-chart-outline" size={30} color="orange" />
        </View>
        <Text className="text-xl font-semibold">Performance</Text>
      </View>

      <View className="mx-1 mt-4 rounded-2xl p-5 bg-orange-400">
        {/* Header */}
        <View className="flex-row justify-between mb-6">
          <Text className="text-white text-lg font-semibold">
            Monthly Profit Summary
          </Text>
          <Text className="text-white text-base font-medium">Nov 2024</Text>
        </View>

        {/* Amount Section using map */}
        <View className="flex-row justify-between mb-6">
          {summaryData.map((item) => (
            <View key={item.id} className="items-center w-[30%]">
              <Text className="text-white text-2xl font-bold">
                {item.amount}
              </Text>
              <Text className="text-white/90 text-sm mt-1">{item.label}</Text>
            </View>
          ))}
        </View>

        {/* Growth Box */}
        <View className="border border-white/70 rounded-2xl py-3 items-center">
          <Text className="text-white font-medium">
            Growth: +14.5% from last month
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Performance;
