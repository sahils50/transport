import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function TripExpenseDetailScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 pt-5 pb-16">
        {/* Trip Header */}
        <View className="mb-6">
          <View className="flex-row items-center justify-between">
            <Text className="text-2xl font-bold text-gray-900">
              Mumbai ⇄ Surat
            </Text>

            <View className="bg-red-100 px-3.5 py-1.5 rounded-full">
              <Text className="text-red-700 font-semibold text-sm">
                Over Budget
              </Text>
            </View>
          </View>

          <View className="mt-2 flex-row items-center justify-between">
            <Text className="text-base font-medium text-gray-700">
              TRP-789011 8 Feb 2025
            </Text>

            <View className="bg-red-50 px-3 py-1 rounded-full border border-red-200">
              <Text className="text-red-600 font-medium text-sm">
                ✗ Rejected
              </Text>
            </View>
          </View>
        </View>

        {/* Expenses Breakdown */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6">
          {/* Fuel */}
          <ExpenseSection
            icon="gas-station"
            label="Fuel"
            iconColor="#3b82f6"
            bgColor="bg-blue-50"
            estimated="₹5,000"
            spent="₹2,500"
            status="Bill attached"
            statusColor="text-green-700 bg-green-50"
          />

          {/* Toll */}
          <View className="border-t border-gray-100" />
          <ExpenseSection
            icon="road-variant"
            label="Toll"
            iconColor="#8b5cf6"
            bgColor="bg-purple-50"
            estimated="₹500"
            spent="₹500"
            status="View details"
            statusColor="text-blue-700 bg-blue-50"
            warning="⚠ Over limit"
            warningColor="text-amber-700"
          />

          {/* Other */}
          <View className="border-t border-gray-100" />
          <ExpenseSection
            icon="dots-horizontal"
            label="Other"
            iconColor="#f59e0b"
            bgColor="bg-amber-50"
            estimated="₹2,000"
            spent="₹2,500"
            status="No bill attached"
            statusColor="text-red-700 bg-red-50"
            warning="▲ Over limit"
            warningColor="text-red-600"
          />
        </View>

        {/* Rejection Reason */}
        <View className="bg-red-50 border border-red-200 rounded-xl p-5 mb-8">
          <View className="flex-row items-center mb-2">
            <MaterialCommunityIcons
              name="alert-circle"
              size={20}
              color="#dc2626"
            />
            <Text className="ml-2 text-red-800 font-semibold text-base">
              Owner Rejection Reason
            </Text>
          </View>
          <Text className="text-red-700 text-base leading-6">
            Other expense rejected - no bill uploaded.
          </Text>
        </View>

        {/* Re-submit Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="bg-red-600 py-4 rounded-xl items-center shadow-md"
        >
          <Text className="text-white font-semibold text-lg">
            Re-submit Expense
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// ────────────────────────────────────────────────
// Reusable Expense Row Component
// ────────────────────────────────────────────────

function ExpenseSection({
  icon,
  label,
  iconColor,
  bgColor,
  estimated,
  spent,
  status,
  statusColor,
  warning,
  warningColor,
}: {
  icon: string;
  label: string;
  iconColor: string;
  bgColor: string;
  estimated: string;
  spent: string;
  status: string;
  statusColor: string;
  warning?: string;
  warningColor?: string;
}) {
  const isOver = spent !== estimated;

  return (
    <View className="px-5 py-4">
      {/* Header row */}
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <View className={`${bgColor} p-2.5 rounded-full`}>
            <MaterialCommunityIcons
              name={"gas-station" as const}
              size={24}
              color="#000"
            />
          </View>
          <Text className="ml-3 text-lg font-semibold text-gray-900">
            {label}
          </Text>
        </View>

        {warning && (
          <Text className={`text-sm font-medium ${warningColor}`}>
            {warning}
          </Text>
        )}
      </View>

      {/* Amounts */}
      <View className="flex-row items-center justify-between mb-2.5">
        <Text className="text-2xl font-bold text-gray-900">{spent}</Text>
        <Text className="text-base text-gray-500">/{estimated}</Text>
      </View>

      {/* Status badge */}
      <View className={`${statusColor} px-3.5 py-1.5 rounded-full self-start`}>
        <Text className="text-sm font-medium">{status}</Text>
      </View>
    </View>
  );
}
