export type Driver = {
  driver_id: number;
  driver_name: string;
  driver_phone_no1: string;
  driver_phone_no2: string | null;
  driver_license_no: string;
  driver_license_type: string;
  driver_license_expiry_date: string;
  is_active: boolean;
  status?: "OnTrip" | "Assigned" | "Idle";
  source?: string;
  destination?: string;
  totalTrips?: number;
  vehicleNumber?: string;
  start_date?: string;
  end_date?: string;
};
