import api from "./api";

export interface AnalyticsData {
  monthly_attacks: number[];
  severity: {
    Critical: number;
    High: number;
    Medium: number;
    Low: number;
  };
}
export interface TopIP{
    ip:string;
    attacks:number;
}

export const getTopIPs = async (): Promise<TopIP[]> => {
  const response = await api.get<TopIP[]>("/analytics/top-ips");
  return response.data;
}

export const getAnalytics = async (): Promise<AnalyticsData> => {
  const response = await api.get("/analytics/");
  return response.data;
};


export interface ThreatTrend {
  scan: string;
  threats: number;
}

export const getThreatTrends = async (): Promise<ThreatTrend[]> => {
  const response = await api.get("/analytics/trends");
  return response.data;
};