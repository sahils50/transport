import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

type ActionItem = {
  id: number;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: string;
};

const QuickAction: React.FC = () => {
  const router = useRouter();

  const actions: ActionItem[] = [
    {
      id: 1,
      title: "Create Trip",
      icon: "map-marker-plus",
      route: "/(root)/(protected)/(owner)/TripScreen",
    },
    {
      id: 2,
      title: "Add Driver",
      icon: "account-plus",
      route: "/(root)/(protected)/(owner)/DriverScreen",
    },
    {
      id: 3,
      title: "Add Vehicle",
      icon: "truck-plus",
      route: "/(root)/(protected)/(owner)/VehicleScreen",
    },
    {
      id: 4,
      title: "Approve Expenses",
      icon: "cash-check",
      route: "/components/HomePages/ExpenseAnalysis",
    },
    {
      id: 5,
      title: "Delayed Trips",
      icon: "clock-alert-outline",
      route: "/(root)/(protected)/(owner)/TripScreen",
    },
    {
      id: 6,
      title: "Reports",
      icon: "file-chart",
      route: "/(root)/(protected)/(owner)/ReportScreen",
    },
  ];

  return (
    <View className="flex-row flex-wrap justify-between mt-4">
      {actions.map((item) => (
        <Pressable
          key={item.id}
          onPress={() => router.push(item.route)}
          className="w-[30%] bg-white rounded-xl p-4 mb-4 items-center"
          style={{
            elevation: 6,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.25,
            shadowRadius: 4,
          }}
        >
          <MaterialCommunityIcons name={item.icon} size={28} color="orange" className="bg-orange-200 px-2 py-2 rounded-md" />
          <Text className="mt-2 text-center text-xs font-semibold text-gray-700 ">
            {item.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default QuickAction;
