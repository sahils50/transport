import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import ActionButton from "@/Components/actionbutton";
import ActionButton from "@/Components/ActionButton";
import { useRouter } from "expo-router";

type Role = "owner" | "driver";

export default function LoginScreen() {
  const [role, setRole] = useState<Role>("owner");
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* TOGGLE */}
      <View className="flex-row bg-gray-100 rounded-xl p-1 mt-6">
        <TouchableOpacity
          className={`flex-1 py-2 rounded-lg ${
            role === "owner" ? "bg-orange-400" : ""
          }`}
          onPress={() => setRole("owner")}
        >
          <Text
            className={`text-center font-semibold ${
              role === "owner" ? "text-white" : "text-gray-700"
            }`}
          >
            Owner
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 py-2 rounded-lg ${
            role === "driver" ? "bg-orange-400" : ""
          } `}
          onPress={() => setRole("driver")}
        >
          <Text
            className={`text-center font-semibold ${role === "driver" ? "text-white" : "text-gray-700"}`}
          >
            Driver
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT SWITCH */}
      {role === "owner" ? (
        <View className="mt-8">
          {/* OWNER FORM */}
          <Text className="text-sm font-medium mb-2">Email Address</Text>
          <TextInput
            placeholder="Enter email address"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
          />

          <Text className="text-sm font-medium mb-2">Password</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <TouchableOpacity className="self-end  mt-2">
            <Text
              className="text-blue-500 text-sm"
              onPress={() => router.push("../(public)/Forgotpass")}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <ActionButton label="Login" />

          <Text className="text-center text-gray-500 mt-4 text-sm">
            Don’t have an account?{" "}
            <Text
              className="text-orange-500 font-semibold"
              onPress={() => router.push("../(public)/signup")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      ) : (
        <View className="mt-8">
          {/* DRIVER FORM */}
          <Text className="text-sm font-medium mb-2">Mobile Number</Text>

          <View className="flex-row border border-gray-300 rounded-lg overflow-hidden mb-4">
            <Text className="px-4 py-3 bg-gray-100">+91</Text>
            <TextInput
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              className="flex-1 px-4 py-3"
            />
          </View>

          <Text className="text-sm font-medium mb-2">Business Code</Text>
          <TextInput
            placeholder="Enter business code"
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <ActionButton
            label="Continue"
            onPress={() =>
              router.push({
                pathname: "../(public)/Otp",
                params: { from: "driver" },
              })
            }
          />

          <TouchableOpacity
            className="mt-4"
            onPress={() => router.push("../(public)/SelectContactMethod")}
          >
            <Text className="text-center text-blue-500 text-sm">
              Need help? Contact Owner
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
