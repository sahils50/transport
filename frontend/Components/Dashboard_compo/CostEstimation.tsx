import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const CostEstimation = () => {
  const costestimation = [
    { title: "Fuel Cost", value: "Rs 9500" },
    { title: "Toll Charges", value: "Rs 9500" },
    { title: "Other Expenses", value: "Rs 9500" },
  ];

  return (
    <SafeAreaView className="flex-1 ">
      {/* Header */}
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-orange-100 p-2 rounded-full">
          <Ionicons name="calculator" size={26} color="orange" />
        </View>
        <Text className="font-bold text-2xl text-gray-800">
          Cost Estimation
        </Text>
      </View>

      {/* Card */}
      <View className="bg-white rounded-2xl shadow-sm border border-orange-200 p-4">
        {costestimation.map((item, index) => (
          <View
            key={index}
            className={`py-4 flex-row justify-between items-center ${
              index !== costestimation.length - 1
                ? "border-b border-gray-200"
                : ""
            }`}
          >
            <Text className="text-lg font-semibold text-gray-700">
              {item.title}
            </Text>

            <View className="bg-orange-100 px-3 py-1 rounded-lg">
              <Text className="text-orange-700 font-bold text-lg">
                {item.value}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View className="p-1 mt-6">
        <View className="border-2 border-orange-500 gap-2 p-3 rounded-xl justify-center items-center border-b-[5px] border-b-orange-500">
          <Text className="text-xl font-semibold">Estimated Trip Costs</Text>
          <Text className="font-bold text-xl text-orange-500">RS 16,275</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CostEstimation;
