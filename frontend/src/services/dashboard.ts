import api from "./api";

export interface DashboardStats {
  critical_alerts: number;
  protected_devices: number;
  countries: number;
  ai_status: string;
}

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/dashboard/stats");
  return response.data;
};