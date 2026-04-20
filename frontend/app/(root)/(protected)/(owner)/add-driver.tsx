import DriverForm from "@/Components/DriverForm";
import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// TODO: Integrate with backend
export default function AddDriverScreen() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    altPhone: "",
    licenseNumber: "",
    licenseType: "",
    licenseExpiry: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [loginSetup, setLoginSetup] = useState<"INVITE" | "LATER">("INVITE");

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* -------- PURE CHECK (NO STATE UPDATES) -------- */
  const isFormValid = () => {
    return (
      form.name.trim() &&
      form.phone.trim().length >= 10 &&
      form.licenseNumber.trim() &&
      form.licenseType &&
      form.licenseExpiry.trim()
    );
  };

  /* -------- VALIDATION (STATE UPDATE OK HERE) -------- */
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (form.phone.length < 10)
      newErrors.phone = "Enter valid phone number";

    if (!form.licenseNumber.trim())
      newErrors.licenseNumber = "License number is required";

    if (!form.licenseType) newErrors.licenseType = "License type is required";

    if (!form.licenseExpiry.trim())
      newErrors.licenseExpiry = "Expiry date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddDriver = () => {
    if (!validateForm()) return;

    console.log("Add Driver:", form, loginSetup);

    // API CALL HERE
    router.back();
  };
  const [image, setImage] = useState<string | null>(null);
  // 📷 Pick Image from gallery
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-orange-50 px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />

        {/* FORM */}
        <DriverForm form={form} errors={errors} onChange={handleChange} />
        <View className="bg-white rounded-xl p-4 mb-4 gap-2 ">
          {/* Upload Image */}
          <Text className="mt-3 font-semibold text-orange-600">
            Upload License Photo
          </Text>
          <TouchableOpacity
            onPress={pickImage}
            className="border border-dashed border-orange-300 rounded-lg p-6 mt-2 items-center"
          >
            {image ? (
              <Image source={{ uri: image }} className="w-24 h-24 rounded-lg" />
            ) : (
              <>
                <Ionicons
                  name="cloud-upload-outline"
                  size={28}
                  color="orange"
                />
                <Text className="text-gray-300 mt-2">Upload Photo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
        {/* LOGIN SETUP */}
        <View className="bg-white rounded-xl p-4  ">
          <Text className="font-bold text-orange-600 mb-3">
            Driver Login Setup
          </Text>

          <TouchableOpacity
            className="flex-row gap-3 mb-4"
            onPress={() => setLoginSetup("INVITE")}
          >
            <View
              className={`w-5 h-5 mt-1 rounded-full border ${
                loginSetup === "INVITE"
                  ? "bg-orange-500 border-orange-500"
                  : "border-gray-400"
              }`}
            />
            <View>
              <Text className="font-semibold">
                Send Login Invite (Recommended)
              </Text>
              <Text className="text-gray-500 text-sm">
                Send SMS with login instructions
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row gap-3"
            onPress={() => setLoginSetup("LATER")}
          >
            <View
              className={`w-5 h-5 mt-1 rounded-full border ${
                loginSetup === "LATER"
                  ? "bg-orange-500 border-orange-500"
                  : "border-gray-400"
              }`}
            />
            <View>
              <Text className="font-semibold">Activate Later</Text>
              <Text className="text-gray-500 text-sm">
                Driver saved but inactive
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* LOGIN INFO */}
        <View className="bg-white rounded-xl p-4 mt-4">
          <Text className="font-bold text-orange-600 mb-2">
            Driver Login Information
          </Text>

          <View className="flex-row gap-2">
            <Feather name="info" size={16} color="orange" />
            <Text className="text-gray-700 text-sm">
              • Phone Number (entered above){"\n"}• OTP sent to that number
              {"\n"}• Business Code: TRANSA2026
            </Text>
          </View>
        </View>

        {/* ADD BUTTON */}
        <TouchableOpacity
          onPress={handleAddDriver}
          disabled={!isFormValid()}
          className={`rounded-xl py-4 mt-6 items-center ${
            isFormValid() ? "bg-orange-500" : "bg-gray-300"
          }`}
        >
          <Text className="text-white font-bold text-lg">Add Driver</Text>
        </TouchableOpacity>

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
