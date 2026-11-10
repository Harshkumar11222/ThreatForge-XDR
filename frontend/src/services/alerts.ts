import api from "./api";

export interface Alert {
  id: number;
  threat: string;
  severity: string;
  risk_score: number;
  file_name: string | null;
  file_path: string | null;
  source: string;
  status: string;
  created_at: string;
}

export const getAlerts = async (): Promise<Alert[]> => {
  const response = await api.get("/alerts/");
  return response.data;
};