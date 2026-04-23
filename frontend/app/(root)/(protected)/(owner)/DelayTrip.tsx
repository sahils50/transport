import React from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

// 1. Defined Interfaces for better type safety during integration
interface Trip {
  id: string;
  source: string;
  destination: string;
  delayTime: string;
  vehicleNumber: string;
  driver: string;
  driverPhone: string; // Added for 'Call' functionality
  planTime: string;
  actualTime: string;
  start_date: string;
  end_date: string;
}

const DelayTrip = () => {
  // 2. Optimized Handlers
  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleMap = (vehicle: string) => {
    console.log(`Tracking vehicle: ${vehicle}`);
    // Future: router.push(`/track/${vehicle}`)
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />

      <View className="px-4 py-4">
        <Text className="text-2xl font-black text-gray-900">Delayed Trips</Text>
        <Text className="text-gray-500 text-xs">
          Real-time alerts for fleet delays
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        {MOCK_DELAYED_TRIPS.map((trip) => (
          <TripCard
            key={trip.id}
            trip={trip}
            onCall={() => handleCall(trip.driverPhone)}
            onTrack={() => handleMap(trip.vehicleNumber)}
          />
        ))}
        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
};

// 3. Extracted Sub-component for clarity
const TripCard = ({
  trip,
  onCall,
  onTrack,
}: {
  trip: Trip;
  onCall: () => void;
  onTrack: () => void;
}) => (
  <View className="bg-white rounded-[28px] p-5 mb-5 shadow-sm border border-gray-100">
    {/* HEADER: ROUTE & DELAY BADGE */}
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row items-center flex-1">
        <View>
          <Text className="font-black text-lg text-gray-900">
            {trip.source}
          </Text>
          <Text className="text-[10px] text-gray-400 font-bold">
            {trip.start_date}
          </Text>
        </View>
        <View className="mx-3">
          <FontAwesome name="long-arrow-right" size={16} color="#f97316" />
        </View>
        <View>
          <Text className="font-black text-lg text-gray-900">
            {trip.destination}
          </Text>
          <Text className="text-[10px] text-gray-400 font-bold">
            {trip.end_date}
          </Text>
        </View>
      </View>

      <View className="bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
        <Text className="text-red-600 font-black text-xs">
          {trip.delayTime}
        </Text>
      </View>
    </View>

    {/* DETAILS: TRUCK & DRIVER */}
    <View className="bg-gray-50 rounded-2xl p-4 space-y-3">
      <View className="flex-row items-center">
        <MaterialCommunityIcons
          name="truck-outline"
          size={20}
          color="#6b7280"
        />
        <Text className="ml-3 font-bold text-gray-700">
          {trip.vehicleNumber}
        </Text>
      </View>
      <View className="flex-row items-center mt-2">
        <MaterialCommunityIcons
          name="account-outline"
          size={20}
          color="#6b7280"
        />
        <Text className="ml-3 font-bold text-gray-700">{trip.driver}</Text>
      </View>
    </View>

    {/* ETA SECTION */}
    <View className="flex-row justify-between mt-4 px-1">
      <View>
        <Text className="text-[10px] text-gray-400 font-bold uppercase">
          Planned ETA
        </Text>
        <Text className="font-bold text-gray-800">{trip.planTime}</Text>
      </View>
      <View className="items-end">
        <Text className="text-[10px] text-red-400 font-bold uppercase">
          Actual ETA
        </Text>
        <Text className="font-bold text-red-600">{trip.actualTime}</Text>
      </View>
    </View>

    {/* ACTION BUTTONS (HORIZONTAL ROW) */}
    <View className="flex-row mt-5 gap-x-3">
      <TouchableOpacity
        onPress={onCall}
        className="flex-1 flex-row items-center justify-center bg-green-50 py-3 rounded-2xl border border-green-100"
      >
        <Feather name="phone" size={18} color="#16a34a" />
        <Text className="ml-2 font-bold text-green-700">Call</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onTrack}
        className="flex-1 flex-row items-center justify-center bg-orange-500 py-3 rounded-2xl shadow-sm shadow-orange-200"
      >
        <MaterialCommunityIcons
          name="map-marker-radius-outline"
          size={18}
          color="white"
        />
        <Text className="ml-2 font-bold text-white">Track</Text>
      </TouchableOpacity>
    </View>
  </View>
);

// 4. Mock Data (matching your interface)
const MOCK_DELAYED_TRIPS: Trip[] = [
  {
    id: "1",
    source: "Mumbai",
    destination: "Pune",
    delayTime: "+2h 05m",
    vehicleNumber: "MH12 AB 2345",
    driver: "Rajesh Kumar",
    driverPhone: "9876543210",
    planTime: "05:30 PM",
    actualTime: "07:35 PM",
    start_date: "12-05-2024",
    end_date: "20-05-2024",
  },
];

// Quick icon import fix for the card
import { Feather } from "@expo/vector-icons";

export default DelayTrip;
