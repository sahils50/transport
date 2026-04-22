import DriverForm from "@/Components/DriverForm";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { getDriverById } from "@/src/api/ownerService";

export default function EditDriverScreen() {
  const { driverId } = useLocalSearchParams();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    licenseNumber: "",
    licenseType: "",
    licenseExpiry: "",
  });

  const { data: driver, isLoading } = useQuery({
    queryKey: ["driver", driverId],
    queryFn: () => getDriverById(Number(driverId)),
    enabled: !!driverId,
  });

  useEffect(() => {
    if (driver) {
      // Format date from ISO to dd-mm-yyyy if needed
      let formattedExpiry = "";
      if (driver.driver_license_expiry_date) {
        const date = new Date(driver.driver_license_expiry_date);
        const dd = String(date.getDate()).padStart(2, "0");
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const yyyy = date.getFullYear();
        formattedExpiry = `${dd}-${mm}-${yyyy}`;
      }

      setForm({
        name: driver.driver_name || "",
        phone: driver.driver_phone_no1 || "",
        altPhone: driver.driver_phone_no2 || "",
        licenseNumber: driver.driver_license_no || "",
        licenseType: driver.driver_license_type || "",
        licenseExpiry: formattedExpiry,
      });
    }
  }, [driver]);

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
    // TODO: Call update API
    router.back();
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#f97316" />
      </SafeAreaView>
    );
  }

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
