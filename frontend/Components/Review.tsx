import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text } from "react-native";

/* ---------------- TYPES ---------------- */

type TripSummaryProps = {
  route?: {
    from: string;
    to: string;
  };
  schedule?: Date;
  vehicleNumber?: string;
  driverName?: string;
  estimatedCost?: number;
  expenseLimit?: number;
};

/* ---------------- UTILS ---------------- */

const formatDateTime = (date: Date) =>
  date.toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

/* ---------------- COMPONENT ---------------- */

export default function Review({
  route,
  schedule,
  vehicleNumber,
  driverName,
  estimatedCost,
  expenseLimit,
}: TripSummaryProps) {
  // ❌ Don't render until everything is ready
  if (
    !route ||
    !schedule ||
    !vehicleNumber ||
    !driverName ||
    estimatedCost == null ||
    expenseLimit == null
  ) {
    return null;
  }

  return (
    <View className="bg-white rounded-xl p-4 mt-4">
      <View className="flex-row gap-2">
        <FontAwesome5 name="route" size={24} color="#F78231" />
        <Text className="text-lg font-semibold text-gray-600">
          Trip Summary
        </Text>
      </View>
      <View className="border border-orange-400 rounded-2xl bg-orange-50 px-4 py-3 mt-4">
        <Row label="Route" value={`${route.from} → ${route.to}`} />

        <Divider />

        <Row label="Schedule" value={formatDateTime(schedule)} />

        <Divider />

        <Row label="Vehicle" value={vehicleNumber} />

        <Divider />

        <Row label="Driver" value={driverName} />

        <Divider />

        <Row
          label="Estimated Cost"
          value={`₹${estimatedCost.toLocaleString("en-IN")}`}
          highlight
        />

        <Divider />

        <Row
          label="Expense Limit"
          value={`₹${expenseLimit.toLocaleString("en-IN")}`}
          bold
        />
      </View>
    </View>
  );
}

/* ---------------- SMALL UI PARTS ---------------- */

function Row({
  label,
  value,
  highlight,
  bold,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  bold?: boolean;
}) {
  return (
    <View className="flex-row justify-between py-2">
      <Text className="text-gray-600">{label}</Text>

      <Text
        className={`
          ${bold ? "font-semibold" : ""}
          ${highlight ? "text-orange-600 font-bold" : "text-gray-900"}
        `}
      >
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return <View className="h-[1px] bg-gray-200 my-1" />;
}
