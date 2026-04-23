import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router"; // Use Hook instead of direct import
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVehicle } from "@/src/api/ownerService";

export default function AddVehicleScreen() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Unified State Object
  const [form, setForm] = useState({
    vehicleType: "truck",
    vehicleNumber: "",
    fuelType: "diesel",
    mileage: "",
    fuelCapacity: "",
  });

  const handleInputChange = useCallback((key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  }, []);

  const mutation = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
      Alert.alert("Success", "Vehicle added successfully", [
        { text: "OK", onPress: () => router.back() }, // Navigate ONLY after alert is dismissed
      ]);
    },
    onError: (error: any) => {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to add vehicle",
      );
    },
  });

  const isFormValid =
    form.vehicleNumber.trim() && form.mileage && form.fuelCapacity;

  const handleAddVehicle = () => {
    const payload = {
      vehicle_number: form.vehicleNumber.toUpperCase().trim(),
      vehicle_type: form.vehicleType,
      fuel_type: form.fuelType,
      mileage: Number(form.mileage),
      fuel_tank_capacity: Number(form.fuelCapacity),
    };

    mutation.mutate(payload);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} className="px-4">
        <View className="bg-white rounded-3xl p-5 mt-6 shadow-sm border border-gray-100">
          <Text className="text-gray-400 text-[10px] font-bold uppercase mb-2">
            Vehicle Number
          </Text>
          <TextInput
            value={form.vehicleNumber}
            onChangeText={(v) => handleInputChange("vehicleNumber", v)}
            placeholder="MH-12-GZ-7007"
            autoCapitalize="characters"
            className="bg-gray-50 p-4 rounded-xl font-bold text-gray-800 border border-gray-200"
          />

          <Text className="text-gray-400 text-[10px] font-bold uppercase mt-4 mb-2">
            Vehicle Type
          </Text>
          <View className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <Picker
              selectedValue={form.vehicleType}
              onValueChange={(v) => handleInputChange("vehicleType", v)}
            >
              <Picker.Item label="Truck" value="truck" />
              <Picker.Item label="Mini Truck" value="mini_truck" />
              <Picker.Item label="Tempo" value="tempo" />
            </Picker>
          </View>
        </View>

        <View className="bg-white rounded-3xl p-5 mt-4 shadow-sm border border-gray-100">
          <View className="flex-row gap-x-4">
            <View className="flex-1">
              <Text className="text-gray-400 text-[10px] font-bold uppercase mb-2">
                Mileage
              </Text>
              <TextInput
                value={form.mileage}
                onChangeText={(v) => handleInputChange("mileage", v)}
                keyboardType="numeric"
                className="bg-gray-50 p-4 rounded-xl font-bold text-gray-800 border border-gray-200"
              />
            </View>
            <View className="flex-1">
              <Text className="text-gray-400 text-[10px] font-bold uppercase mb-2">
                Tank Capacity
              </Text>
              <TextInput
                value={form.fuelCapacity}
                onChangeText={(v) => handleInputChange("fuelCapacity", v)}
                keyboardType="numeric"
                className="bg-gray-50 p-4 rounded-xl font-bold text-gray-800 border border-gray-200"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleAddVehicle}
          disabled={!isFormValid || mutation.isPending}
          className={`py-4 mt-8 rounded-2xl items-center ${isFormValid ? "bg-orange-500" : "bg-gray-300"}`}
        >
          {mutation.isPending ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold">Add Vehicle</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
