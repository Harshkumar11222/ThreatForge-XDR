export interface Notification {
  id: number;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  ip: string;
  time: string;
  read: boolean;
}