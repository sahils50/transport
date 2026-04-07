import DriverForm from "@/Components/DriverForm";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditDriverScreen() {
  const { driverId } = useLocalSearchParams();

  const [form, setForm] = useState({
    name: "Ramesh Kumar",
    phone: "8877698543",
    altPhone: "9876543210",
    licenseNumber: "MH11 CX 777555555",
    licenseType: "HMV",
    licenseExpiry: "12-05-2027",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    const e: Record<string, string> = {};

    if (!form.name) e.name = "Required";
    if (!form.phone || form.phone.length < 10) e.phone = "Invalid phone";
    if (!form.licenseNumber) e.licenseNumber = "Required";
    if (!form.licenseType) e.licenseType = "Required";
    if (!form.licenseExpiry) e.licenseExpiry = "Required";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleUpdate = () => {
    if (!validateForm()) return;

    console.log("Updated Driver:", driverId, form);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-xl font-bold mt-4">Edit Driver</Text>
        <Text className="text-gray-500 mb-4">Update driver information</Text>

        <DriverForm form={form} errors={errors} onChange={handleChange} />

        <TouchableOpacity
          onPress={handleUpdate}
          className="bg-orange-500 rounded-xl py-4 mt-6 items-center"
        >
          <Text className="text-white font-bold text-lg">Update Driver</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
