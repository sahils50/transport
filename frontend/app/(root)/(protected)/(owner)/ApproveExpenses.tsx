import React, { useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getExpensesForReview,
  updateExpenseStatus,
} from "@/src/api/ownerService";

const ApproveExpenses = () => {
  const queryClient = useQueryClient();

  // 1. Fetch Data
  const {
    data: apiResponse,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["expenses-review"],
    queryFn: getExpensesForReview,
  });

  // 2. Mutation for Approval/Rejection
  const mutation = useMutation({
    mutationFn: updateExpenseStatus,
    onSuccess: () => {
      // Refresh list after successful action
      queryClient.invalidateQueries({ queryKey: ["expenses-review"] });
      Alert.alert("Success", "Expense status updated.");
    },
    onError: () => {
      Alert.alert("Error", "Failed to update expense. Please try again.");
    },
  });

  // 3. Stats Calculation
  const stats = useMemo(() => {
    const list = apiResponse?.data || [];
    return {
      pending: list.filter((e: any) => e.status === "pending").length,
      approved: list.filter((e: any) => e.status === "paid").length,
      rejected: list.filter((e: any) => e.status === "rejected").length,
      totalPendingAmount: list
        .filter((e: any) => e.status === "pending")
        .reduce((sum: number, e: any) => sum + parseFloat(e.expense_amount), 0),
    };
  }, [apiResponse]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="p-4"
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {/* HEADER */}
        <View className="flex-row items-center justify-between bg-white rounded-3xl p-5 shadow-sm border border-orange-100">
          <View className="flex-1">
            <Text className="text-xl font-black text-gray-900">
              Expense Review
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              Manage driver submissions
            </Text>
          </View>
          <View className="bg-orange-50 p-3 rounded-2xl">
            <MaterialCommunityIcons
              name="clipboard-check-outline"
              size={24}
              color="#f97316"
            />
          </View>
        </View>

        {/* STATS ROW */}
        <View className="flex-row justify-between mt-6">
          <StatBox
            label="Pending"
            count={stats.pending}
            color="text-orange-500"
            bg="bg-orange-50"
          />
          <StatBox
            label="Approved"
            count={stats.approved}
            color="text-green-600"
            bg="bg-green-50"
          />
          <StatBox
            label="Rejected"
            count={stats.rejected}
            color="text-red-500"
            bg="bg-red-50"
          />
        </View>

        {/* LIST SECTION */}
        <View className="mt-8 mb-10">
          <View className="flex-row justify-between items-end mb-4 px-1">
            <Text className="font-black text-lg text-gray-800">
              Pending Queue
            </Text>
            <Text className="font-bold text-sm text-orange-600">
              Total: ₹{stats.totalPendingAmount.toFixed(2)}
            </Text>
          </View>

          {apiResponse?.data?.map((item: any) => (
            <ExpenseCard
              key={item.expense_id}
              item={item}
              onAction={(id: number, status) => mutation.mutate({ id, status })}
              isProcessing={mutation.isPending}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper Components
const StatBox = ({ label, count, color, bg }: any) => (
  <View
    className={`w-[31%] ${bg} rounded-2xl py-4 items-center border border-white shadow-sm`}
  >
    <Text className={`text-2xl font-black ${color}`}>{count}</Text>
    <Text className="text-[10px] font-bold text-gray-500 uppercase">
      {label}
    </Text>
  </View>
);

const ExpenseCard = ({ item, onAction, isProcessing }: any) => {
  const isPending = item.status === "pending";

  return (
    <View className="bg-white rounded-[24px] p-5 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row justify-between">
        <View className="flex-1">
          <Text className="font-black text-gray-900 text-base">
            {item.driver?.driver_name}
          </Text>
          <Text className="text-gray-400 text-xs font-bold uppercase">
            {item.trip?.trip_name}
          </Text>
        </View>
        <Text className="font-black text-lg text-gray-900">
          ₹{item.expense_amount}
        </Text>
      </View>

      <View className="flex-row items-center mt-3">
        <View className="bg-gray-100 px-2 py-1 rounded-md mr-2">
          <Text className="text-[10px] font-bold text-gray-600 uppercase">
            {item.expense_type}
          </Text>
        </View>
        <Text className="text-[10px] text-gray-400 font-bold">
          {item.payment_mode.toUpperCase()}
        </Text>
      </View>

      <View className="flex-row items-center justify-between mt-5 pt-4 border-t border-gray-50">
        <Text className="text-[10px] text-gray-400 font-bold">
          {new Date(item.created_at).toLocaleDateString()}
        </Text>

        {isPending ? (
          <View className="flex-row gap-x-2">
            <TouchableOpacity
              disabled={isProcessing}
              onPress={() => onAction(item.expense_id, "rejected")}
              className="bg-red-50 h-10 w-10 items-center justify-center rounded-xl border border-red-100"
            >
              <Feather name="x" size={18} color="#ef4444" />
            </TouchableOpacity>

            <TouchableOpacity
              disabled={isProcessing}
              onPress={() => onAction(item.expense_id, "paid")}
              className="bg-green-600 px-4 h-10 items-center justify-center rounded-xl"
            >
              <Text className="text-white font-bold text-xs">Approve</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            className={`px-3 py-1 rounded-lg ${item.status === "paid" ? "bg-green-50" : "bg-red-50"}`}
          >
            <Text
              className={`text-[10px] font-black uppercase ${item.status === "paid" ? "text-green-700" : "text-red-700"}`}
            >
              {item.status === "paid" ? "Approved" : item.status}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ApproveExpenses;
