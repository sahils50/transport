import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ExpenseScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 pt-5 pb-12">
        {/* Current Trip Section */}
        <View className="mb-8">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="truck-fast"
              size={22}
              color="#f97316"
            />
            <Text className="ml-2 text-xl font-bold text-gray-900">
              Current Trip
            </Text>
          </View>

          <View className="bg-white rounded-2xl shadow-sm border border-gray-200/70 overflow-hidden">
            {/* Top row - route + status */}
            <View className="px-5 pt-5 pb-3 flex-row items-center justify-between border-b border-gray-100">
              <View className="flex-row items-center flex-1">
                <Text className="text-xl font-semibold text-gray-900">
                  Mumbai ⇄ Surat
                </Text>
              </View>

              <View className="bg-green-100 px-3 py-1 rounded-full">
                <Text className="text-green-700 font-medium text-sm">
                  Within budget
                </Text>
              </View>
            </View>

            {/* Trip ID & Date */}
            <View className="px-5 py-3 border-b border-gray-100">
              <Text className="text-base font-medium text-gray-800">
                TRIP-789011 01-12-2025
              </Text>
            </View>

            {/* Amount + Pending status */}
            <View className="px-5 py-4 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-900">₹7,800</Text>

              <View className="flex-row items-center bg-amber-100 px-3 py-1.5 rounded-full">
                <MaterialCommunityIcons
                  name="alert-circle-outline"
                  size={18}
                  color="#d97706"
                />
                <Text className="ml-1.5 text-amber-800 font-medium text-sm">
                  Pending
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Past Trips Section */}
        <View>
          <View className="flex-row items-center mb-4">
            <MaterialCommunityIcons name="history" size={22} color="#4b5563" />
            <Text className="ml-2 text-xl font-bold text-gray-900">
              Past Trips
            </Text>
          </View>

          <View className="space-y-4">
            {/* Past Trip 1 - Within budget, Approved */}
            <PastTripCard
              route="Mumbai ⇄ Surat"
              tripId="TRIP-789011"
              date="1 Mar 2025"
              budgetStatus="Within budget"
              budgetColor="bg-green-100 text-green-700"
              approvalStatus="Approved"
              approvalColor="bg-green-100 text-green-700"
              amount="₹7,800"
            />

            {/* Past Trip 2 - Over budget, Approved */}
            <PastTripCard
              route="Mumbai → Surat"
              tripId="TRIP-789011"
              date="10-12 Feb 2025"
              budgetStatus="Over budget"
              budgetColor="bg-orange-100 text-orange-700"
              approvalStatus="Approved"
              approvalColor="bg-green-100 text-green-700"
              amount="₹7,800"
            />

            {/* Past Trip 3 - Over budget, Rejected */}
            <PastTripCard
              route="Mumbai → Surat"
              tripId="TRIP-789011"
              date="8 Feb 2025"
              budgetStatus="Over budget"
              budgetColor="bg-orange-100 text-orange-700"
              approvalStatus="Rejected"
              approvalColor="bg-red-100 text-red-700"
              amount="₹7,800"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

function PastTripCard({
  route,
  tripId,
  date,
  budgetStatus,
  budgetColor,
  approvalStatus,
  approvalColor,
  amount,
}: {
  route: string;
  tripId: string;
  date: string;
  budgetStatus: string;
  budgetColor: string;
  approvalStatus: string;
  approvalColor: string;
  amount: string;
}) {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/ExpenseDetails`);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={handlePress}
      className="mb-4" // spacing between cards
    >
      <View className="bg-white rounded-2xl shadow-sm border border-gray-200/70 overflow-hidden">
        {/* Top row - route + budget status */}
        <View className="px-5 pt-5 pb-3 flex-row items-center justify-between border-b border-gray-100">
          <Text className="text-lg font-semibold text-gray-900">{route}</Text>

          <View className={`${budgetColor} px-3 py-1 rounded-full`}>
            <Text className="text-sm font-medium">{budgetStatus}</Text>
          </View>
        </View>

        {/* Trip ID & Date */}
        <View className="px-5 py-3 border-b border-gray-100">
          <Text className="text-base font-medium text-gray-800">
            {tripId} {date}
          </Text>
        </View>

        {/* Amount + Approval status */}
        <View className="px-5 py-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-gray-900">{amount}</Text>

          <View className={`${approvalColor} px-3 py-1.5 rounded-full`}>
            <Text className="text-sm font-medium">
              {approvalStatus === "Approved" ? "✓ Approved" : "✗ Rejected"}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
