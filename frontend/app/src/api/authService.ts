import { apiClient } from "./client";

export const loginAdmin = async (
  formData: any,
  endpoint: string = "/admin/login",
) => {
  const response = await apiClient.post(endpoint, formData);
  return response.data;
};
