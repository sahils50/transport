import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getAllVehicles } from "@/src/api/ownerService";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function VehiclesScreen() {
  const token = useAuthStore((state) => state.token);
  const {
    data: vehicles = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
    enabled: !!token,
  });
  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }
  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <StatusBar barStyle="dark-content" />

      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.vehicle_id.toString()}
        onRefresh={refetch}
        refreshing={isLoading}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden relative">
            {/* TOP SECTION */}
            <View className="p-4 pb-3">
              <Text className="text-xl font-bold text-gray-800">
                {item.vehicle_number}
              </Text>
              <View className="flex-row items-center mt-1">
                <Text className="text-gray-500 font-medium capitalize">
                  {item.vehicle_type} • {item.fuel_type}
                </Text>

                {/* STATUS BADGE */}
                <View
                  className={`ml-3 px-2 py-0.5 rounded-md ${item.is_active ? "bg-green-50" : "bg-red-50"}`}
                >
                  <Text
                    className={`text-[10px] font-bold uppercase ${item.is_active ? "text-green-600" : "text-red-600"}`}
                  >
                    {item.is_active ? "Active" : "Inactive"}
                  </Text>
                </View>
              </View>
            </View>
            <View className="px-4 py-3 bg-gray-50/50 flex-row items-center border-y border-gray-50">
              <View className="flex-1 border-r border-gray-200">
                <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Capacity
                </Text>
                <Text className="mt-1 font-semibold text-gray-700">
                  {item.fuel_tank_capacity}L
                </Text>
              </View>
              <View className="flex-1 px-4 border-r border-gray-200">
                <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Mileage
                </Text>
                <Text className="mt-1 font-semibold text-gray-700">
                  {item.mileage} kmpl
                </Text>
              </View>
              <View className="flex-1 pl-4">
                <Text className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  Trips
                </Text>
                <Text className="mt-1 font-bold text-orange-600">
                  {item._count?.trip || 0}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
