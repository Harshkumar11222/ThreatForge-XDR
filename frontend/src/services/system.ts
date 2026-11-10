import api from "./api";

export interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  network_sent: number;
  network_received: number;
  platform: string;
  status: string;
}

export const getSystemHealth = async (): Promise<SystemHealth> => {
  const response = await api.get("/system/health");
  return response.data;
};