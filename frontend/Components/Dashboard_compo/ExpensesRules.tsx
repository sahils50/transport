import React, { useState } from "react";
import { View, Text, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

type Card = {
  title: string;
  value: string;
  description: string;
};

const ExpensesRules: React.FC = () => {
  const cards: Card[] = [
    {
      title: "Fuel Cost",
      value: "Rs 9500",
      description: "Based on distance & vehicle mileage",
    },
    {
      title: "Toll Charges",
      value: "Rs 9500",
      description: "Based on route toll estimation",
    },
    {
      title: "Toll Limit",
      value: "Rs 3500",
      description: "Maximum allowed toll spending",
    },
    {
      title: "Other Expenses",
      value: "Rs 3500",
      description: "Miscellaneous trip expenses",
    },
  ];

  const [allowExtra, setAllowExtra] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center gap-3 px-4 pt-4">
        <View className="bg-orange-100 p-2 rounded-full">
          <Ionicons name="shield-checkmark-outline" size={22} color="orange" />
        </View>
        <Text className="font-bold text-2xl text-gray-800">Expenses Rules</Text>
      </View>

      {/* Cards Grid */}
      <View className="flex-row flex-wrap justify-between px-4 mt-4">
        {cards.map((item, index) => (
          <View
            key={index}
            className="bg-white w-[48%] rounded-2xl p-4 mb-4 shadow-sm border border-gray-200"
          >
            <Text className="text-sm text-gray-500">{item.title}</Text>

            <Text className="text-xl font-bold text-orange-500 mt-1">
              {item.value}
            </Text>

            <Text className="text-xs text-gray-600 mt-2">
              {item.description}
            </Text>
          </View>
        ))}
      </View>

      {/* Bottom Setting Section */}
      <View className="px-4 mt-4">
        <View className="bg-gray-200 rounded-xl p-4 flex-row justify-between items-center">
          <View className="flex-1 pr-3">
            <Text className="font-semibold text-base text-gray-800">
              Allow Extra Expenses
            </Text>

            <Text className="text-gray-500 text-sm mt-1">
              Let driver spend beyond limits (with alert)
            </Text>
          </View>

          <Switch
            value={allowExtra}
            onValueChange={setAllowExtra}
            trackColor={{ false: "#cbd5e1", true: "#22c55e" }}
            thumbColor="#ffffff"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ExpensesRules;
