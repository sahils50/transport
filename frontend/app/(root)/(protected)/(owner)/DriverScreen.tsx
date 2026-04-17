import { FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionPopup, { PopupType } from "@/Components/ActionPopup";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/src/store/useAuthStore";
import { getAllDriver } from "@/src/api/ownerService";
import { Driver } from "@/src/types/admin/driver";

export default function DriverScreen() {
  const token = useAuthStore((state) => state.token);
  const [popupType, setPopupType] = useState<PopupType>(null);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);

  const {
    data: drivers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: getAllDriver,
    enabled: !!token,
  });
  if (isLoading)
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <FlatList
        data={drivers} // Directly passing the array from useQuery
        keyExtractor={(item) => item.driver_id.toString()}
        onRefresh={refetch}
        refreshing={isLoading}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View className="bg-white rounded-2xl mb-4 shadow-sm border border-gray-100 overflow-hidden relative">
            {/* EDIT BUTTON - Moved to Top Right */}
            <TouchableOpacity
              className="absolute right-0 top-0 bg-orange-100 p-3 rounded-bl-2xl z-10"
              onPress={() =>
                router.push({
                  pathname: "./(owner)/edit-driver",
                  params: { driverId: item.driver_id },
                })
              }
            >
              <Feather name="edit-3" size={18} color="#f97316" />
            </TouchableOpacity>

            {/* TOP SECTION: Name & Info */}
            <View className="p-4 pb-3 pr-14">
              {" "}
              <Text
                className="text-xl font-bold text-gray-800"
                numberOfLines={1}
              >
                {item.driver_name}
              </Text>
              <View className="flex-row items-center mt-2">
                <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-md">
                  <Feather name="phone" size={12} color="#6b7280" />
                  <Text className="text-gray-600 ml-1 text-xs font-medium">
                    {item.driver_phone_no1}
                  </Text>
                </View>
              </View>
            </View>
            <View className="flex-row">
              <TouchableOpacity
                className="flex-1 py-4 flex-row justify-center items-center border-r border-gray-100"
                onPress={() => {
                  setSelectedDriver(item);
                  setPopupType("CALL");
                }}
              >
                <Feather name="phone-call" size={18} color="#16a34a" />
                <Text className="ml-2 font-semibold text-gray-700">Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 py-4 flex-row justify-center items-center border-r border-gray-100"
                onPress={() =>
                  router.push({
                    pathname: "./DriverProfileScreen",
                    params: { driverId: item.driver_id },
                  })
                }
              >
                <Feather name="user" size={18} color="#f97316" />
                <Text className="ml-2 font-semibold text-gray-700">
                  Profile
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 py-4 flex-row justify-center items-center"
                onPress={() => {
                  setSelectedDriver(item);
                  setPopupType("WHATSAPP");
                }}
              >
                <FontAwesome5 name="whatsapp" size={18} color="#25d366" />
                <Text className="ml-2 font-semibold text-gray-700">Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <ActionPopup
        visible={popupType !== null}
        type={popupType}
        driver={selectedDriver}
        onClose={() => setPopupType(null)}
      />
    </SafeAreaView>
  );
}
