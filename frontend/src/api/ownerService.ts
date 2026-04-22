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

export const getAllTrips = async () => {
  const response = await apiClient.get("/admin/trips");
  return response.data.data;
};

export const getDashboardData = async (period: string = "weekly") => {
  const response = await apiClient.get(
    `/admin/dashboard?expense_period=${period}`,
  );
  return response.data.data;
};

export const getExpensesForReview = async () => {
  const response = await apiClient.get("/admin/expenses");
  return response.data;
};

export const updateExpenseStatus = async ({
  id,
  status,
}: {
  id: number;
  status: "paid" | "rejected";
}) => {
  const response = await apiClient.post("/admin/expenses/review", {
    expense_id: id,
    status: status,
  });
  return response.data;
};

export const createDriver = async (driverData: any) => {
  const response = await apiClient.post("/admin/createDriver", driverData);
  return response.data;
};

export const createVehicle = async (vehicleData: any) => {
  const response = await apiClient.post("/admin/vehicles", vehicleData);
  return response.data;
};

export const createTrip = async (tripData: any) => {
  const response = await apiClient.post("/admin/trips", tripData);
  return response.data;
};
