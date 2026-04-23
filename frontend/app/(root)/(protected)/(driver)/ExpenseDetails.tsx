import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getExpenseDetail } from "@/src/api/driverService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TripExpenseDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const {
    data: expense,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["expenseDetail", id],
    queryFn: () => getExpenseDetail(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  if (isError || !expense) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500 font-bold">Expense not found.</Text>
      </View>
    );
  }
  const limitKey = `${expense.expense_type}_limit` as keyof typeof expense.trip;
  const limitValue = expense.trip[limitKey] || 0;
  const isOverBudget = Number(expense.expense_amount) > Number(limitValue);
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-5 pb-16">
          {/* Header Section */}
          <View className="mb-6">
            <View className="flex-row items-center justify-between">
              <Text className="text-2xl font-black text-gray-900 flex-1 mr-2">
                {expense.trip.origin_name} ➔ {expense.trip.destination_name}
              </Text>
              <View
                className={`${isOverBudget ? "bg-red-100" : "bg-green-100"} px-3 py-1.5 rounded-full`}
              >
                <Text
                  className={`${isOverBudget ? "text-red-700" : "text-green-700"} font-bold text-[10px] uppercase`}
                >
                  {isOverBudget ? "Over Budget" : "Within Budget"}
                </Text>
              </View>
            </View>
            <View className="mt-3 flex-row items-center justify-between">
              <View>
                <Text className="text-gray-400 font-bold text-xs uppercase tracking-tighter">
                  {expense.trip.trip_code} •{" "}
                  {new Date(expense.created_at).toLocaleDateString()}
                </Text>
              </View>
              <StatusBadge status={expense.status} />
            </View>
          </View>

          {/* Main Card */}
          <View className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden mb-6">
            <View className="p-6">
              <View className="flex-row items-center mb-6">
                <View className="bg-orange-100 p-4 rounded-2xl">
                  <MaterialCommunityIcons
                    name={
                      expense.expense_type === "fuel" ? "gas-station" : "bridge"
                    }
                    size={28}
                    color="#f97316"
                  />
                </View>
                <View className="ml-4">
                  <Text className="text-gray-400 font-bold text-xs uppercase">
                    {expense.expense_type} Amount
                  </Text>
                  <Text className="text-3xl font-black text-gray-900">
                    ₹
                    {parseFloat(expense.expense_amount).toLocaleString("en-IN")}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between bg-gray-50 p-4 rounded-2xl">
                <View>
                  <Text className="text-gray-400 text-[10px] font-bold uppercase">
                    Payment Mode
                  </Text>
                  <Text className="text-gray-800 font-bold uppercase">
                    {expense.payment_mode}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-gray-400 text-[10px] font-bold uppercase">
                    Limit Set
                  </Text>
                  <Text className="text-gray-800 font-bold">
                    ₹{limitValue.toLocaleString("en-IN")}
                  </Text>
                </View>
              </View>

              {expense.notes && (
                <View className="mt-6">
                  <Text className="text-gray-400 text-[10px] font-bold uppercase mb-1">
                    Driver Notes
                  </Text>
                  <Text className="text-gray-700 italic">
                    "{expense.notes}"
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Receipt Image Section */}
          <View className="mb-6">
            <Text className="text-gray-400 font-black text-[10px] uppercase tracking-widest ml-2 mb-3">
              Proof of Expense
            </Text>
            {expense.bill_url ? (
              <View className="bg-white p-2 rounded-[32px] border border-gray-100 shadow-sm">
                <Image
                  source={{ uri: expense.bill_url }}
                  className="w-full h-64 rounded-[24px]"
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View className="bg-gray-100 rounded-[32px] p-10 items-center border border-dashed border-gray-300">
                <MaterialCommunityIcons
                  name="image-off-outline"
                  size={40}
                  color="#9ca3af"
                />
                <Text className="text-gray-400 font-bold mt-2">
                  No Receipt Uploaded
                </Text>
              </View>
            )}
          </View>

          {/* Rejection/Review Logic */}
          {expense.status === "rejected" && (
            <View className="bg-red-50 border border-red-100 rounded-[24px] p-5 mb-8">
              <View className="flex-row items-center mb-2">
                <MaterialCommunityIcons
                  name="alert-circle"
                  size={20}
                  color="#ef4444"
                />
                <Text className="ml-2 text-red-700 font-black">
                  Rejection Reason
                </Text>
              </View>
              <Text className="text-red-600 font-medium leading-5">
                {expense.review_notes ||
                  "Bill was not clear or missing information. Please re-upload with a proper receipt."}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          {expense.status === "rejected" && (
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-orange-500 py-5 rounded-[24px] items-center shadow-lg shadow-orange-200"
            >
              <Text className="text-white font-black text-lg">
                Fix & Re-submit
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

  function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    pending: "bg-amber-100 border-amber-200 text-amber-700",
    approved: "bg-green-100 border-green-200 text-green-700",
    rejected: "bg-red-100 border-red-200 text-red-700",
  };

  return (
    <View className={`${styles[status]} px-3 py-1 rounded-full border`}>
      <Text className="text-[10px] font-black uppercase tracking-widest">
        {status}
      </Text>
    </View>
  );
}
