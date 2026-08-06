import { useState } from "react";
import { NotificationContext } from "./NotificationContext";
import type { Notification } from "../types/notification";

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  function addNotification(notification: Notification) {
    setNotifications((prev) => [notification, ...prev]);
  }

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}