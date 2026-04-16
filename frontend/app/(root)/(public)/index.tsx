import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ActionButton from "@/Components/ActionButton";
import { useRouter } from "expo-router";
import { onLogin } from "@/app/src/context/AuthContext";

type Role = "owner" | "driver";

export default function LoginScreen() {
  const [role, setRole] = useState<Role>("owner");

  // Owner fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Driver fields
  const [phone, setPhone] = useState("");
  const [businessCode, setBusinessCode] = useState("");

  const router = useRouter();

  // ─── Owner Login ───────────────────────────────────────────────
  const handleOwnerLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("email_address", email);
    formData.append("password", password);

    try {
      const result = await onLogin(formData, "owner"); // ✅ pass role
      if (result?.success) {
        router.replace("../(protected)/(owner)/");
      } else {
        Alert.alert("Login Failed", result?.message || "Invalid credentials");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };
  const handleDriverLogin = async () => {
    if (!phone || phone.length < 10) {
      Alert.alert("Error", "Enter a valid 10-digit mobile number");
      return;
    }
    if (!businessCode) {
      Alert.alert("Error", "Please enter your business code");
      return;
    }

    const formData = new FormData();
    formData.append("driver_phone_no1", phone); // adjust field name if backend expects "mobile" or "phone_number"
    formData.append("business_code", businessCode); // adjust field name as per your backend

    try {
      const result = await onLogin(formData, "driver");

      if (result?.success) {
        // Redirect to driver dashboard
        router.replace("../(protected)/(driver)/"); // adjust path if needed
      } else {
        Alert.alert("Login Failed", result?.message || "Invalid credentials");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
    }
  };

  // ─── Role switch — clear fields to avoid stale state ──────────
  const handleRoleSwitch = (newRole: Role) => {
    setRole(newRole);
    setEmail("");
    setPassword("");
    setPhone("");
    setBusinessCode("");
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      {/* ROLE TOGGLE */}
      <View className="flex-row bg-gray-100 rounded-xl p-1 mt-6">
        {(["owner", "driver"] as Role[]).map((r) => (
          <TouchableOpacity
            key={r}
            className={`flex-1 py-2 rounded-lg ${role === r ? "bg-orange-400" : ""}`}
            onPress={() => handleRoleSwitch(r)}
          >
            <Text
              className={`text-center font-semibold capitalize ${
                role === r ? "text-white" : "text-gray-700"
              }`}
            >
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ── OWNER FORM ── */}
      {role === "owner" && (
        <View className="mt-8">
          <Text className="text-sm font-medium mb-2">Email Address</Text>
          <TextInput
            placeholder="Enter email address"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            className="border border-gray-300 rounded-lg px-4 py-3 mb-4"
          />

          <Text className="text-sm font-medium mb-2">Password</Text>
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <TouchableOpacity
            className="self-end mt-2"
            onPress={() => router.push("./(public)/Forgotpass")}
          >
            <Text className="text-blue-500 text-sm">Forgot Password?</Text>
          </TouchableOpacity>

          <ActionButton label="Login" onPress={handleOwnerLogin} />

          <Text className="text-center text-gray-500 mt-4 text-sm">
            Don't have an account?{" "}
            <Text
              className="text-orange-500 font-semibold"
              onPress={() => router.push("./(public)/signup")}
            >
              Sign Up
            </Text>
          </Text>
        </View>
      )}

      {/* ── DRIVER FORM ── */}
      {role === "driver" && (
        <View className="mt-8">
          <Text className="text-sm font-medium mb-2">Mobile Number</Text>
          <View className="flex-row border border-gray-300 rounded-lg overflow-hidden mb-4">
            <Text className="px-4 py-3 bg-gray-100 text-gray-700">+91</Text>
            <TextInput
              placeholder="Enter mobile number"
              keyboardType="number-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={10}
              className="flex-1 px-4 py-3"
            />
          </View>

          <Text className="text-sm font-medium mb-2">Business Code</Text>
          <TextInput
            placeholder="Enter business code"
            value={businessCode}
            onChangeText={setBusinessCode}
            className="border border-gray-300 rounded-lg px-4 py-3"
          />

          <ActionButton label="Continue" onPress={handleDriverLogin} />

          <TouchableOpacity
            className="mt-4"
            onPress={() => router.push("./(public)/SelectContactMethod")}
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
