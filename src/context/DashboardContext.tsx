import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardState {
  dateRange: "7d" | "30d" | "90d";
  sidebarOpen: boolean;
  theme: "dark" | "light";
  notifications: Array<{ id: string; message: string; type: "info" | "warning" | "error" }>;
}

interface DashboardContextType extends DashboardState {
  setDateRange: (range: "7d" | "30d" | "90d") => void;
  toggleSidebar: () => void;
  toggleTheme: () => void;
  addNotification: (message: string, type?: "info" | "warning" | "error") => void;
  dismissNotification: (id: string) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DashboardState>({
    dateRange: "30d",
    sidebarOpen: true,
    theme: "dark",
    notifications: [],
  });

  const setDateRange = (dateRange: DashboardState["dateRange"]) =>
    setState(prev => ({ ...prev, dateRange }));

  const toggleSidebar = () =>
    setState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));

  const toggleTheme = () =>
    setState(prev => ({ ...prev, theme: prev.theme === "dark" ? "light" : "dark" }));

  const addNotification = (message: string, type: "info" | "warning" | "error" = "info") => {
    const id = crypto.randomUUID();
    setState(prev => ({
      ...prev,
      notifications: [...prev.notifications, { id, message, type }],
    }));
    setTimeout(() => dismissNotification(id), 5000);
  };

  const dismissNotification = (id: string) =>
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.filter(n => n.id !== id),
    }));

  return (
    <DashboardContext.Provider value={{
      ...state, setDateRange, toggleSidebar, toggleTheme, addNotification, dismissNotification,
    }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
}
