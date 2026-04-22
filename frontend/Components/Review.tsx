import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { View, Text } from "react-native";

type ReviewProps = {
  data: {
    origin_name: string;
    destination_name: string;
    scheduled_start_at: Date | null;
    driver_name?: string;
    vehicle_number?: string;
    total_limit: number;
  };
};

export default function Review({ data }: ReviewProps) {
  const isReady =
    data.origin_name &&
    data.destination_name &&
    data.driver_name &&
    data.vehicle_number;

  if (!isReady) return null;

  return (
    <View className="bg-white rounded-[24px] p-5 mt-4 mb-10 shadow-sm border border-gray-100">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-blue-100 p-2 rounded-xl">
          <Ionicons name="checkmark-circle-outline" size={18} color="#3b82f6" />
        </View>
        <Text className="text-lg font-black text-gray-800">Final Review</Text>
      </View>

      <View className="border border-blue-100 rounded-3xl bg-blue-50/30 p-5">
        <SummaryRow
          label="Route"
          value={`${data.origin_name} ➔ ${data.destination_name}`}
        />
        <Divider />
        <SummaryRow
          label="Departure"
          value={
            data.scheduled_start_at?.toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }) || "Not set"
          }
        />
        <Divider />
        <SummaryRow label="Driver" value={data.driver_name || "Not selected"} />
        <Divider />
        <SummaryRow
          label="Vehicle"
          value={data.vehicle_number || "Not selected"}
        />
        <Divider />
        <View className="flex-row justify-between items-center py-2 mt-2">
          <Text className="text-gray-500 font-bold">Total Budget</Text>
          <Text className="text-xl font-black text-blue-600">
            ₹{data.total_limit.toLocaleString("en-IN")}
          </Text>
        </View>
      </View>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="py-2">
      <Text className="text-[10px] text-gray-400 font-bold uppercase mb-1">
        {label}
      </Text>
      <Text className="text-gray-800 font-bold text-sm" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return <View className="h-[1px] bg-blue-100/50 my-1" />;
}
