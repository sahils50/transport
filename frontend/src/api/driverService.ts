import { apiClient } from "./client";

export const getDriverProfile = async () => {
  const response = await apiClient.get("/driver/profile");
  return response.data.data;
};

export const getDriverHome = async () => {
  const response = await apiClient.get("/driver/home");
  return response.data.data;
};

export const getAdminContact = async () => {
  const response = await apiClient.get("/driver/owner");
  return response.data.data;
};

export const getDriverExpenses = async (
  page = 1,
  limit = 10,
  status?: string,
) => {
  const response = await apiClient.get("/driver/expenses", {
    params: { page, limit, status },
  });
  return response.data;
};

export const getExpenseDetail = async (id: number) => {
  const response = await apiClient.get(`/driver/expenses/${id}`);
  return response.data.data;
};

export const postExpense = async (data: any) => {
  const response = await apiClient.post("/driver/expenses", data);
  return response.data;
};

export const updateTripStatus = async (
  trip_id: number,
  action: "start" | "end",
) => {
  const response = await apiClient.patch("/driver/trip-status", {
    trip_id,
    action,
  });
  return response.data;
};
