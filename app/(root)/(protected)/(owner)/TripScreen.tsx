import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

type TripStatus = "Completed" | "Delayed" | "Cancelled";

type Trip = {
  id: number;
  from: string;
  to: string;
  tripId: string;
  date: string;
  dl: string;
  expense?: string;
  budgetStatus?: "Within" | "Over";
  status: TripStatus;
};

const trips: Trip[] = [
  {
    id: 1,
    from: "Mumbai",
    to: "Surat",
    tripId: "TRP-78911",
    date: "12 Mar 2025",
    dl: "DL-05-EFY-9012",
    status: "Cancelled",
  },
  {
    id: 2,
    from: "Mumbai",
    to: "Surat",
    tripId: "TRP-78911",
    date: "10 Mar 2025",
    dl: "DL-05-EFY-9012",
    expense: "₹8,800 / ₹7,800",
    budgetStatus: "Over",
    status: "Completed",
  },
  {
    id: 3,
    from: "Mumbai",
    to: "Surat",
    tripId: "TRP-78911",
    date: "10 Mar 2025",
    dl: "DL-05-EFY-9012",
    expense: "₹8,800 / ₹7,800",
    budgetStatus: "Over",
    status: "Delayed",
  },
];

export default function TripsScreen() {
  const [tab, setTab] = useState<"All" | TripStatus>("All");

  const filteredTrips =
    tab === "All" ? trips : trips.filter((t) => t.status === tab);

  return (
    <ScrollView className="flex-1 bg-gray-100 p-3">
      {/* Search */}
      <View className="border border-orange-400 rounded-xl px-3 py-2 flex-row items-center bg-white">
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          placeholder="Search by Route, Vehicle Or Driver"
          className="ml-2 flex-1"
        />
      </View>

      {/* ---------------- Current Trip ---------------- */}
      <Text className="mt-4 text-lg font-bold flex-row items-center">
        <Ionicons name="location" size={18} color="#f97316" /> Current Trip
      </Text>

      <View className="bg-white rounded-2xl border border-gray-300 p-4 mt-2">
        <View className="flex-row justify-between">
          <View>
            <Text className="text-xl font-bold">Mumbai ⇄ Surat</Text>
            <Text className="text-gray-500">TRIP-78901</Text>
          </View>

          <View className="items-end">
            <Text className="font-bold">₹5,800 / ₹7,800</Text>
            <View className="bg-green-100 px-2 py-1 rounded-full mt-1">
              <Text className="text-green-700 text-xs">Within budget</Text>
            </View>
            <View className="bg-orange-100 px-2 py-1 rounded-full mt-1">
              <Text className="text-orange-600 text-xs">Delayed by 1hr</Text>
            </View>
          </View>
        </View>

        <Text className="mt-3 text-gray-600 text-sm">
          Start Time: 15 Mar, 08:00 am
        </Text>
        <Text className="text-gray-600 text-sm">
          Expected Time: 17 Mar, 08:00 am
        </Text>
      </View>

      {/* ---------------- Past Trips ---------------- */}
      <Text className="mt-6 text-lg font-bold flex-row items-center">
        <MaterialIcons name="history" size={18} color="#f97316" /> Past Trips
      </Text>

      {/* Tabs */}
      <View className="flex-row mt-3 border-b border-gray-300">
        {["All", "Completed", "Delayed", "Cancelled"].map((t) => {
          const isActive = tab === t;
          return (
            <TouchableOpacity
              key={t}
              onPress={() => setTab(t as any)}
              className="mr-6 pb-2"
            >
              <Text
                className={`${
                  isActive
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-500"
                } pb-1`}
              >
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Trip Cards */}
      {filteredTrips.map((item) => (
        <View
          key={item.id}
          className="bg-white rounded-2xl border border-gray-300 p-4 mt-4"
        >
          <View className="flex-row justify-between">
            <Text className="text-xl font-bold">
              {item.from} → {item.to}
            </Text>

            <View
              className={`px-2 py-1 rounded-full ${
                item.status === "Cancelled"
                  ? "bg-red-100"
                  : item.status === "Completed"
                    ? "bg-gray-200"
                    : "bg-orange-100"
              }`}
            >
              <Text
                className={`text-xs ${
                  item.status === "Cancelled"
                    ? "text-red-600"
                    : item.status === "Completed"
                      ? "text-gray-700"
                      : "text-orange-600"
                }`}
              >
                {item.status}
              </Text>
            </View>
          </View>

          <Text className="text-gray-500 mt-1">
            {item.tripId} | {item.date}
          </Text>
          <Text className="text-gray-500">{item.dl}</Text>

          {item.expense && (
            <View className="mt-3 border-t border-gray-200 pt-3 flex-row justify-between items-center">
              <Text className="text-gray-600">Expense</Text>
              <View className="items-end">
                <Text className="font-bold">{item.expense}</Text>
                <View className="bg-red-100 px-2 py-1 rounded-full mt-1">
                  <Text className="text-red-600 text-xs">Over budget</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
