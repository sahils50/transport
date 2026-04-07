import { useRef, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import ActionButton from "@/Components/actionbutton";
import ActionButton from "@/Components/ActionButton";
import { router, useLocalSearchParams } from "expo-router";

// import ActionButton from "@/Components/ActionButton";

export default function OtpScreen() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", ""]);

  const inputs = useRef<(TextInput | null)[]>([]);

  const { from } = useLocalSearchParams<{ from?: string }>();

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* Title */}
      <Text className="text-xl font-bold text-gray-800 mt-10">Enter OTP</Text>

      <Text className="text-gray-500 mt-2">
        Enter the OTP sent to your email
      </Text>

      {/* OTP Inputs */}
      <View className="flex-row justify-between mt-8">
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => {
              inputs.current[index] = el;
            }}
            value={digit}
            onChangeText={(value) => handleChange(value, index)}
            keyboardType="number-pad"
            maxLength={1}
            className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold"
          />
        ))}
      </View>

      {/* Continue Button */}
      <ActionButton
        label="Verify"
        onPress={() => router.push("../(public)/Resetpass")}
      />

      {/* Resend */}
      <View className="flex-row justify-center mt-4">
        <Text className="text-gray-500 text-sm">Didn’t receive OTP?</Text>
        <Text className="text-blue-500 text-sm ml-1">Resend OTP</Text>
      </View>

      {from === "driver" && (
        <TouchableOpacity
          className="mt-4"
          onPress={() => router.push("../(public)/SelectContactMethod")}
        >
          <Text className="text-center text-blue-500 text-sm">
            Need help? Contact Owner
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
