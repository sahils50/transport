import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";

type FuelType = "Diesel" | "Petrol" | "CNG" | "Electric";

export default function AddVehicleScreen() {
  const [vehicleType, setVehicleType] = useState("Select Vehicle");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [fuelType, setFuelType] = useState<FuelType>("Diesel");
  const [mileage, setMileage] = useState("");
  const [fuelCapacity, setFuelCapacity] = useState("");

  const handleAddVehicle = () => {
    const payload = {
      vehicleType,
      vehicleNumber,
      fuelType,
      mileage,
      fuelCapacity,
    };

    console.log("Add Vehicle:", payload);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-50 px-4">
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* VEHICLE INFO */}
        <View className="bg-white rounded-xl p-4 mt-4 ">
          <View className="flex-row items-center gap-2 mb-3">
            <MaterialCommunityIcons
              name="truck-outline"
              size={22}
              color="orange"
            />
            <Text className="font-bold text-orange-600">
              Vehicle Information
            </Text>
          </View>

          {/* VEHICLE TYPE */}
          <Text className="text-sm font-medium mb-1">
            Vehicle Type
          </Text>
          <View className="border border-orange-300 rounded-lg mb-3">
            <Picker
              selectedValue={vehicleType}
              onValueChange={setVehicleType}
            >
              <Picker.Item label="Select Vehicle"/>
              <Picker.Item label="Truck" value="Truck" />
              <Picker.Item label="Mini Truck" value="Mini Truck" />
              <Picker.Item label="Tempo" value="Tempo" />
            </Picker>
          </View>

          {/* VEHICLE NUMBER */}
          <Text className="text-sm font-medium mb-1">
            Vehicle Number
          </Text>
          <TextInput
            value={vehicleNumber}
            onChangeText={setVehicleNumber}
            placeholder=""
            className="border border-orange-300 rounded-lg px-4 py-3"
          />
        </View>

        {/* TECHNICAL DETAILS */}
        <View className="bg-white rounded-xl p-4 mt-6 ">
          <View className="flex-row items-center gap-2 mb-3">
            <Feather name="settings" size={20} color="orange" />
            <Text className="font-bold text-orange-600">
              Technical Details
            </Text>
          </View>

          {/* FUEL TYPE */}
          <Text className="text-sm font-medium mb-2">
            Fuel Type
          </Text>

          <View className="flex-row gap-7 mb-4">
            {(["Diesel", "Petrol", "CNG", "Electric"] as FuelType[]).map(
              (type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setFuelType(type)}
                  className="items-center"
                >
                  <View
                    className={`w-5 h-5 rounded-full border mb-1
                      ${
                        fuelType === type
                          ? "bg-orange-500 border-orange-500"
                          : "border-gray-400"
                      }`}
                  />
                  <Text className="text-xs">{type}</Text>
                </TouchableOpacity>
              )
            )}
          </View>

          {/* MILEAGE */}
          <Text className="text-sm font-medium mb-1">
            Mileage
          </Text>
          <TextInput
            value={mileage}
            onChangeText={setMileage}
            keyboardType="number-pad"
            placeholder=""
            className="border border-orange-300 rounded-lg px-4 py-3 mb-3"
          />

          {/* FUEL TANK */}
          <Text className="text-sm font-medium mb-1">
            Fuel Tank Capacity
          </Text>
          <TextInput
            value={fuelCapacity}
            onChangeText={setFuelCapacity}
            placeholder="Liter"
            className="border border-orange-300 rounded-lg px-4 py-3"
          />
        </View>

        {/* ACTION BUTTONS */}
        <View className="flex-row gap-4 mt-8">
          <TouchableOpacity
            onPress={() => router.back()}
            className="flex-1 border border-orange-500 rounded-xl py-3 items-center"
          >
            <Text className="text-orange-500 font-semibold">
              ✕ Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleAddVehicle}
            className="flex-1 bg-orange-500 rounded-xl py-3 items-center"
          >
            <Text className="text-white font-bold">
              Add Vehicle
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-10" />
      </ScrollView>   
   
    </SafeAreaView>
  );
}
