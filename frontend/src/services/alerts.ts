import api from "./api";

export interface Alert {
  id: number;
  threat: string;
  severity: string;
  source: string;
  status: string;
  time?: string;
}

export const getAlerts = async (): Promise<Alert[]> => {
  const response = await api.get("/alerts");
  return response.data;
};