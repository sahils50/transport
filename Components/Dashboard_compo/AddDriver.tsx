import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Checkbox from "expo-checkbox";

const InputField = ({ placeholder }: { placeholder: string }) => (
  <TextInput
    placeholder={placeholder}
    className="border border-orange-300 rounded-lg px-3 py-3 mt-2 bg-white"
  />
);

export default function AddDriver() {
  const [licenseType, setLicenseType] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [invite, setInvite] = useState(false);
  const [activateLater, setActivateLater] = useState(false);

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
    <ScrollView
      className="flex-1 bg-orange-50"
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="bg-orange-400 p-5 rounded-b-3xl">
        <Text className="text-white text-2xl font-bold">Add Driver</Text>
        <Text className="text-white">Register driver for your business</Text>
      </View>

      <View className="p-4">
        {/* Driver Details */}
        <View className="bg-white p-4 rounded-xl shadow mb-4">
          <Text className="text-orange-500 font-bold text-lg mb-2">
            Driver Details
          </Text>

          <Text className="mt-2 font-semibold">Driver Full Name</Text>
          <InputField placeholder="Ramesh Kumar" />

          <Text className="mt-3 font-semibold">Phone Number</Text>
          <View className="flex-row items-center border border-orange-300 rounded-lg mt-2 bg-white">
            <Text className="px-3 text-gray-500">+91</Text>
            <TextInput
              placeholder="9876543210"
              className="flex-1 py-3"
              keyboardType="number-pad"
            />
          </View>

          <Text className="mt-3 font-semibold">
            Alternative Phone Number (optional)
          </Text>
          <View className="flex-row items-center border border-orange-300 rounded-lg mt-2 bg-white">
            <Text className="px-3 text-gray-500">+91</Text>
            <TextInput
              placeholder="Optional Phone Number"
              className="flex-1 py-3"
              keyboardType="number-pad"
            />
          </View>
        </View>

        {/* License and Identity */}
        <View className="bg-white p-4 rounded-xl shadow mb-4">
          <Text className="text-orange-500 font-bold text-lg mb-2">
            License And Identity
          </Text>

          <Text className="mt-2 font-semibold">Driving License Number</Text>
          <InputField placeholder="MH11 TX 777555" />

          {/* License Type */}
          <Text className="mt-3 font-semibold">License Type</Text>
          <View className="border border-orange-300 rounded-lg mt-2 bg-white">
            <Picker
              selectedValue={licenseType}
              onValueChange={(itemValue) => setLicenseType(itemValue)}
            >
              <Picker.Item label="Select License Type" value="" />
              <Picker.Item label="LMV" value="LMV" />
              <Picker.Item label="HMV" value="HMV" />
              <Picker.Item label="Transport" value="Transport" />
            </Picker>
          </View>

          {/* Date Picker */}
          <Text className="mt-3 font-semibold">License Expiry Date</Text>
          <TouchableOpacity
            onPress={() => setShowDate(true)}
            className="border border-orange-300 rounded-lg mt-2 bg-white p-3"
          >
            <Text className="text-gray-500">
              {date ? date.toDateString() : "Select Date"}
            </Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDate(Platform.OS === "ios");
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* Upload Image */}
          <Text className="mt-3 font-semibold">Upload License Photo</Text>
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
                <Text className="text-orange-400 mt-2">Upload Photo</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Driver Login Setup */}
        <View className="bg-white p-4 rounded-xl shadow mb-4">
          <Text className="text-orange-500 font-bold text-lg mb-3">
            Driver Login Setup
          </Text>

          <View className="flex-row items-center mb-3">
            <Checkbox value={invite} onValueChange={setInvite} />
            <Text className="ml-3 font-semibold">
              Send Login Invite (Recommended)
            </Text>
          </View>

          <View className="flex-row items-center">
            <Checkbox value={activateLater} onValueChange={setActivateLater} />
            <Text className="ml-3 font-semibold">Activate Later</Text>
          </View>
        </View>

        {/* Driver Login Information */}
        <View className="bg-white p-4 rounded-xl shadow mb-6">
          <Text className="text-orange-500 font-bold text-lg mb-2">
            Driver Login Information
          </Text>
          <Text className="text-gray-500 text-sm">
            • Phone number becomes default username{"\n"}• OTP sent to that
            number{"\n"}• Uses secure login
          </Text>
        </View>

        {/* Add Button */}
        <TouchableOpacity className="bg-orange-500 rounded-xl p-4 mb-10">
          <Text className="text-white text-center font-bold text-lg">
            Add Driver
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
