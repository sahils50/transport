import { apiClient } from "./client";
export const getAdminProfile = async () => {
  const response = await apiClient.get("/admin/profile");
  return response.data.data;
};
export const getAllDriver = async () => {
  const response = await apiClient.get("/admin/drivers");
  return response.data.data;
};

export const getDriverById = async (id: number) => {
  const response = await apiClient.get(`/admin/driver/${id}`);
  return response.data.data;
};

export const getAllVehicles = async () => {
  const response = await apiClient.get(`/admin/vehicles`);
  return response.data.data;
};
