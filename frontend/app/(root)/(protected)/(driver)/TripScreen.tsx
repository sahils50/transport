import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
// Integrate with backend
export default function TripsScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 pt-5 pb-10">
        {/* Current Trip Card */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 mb-3">
            Current Trip
          </Text>

          <View className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
            {/* Header row */}
            <View className="flex-row items-center justify-between px-5 pt-5 pb-3 bg-gradient-to-r from-orange-50 to-orange-100">
              <View className="flex-row items-center flex-1">
                <MaterialCommunityIcons
                  name="truck-fast"
                  size={28}
                  color="#f97316"
                />
                <Text className="ml-3 text-xl font-semibold text-gray-900">
                  Mumbai ⇄ Surat
                </Text>
              </View>
              <Text className="text-base font-bold text-emerald-700">
                ₹5,800 / ₹6,800
              </Text>
            </View>

            {/* Details */}
            <View className="px-5 py-4 space-y-3 border-t border-gray-100">
              <DetailRow
                icon="card-text-outline"
                label="TRIP-901"
                value=""
                bold
              />
              <DetailRow
                icon="calendar-clock"
                label="Start Time"
                value="15 Mar, 08:00 am"
              />
              <DetailRow
                icon="clock-outline"
                label="Expected"
                value="17 Mar, 08:00 am"
              />

              <View className="flex-row items-center justify-between pt-2">
                <View className="bg-green-100 px-3 py-1.5 rounded-full">
                  <Text className="text-green-700 font-medium text-sm">
                    Within Budget
                  </Text>
                </View>

                <View className="bg-orange-100 px-3 py-1.5 rounded-full">
                  <Text className="text-orange-700 font-medium text-sm">
                    Delayed by 2 days
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Past Trips Section */}
        <View>
          <Text className="text-xl font-bold text-gray-900 mb-3">
            Past Trips
          </Text>

          {/* Tabs */}
          <View className="flex-row bg-white rounded-xl overflow-hidden border border-gray-200 mb-4 shadow-sm">
            {["All", "Completed", "Delayed", "Cancelled"].map((tab) => (
              <TouchableOpacity
                key={tab}
                activeOpacity={0.7}
                className="flex-1 py-3 items-center"
              >
                <Text
                  className={`text-sm font-medium ${
                    tab === "All" ? "text-orange-600" : "text-gray-600"
                  }`}
                >
                  {tab}
                </Text>
                {tab === "All" && (
                  <View className="w-10 h-1 bg-orange-500 mt-1.5 rounded-full" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Trip List */}
          <View className="space-y-4">
            <PastTripCard
              route="Mumbai → Surat"
              tripId="TRIP-78901"
              date="12 Mar 2025"
              status="Cancelled"
              statusColor="bg-red-100 text-red-700"
            />

            <PastTripCard
              route="Mumbai → Surat"
              tripId="TRIP-78901"
              date="10 Mar 2025"
              status="Completed"
              statusColor="bg-green-100 text-green-700"
              expense="₹8,800 / ₹7,800"
              overBudget
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function DetailRow({
  icon,
  label,
  value,
  bold = false,
}: {
  icon: string;
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View className="flex-row items-start">
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color="#6b7280"
        className="mt-0.5"
      />
      <View className="ml-3 flex-1">
        <Text className="text-sm text-gray-500">{label}</Text>
        <Text
          className={`text-base ${bold ? "font-semibold" : "font-medium"} text-gray-900 mt-0.5`}
        >
          {value || "—"}
        </Text>
      </View>
    </View>
  );
}

function PastTripCard({
  route,
  tripId,
  date,
  status,
  statusColor,
  expense,
  overBudget = false,
}: {
  route: string;
  tripId: string;
  date: string;
  status: string;
  statusColor: string;
  expense?: string;
  overBudget?: boolean;
}) {
  return (
    <View className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <MaterialCommunityIcons name="truck" size={22} color="#4b5563" />
          <Text className="ml-3 text-lg font-semibold text-gray-900">
            {route}
          </Text>
        </View>

        <View className={`px-3 py-1 rounded-full ${statusColor}`}>
          <Text className="text-sm font-medium">{status}</Text>
        </View>
      </View>

      <View className="mt-3 space-y-1.5">
        <Text className="text-sm text-gray-600">{tripId}</Text>
        <Text className="text-sm text-gray-500">{date}</Text>

        {expense && (
          <View className="flex-row items-center mt-2">
            <MaterialCommunityIcons
              name="currency-inr"
              size={18}
              color="#4b5563"
            />
            <Text
              className={`ml-1.5 text-base font-medium ${
                overBudget ? "text-red-600" : "text-gray-900"
              }`}
            >
              Expense: {expense}
            </Text>
            {overBudget && (
              <Text className="ml-2 text-xs text-red-600 font-medium">
                Over budget
              </Text>
            )}
          </View>
        )}
      </View>
    </View>
  );
}
