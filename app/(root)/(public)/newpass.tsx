import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "@/Components/ActionButton";
import { router } from "expo-router";

const PasswordResetSuccess: React.FC = () => {
  // animation value
  const scaleAnim = useRef<Animated.Value>(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      {/* Animated Success Icon */}
      <Animated.View
        className="w-24 h-24 rounded-full bg-emerald-500 items-center justify-center mb-6"
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: scaleAnim,
        }}
      >
        <Ionicons name="checkmark" size={48} color="white" />
      </Animated.View>

      {/* Title */}
      <Text className="text-2xl font-bold text-emerald-500 text-center mb-3">
        Password Reset{"\n"}Successful!
      </Text>

      {/* Description */}
      <Text className="text-sm text-gray-500 text-center leading-6 mb-8">
        Your password has been successfully reset.{"\n"}
        You can now log in to your account with your new password.
      </Text>

      {/* Button */}
      <ActionButton label=" ← Back to Login"
      onPress={()=>router.push("../(public)")}
      buttonClassName= "px-16"/>
    </View>
  );
};

export default PasswordResetSuccess;
