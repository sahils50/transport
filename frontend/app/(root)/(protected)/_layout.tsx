import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { useAuthStore } from "@/src/store/useAuthStore";

export default function ProtectedLayout() {
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // If user is not logged in, redirect them back to the Welcome page
    if (!token) {
      router.replace("/");
    }
  }, [token]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(driver)" options={{ headerShown: false }} />
      <Stack.Screen name="(owner)" options={{ headerShown: false }} />
    </Stack>
  );
}
