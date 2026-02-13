import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type ReviewItem = {
  title: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const ReviewAndCreate: React.FC = () => {
  const review: ReviewItem[] = [
    { title: "Route", name: "Mumbai to Goa", icon: "map-outline" },
    { title: "Schedule", name: "Thu 1 Jan at 9:45 pm", icon: "time-outline" },
    { title: "Vehicle", name: "MH 11 CX 8000", icon: "car-outline" },
    { title: "Driver", name: "Rajesh Kumar", icon: "person-outline" },
    { title: "Estimated Cost", name: "Rs 16129", icon: "cash-outline" },
    { title: "Expense Limit", name: "Rs 16500", icon: "wallet-outline" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50 p-1">
      {/* Header */}
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-orange-100 p-3 rounded-full">
          <Ionicons name="clipboard-outline" size={24} color="orange" />
        </View>

        <Text className="font-bold text-2xl text-gray-800">
          Review & Create
        </Text>
      </View>

      {/* Card */}
      <View className="bg-white rounded-2xl shadow-md border border-orange-200 p-4">
        {review.map((item, index) => (
          <View
            key={index}
            className={`py-4 flex-row items-center justify-between ${
              index !== review.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            {/* Left Section */}
            <View className="flex-row items-center gap-3">
              <View className="bg-orange-100 p-2 rounded-lg">
                <Ionicons name={item.icon} size={18} color="orange" />
              </View>

              <Text className="text-lg font-semibold text-gray-700">
                {item.title}
              </Text>
            </View>

            {/* Value Badge */}
            <View className="bg-orange-50 px-3 py-1 rounded-lg border border-orange-200">
              <Text className="text-orange-700 font-bold text-base">
                {item.name}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default ReviewAndCreate;
