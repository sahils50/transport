import { View, Text, TextInput } from "react-native";
import React from "react";
import {
  Feather,
  MaterialIcons,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";

interface ExpenseRuleProps {
  fuelLimit: number;
  tollLimit: number;
  otherLimit: number;
  onUpdate: (key: string, value: number) => void;
}

export default function ExpenseRule({
  fuelLimit,
  tollLimit,
  otherLimit,
  onUpdate,
}: ExpenseRuleProps) {
  const totalLimit =
    (Number(fuelLimit) || 0) +
    (Number(tollLimit) || 0) +
    (Number(otherLimit) || 0);

  return (
    <View className="bg-white rounded-[24px] p-5 mt-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center gap-3 mb-6">
        <View className="bg-orange-100 p-2 rounded-xl">
          <FontAwesome5 name="money-check-alt" size={18} color="#F97316" />
        </View>
        <Text className="text-lg font-black text-gray-800">Expense Limits</Text>
      </View>

      <View className="flex-row flex-wrap justify-between">
        {/* FUEL LIMIT */}
        <ExpenseCard
          title="Fuel"
          icon={
            <MaterialIcons name="local-gas-station" size={20} color="#F97316" />
          }
          value={fuelLimit}
          onChange={(val) => onUpdate("fuel_limit", val)}
          editable
          description="Diesel/Petrol budget"
        />

        {/* TOLL LIMIT */}
        <ExpenseCard
          title="Toll"
          icon={<MaterialIcons name="toll" size={20} color="#F97316" />}
          value={tollLimit}
          onChange={(val) => onUpdate("toll_limit", val)}
          editable
          description="FastTag / Cash tolls"
        />

        {/* OTHER EXPENSES */}
        <ExpenseCard
          title="Others"
          icon={<Feather name="tool" size={20} color="#F97316" />}
          value={otherLimit}
          onChange={(val) => onUpdate("other_cost_limit", val)}
          editable
          description="Food & Maintenance"
        />

        {/* TOTAL */}
        <ExpenseCard
          title="Total"
          icon={<Entypo name="calculator" size={20} color="#F97316" />}
          value={totalLimit}
          description="Auto-calculated sum"
          highlight
        />
      </View>
    </View>
  );
}

function ExpenseCard({
  title,
  icon,
  value,
  onChange,
  editable,
  description,
  highlight,
}: any) {
  return (
    <View className="w-[48%] bg-gray-50 border border-gray-100 rounded-2xl p-3 mb-3">
      <View className="flex-row items-center gap-2 mb-2">
        {icon}
        <Text className="font-bold text-gray-700 text-xs">{title}</Text>
      </View>

      {editable ? (
        <View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-2">
          <Text className="text-gray-400 font-bold">₹</Text>
          <TextInput
            value={String(value)}
            keyboardType="number-pad"
            onChangeText={(v) =>
              onChange?.(Number(v.replace(/[^0-9]/g, "")) || 0)
            }
            className="flex-1 py-2 px-1 text-orange-600 font-black text-base"
          />
        </View>
      ) : (
        <View
          className={`rounded-xl px-3 py-2 ${highlight ? "bg-orange-500" : "bg-gray-200"}`}
        >
          <Text
            className={`font-black text-base ${highlight ? "text-white" : "text-gray-700"}`}
          >
            ₹{value.toLocaleString("en-IN")}
          </Text>
        </View>
      )}
      <Text className="text-[9px] text-gray-400 mt-2 leading-[10px]">
        {description}
      </Text>
    </View>
  );
}
