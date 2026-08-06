import api from "./api";

export interface ScanResult {
  threat: string;
  severity: string;
  source: string;
  status: string;
}

export interface ScanResponse {
  scan_status: string;
  total_threats: number;
  results: ScanResult[];
}

export const startScan = async (): Promise<ScanResponse> => {
  const response = await api.post("/scanner/start");
  return response.data;
};