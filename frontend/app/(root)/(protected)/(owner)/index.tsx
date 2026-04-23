import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "@/src/api/ownerService";
import { useAuthStore } from "@/src/store/useAuthStore";

// Components
import ExpensesAnalysis from "@/Components/Dashboard_compo/ExpensesAnalysis";
import Performance from "@/Components/Dashboard_compo/Performance";
import QuickAction from "@/Components/Dashboard_compo/QuickAction";

const StatCard = ({ title, count, icon, bg, color }: any) => (
  <View className="w-[48%] bg-white rounded-2xl p-4 mb-4 flex-row items-center border border-gray-100 shadow-sm">
    <View className={`${bg} p-3 rounded-xl mr-3`}>
      <MaterialCommunityIcons name={icon} size={22} color={color} />
    </View>
    <View>
      <Text className="text-lg font-black text-gray-900">{count}</Text>
      <Text className="text-[10px] uppercase font-bold text-gray-400 tracking-tight">
        {title}
      </Text>
    </View>
  </View>
);

const Dashboard: React.FC = () => {
  const token = useAuthStore((state) => state.token);
  const [period, setPeriod] = useState("weekly");

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dashboard", period],
    queryFn: () => getDashboardData(period),
    enabled: !!token,
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#f97316" />
        <Text className="mt-2 text-gray-400 font-medium">
          Loading Fleet Data...
        </Text>
      </View>
    );
  }

  const overview = data?.overview || {
    active_trips: 0,
    delayed_trips: 0,
    scheduled_trips: 0,
    idle_vehicle: 0,
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <View className="px-4 pt-4">
          {/* HEADER */}
          <View className="flex-row justify-between items-end mb-6">
            <View>
              <Text className="text-sm font-bold text-orange-500 uppercase tracking-widest">
                Fleet Overview
              </Text>
              <Text className="text-2xl font-black text-gray-900">
                Control Center
              </Text>
            </View>

            {/* PERIOD SELECTOR */}
            <View className="flex-row bg-gray-100 p-1 rounded-lg">
              {["today", "weekly", "monthly"].map((p) => (
                <TouchableOpacity
                  key={p}
                  onPress={() => setPeriod(p)}
                  className={`px-3 py-1 rounded-md ${period === p ? "bg-white shadow-sm" : ""}`}
                >
                  <Text
                    className={`text-[10px] font-bold capitalize ${period === p ? "text-orange-600" : "text-gray-500"}`}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* STATS GRID MAPPED TO API */}
          <View className="flex-row flex-wrap justify-between">
            <StatCard
              title="Active Trips"
              count={overview.active_trips}
              icon="map-marker-path"
              bg="bg-blue-50"
              color="#2563EB"
            />
            <StatCard
              title="Delayed"
              count={overview.delayed_trips}
              icon="clock-alert-outline"
              bg="bg-red-50"
              color="#DC2626"
            />
            <StatCard
              title="Idle Fleet"
              count={overview.idle_vehicle}
              icon="truck-check"
              bg="bg-yellow-50"
              color="#CA8A04"
            />
            <StatCard
              title="Scheduled"
              count={overview.scheduled_trips}
              icon="calendar-clock"
              bg="bg-green-50"
              color="#16A34A"
            />
          </View>

          {/* PASSING API DATA TO SUB-COMPONENTS */}
          <View className="mt-4">
            <QuickAction />
          </View>

          <View className="mt-8">
            <View className="bg-white rounded-3xl border border-gray-100 p-2 shadow-sm">
              <ExpensesAnalysis data={data?.expense_analysis} />
            </View>
          </View>

          <View className="mt-6 pb-10">
            <View className="bg-white rounded-3xl border border-gray-100 p-4 shadow-sm">
              <Text className="font-bold text-gray-800 mb-4">
                Monthly Summary
              </Text>
              <View className="flex-row justify-between">
                <View>
                  <Text className="text-gray-400 text-xs uppercase font-bold">
                    Total Trips
                  </Text>
                  <Text className="text-lg font-black">
                    {data?.monthly_summary?.total_trips}
                  </Text>
                </View>
                <View className="items-end">
                  <Text className="text-gray-400 text-xs uppercase font-bold">
                    Actual Exp.
                  </Text>
                  <Text className="text-lg font-black text-orange-600">
                    ₹{data?.monthly_summary?.actual_expense}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
