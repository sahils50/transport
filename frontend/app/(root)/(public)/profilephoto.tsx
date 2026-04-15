import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

export default function ProfilePhoto() {
  const [image, setImage] = useState<string | null>(null);

  const openCamera = async () => {
  
  const permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission.granted) {
    Alert.alert("Permission required", "Camera access is needed");
    return;
  }

  
  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
  });

  
  if (result.canceled) return;

 
  const photoUri = result.assets[0].uri;

 
  setImage(photoUri);

  
  router.push("../(public)/BusinessCreatedSuccess");
};


  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Title */}
      <Text className="text-2xl font-bold text-gray-800 mt-10 mx-auto">
        Add Profile Picture
      </Text>

      {/* Profile Image */}
      <View className="mt-10 items-center ">
        <View className="w-28 h-28 rounded-full bg-orange-100 items-center justify-center overflow-hidden">
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-full h-full"
            />
          ) : (
            <MaterialIcons name="person" size={60} color="#FB923C" />
          )}
        </View>
      </View>

      {/* Upload Button */}
      <TouchableOpacity
        onPress={openCamera}
        activeOpacity={0.8}
        className="mx-auto mt-6 rounded-lg border border-orange-400 flex-row items-center gap-3 px-4 py-3"
      >
        <MaterialIcons name="photo-camera" size={24} color="#FB923C" />
        <Text className="text-orange-400 text-lg font-semibold">
          Upload Photo
        </Text>
      </TouchableOpacity>

      {/* Skip Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        className="self-end mt-6  rounded-lg border border-orange-400 px-6 py-2"
       onPress={()=> router.push("../(public)/BusinessCreatedSuccess")}>
        <Text className="text-orange-400 text-lg font-semibold"
       >
          Skip
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
