import { createContext } from "react";
import type { Notification } from "../types/notification";

interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
}

export const NotificationContext =
  createContext<NotificationContextType | null>(null);
  