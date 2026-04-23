import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { getAllDriver, getAllVehicles } from "@/src/api/ownerService";

type SelectionType = "driver" | "vehicle" | null;

interface SelectorProps {
  onSelectDriver: (driverId: number, driverName: string) => void;
  onSelectVehicle: (vehicleId: number, vehicleNumber: string) => void;
}

const DriverVehicleSelector = ({
  onSelectDriver,
  onSelectVehicle,
}: SelectorProps) => {
  const [modalType, setModalType] = useState<SelectionType>(null);
  const [selectedNames, setSelectedNames] = useState({
    driver: "",
    vehicle: "",
  });

  const { data: drivers, isLoading: loadingDrivers } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDriver,
  });

  const { data: vehicles, isLoading: loadingVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getAllVehicles,
  });

  const handleSelect = (item: any) => {
    if (modalType === "driver") {
      onSelectDriver(item.driver_id, item.driver_name); // Using ID for integration
      setSelectedNames((prev) => ({ ...prev, driver: item.driver_name }));
    } else {
      onSelectVehicle(item.vehicle_id, item.vehicle_number);
      setSelectedNames((prev) => ({ ...prev, vehicle: item.vehicle_number }));
    }
    setModalType(null);
  };

  return (
    <View className="bg-white rounded-3xl p-5 mt-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center gap-2 mb-6">
        <View className="bg-orange-100 p-2 rounded-xl">
          <Ionicons name="bus-outline" size={20} color="#f97316" />
        </View>
        <Text className="text-lg font-black text-gray-800">
          Resource Selection
        </Text>
      </View>

      {/* DRIVER SELECTOR */}
      <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">
        Assigned Driver
      </Text>
      <TouchableOpacity
        onPress={() => setModalType("driver")}
        className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 flex-row justify-between items-center mb-5"
      >
        <Text
          className={`font-bold ${selectedNames.driver ? "text-gray-900" : "text-gray-400"}`}
        >
          {selectedNames.driver || "Select a driver"}
        </Text>
        <Feather name="user" size={18} color="#9ca3af" />
      </TouchableOpacity>

      {/* VEHICLE SELECTOR */}
      <Text className="text-[10px] font-bold text-gray-400 uppercase mb-2 ml-1">
        Assigned Vehicle
      </Text>
      <TouchableOpacity
        onPress={() => setModalType("vehicle")}
        className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-4 flex-row justify-between items-center"
      >
        <Text
          className={`font-bold ${selectedNames.vehicle ? "text-gray-900" : "text-gray-400"}`}
        >
          {selectedNames.vehicle || "Select a vehicle"}
        </Text>
        <Feather name="truck" size={18} color="#9ca3af" />
      </TouchableOpacity>

      {/* REUSABLE MODAL */}
      <Modal
        visible={!!modalType}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View className="flex-1 bg-white">
          <View className="flex-row justify-between items-center px-6 py-6 border-b border-gray-50">
            <Text className="text-xl font-black text-gray-900 capitalize">
              Select {modalType}
            </Text>
            <TouchableOpacity
              onPress={() => setModalType(null)}
              className="bg-gray-100 p-2 rounded-full"
            >
              <Feather name="x" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {loadingDrivers || loadingVehicles ? (
            <ActivityIndicator className="mt-10" color="orange" />
          ) : (
            <FlatList
              data={modalType === "driver" ? drivers : vehicles}
              keyExtractor={(item) =>
                modalType === "driver"
                  ? item.driver_id.toString()
                  : item.vehicle_id.toString()
              }
              contentContainerStyle={{ padding: 20 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => handleSelect(item)}
                  className="bg-gray-50 mb-3 p-5 rounded-2xl border border-gray-100 flex-row justify-between items-center"
                >
                  <View>
                    <Text className="font-bold text-gray-900 text-base">
                      {modalType === "driver"
                        ? item.driver_name
                        : item.vehicle_number}
                    </Text>
                    <Text className="text-xs text-gray-500 mt-1">
                      {modalType === "driver"
                        ? item.driver_phone_no1
                        : item.vehicle_type}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#d1d5db" />
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default DriverVehicleSelector;
