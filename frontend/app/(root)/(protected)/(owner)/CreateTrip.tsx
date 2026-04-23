import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { createTrip } from "@/src/api/ownerService";

// Import your components
import Drivervehicles from "@/Components/Drivervehicles";
import ExpenseRule from "@/Components/ExpenseRule";
import Review from "@/Components/Review";
import RouteAndDestination from "@/Components/RouteAndDestination";
import Tripschedule from "@/Components/Tripschedule";
import Triptype from "@/Components/Triptype";

const generateTripCode = () =>
  `TRP-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

interface TripData {
  trip_code: string;
  trip_name: string;
  vehicle_id: number | null;
  vehicle_number: string;
  driver_id: number | null;
  driver_name: string;
  origin_name: string;
  destination_name: string;
  scheduled_start_at: Date | null;
  scheduled_end_at: Date | null;
  trip_type: string;
  fuel_limit: number;
  toll_limit: number;
  other_cost_limit: number;
}

const CreateTrip = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [tripData, setTripData] = useState<TripData>({
    trip_code: generateTripCode(),
    trip_name: "",
    vehicle_id: null,
    vehicle_number: "",
    driver_id: null,
    driver_name: "",
    origin_name: "",
    destination_name: "",
    scheduled_start_at: null,
    scheduled_end_at: null,
    trip_type: "single",
    fuel_limit: 0,
    toll_limit: 0,
    other_cost_limit: 0,
  });

  const mutation = useMutation({
    mutationFn: createTrip,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trips"] });
      Alert.alert("Success", "Trip created successfully!", [
        { text: "OK", onPress: () => router.back() },
      ]);
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to create trip",
      );
    },
  });

  const handleCreate = () => {
    // 1. Basic Validation
    if (
      !tripData.driver_id ||
      !tripData.vehicle_id ||
      !tripData.origin_name ||
      !tripData.destination_name ||
      !tripData.scheduled_start_at ||
      !tripData.scheduled_end_at
    ) {
      Alert.alert(
        "Missing Info",
        "Please select a driver, vehicle, route, and schedule.",
      );
      return;
    }

    // 2. Prepare Payload (Matching your API exactly)
    const payload = {
      trip_code: tripData.trip_code,
      trip_name: tripData.trip_name || `Trip to ${tripData.destination_name}`,
      vehicle_id: tripData.vehicle_id,
      driver_id: tripData.driver_id,
      origin_name: tripData.origin_name,
      destination_name: tripData.destination_name,
      // Mocked coordinates as required by your API
      origin_coordinates: { x: 19.076, y: 72.877 },
      destination_coordinates: { x: 18.52, y: 73.856 },
      scheduled_start_at: tripData.scheduled_start_at?.toISOString(),
      scheduled_end_at: tripData.scheduled_end_at?.toISOString(),
      trip_type: tripData.trip_type,
      fuel_limit: tripData.fuel_limit,
      toll_limit: tripData.toll_limit,
      other_cost_limit: tripData.other_cost_limit,
    };

    mutation.mutate(payload);
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-50 px-4 pt-2">
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" />

        <Text className="text-gray-600 font-bold text-lg mt-4">
          Trip Details
        </Text>

        {/* TRIP NAME INPUT */}
        <TextInput
          placeholder="Enter Trip Name (e.g. Warehouse Delivery)"
          value={tripData.trip_name}
          onChangeText={(val) =>
            setTripData((prev) => ({ ...prev, trip_name: val }))
          }
          className="border border-gray-300 rounded-xl px-4 py-4 bg-white mt-3 font-bold"
        />

        <Text className="text-gray-600 font-medium text-sm mt-4">
          Trip ID (Auto-generated)
        </Text>
        <TextInput
          value={tripData.trip_code}
          editable={false}
          className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-100 text-gray-400 mt-2"
        />

        <Drivervehicles
          onSelectDriver={(id, name) =>
            setTripData((prev) => ({
              ...prev,
              driver_id: id,
              driver_name: name,
            }))
          }
          onSelectVehicle={(id, num) =>
            setTripData((prev) => ({
              ...prev,
              vehicle_id: id,
              vehicle_number: num,
            }))
          }
        />

        <RouteAndDestination
          originName={tripData.origin_name}
          destinationName={tripData.destination_name}
          onUpdate={(key, value) =>
            setTripData((prev) => ({ ...prev, [key as keyof TripData]: value }))
          }
        />

        <Triptype
          value={tripData.trip_type}
          onUpdate={(val) =>
            setTripData((prev) => ({ ...prev, trip_type: val }))
          }
        />

        <Tripschedule
          startDate={tripData.scheduled_start_at}
          endDate={tripData.scheduled_end_at}
          onUpdate={(key, val) =>
            setTripData((prev) => ({ ...prev, [key as keyof TripData]: val }))
          }
        />

        <ExpenseRule
          fuelLimit={tripData.fuel_limit}
          tollLimit={tripData.toll_limit}
          otherLimit={tripData.other_cost_limit}
          onUpdate={(key, val) =>
            setTripData((prev) => ({ ...prev, [key as keyof TripData]: val }))
          }
        />

        <Review
          data={{
            ...tripData,
            total_limit:
              tripData.fuel_limit +
              tripData.toll_limit +
              tripData.other_cost_limit,
          }}
        />

        <View className="flex-row gap-4 my-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 border bg-white border-gray-300 rounded-2xl py-4 items-center flex-row justify-center gap-2"
          >
            <Text className="text-gray-700 font-bold">Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={mutation.isPending}
            onPress={handleCreate}
            className={`flex-1 rounded-2xl py-4 items-center flex-row justify-center gap-2 ${mutation.isPending ? "bg-gray-400" : "bg-orange-500"}`}
          >
            {mutation.isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Feather name="check" size={20} color="white" />
                <Text className="text-white font-bold text-lg">
                  Confirm Trip
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTrip;
