import { View, Text, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function ExpenseBreakdown() {
  const data = [
    {
      name: "Fuel",
      amount: 40000,
      color: "#34d399", // green
      legendFontColor: "#374151",
      legendFontSize: 12,
    },
    {
      name: "Toll",
      amount: 15000,
      color: "#60a5fa", // blue
      legendFontColor: "#374151",
      legendFontSize: 12,
    },
    {
      name: "Other",
      amount: 13000,
      color: "#a78bfa", // purple
      legendFontColor: "#374151",
      legendFontSize: 12,
    },
  ];

  return (
    <View className="border border-orange-500 rounded-3xl p-4 bg-white mt-6">
      {/* Header */}
      <View className="flex-row items-center gap-2 mb-4">
        <View className="bg-orange-100 p-2 rounded-xl">
          <Ionicons name="pie-chart" size={20} color="#f97316" />
        </View>
        <Text className="font-bold text-lg">Expense Breakdown</Text>
      </View>

      {/* Pie Chart */}
      <PieChart
        data={data}
        width={screenWidth - 60}
        height={200}
        chartConfig={{
          color: () => "#000",
        }}
        accessor={"amount"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
        absolute
      />

      {/* Details Cards */}
      <View className="gap-3 mt-4">
        {/* Fuel */}
        <View className="flex-row justify-between items-center bg-orange-50 p-3 rounded-2xl">
          <View className="flex-row items-center gap-3">
            <View className="bg-green-100 p-2 rounded-xl">
              <MaterialIcons
                name="local-gas-station"
                size={20}
                color="#10b981"
              />
            </View>
            <View>
              <Text className="font-semibold">Fuel</Text>
              <Text className="text-gray-500 text-xs">58% of total</Text>
            </View>
          </View>
          <Text className="font-bold">₹40k</Text>
        </View>

        {/* Toll */}
        <View className="flex-row justify-between items-center bg-orange-50 p-3 rounded-2xl">
          <View className="flex-row items-center gap-3">
            <View className="bg-blue-100 p-2 rounded-xl">
              <MaterialIcons name="toll" size={20} color="#3b82f6" />
            </View>
            <View>
              <Text className="font-semibold">Toll</Text>
              <Text className="text-gray-500 text-xs">22% of total</Text>
            </View>
          </View>
          <Text className="font-bold">₹15k</Text>
        </View>

        {/* Other */}
        <View className="flex-row justify-between items-center bg-orange-50 p-3 rounded-2xl">
          <View className="flex-row items-center gap-3">
            <View className="bg-purple-100 p-2 rounded-xl">
              <MaterialIcons
                name="miscellaneous-services"
                size={20}
                color="#8b5cf6"
              />
            </View>
            <View>
              <Text className="font-semibold">Other</Text>
              <Text className="text-gray-500 text-xs">20% of total</Text>
            </View>
          </View>
          <Text className="font-bold">₹13k</Text>
        </View>
      </View>
    </View>
  );
}
