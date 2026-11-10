import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import "./App.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { NotificationProvider } from "./context/NotificationProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#101a2b",
              color: "#e8f0fb",
              border: "1px solid rgba(148,163,184,.18)",
              fontSize: "12px",
            },
          }}
        />
      </NotificationProvider>
    </AuthProvider>
  </StrictMode>,
);
