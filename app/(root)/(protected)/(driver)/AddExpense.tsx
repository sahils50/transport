import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AddExpense = () => {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [selectedExpenseType, setSelectedExpenseType] = useState<string | null>(
    null,
  );

  const expenseTypes = [
    {
      id: "fuel",
      label: "Fuel Cost",
      icon: "car-sport",
      color: "bg-blue-100 text-blue-700 border-blue-300",
    },
    {
      id: "toll",
      label: "Toll Cost",
      icon: "card",
      color: "bg-purple-100 text-purple-700 border-purple-300",
    },
    {
      id: "other",
      label: "Other Cost",
      icon: "ellipsis-horizontal-circle",
      color: "bg-amber-100 text-amber-700 border-amber-300",
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-5 py-4">
        {/* Trip Header */}
        <View className="mb-6 rounded-xl bg-white p-4 shadow-sm">
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-lg font-semibold text-gray-800">
                Pune → Mumbai
              </Text>
              <Text className="mt-1 text-sm text-gray-500">TMB-78012</Text>
            </View>
            <View className="items-end">
              <Text className="font-medium text-gray-700">MH 12 AB 1234</Text>
              <Text className="mt-0.5 text-xs text-gray-500">
                Driver: Ramesh Kumar
              </Text>
            </View>
          </View>
        </View>

        {/* Expense Type */}
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          Expense Type
        </Text>

        <View className="mb-6 flex-row flex-wrap justify-between gap-3">
          {expenseTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              activeOpacity={0.7}
              onPress={() => setSelectedExpenseType(type.id)}
              className={`flex-1 items-center rounded-xl border-2 p-4 ${
                selectedExpenseType === type.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <Ionicons
                name={type.icon as any}
                size={28}
                color={selectedExpenseType === type.id ? "#3b82f6" : "#6b7280"}
              />
              <Text
                className={`mt-2 font-medium ${
                  selectedExpenseType === type.id
                    ? "text-blue-600"
                    : "text-gray-700"
                }`}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Amount Input */}
        <View className="mb-6">
          <Text className="mb-2 text-base font-medium text-gray-700">
            Amount (₹)
          </Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3.5 text-lg"
            placeholder="Enter Amount"
            placeholderTextColor="#9ca3af"
            keyboardType="numeric"
            value={amount}
            onChangeText={setAmount}
            autoFocus={false}
          />
        </View>

        {/* Payment Mode */}
        <Text className="mb-3 text-lg font-semibold text-gray-800">
          Payment Mode
        </Text>

        <View className="mb-6 flex-row gap-3">
          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border-2 border-green-500 bg-green-50 py-4">
            <Ionicons name="cash" size={24} color="#16a34a" />
            <Text className="font-medium text-green-700">Cash</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white py-4">
            <Ionicons name="phone-portrait" size={24} color="#4b5563" />
            <Text className="font-medium text-gray-700">UPI</Text>
          </TouchableOpacity>
        </View>

        {/* Bill / Proof */}
        <Text className="mb-2 text-base font-medium text-gray-700">
          Bill / Proof
        </Text>

        <TouchableOpacity
          activeOpacity={0.7}
          className="mb-6 items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-10"
        >
          <Ionicons name="cloud-upload-outline" size={40} color="#9ca3af" />
          <Text className="mt-3 text-center text-gray-600">
            Click to add photo / screenshot{"\n"}
            JPG, PNG, PDF or Max 5MB
          </Text>
        </TouchableOpacity>

        {/* Optional Note */}
        <View className="mb-8">
          <Text className="mb-2 text-base font-medium text-gray-700">
            Optional Note
          </Text>
          <TextInput
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-base"
            placeholder="Add optional note (max 100 characters)"
            placeholderTextColor="#9ca3af"
            multiline
            maxLength={100}
            numberOfLines={3}
            textAlignVertical="top"
            value={note}
            onChangeText={setNote}
          />
          <Text className="mt-1 text-right text-xs text-gray-500">
            {note.length}/100 characters
          </Text>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          className="mb-10 items-center rounded-xl bg-blue-600 py-4 shadow-md"
        >
          <Text className="text-lg font-semibold text-white">
            Submit Expense
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddExpense;
