import { View, Text, TextInput } from "react-native";
import { useMemo, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Entypo, FontAwesome5 } from "@expo/vector-icons";

/* ---------------- MOCK DATA (REPLACE WITH API) ---------------- */

const routeData = {
  distanceKm: 500,
  tollAmount: 3500,
};

const vehicleData = {
  mileage: 5, // km per litre
  fuelPrice: 95, // ₹ per litre
};

/* ---------------- COMPONENT ---------------- */

export default function ExpenseRule() {
  /* AUTO FUEL COST */
  const autoFuelCost = useMemo(() => {
    return Math.round(
      (routeData.distanceKm / vehicleData.mileage) *
        vehicleData.fuelPrice
    );
  }, []);

  /* STATES */
  const [fuelLimit, setFuelLimit] = useState(autoFuelCost);
  const [otherExpenses, setOtherExpenses] = useState(9500);

  const tollLimit = routeData.tollAmount;

  const totalLimit = useMemo(() => {
    return fuelLimit + tollLimit + otherExpenses;
  }, [fuelLimit, tollLimit, otherExpenses]);

  return (
    <View className="bg-white rounded-xl p-4 mt-4">
<View className='flex-row gap-2'>
      <FontAwesome5 name="money-check-alt" size={24} color="#F97316" />
      <Text className="text-lg font-semibold text-gray-600 mb-2">Expense Rule</Text>
      </View>

    <View className="  flex-row flex-wrap gap-2 justify-between mt-4">

      {/* FUEL LIMIT (EDITABLE) */}
      <Card
        title="Fuel Limit"
        icon={<MaterialIcons name="local-gas-station" size={22} color="#F97316" />}
        editable
        value={fuelLimit}
        onChange={setFuelLimit}
        description="Based on distance & vehicle mileage"
      />

      {/* TOLL LIMIT (AUTO) */}
      <Card
        title="Toll Limit"
        icon={<MaterialIcons name="toll" size={22} color="#F97316" />}
        value={tollLimit}
        description="Auto-calculated from route"
        disabled
      />

      {/* OTHER EXPENSES (EDITABLE) */}
      <Card
        title="Other Expenses"
        icon={<Feather name="tool" size={22} color="#F97316" />}
        editable
        value={otherExpenses}
        onChange={setOtherExpenses}
        description="For maintenance, food, etc."
      />

      {/* TOTAL (AUTO) */}
      <Card
        title="Total Limit"
        icon={<Entypo name="calculator" size={22} color="#F97316" />}
        value={totalLimit}
        description="Auto-calculated total"
        highlight
        disabled
      />
    </View>
    </View>
  );
}

/* ---------------- CARD UI ---------------- */

function Card({
  title,
  icon,
  value,
  onChange,
  editable,
  disabled,
  description,
  highlight,
}: {
  title: string;
  icon: React.ReactNode;
  value: number;
  onChange?: (val: number) => void;
  editable?: boolean;
  disabled?: boolean;
  description: string;
  highlight?: boolean;
}) {
  return (
    <View className="w-[48%] bg-white border border-gray-200 rounded-lg p-2">

      {/* HEADER */}
      <View className="flex-row items-center gap-2 mb-3">
        {icon}
        <Text className="font-semibold text-gray-800">
          {title}
        </Text>
      </View>

      {/* VALUE */}
      {editable ? (
        <TextInput
          value={String(value)}
          keyboardType="number-pad"
          onChangeText={(v) =>
            onChange?.(Number(v) || 0)
          }
          className="border border-orange-300 rounded-lg px-3 py-2 text-orange-600 font-bold text-lg"
        />
      ) : (
        <View
          className={`rounded-lg px-3 py-2 ${
            highlight
              ? "bg-orange-100"
              : "bg-gray-100"
          }`}
        >
          <Text
            className={`font-bold text-lg ${
              highlight
                ? "text-orange-600"
                : "text-gray-700"
            }`}
          >
            ₹{value.toLocaleString("en-IN")}
          </Text>
        </View>
      )}

      {/* DESCRIPTION */}
      <Text className="text-xs text-gray-500 mt-2">
        {description}
      </Text>
    </View>
  );
}
