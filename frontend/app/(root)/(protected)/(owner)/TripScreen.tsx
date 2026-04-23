import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getAllTrips } from "@/src/api/ownerService";
import { useAuthStore } from "@/src/store/useAuthStore";

// 1. CLEAN STATUS BADGE (UI ONLY)
const StatusBadge = ({ status }: { status: string }) => {
  const normalizedStatus = status.toLowerCase();
  const styles: any = {
    completed: "bg-green-50 text-green-700 border-green-100",
    delayed: "bg-orange-50 text-orange-700 border-orange-100",
    cancelled: "bg-red-50 text-red-700 border-red-100",
    scheduled: "bg-blue-50 text-blue-700 border-blue-100",
    ongoing: "bg-blue-50 text-blue-700 border-blue-100",
  };

  const styleClass =
    styles[normalizedStatus] || "bg-gray-50 text-gray-700 border-gray-100";
  const [bg, text, border] = styleClass.split(" ");

  return (
    <View className={`px-3 py-1 rounded-full border ${bg} ${border}`}>
      <Text
        className={`text-[10px] font-bold uppercase tracking-wider ${text}`}
      >
        {status}
      </Text>
    </View>
  );
};

export default function TripsScreen() {
  const token = useAuthStore((state) => state.token);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // 2. FETCH DATA AT THE TOP LEVEL
  const {
    data: allTrips = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: getAllTrips,
    enabled: !!token,
  });

  // 3. LOGIC: FILTERING & SEPARATION
  const { ongoingTrip, pastTrips } = useMemo(() => {
    const ongoing = allTrips.find(
      (t: any) => t.trip_status.toLowerCase() === "ongoing",
    );
    const history = allTrips.filter(
      (t: any) => t.trip_status.toLowerCase() !== "ongoing",
    );

    const filteredHistory = history.filter((t: any) => {
      const matchesTab =
        activeTab === "All" ||
        t.trip_status.toLowerCase() === activeTab.toLowerCase();
      const matchesSearch =
        t.trip_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.trip_code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesTab && matchesSearch;
    });

    return { ongoingTrip: ongoing, pastTrips: filteredHistory };
  }, [allTrips, activeTab, searchQuery]);

  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <StatusBar barStyle="dark-content" />

      {/* SEARCH BAR */}
      <View className="mt-2 flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
        <Feather name="search" size={18} color="#9ca3af" />
        <TextInput
          placeholder="Search Route or Trip ID..."
          className="ml-3 flex-1 text-gray-800"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={pastTrips}
        keyExtractor={(item) => item.trip_id.toString()}
        onRefresh={refetch}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <SectionHeader
              icon="play-circle"
              title="Ongoing Trip"
              color="#f97316"
            />
            {ongoingTrip ? (
              <OngoingTripCard trip={ongoingTrip} />
            ) : (
              <View className="bg-gray-50 p-6 rounded-2xl border border-dashed border-gray-300 items-center">
                <Text className="text-gray-400">
                  No trip currently in progress
                </Text>
              </View>
            )}

            <SectionHeader icon="clock" title="Trip History" color="#6b7280" />
            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          </>
        }
        renderItem={({ item }) => <TripHistoryCard item={item} />}
        ListEmptyComponent={
          <View className="py-20 items-center">
            <Feather name="package" size={48} color="#e5e7eb" />
            <Text className="text-gray-400 mt-2 font-medium">
              No past trips found
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// 4. CLEANER COMPONENT HELPERS
const SectionHeader = ({ icon, title, color }: any) => (
  <View className="flex-row items-center mt-6 mb-3">
    <Feather name={icon} size={18} color={color} />
    <Text className="ml-2 text-lg font-extrabold text-gray-800">{title}</Text>
  </View>
);

const Tabs = ({ activeTab, onTabChange }: any) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    className="mb-2"
  >
    {["All", "Scheduled", "Completed", "Cancelled"].map((tab) => (
      <TouchableOpacity
        key={tab}
        onPress={() => onTabChange(tab)}
        className={`mr-3 px-5 py-2 rounded-xl ${activeTab === tab ? "bg-orange-500" : "bg-gray-100"}`}
      >
        <Text
          className={`font-bold text-xs ${activeTab === tab ? "text-white" : "text-gray-500"}`}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ))}
  </ScrollView>
);

const OngoingTripCard = ({ trip }: any) => (
  <View className="bg-orange-500 rounded-3xl p-5 shadow-lg shadow-orange-200">
    <View className="flex-row justify-between items-start">
      <View className="flex-1">
        <Text className="text-orange-100 text-[10px] font-bold uppercase tracking-widest">
          In Transit
        </Text>
        <Text className="text-white text-xl font-bold mt-1">
          {trip.trip_name}
        </Text>
        <Text className="text-orange-100 text-xs mt-1">
          ID: #{trip.trip_code}
        </Text>
      </View>
      <MaterialIcons name="local-shipping" size={32} color="white" />
    </View>
    <View className="flex-row mt-6 justify-between border-t border-orange-400/50 pt-4">
      <View>
        <Text className="text-orange-100 text-[10px] uppercase font-bold">
          Driver
        </Text>
        <Text className="text-white font-semibold">
          {trip.driver?.driver_name || "N/A"}
        </Text>
      </View>
      <View className="items-end">
        <Text className="text-orange-100 text-[10px] uppercase font-bold">
          Vehicle
        </Text>
        <Text className="text-white font-semibold">
          {trip.vehicle?.vehicle_number}
        </Text>
      </View>
    </View>
  </View>
);

const TripHistoryCard = ({ item }: any) => (
  <View className="bg-white border border-gray-100 rounded-2xl p-4 mb-3 shadow-sm">
    {/* CHANGE THIS FROM <div> TO <View> */}
    <View className="flex-row justify-between items-start">
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-800">
          {item.trip_name}
        </Text>
        <Text className="text-gray-400 text-[10px] mt-1">
          {item.trip_code} •{" "}
          {new Date(item.scheduled_start_at).toLocaleDateString()}
        </Text>
      </View>
      <StatusBadge status={item.trip_status} />
    </View>

    <View className="flex-row items-center mt-3 pt-3 border-t border-gray-50">
      <Feather name="truck" size={14} color="#9ca3af" />
      <Text className="ml-2 text-gray-600 text-xs font-medium">
        {item.vehicle?.vehicle_number}
      </Text>

      <View className="ml-auto flex-row items-center">
        <Text className="text-gray-400 text-[10px] mr-2">Budget:</Text>
        <Text className="font-bold text-xs text-gray-700">
          ₹{item.total_allocated_budget}
        </Text>
      </View>
    </View>
  </View>
);
