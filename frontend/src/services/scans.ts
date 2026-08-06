import api from "./api";

export interface Scan {
  id: number;
  total_threats: number;
  created_at: string;
}

export const getScans = async (): Promise<Scan[]> => {
  const response = await api.get("/scans");
  return response.data;
};