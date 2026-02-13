import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const stats = [
  { id: 1, count: 12, label: "Pending Approval" },
  { id: 2, count: 12, label: "Approved" },
  { id: 3, count: 12, label: "Rejected" },
];

const expenses = [
  {
    id: 1,
    name: "Ramesh Kumar",
    amount: 1500,
    vehicle: "MH 12 AB 1234",
    status: "Pending",
    date: "5 Mar 2026 • 2:30 PM",
  },
  {
    id: 2,
    name: "Suresh Patil",
    amount: 2200,
    vehicle: "MH 14 XY 5678",
    status: "Approved",
    date: "6 Mar 2026 • 11:10 AM",
  },
  {
    id: 3,
    name: "Amit Shah",
    amount: 900,
    vehicle: "MH 01 CD 9988",
    status: "Rejected",
    date: "7 Mar 2026 • 9:00 AM",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700"; // Pending
  }
};

const ApproveExpenses = () => {
  return (
    <View className="p-4">
      <View className="flex-row items-center justify-between border border-orange-500 rounded-xl p-4 bg-white ">
        <View>
          <Text className="text-lg font-bold text-gray-800">
            Approve Expenses
          </Text>
          <Text className="text-sm text-gray-500 mt-1">
            Review driver submitted expenses
          </Text>
        </View>

        <Ionicons name="notifications-outline" size={26} color="#f97316" />
      </View>
      <View className="flex-row justify-between px-4 mt-4">
        {stats.map((item) => (
          <View
            key={item.id}
            className="w-[31%] bg-white rounded-xl p-4  items-center border  border-orange-600"
          >
            <Text className="text-2xl font-bold text-orange-500">
              {item.count}
            </Text>
            <Text className="text-sm text-gray-600 mt-1 text-center">
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      <View className="mt-5 px-4 ">
        <View className="flex-row justify-between items-center mb-3">
          <Text className="font-bold text-xl text-gray-800">
            Pending Expenses
          </Text>
          <Text className="font-bold text-lg text-orange-600">
            Total: ₹ 2500
          </Text>
        </View>

        {/* Expense Card */}

        <View  className="gap-4 mt-4 px-1">
          {expenses.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-2xl p-4 border border-orange-600 gap-3"
            >
              <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-lg text-gray-800">
                  {item.name}
                </Text>
                <Text className="font-semibold text-base text-gray-700">
                  ₹ {item.amount}
                </Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-gray-500">{item.vehicle}</Text>

                <Text
                  className={`${getStatusStyle(
                    item.status,
                  )} px-4 py-1 rounded-full text-sm font-medium`}
                >
                  {item.status}
                </Text>
              </View>

              <Text className="text-xs text-gray-400">
                Submitted on {item.date}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default ApproveExpenses;
