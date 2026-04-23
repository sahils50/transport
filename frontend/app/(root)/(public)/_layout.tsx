import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function PublicLayout() {
  const { token, role } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect them away from Public routes
    if (token && role) {
      if (role === "owner") {
        router.replace("/(root)/(protected)/(owner)");
      } else if (role === "driver") {
        router.replace("/(root)/(protected)/(driver)");
      }
    }
  }, [token, role]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false, }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen name="profilephoto" options={{ headerShown: false }} />
      <Stack.Screen name="Forgotpass" options={{ headerShown: false }} />
      <Stack.Screen name="Otp" options={{ headerShown: false }} />
    </Stack>
  );
}
