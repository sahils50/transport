import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";
import ExpenseBreakdown from "./ExpenseBreakdown";
import ProfitAnalysis from "./ProfitAnalysis";

// 1. REUSABLE SUMMARY CARD
const SummaryCard = ({ title, value, icon, color }: any) => (
  <View className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-[48%] mb-4">
    <View className={`self-start p-2 rounded-lg mb-2 ${color}`}>
      <Ionicons name={icon} size={20} color="#f97316" />
    </View>
    <Text className="text-xl font-extrabold text-gray-900">{value}</Text>
    <Text className="text-gray-400 text-[11px] font-bold uppercase tracking-wider">
      {title}
    </Text>
  </View>
);

export default function ReportsScreen() {
  const [activeFilter, setActiveFilter] = useState("Today");
  const filters = ["Today", "This Week", "This Month"];

  // Placeholder for Integration
  // const { data: reports, isLoading } = useQuery({
  //   queryKey: ['reports', activeFilter],
  //   queryFn: () => getReports(activeFilter)
  // });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* HEADER SECTION */}
        <View className="px-4 mt-4">
          <Text className="text-2xl font-black text-gray-900">
            Financial Reports
          </Text>
          <Text className="text-gray-400 text-sm">
            Overview of your fleet performance
          </Text>

          {/* FILTER TABS */}
          <View className="flex-row mt-6 bg-gray-100 p-1 rounded-2xl">
            {filters.map((item) => (
              <TouchableOpacity
                key={item}
                onPress={() => setActiveFilter(item)}
                className={`flex-1 py-3 rounded-xl ${
                  activeFilter === item ? "bg-white shadow-sm" : ""
                }`}
              >
                <Text
                  className={`text-center font-bold text-xs ${
                    activeFilter === item ? "text-orange-600" : "text-gray-500"
                  }`}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* SUMMARY GRID */}
        <View className="flex-row flex-wrap justify-between px-4 mt-8">
          <SummaryCard
            title="Total Income"
            value="₹ 1.9 L"
            icon="cash-outline"
            color="bg-green-50"
          />
          <SummaryCard
            title="Expenses"
            value="₹ 85 K"
            icon="card-outline"
            color="bg-red-50"
          />
          <SummaryCard
            title="Net Profit"
            value="₹ 1.05 L"
            icon="trending-up-outline"
            color="bg-orange-50"
          />
          <SummaryCard
            title="Total Trips"
            value="128"
            icon="car-outline"
            color="bg-blue-50"
          />
        </View>

        {/* ANALYTICS SECTION */}
        <View className="px-4 gap-y-6">
          <View className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm">
            <ProfitAnalysis />
          </View>

          <View className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm">
            <ExpenseBreakdown />
          </View>
        </View>

        {/* EXPORT SECTION */}
        <View className="mx-4 mt-8 p-6 bg-gray-900 rounded-[32px]">
          <View className="flex-row items-center mb-6">
            <View className="bg-gray-800 p-3 rounded-2xl">
              <Feather name="download" size={24} color="#f97316" />
            </View>
            <View className="ml-4">
              <Text className="text-white font-bold text-lg">Export Data</Text>
              <Text className="text-gray-400 text-xs">
                Download detailed financial logs
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between gap-x-3">
            <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-800 py-4 rounded-2xl border border-gray-700">
              <MaterialIcons name="picture-as-pdf" size={18} color="#ef4444" />
              <Text className="text-white font-bold ml-2 text-xs">PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-gray-800 py-4 rounded-2xl border border-gray-700">
              <MaterialIcons name="table-chart" size={18} color="#16a34a" />
              <Text className="text-white font-bold ml-2 text-xs">Excel</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity className="mt-4 bg-orange-500 py-4 rounded-2xl items-center">
            <Text className="text-white font-black uppercase tracking-widest text-xs">
              Generate Full Report
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
