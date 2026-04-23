import * as SecureStore from "expo-secure-store";
import { loginAdmin } from "../api/authService";
import { useAuthStore } from "../store/useAuthStore";
import { router } from "expo-router";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

const setItem = async (key: string, value: string) => {
  if (isWeb) {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const getItem = async (key: string) => {
  if (isWeb) {
    return localStorage.getItem(key);
  } else {
    return await SecureStore.getItemAsync(key);
  }
};

const deleteItem = async (key: string) => {
  if (isWeb) {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

export const onLogin = async (formData: FormData, role: "owner" | "driver") => {
  try {
    const endpoint = role === "owner" ? "/admin/login" : "/driver/login";
    const result = await loginAdmin(formData, endpoint);

    if (result.success) {
      const { token } = result.data;
      await setItem("userToken", token);
      await setItem("userRole", role);
      useAuthStore.getState().setAuth(token, role);
      return { success: true };
    }
    return { success: false, message: result.message || "Login failed" };
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    console.error(`Auth Error (${role}):`, errorMessage);
    return { success: false, message: errorMessage };
  }
};

export const handleLogout = async () => {
  try {
    // 1. Clear physical storage
    await deleteItem("userToken");
    await deleteItem("userRole");

    // 2. Clear Zustand state
    useAuthStore.getState().logout();

    // 3. Clear Navigation stack and Redirect to "/" (Welcome Screen)
    // We use absolute path to the root index
    if (router.canGoBack()) {
      router.dismissAll();
    }
    router.replace("/");
  } catch (error) {
    console.error("Error during logout:", error);
    router.replace("/");
  }
};

export const loadStoredAuth = async () => {
  try {
    const token = await getItem("userToken");
    const role = await getItem("userRole");

    if (token && role) {
      useAuthStore.getState().setAuth(token, role as any);
    }
  } catch (error) {
    console.error("Failed to load stored token:", error);
  }
};
