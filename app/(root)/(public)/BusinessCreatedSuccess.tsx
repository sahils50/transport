import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ActionButton from "@/Components/ActionButton";

const BUSINESS_CODE = "RG-6247";

const BusinessCreatedSuccess: React.FC = () => {
  // Animations
  const iconAnim = useRef(new Animated.Value(0)).current;
  const cardAnim = useRef(new Animated.Value(40)).current;
  const cardOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Icon pop animation
    Animated.spring(iconAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();

    // Card slide-up animation
    Animated.parallel([
      Animated.timing(cardAnim, {
        toValue: 0,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
      Animated.timing(cardOpacity, {
        toValue: 1,
        duration: 500,
        delay: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Button fade-in
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 500,
      delay: 700,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      {/* Success Icon */}
      <Animated.View
        className="w-24 h-24 rounded-full bg-emerald-500 items-center justify-center mb-6"
        style={{
          transform: [{ scale: iconAnim }],
          opacity: iconAnim,
        }}
      >
        <Ionicons name="checkmark" size={48} color="white" />
      </Animated.View>

      {/* Title */}
      <Text className="text-lg font-semibold text-gray-800 text-center mb-2">
        Business Created Successfully!
      </Text>

      {/* Subtitle */}
      <Text className="text-sm text-gray-500 text-center mb-6">
        Your transport business account has been created
      </Text>

      {/* Code Card */}
      <Animated.View
        className="w-full border border-dashed border-orange-400 rounded-xl p-6 mb-8"
        style={{
          transform: [{ translateY: cardAnim }],
          opacity: cardOpacity,
        }}
      >
        <Text className="text-xs text-gray-500 text-center mb-3">
          Share this with your drivers
        </Text>

        <Text className="text-2xl font-bold text-orange-500 text-center mb-3">
          {BUSINESS_CODE}
        </Text>

        <Text className="text-xs text-gray-500 text-center">
          Drivers will need this code to login to your business.
        </Text>
      </Animated.View>

      {/* Button */}
      <Animated.View style={{ opacity: buttonOpacity }} className="w-full">
        <ActionButton label="Go to Dashboard"/>
      </Animated.View>
    </View>
  );
};

export default BusinessCreatedSuccess;
