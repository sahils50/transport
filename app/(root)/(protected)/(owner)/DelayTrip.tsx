import { View, Text, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

const DelayTrip = () => {
  interface Trip {
    id: string;
    source: string;
    destination: string;
    delayTime: string;
    vehicleNumber: string;
    driver: string;
    planTime: string;
    actualTime: string;
    start_date: string;
    end_date: string;
  }

  type ActionItem = {
    id: number;
    title: string;
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
    //   route: Href;
  };

  const actions: ActionItem[] = [
    {
      id: 1,
      title: "Call",
      icon: "phone-outline",
      color: "green",
    },
    {
      id: 2,
      title: "Message",
      icon: "message-text",
      color: "blue",
    },
    {
      id: 3,
      title: "Map",
      icon: "map-minus",
      color: "white",
    },
  ];

  const DelayTrips: Trip[] = [
    {
      id: "1",
      source: "Mumbai",
      destination: "Pune",
      delayTime: "+2h 5m",
      vehicleNumber: "MH12 AB 2345",
      driver: "Rajesh Kumar",
      planTime: "05:30pm",
      actualTime: "01:00 pm",
      start_date: "12-05-2024",
      end_date: "20-05-2024",
    },
    {
      id: "2",
      source: "Mumbai",
      destination: "Pune",
      delayTime: "+2h 5m",
      vehicleNumber: "MH12 AB 2345",
      driver: "Rajesh Kumar",
      planTime: "05:30pm",
      actualTime: "01:00 pm",
      start_date: "12-05-2024",
      end_date: "20-05-2024",
    },
    {
      id: "3",
      source: "Mumbai",
      destination: "Pune",
      delayTime: "+2h 5m",
      vehicleNumber: "MH12 AB 2345",
      driver: "Rajesh Kumar",
      planTime: "05:30pm",
      actualTime: "01:00 pm",
      start_date: "12-05-2024",
      end_date: "20-05-2024",
    },
  ];
  return (
    <SafeAreaView className="flex-1 bg-orange-50 px-4 ">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <ScrollView showsVerticalScrollIndicator={false} className="  ">
      {DelayTrips.map((elem) => (
        <View
          key={elem.id}
          className="bg-white rounded-2xl p-4 shadow-xl my-3 border border-orange-300"
        >
          {/* ROUTE */}
          <View className="flex-row   bg-gray-100 border border-gray-300 shadow-2xl rounded-2xl px-4 py-3">
            <View className="flex-1 flex-row items-center gap-3">
              <View className="">
                <Text className="font-bold text-lg">{elem.source}</Text>
                <Text className="text-sm">{elem.start_date}</Text>
              </View>

              <FontAwesome name="long-arrow-right" size={22} color="orange" />

              <View>
                <Text className="font-bold text-lg">{elem.destination}</Text>
                <Text className="text-sm">{elem.end_date}</Text>
              </View>
            </View>

            <View className="bg-red-200 px-4 py-2 rounded-3xl items-center">
              <Text className="text-red-500 font-bold text-lg">
                {elem.delayTime}
              </Text>
            </View>
          </View>

          <View className=" flex-row mx-3 mt-3 justify-start gap-4">
            <MaterialCommunityIcons
              name="truck-plus"
              size={28}
              color="orange"
              className="bg-orange-100 px-2 py-2 rounded-xl"
            />
            <Text className="text-xl font-normal mt-2">
              {elem.vehicleNumber}
            </Text>
          </View>

          <View className=" flex-row mx-3 mt-3 justify-start gap-4">
            <MaterialCommunityIcons
              name="account-plus"
              size={28}
              color="gray"
              className="bg-gray-100 px-2 py-2 rounded-xl"
            />
            <Text className="text-xl font-normal mt-2">{elem.driver}</Text>
          </View>

          <View className="flex-row justify-between  mx-3 mt-5">
            <Text className="  w-32 text-left">Planned ETA:</Text>
            <Text className="text-right  w-32 font-medium">{elem.planTime}</Text>
          </View>

          <View className=" flex-row mx-3 mt-2 justify-between">
            <Text className="text-left w-32 ">Actual ETA:</Text>
            <Text className="text-right w-32 text-red-500 font-medium">{elem.actualTime}</Text>
          </View>

          {actions.map((elem) => (
            <TouchableOpacity
            activeOpacity={0.6}
              key={elem.id}
              className={`flex-row  ${elem.id == 3 ? "bg-orange-400" : `bg-${elem.color}-100`}  justify-center gap-2 mt-3 py-2 rounded-xl`}
            >
              <MaterialCommunityIcons
                name={elem.icon}
                size={28}
                color={elem.color}
                // className="bg-orange-300 px-2 py-2 rounded-3xl"
              />
              <Text className={`text-lg font-medium ${elem.id === 3 ? "text-white" : `text-${elem.color}-500`}`}>{elem.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DelayTrip;
