import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, Feather } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDriver } from "@/src/api/ownerService";
import DriverForm from "@/Components/DriverForm";

export default function AddDriverScreen() {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    licenseNumber: "",
    licenseType: "",
    licenseExpiry: "",
  });

  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loginSetup, setLoginSetup] = useState<"INVITE" | "LATER">("INVITE");

  const mutation = useMutation({
    mutationFn: createDriver,
    onSuccess: (res) => {
      Alert.alert("Success", "Driver registered successfully!");
      queryClient.invalidateQueries({ queryKey: ["drivers"] }); // Refresh driver list
      router.back();
    },
    onError: (error: any) => {
      const msg = error.response?.data?.message || "Failed to create driver";
      Alert.alert("Registration Failed", msg);
    },
  });

  const handleChange = (key: string, value: string) => {
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };
  const isFormValid = () => {
    return (
      form.name.trim() &&
      form.phone.length >= 10 &&
      form.licenseNumber.trim() &&
      form.licenseType &&
      form.licenseExpiry
    );
  };

  const handleRegister = () => {
    const handleRegister = () => {
      const payload = {
        admin_id: 1,
        driver_name: form.name,
        driver_phone_no1: form.phone,
        driver_phone_no2: form.altPhone || null, // Optional field
        driver_license_no: form.licenseNumber,
        driver_license_type: form.licenseType,
        driver_license_expiry_date: new Date(form.licenseExpiry).toISOString(),
      };

      // 2. Trigger the Mutation
      mutation.mutate(payload);
    };
    const payload = {
      admin_id: 1, // Usually you get this from your AuthStore/Context
      driver_name: form.name,
      driver_phone_no1: form.phone,
      driver_phone_no2: form.altPhone || null, // Optional field
      driver_license_no: form.licenseNumber,
      driver_license_type: form.licenseType,
      driver_license_expiry_date: new Date(form.licenseExpiry).toISOString(),
    };

    mutation.mutate(payload);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-4">
        {/* FORM FIELDS */}
        <DriverForm form={form} errors={errors} onChange={handleChange} />

        {/* LICENSE PHOTO */}
        <View className="bg-white rounded-2xl p-5 my-4 shadow-sm border border-gray-100">
          <Text className="font-bold text-gray-800 mb-3">License Photo</Text>
          <TouchableOpacity
            onPress={pickImage}
            className={`border-2 border-dashed rounded-2xl p-6 items-center ${
              errors.image
                ? "border-red-300 bg-red-50"
                : "border-orange-100 bg-orange-50"
            }`}
          >
            {image ? (
              <Image source={{ uri: image }} className="w-40 h-24 rounded-lg" />
            ) : (
              <View className="items-center">
                <Feather name="upload-cloud" size={28} color="#f97316" />
                <Text className="text-orange-600 font-bold mt-2">
                  Upload Document
                </Text>
              </View>
            )}
          </TouchableOpacity>
          {errors.image && (
            <Text className="text-red-500 text-[10px] mt-2">
              {errors.image}
            </Text>
          )}
        </View>

        {/* ACCESS CONTROL */}
        <View className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
          <Text className="font-bold text-gray-800 mb-4">Driver Access</Text>
          <TouchableOpacity
            onPress={() => setLoginSetup("INVITE")}
            className={`flex-row items-center p-4 rounded-xl border mb-3 ${loginSetup === "INVITE" ? "border-orange-500 bg-orange-50" : "border-gray-100"}`}
          >
            <Ionicons
              name={
                loginSetup === "INVITE" ? "radio-button-on" : "radio-button-off"
              }
              size={20}
              color="#f97316"
            />
            <View className="ml-3">
              <Text className="font-bold text-gray-900">Send Login Invite</Text>
              <Text className="text-gray-400 text-[10px]">
                Driver gets SMS immediately
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* SUBMIT BUTTON */}
        <TouchableOpacity
          onPress={handleRegister}
          disabled={!isFormValid() || mutation.isPending}
          className={`rounded-2xl py-4 mt-4 items-center flex-row justify-center ${
            isFormValid() ? "bg-orange-500" : "bg-gray-300"
          }`}
        >
          {mutation.isPending ? (
            <ActivityIndicator color="white" className="mr-2" />
          ) : (
            <Text className="text-white font-black text-base">
              Register Driver
            </Text>
          )}
        </TouchableOpacity>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
