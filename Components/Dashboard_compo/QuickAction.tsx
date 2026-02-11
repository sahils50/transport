import React from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, useRouter } from "expo-router";





type ActionItem = {
  id: number;
  title: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  route: Href;
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
      route: "../(owner)/add-driver",  
    },
    {
      id: 3,
      title: "Add Vehicle",
      icon: "truck-plus",
      route: "../(owner)/add-vehicle",
    },
    {
      id: 4,
      title: "Approve Expenses",
      icon: "cash-check",
      route: "/",
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
    <>
      <View className="flex-row gap-1">
        <AntDesign name="thunderbolt" size={26} color="orange" />
        <Text className="font-semibold  text-xl">Quick Action</Text>
        {/* <QuickAction /> */}
      </View>
      <View className="flex-row flex-wrap justify-between mt-4">
        {actions.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => router.push(item.route)}
            className={`w-[30%]  rounded-xl p-4 mb-4 items-center ${item.id == 1 ? "bg-orange-400" : "bg-white"}`}
            style={{
              elevation: 10,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
            }}
          >
            <View
              className={`p-2 items-center  ${item.id == 1 ? "bg-orange-100" : "bg-orange-400"} rounded-xl`}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={28}
                color={item.id == 1 ? "white" : "white"}
                className="bg-orange-300 px-2 py-2 rounded-3xl"
              />
            </View>
            <Text className="mt-2 text-center text-xs font-semibold text-gray-700 ">
              {item.title}
            </Text>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default QuickAction;
