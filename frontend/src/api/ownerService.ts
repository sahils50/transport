import { apiClient } from "./client";
export const getAdminProfile = async () => {
  const response = await apiClient.get("/admin/profile");
  return response.data.data;
};
