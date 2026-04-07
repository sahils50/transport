import { FontAwesome5 } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import DriverProfileScreen from "./DriverProfileScreen";
import ActionPopup, { PopupType } from "@/Components/ActionPopup";
import { router } from "expo-router";

/* ---------------- TYPES ---------------- */

type DriverStatus = "OnTrip" | "Assigned" | "Idle";
type FilterType = "ALL" | "OnTrip" | "Assigned" | "Idle";

interface Drivers {
  id: string;
  name: string;
  phone: string;
  status: DriverStatus;
  vehicleNumber?: string; // ✅ added
  source: string;
  destination: string;
  start_date: string;
  end_date: string;
  totalTrips: number;
}

/* ---------------- DATA ---------------- */

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "ALL" },
  { label: "OnTrip", value: "OnTrip" },
  { label: "Assigned", value: "Assigned" },
  { label: "Idle", value: "Idle" },
];

const driverData: Drivers[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    phone: "8276341089",
    status: "OnTrip",
    vehicleNumber: "MH12 AB 2345",
    source: "Mumbai",
    destination: "Pune",
    start_date: "12-05-2024",
    end_date: "20-05-2024",
    totalTrips: 5,
  },
  {
    id: "2",
    name: "Arun Kumar",
    phone: "8276341089",
    status: "Assigned",
    vehicleNumber: "MH14 CD 6789",
    source: "Mumbai",
    destination: "Pune",
    start_date: "12-05-2024",
    end_date: "20-05-2024",
    totalTrips: 5,
  },
  {
    id: "3",
    name: "Elon Musk",
    phone: "8276341089",
    status: "Idle",
    source: "Mumbai",
    destination: "Pune",
    start_date: "12-05-2024",
    end_date: "20-05-2024",
    totalTrips: 5,
  },
];

/* ---------------- SCREEN ---------------- */

export default function DriverScreen() {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("ALL");

  const [popupType, setPopupType] = useState<PopupType>(null);

  const [selectedDriver, setSelectedDriver] = useState<Drivers | null>(null);

  /* -------- FILTERED DATA -------- */

  const filteredData = driverData.filter((item) => {
    if (selectedFilter === "ALL") return true;
    return item.status === selectedFilter;
  });

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        ListHeaderComponent={() => (
          <View className="flex-row gap-3 mt-3">
            {filters.map((item) => (
              <TouchableOpacity
                key={item.value}
                onPress={() => setSelectedFilter(item.value)}
                className={`px-6 py-2 rounded-full
                  ${
                    selectedFilter === item.value
                      ? "bg-orange-500"
                      : "border border-gray-400"
                  }`}
              >
                <Text
                  className={`text-sm font-semibold
                    ${
                      selectedFilter === item.value
                        ? "text-white"
                        : "text-gray-700"
                    }`}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl p-4 shadow-sm border border-orange-400 mt-4">
            {/* HEADER */}
            <View className="flex-row justify-between">
              <View>
                <Text className="text-lg font-bold">{item.name}</Text>

                <View className="flex-row items-center gap-2 mt-1">
                  <Feather name="phone-call" size={16} color="gray" />
                  <Text className="text-sm">{item.phone}</Text>
                </View>

                {/* 🚚 VEHICLE NUMBER (ONLY ASSIGNED / ON TRIP) */}
                {(item.status === "Assigned" || item.status === "OnTrip") &&
                  item.vehicleNumber && (
                    <View className="flex-row items-center gap-2 mt-1">
                      <Feather name="truck" size={16} color="orange" />
                      <Text className="text-sm font-semibold text-orange-600">
                        {item.vehicleNumber}
                      </Text>
                    </View>
                  )}
              </View>

              <TouchableOpacity
                className="px-3 h-11 bg-orange-500 rounded-lg flex-row items-center gap-1"
                activeOpacity={0.8}
                onPress={() =>
                  router.push({
                    pathname: "../(owner)/edit-driver",
                    params: { driverId: item.id },
                  })
                }
              >
                <Text className="text-white font-semibold">Edit</Text>
                <Feather name="edit-3" size={18} color="white" />
              </TouchableOpacity>
            </View>

            {/* STATUS */}
            <View
              className={`w-24 mt-3 py-1 rounded-full items-center
                ${
                  item.status === "OnTrip"
                    ? "bg-orange-200 border border-orange-500"
                    : item.status === "Assigned"
                      ? "bg-green-200 border border-green-500"
                      : "bg-yellow-200 border border-yellow-500"
                }`}
            >
              <Text
                className={`font-semibold text-sm
                  ${
                    item.status === "OnTrip"
                      ? "text-orange-700"
                      : item.status === "Assigned"
                        ? "text-green-700"
                        : "text-yellow-700"
                  }`}
              >
                {item.status}
              </Text>
            </View>

            {/* ROUTE */}
            <View className="flex-row mt-4  bg-gray-100 rounded-2xl px-4 py-3">
              <View className="flex-1 flex-row items-center gap-3">
                <View>
                  <Text className="font-bold text-lg">{item.source}</Text>
                  <Text className="text-sm">{item.start_date}</Text>
                </View>

                <FontAwesome name="long-arrow-right" size={22} color="orange" />

                <View>
                  <Text className="font-bold text-lg">{item.destination}</Text>
                  <Text className="text-sm">{item.end_date}</Text>
                </View>
              </View>

              <View className="bg-orange-400 px-3 py-2 rounded-xl items-center">
                <Text className="text-white font-bold text-lg">
                  {item.totalTrips}
                </Text>
                <Text className="text-white text-xs font-bold">Trips</Text>
              </View>
            </View>

            {/* ACTIONS */}
            <View className="flex-row justify-center gap-7 mt-4">
              <TouchableOpacity
                className="border border-orange-500 rounded-lg w-20 py-2 items-center"
                onPress={() => {
                  setSelectedDriver(item);
                  setPopupType("CALL");
                }}
              >
                <Feather name="phone-call" size={20} color="green" />
                <Text className="font-bold ">Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="border border-orange-500 rounded-lg w-20 py-2 items-center"
                onPress={() =>
                  router.push({
                    pathname: "../(owner)/DriverProfileScreen",
                    params: { driverId: item.id },
                  })
                }
              >
                <MaterialIcons name="person" size={22} color="orange" />
                <Text className="font-bold">Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="border border-orange-500 rounded-lg w-20 py-2 items-center"
                onPress={() => {
                  setSelectedDriver(item);
                  setPopupType("WHATSAPP");
                }}
              >
                <FontAwesome5 name="whatsapp" size={22} color="green" />
                <Text className="font-bold">Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* POPUP */}
      <ActionPopup
        visible={popupType !== null}
        type={popupType}
        driver={selectedDriver}
        onClose={() => setPopupType(null)}
      />
    </SafeAreaView>
  );
}
