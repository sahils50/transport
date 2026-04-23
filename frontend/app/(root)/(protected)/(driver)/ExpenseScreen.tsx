import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getDriverExpenses } from "@/src/api/driverService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExpenseScreen() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["driverExpenses"],
    queryFn: () => getDriverExpenses(1, 20),
  });
  const expenses = data?.data || [];
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 pt-4 pb-2">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <View className="bg-orange-100 p-2 rounded-xl">
              <MaterialCommunityIcons
                name="wallet-outline"
                size={22}
                color="#f97316"
              />
            </View>
            <Text className="ml-3 text-xl font-black text-gray-900">
              My Expenses
            </Text>
          </View>
          <Text className="text-gray-400 font-bold text-xs bg-gray-200 px-3 py-1 rounded-full">
            {data?.pagination?.total_records || 0} Total
          </Text>
        </View>
      </View>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.expense_id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        ListEmptyComponent={
          <View className="items-center mt-20">
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              size={48}
              color="#d1d5db"
            />
            <Text className="text-gray-400 mt-4 font-bold">
              No expenses found
            </Text>
          </View>
        }
        renderItem={({ item }) => <ExpenseCard expense={item} />}
      />
    </SafeAreaView>
  );
}
function ExpenseCard({ expense }: { expense: any }) {
  const router = useRouter();
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "fuel":
        return { name: "gas-station", color: "#ef4444", bg: "bg-red-50" };
      case "toll":
        return { name: "bridge", color: "#3b82f6", bg: "bg-blue-50" };
      default:
        return {
          name: "dots-horizontal-circle",
          color: "#8b5cf6",
          bg: "bg-purple-50",
        };
    }
  };
  const config = getIcon(expense.expense_type);
  const formattedDate = new Date(expense.created_at).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
    },
  );
  const statusStyles: any = {
    pending: "bg-amber-100 text-amber-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => router.push(`/ExpenseDetails?id=${expense.expense_id}`)}
      className="bg-white rounded-3xl p-4 mb-4 shadow-sm border border-gray-100"
    >
      <View className="flex-row items-center">
        <View className={`${config.bg} p-4 rounded-2xl`}>
          <MaterialCommunityIcons
            name={config.name as any}
            size={24}
            color={config.color}
          />
        </View>
        <View className="flex-1 ml-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Text className="text-gray-400 text-[10px] font-black uppercase tracking-tighter">
                {expense.trip.trip_code} • {formattedDate}
              </Text>
              <Text className="text-gray-900 font-black text-lg capitalize">
                {expense.expense_type} Expense
              </Text>
            </View>
            <Text className="text-gray-900 font-black text-lg">
              ₹{parseFloat(expense.expense_amount).toLocaleString("en-IN")}
            </Text>
          </View>
          {/* TRIP NAME & STATUS */}
          <View className="flex-row justify-between items-center mt-3">
            <View className="flex-row items-center">
              <FontAwesome5 name="route" size={10} color="#9ca3af" />
              <Text
                className="text-gray-500 text-xs ml-1 font-medium italic"
                numberOfLines={1}
              >
                {expense.trip.trip_name}
              </Text>
            </View>
            <View
              className={`${statusStyles[expense.status] || "bg-gray-100"} px-3 py-1 rounded-full`}
            >
              <Text className="text-[10px] font-black uppercase tracking-widest">
                {expense.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
