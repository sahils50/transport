import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
const router = useRouter();
type TripStatus = "scheduled" | "in-progress";
export default function DriverHome() {
  const [status, setStatus] = useState<TripStatus>("scheduled");

  const handleStartTrip = () => setStatus("in-progress");
  const handleEndTrip = () => setStatus("scheduled");
  // TODO: Integrate with backend
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="flex-1 px-5 pt-6 pb-12">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Today's Trips
          </Text>
          <View className="flex-row items-center mt-1.5">
            <View className="bg-green-100 px-3.5 py-1 rounded-full">
              <Text className="text-green-700 font-medium text-sm">
                Scheduled
              </Text>
            </View>
          </View>
        </View>

        {/* Main Trip Card */}
        <View className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden mb-7">
          {/* Header gradient + route */}
          <LinearGradient
            colors={["#eff6ff", "#dbeafe"]}
            className="px-5 pt-5 pb-4"
          >
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center flex-1">
                <View className="bg-blue-100 p-3 rounded-full">
                  <Ionicons name="location-sharp" size={26} color="#2563eb" />
                </View>
                <View className="ml-3.5 flex-1">
                  <Text className="text-xl font-semibold text-gray-900">
                    Pune → Mumbai
                  </Text>
                  <Text className="text-sm text-gray-600 mt-0.5">
                    Single Trip
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-xs text-gray-500">Today</Text>
                <Text className="text-base font-medium text-gray-800 mt-0.5">
                  08:00 AM
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Content changes based on status */}
          {status === "scheduled" ? (
            <ScheduledContent onStart={handleStartTrip} />
          ) : (
            <InProgressContent onEnd={handleEndTrip} />
          )}
        </View>
        <ExpenseSummary status={status} />
      </View>
    </ScrollView>
  );
}
function ExpenseRow({
  icon,
  label,
  estimated,
  spent,
  color,
  bg,
}: {
  icon: string;
  label: string;
  estimated: string;
  spent: number;
  color: string;
  bg: string;
}) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center flex-1">
        <View className={`${bg} p-2.5 rounded-full`}>
          <MaterialCommunityIcons
            name={icon}
            size={20}
            color={color.replace("text-", "#")}
          />
        </View>
        <Text className="ml-3.5 text-base font-medium text-gray-800">
          {label}
        </Text>
      </View>

      <View className="items-end">
        <Text className={`text-sm font-medium ${color}`}>{estimated}</Text>
        <Text className="text-xs text-gray-500 mt-0.5">
          Spent: ₹{spent.toLocaleString()}
        </Text>
      </View>
    </View>
  );
}
function ScheduledContent({ onStart }: { onStart: () => void }) {
  return (
    <View className="px-5 py-5 space-y-5 border-t border-gray-100">
      <DetailRow icon="car-outline" label="Vehicle" value="MH12 AB 1234" />
      <DetailRow
        icon="calendar-clock"
        label="Schedule Time"
        value="Today, 08:00 AM"
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onStart}
        className="bg-orange-500 py-4 rounded-xl items-center shadow-md mt-3"
      >
        <Text className="text-white font-semibold text-lg">Start Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

function InProgressContent({ onEnd }: { onEnd: () => void }) {
  return (
    <View className="px-5 py-5 space-y-6 border-t border-gray-100">
      {/* Fake mini map stub */}
      <View className="h-44 bg-blue-50 rounded-xl overflow-hidden relative justify-center items-center border border-blue-200">
        <Text className="text-blue-700 text-sm font-medium">
          Route Map Placeholder
        </Text>
        <View className="absolute bottom-3 left-3 bg-white/80 px-3 py-1.5 rounded-lg">
          <Text className="text-xs font-medium text-gray-800">On Route</Text>
        </View>
      </View>

      {/* Stats row */}
      <View className="flex-row justify-between px-2">
        <StatItem label="Covered" value="62 km" />
        <StatItem label="Remaining" value="62 km" />
        <StatItem label="Time" value="2h 29m" />
      </View>

      <View className="flex-row items-center justify-center bg-green-50 py-2.5 rounded-lg">
        <MaterialCommunityIcons name="circle" size={14} color="#16a34a" />
        <Text className="ml-2 text-green-800 font-medium">
          Current Status: On Route
        </Text>
      </View>

      {/* Quick Actions */}
      <View className="flex-row justify-around pt-2 pb-4 border-t border-gray-100">
        <ActionButton
          onPress={() => router.push("/AddExpense")}
          icon="plus-circle-outline"
          label="Add Expense"
        />
        <ActionButton
          onPress={() => router.push("/ContactOwner")}
          icon="phone-outline"
          label="Contact Owner"
        />
      </View>

      {/* End Trip Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onEnd}
        className="bg-red-600 py-4 rounded-xl items-center shadow-md"
      >
        <Text className="text-white font-semibold text-lg">End Trip</Text>
      </TouchableOpacity>
    </View>
  );
}

/* ────────────────────────────────────────────── */

function ExpenseSummary({ status }: { status: TripStatus }) {
  const isInProgress = status === "in-progress";

  return (
    <View className="bg-white rounded-2xl shadow-sm border border-gray-200/60 overflow-hidden">
      <View className="bg-amber-50 px-5 py-4 border-b border-amber-100">
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="currency-inr"
            size={22}
            color="#92400e"
          />
          <Text className="ml-2.5 text-lg font-semibold text-amber-900">
            Trip Expense Summary
          </Text>
        </View>
      </View>

      <View className="p-5 space-y-6">
        <ExpenseBar
          label="Fuel"
          spent={5200}
          total={5000}
          color="bg-blue-500"
        />
        <ExpenseBar
          label="Toll"
          spent={1800}
          total={800}
          color="bg-purple-500"
        />
        <ExpenseBar
          label="Other"
          spent={1300}
          total={1000}
          color="bg-amber-500"
        />

        {/* Summary totals */}
        <View className="pt-4 border-t border-gray-200 space-y-2">
          <TotalRow label="Total Allowed" value="₹7,800" />
          <TotalRow label="Total Spent" value="₹7,300" isOver />
          <TotalRow label="Remaining" value="₹500" />

          {isInProgress && (
            <View className="mt-3 bg-red-50 p-3 rounded-lg">
              <Text className="text-red-800 text-sm font-medium text-center">
                This expense exceeds the total budget ₹500
              </Text>
              <Text className="text-red-700 text-xs mt-1 text-center">
                This will be sent to owner for approval
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

function ExpenseBar({
  label,
  spent,
  total,
  color,
}: {
  label: string;
  spent: number;
  total: number;
  color: string;
}) {
  const percent = Math.min((spent / total) * 100, 120); // cap at 120% for visual
  const over = spent > total;

  return (
    <View>
      <View className="flex-row justify-between mb-1.5">
        <Text className="text-base font-medium text-gray-800">{label}</Text>
        <Text
          className={`text-sm font-medium ${over ? "text-red-600" : "text-gray-700"}`}
        >
          ₹{spent.toLocaleString()}/{total.toLocaleString()}
        </Text>
      </View>
      <View className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
        <View
          className={`h-full ${color} ${over ? "bg-red-500" : ""}`}
          style={{ width: `${percent}%` }}
        />
      </View>
    </View>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View className="items-center">
      <Text className="text-xl font-bold text-gray-900">{value}</Text>
      <Text className="text-xs text-gray-600 mt-1">{label}</Text>
    </View>
  );
}

function ActionButton({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="items-center"
    >
      <MaterialCommunityIcons name={icon} size={28} color="#4b5563" />
      <Text className="text-sm text-gray-700 mt-1.5">{label}</Text>
    </TouchableOpacity>
  );
}
function DetailRow({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <View className="flex-row items-center">
      <MaterialCommunityIcons name={icon} size={22} color="#4b5563" />
      <View className="ml-3.5">
        <Text className="text-sm text-gray-500">{label}</Text>
        <Text className="text-base font-medium text-gray-800 mt-0.5">
          {value}
        </Text>
      </View>
    </View>
  );
}

function TotalRow({
  label,
  value,
  isOver = false,
}: {
  label: string;
  value: string;
  isOver?: boolean;
}) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-base text-gray-700">{label}</Text>
      <Text
        className={`text-base font-medium ${isOver ? "text-red-600" : "text-gray-900"}`}
      >
        {value}
      </Text>
    </View>
  );
}
