import { View, Text, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width;

export default function ProfitAnalysis() {
  return (
    <View className="border border-orange-500 rounded-3xl p-4 bg-white">
      {/* Header */}
      <View className="flex-row items-center gap-2 mb-4">
        <View className="bg-orange-100 p-2 rounded-xl">
          <Ionicons name="stats-chart" size={20} color="#f97316" />
        </View>
        <Text className="font-bold text-lg">Profit Analysis</Text>
      </View>

      {/* Bar Chart */}

      <BarChart
        data={{
          labels: ["Income", "Expense", "Profit"],
          datasets: [
            {
              data: [190000, 70000, 120000],
              colors: [
                () => "#34d399", // Income - Green
                () => "#f87171", // Expense - Red
                () => "#fb923c", // Profit - Orange
              ],
            },
          ],
        }}
        width={screenWidth - 60}
        height={220}
        fromZero
        showValuesOnTopOfBars
        withInnerLines
        withCustomBarColorFromData // ⭐ IMPORTANT
        flatColor // ⭐ IMPORTANT
        yAxisLabel="₹ "
        chartConfig={{
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: () => "#6b7280",
          labelColor: () => "#6b7280",
          barPercentage: 0.6,
        }}
        style={{
          borderRadius: 16,
        }}
      />

      {/* Bottom Cards */}
      <View className="flex-row justify-between mt-6">
        <View className="w-[48%] bg-green-50 border border-orange-200 rounded-2xl p-4">
          <Text className="text-2xl font-bold">₹1,17,150</Text>
          <Text className="text-gray-500">Net Profit</Text>
        </View>

        <View className="w-[48%] bg-orange-50 border border-orange-200 rounded-2xl p-4">
          <Text className="text-2xl font-bold">63.2%</Text>
          <Text className="text-gray-500">Profit Margin</Text>
        </View>
      </View>
    </View>
  );
}
