import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const ExpensesRules = () => {
  const cards = [
    {
      title: "Fuel Cost",
      value: "Rs 9500",
      description: "Best On Distance & Vehicle Mileage",
    },
    {
      title: "Toal Charges",
      value: "Rs 9500",
      description: "Best On Distance & Vehicle Mileage",
    },
    {
      title: "Toll Limit",
      value: "Rs 3500",
      description: "Best On Distance & Vehicle Mileage",
    },
    {
      title: "Other Expenses",
      value: "Rs 3500",
      description: "Best On Distance & Vehicle Mileage",
    },
  ];

  return (
    <View>
      <View className="flex-row gap-4">
        <Ionicons name="shield-checkmark-outline" size={30} color="orange" />
        <Text className="font-bold text-xl">Expenses Rules</Text>
      </View>

   

      <View className="flex-row flex-wrap justify-between px-2 p-4">
        {cards.map((item, index) => (
          <View
            key={index}
            className="bg-white w-[48%] rounded-2xl p-4 mb-4  border border-gray-500"
          >
            <Text className="text-lg text-gray-500">{item.title}</Text>

            <Text className="text-xl font-bold text-orange-500 mt-2">
              {item.value}
            </Text>
            <Text className="text-sm text-gray-600 mt-2">
              {item.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ExpensesRules;
