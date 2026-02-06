import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
// import ActionButton from "@/components/actionbutton";
import ActionButton from "@/Components/ActionButton";
import { router } from "expo-router";

export default function ResetPass() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Password rules
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

  const isPasswordValid =
    hasMinLength && hasUppercase && hasNumber && hasSpecialChar;

  const isPasswordMatch =
    password.length > 0 && password === confirmPassword;

  const isFormValid = isPasswordValid && isPasswordMatch;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="px-6"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title */}
        <Text className="text-xl font-bold text-gray-800 mt-10">
          Set New Password
        </Text>

        <Text className="text-gray-500 mt-2 mb-6">
          Create a strong new password for your account
        </Text>

        {/* New Password */}
        <Text className="text-sm font-medium text-gray-700 mb-1">
          New Password
        </Text>

        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 mb-2">
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter new password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="flex-1"
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        </View>

        {/* Password Validation Feedback */}
        <View className="mb-4">
          <Rule text="At least 8 characters" valid={hasMinLength} />
          <Rule text="One uppercase letter" valid={hasUppercase} />
          <Rule text="One number" valid={hasNumber} />
          <Rule
            text="One special character"
            valid={hasSpecialChar}
          />
        </View>

        {/* Confirm Password */}
        <Text className="text-sm font-medium text-gray-700 mb-1">
          Confirm New Password
        </Text>

        <View className="flex-row items-center border border-gray-300 rounded-lg px-4 py-3 mb-2">
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm new password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            className="flex-1"
          />
        </View>

        {!isPasswordMatch && confirmPassword.length > 0 && (
          <Text className="text-red-500 text-xs mb-4">
            Passwords do not match
          </Text>
        )}

        {/* Reset Button */}
        <ActionButton
          label="Reset Password"
          onPress={() => router.push("../(public)/newpass")}
          containerClassName={isFormValid ? "" : "opacity-50"}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🔹 Password Rule Component (inline, simple) */
function Rule({
  text,
  valid,
}: {
  text: string;
  valid: boolean;
}) {
  return (
    <View className="flex-row items-center mb-1">
      <Ionicons
        name={valid ? "checkmark-circle" : "close-circle"}
        size={16}
        color={valid ? "#16A34A" : "#9CA3AF"}
      />
      <Text
        className={`ml-2 text-xs ${
          valid ? "text-green-600" : "text-gray-500"
        }`}
      >
        {text}
      </Text>
    </View>
  );
}
