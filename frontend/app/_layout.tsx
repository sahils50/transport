import { Stack } from "expo-router";
import "../global.css";
import { useEffect } from "react";
import { loadStoredAuth } from "../src/context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function RootLayout() {
  useEffect(() => {
    loadStoredAuth();
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(root)/(public)" />
        <Stack.Screen name="(root)/(protected)" />
      </Stack>
    </QueryClientProvider>
  );
}
