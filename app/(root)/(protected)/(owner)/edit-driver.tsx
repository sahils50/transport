import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import DriverForm from "@/Components/DriverForm";

export default function EditDriverScreen() {
  const { driverId } = useLocalSearchParams();

  const [form, setForm] = useState({
    name: "Ramesh Kumar",
    phone: "8877698543",
    altPhone: "9876543210",
    licenseNumber: "MH11 CX 777555555",
    licenseType: "Heavy Vehicle",
    licenseExpiry: "12-05-2027",
  });

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleUpdate = () => {
    console.log("Updated Driver:", driverId, form);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-bold mt-4">
          Edit Driver
        </Text>
        <Text className="text-gray-500 mb-4">
          Update driver information
        </Text>

        <DriverForm
          form={form}
          onChange={handleChange}
          onSubmit={handleUpdate}
          submitLabel="Update Driver"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
