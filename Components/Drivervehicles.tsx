import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useState } from "react";

type Driver = {
  id: string;
  name: string;
  phone: string;
  status: "Available" | "Busy";
};

type Vehicle = {
  id: string;
  vehiclenumber: string;
  type: string;
  Mileage: string;
  status: string;
};

const drivers: Driver[] = [
  {
    id: "1",
    name: "Raj Kumar",
    phone: "+91 87654 83764",
    status: "Available",
  },
  {
    id: "2",
    name: "Amit Sharma",
    phone: "+91 98765 43210",
    status: "Available",
  },
];

const vehicles: Vehicle[] = [
  {
    id: "1",
    vehiclenumber: "MH-12-AB-1234",
    type: "Truck • Diesel",
    Mileage: "8 km/L",
    status: "Available",
  },
  {
    id: "2",
    vehiclenumber: "MH-12-AB-1234",
    type: "Car • Diesel",
    Mileage: "8 km/L",
    status: "Available",
  },
];

const Drivervehicles = () => {
  const [open, setOpen] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [selectedVehicle, setselectedVehicle] = useState<Vehicle | null>(null);
  return (
    <View className="bg-white rounded-xl p-4 mt-4 ">
      <View className="flex-row gap-2 items-center">
        <View className="flex-row gap-1 border-[1.5px] border-orange-400 rounded-md  p-1 w-12">
          <Ionicons name="person" size={14} color="orange" />
          <FontAwesome6 name="car" size={14} color="orange" />
        </View>
        <Text className="text-lg font-medium text-gray-600">
          Vehicles & Driver
        </Text>
      </View>
      <View>
        {/* LABEL */}
        <Text className="text-md font-medium mt-5 mb-2">Select Driver</Text>

        {/* INPUT */}
        <TouchableOpacity
          onPress={() => setOpen(true)}
          className="border border-orange-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
        >
          <Text className={selectedDriver ? "text-black" : "text-gray-400"}>
            {selectedDriver ? selectedDriver.name : "Select Driver"}
          </Text>
          <Feather name="chevron-down" size={18} />
        </TouchableOpacity>

        {/* MODAL */}
        <Modal visible={open} animationType="slide">
          <View className="flex-1 bg-orange-50">
            {/* HEADER */}
            <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-500">
              <Text className="text-lg font-bold">Select Driver</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Feather name="x" size={22} />
              </TouchableOpacity>
            </View>

            {/* DRIVER LIST */}
            <FlatList
              data={drivers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-4 border-b border-gray-400"
                  onPress={() => {
                    setSelectedDriver(item);
                    setOpen(false);
                  }}
                >
                  <View className="flex-row    justify-between items-center">
                    <View>
                      <Text className="font-medium text-base">{item.name}</Text>
                      <Text className="text-gray-500 text-sm">
                        {item.phone}
                      </Text>
                    </View>

                    <View className="bg-green-100 px-3 py-1 rounded-full h-8">
                      <Text className="text-green-700 text-md font-semibold">
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>

      <View>
        <Text className="text-md font-medium mt-5 mb-2">Select Vehicle</Text>
        <TouchableOpacity
          onPress={() => setOpen(true)}
          className="border border-orange-300 rounded-lg px-4 py-3 flex-row justify-between items-center"
        >
          <Text className={selectedVehicle ? "text-black" : "text-gray-400"}>
            {selectedVehicle ? selectedVehicle.vehiclenumber : "Select Vehicle"}
          </Text>
          <Feather name="chevron-down" size={18} />
        </TouchableOpacity>

        {/* MODAL */}
        <Modal visible={open} animationType="slide">
          <View className="flex-1 bg-orange-50">
            {/* HEADER */}
            <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-500">
              <Text className="text-lg font-bold">Select Vehicle</Text>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Feather name="x" size={22} />
              </TouchableOpacity>
            </View>

            {/* Vehicle LIST */}
            <FlatList
              data={vehicles}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-4 py-4 border-b border-gray-400"
                  onPress={() => {
                    setselectedVehicle(item);
                    setOpen(false);
                  }}
                >
                  <View className="flex-row justify-between items-center">
                    <View>
                      <Text className="font-medium text-base mb-2">
                        {item.vehiclenumber}
                      </Text>
                      <Text className="text-sm font-medium text-gray-500">
                        {item.type}
                      </Text>
                      <Text className="text-sm font-medium text-gray-500">
                        {item.Mileage}
                      </Text>
                    </View>

                    <View className="bg-green-100 px-3 py-1 rounded-full h-8">
                      <Text className="text-green-700 text-md font-semibold">
                        {item.status}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Drivervehicles;
