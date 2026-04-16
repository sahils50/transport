import * as SecureStore from "expo-secure-store";
import { loginAdmin } from "../api/authService";
import { useAuthStore } from "../store/useAuthStore";

export const onLogin = async (formData: FormData, role: "owner" | "driver") => {
  try {
    // Choose endpoint based on role
    const endpoint = role === "owner" ? "/admin/login" : "/driver/login";

    const result = await loginAdmin(formData, endpoint); // pass endpoint

    if (result.success) {
      const { token, admin } = result.data; // adjust if your driver response has different field name

      // Persist token + role
      await SecureStore.setItemAsync("userToken", token);
      await SecureStore.setItemAsync("userRole", role);

      // Update Zustand store
      useAuthStore.getState().setAuth(token, role);

      return { success: true };
    }

    return { success: false, message: result.message || "Login failed" };
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    console.error(`Auth Error (${role}):`, errorMessage);
    return { success: false, message: errorMessage };
  }
};
export const loadStoredAuth = async () => {
  try {
    const token = await SecureStore.getItemAsync("userToken");
    const role = await SecureStore.getItemAsync("userRole");

    if (token && role) {
      // Restore both so RootLayout knows which dashboard to show
      useAuthStore.getState().setAuth(token, role as any);
    }
  } catch (error) {
    console.error("Failed to load stored token:", error);
  }
};
