import React from "react";
import { View, Text,  ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import QuickAction from "@/components/Dashboard_compo/QuickAction";
import ExpensesAnalysis from "@/components/Dashboard_compo/ExpensesAnalysis";
import Performance from "@/components/Dashboard_compo/Performance";
// import LiveTripsmap from "@/components/Dashboard_compo/LiveTripsmap";

type StatItem = {
  id: number;
  title: string;
  count: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  bg: string;
  color: string;
};

const Dashboard: React.FC = () => {
  const stats: StatItem[] = [
    {
      id: 1,
      title: "Active Trips",
      count: 12,
      icon: "map-marker-path",
      bg: "bg-blue-100",
      color: "#2563EB",
    },
    {
      id: 2,
      title: "Delay Trips",
      count: 10,
      icon: "clock-alert-outline",
      bg: "bg-red-100",
      color: "#DC2626",
    },
    {
      id: 3,
      title: "Idle Vehicles",
      count: 5,
      icon: "truck-check",
      bg: "bg-yellow-100",
      color: "#CA8A04",
    },
    {
      id: 4,
      title: "Schedule Trips",
      count: 12,
      icon: "calendar-clock",
      bg: "bg-green-100",
      color: "#16A34A",
    },
  ];

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 bg-gray-100 px-4 ">
        <View className="flex-row flex-wrap justify-between">
          {stats.map((item) => (
            <View
              key={item.id}
              className="w-[48%] bg-white rounded-xl p-4 mb-4 flex-row items-center"
              style={{
                elevation: 8,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.3,
                shadowRadius: 6,
              }}
            >
              <View className={`${item.bg} p-3 rounded-lg mr-3`}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={26}
                  color={item.color}
                />
              </View>

              

              <View>
                <Text className="text-xl font-bold text-gray-900">
                  {item.count}
                </Text>
                <Text className="text-sm text-gray-500">{item.title}</Text>
              </View>
            </View>
          ))}
        </View>

        <View className="">
          <MaterialCommunityIcons
            name="map-marker-path"
            size={30}
            color="orange"
          />
          <Text className="font-extrabold text-gray-700 px-4 text-2xl">
            Live Trips
          </Text>

          {/* <View>
            <LiveTripsmap />
          </View>
        */}
        </View>

        <View>
          <QuickAction />
        </View>

        <View className="mt-4">
          <ExpensesAnalysis />
        </View>

        <View className="mt-4">
          <Performance />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Dashboard;
