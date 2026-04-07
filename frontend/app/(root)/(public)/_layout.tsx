import { Stack } from "expo-router";

export default function PublicLayout() {
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
