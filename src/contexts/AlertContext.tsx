import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Alert {
  id: string;
  type: "emergency" | "warning" | "info" | "health-tip";
  title: string;
  message: string;
  location?: string;
  timestamp: string;
  isRead: boolean;
  priority: "high" | "medium" | "low";
}

interface AlertContextType {
  alerts: Alert[];
  unreadCount: number;
  markAsRead: (alertId: string) => void;
  markAllAsRead: () => void;
  deleteAlert: (alertId: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

const sampleAlerts: Alert[] = [
  {
    id: "1",
    type: "emergency",
    title: "Cholera Outbreak Alert",
    message: "A cholera outbreak has been reported in Greater Accra. Ensure you drink only bottled or properly boiled water. Seek immediate medical attention if you experience severe diarrhea or vomiting.",
    location: "Greater Accra Region",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    priority: "high"
  },
  {
    id: "2",
    type: "warning",
    title: "Malaria Prevention Reminder",
    message: "The rainy season has increased mosquito activity. Remember to sleep under treated nets and eliminate standing water around your home.",
    location: "Nationwide",
    timestamp: "2024-01-14T18:00:00Z",
    isRead: false,
    priority: "medium"
  },
  {
    id: "3",
    type: "info",
    title: "Free Health Screening",
    message: "Free blood pressure and diabetes screening available at Korle-Bu Teaching Hospital this weekend from 8 AM to 4 PM.",
    location: "Korle-Bu Teaching Hospital",
    timestamp: "2024-01-13T09:00:00Z",
    isRead: true,
    priority: "low"
  },
  {
    id: "4",
    type: "health-tip",
    title: "Daily Health Tip",
    message: "Drink at least 8 glasses of water daily to maintain proper hydration and support kidney function.",
    timestamp: "2024-01-12T06:00:00Z",
    isRead: true,
    priority: "low"
  },
  {
    id: "5",
    type: "warning",
    title: "Heat Wave Warning",
    message: "Extreme heat expected this week. Stay hydrated, avoid direct sunlight during peak hours (11 AM - 3 PM), and wear light-colored clothing.",
    location: "Northern Regions",
    timestamp: "2024-01-11T14:00:00Z",
    isRead: false,
    priority: "medium"
  }
];

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>(sampleAlerts);

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const deleteAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  return (
    <AlertContext.Provider value={{ alerts, unreadCount, markAsRead, markAllAsRead, deleteAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlerts must be used within an AlertProvider");
  }
  return context;
};